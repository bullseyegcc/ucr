$ErrorActionPreference = "Stop"
$publicDir = Join-Path $PSScriptRoot "..\public"
$backupDir = Join-Path $publicDir "_video-backup"
$tempDir = Join-Path $publicDir "_video-temp"

New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null

# Background/decorative loops — smaller file size
$backgroundVideos = @(
    "hero.mp4", "cta.mp4", "sustain.mp4", "footer.mp4",
    "technologybg.mp4", "wecarethenature.mp4", "globalpresence.mp4"
)

function Compress-Video {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$Crf,
        [int]$MaxWidth
    )

    $process = Start-Process -FilePath "ffmpeg" `
        -ArgumentList @(
            "-y", "-i", $InputPath,
            "-c:v", "libx264", "-crf", "$Crf", "-preset", "slow",
            "-vf", "scale='min($MaxWidth,iw)':-2",
            "-an", "-movflags", "+faststart",
            $OutputPath
        ) `
        -Wait -PassThru -NoNewWindow -RedirectStandardError "NUL"

    if ($process.ExitCode -ne 0) {
        throw "FFmpeg failed for $InputPath (exit $($process.ExitCode))"
    }
}

Get-ChildItem "$publicDir\*.mp4" | ForEach-Object {
    $name = $_.Name
    $input = $_.FullName
    $output = Join-Path $tempDir $name
    $isBackground = $backgroundVideos -contains $name

    $crf = if ($isBackground) { 28 } else { 26 }
    $maxWidth = if ($isBackground) { 1280 } else { 1440 }

    $sizeBefore = [math]::Round($_.Length / 1MB, 2)
    Write-Host "Compressing $name ($sizeBefore MB) [crf=$crf, max=${maxWidth}px]..."

    Compress-Video -InputPath $input -OutputPath $output -Crf $crf -MaxWidth $maxWidth

    $sizeAfter = [math]::Round((Get-Item $output).Length / 1MB, 2)
    $saved = [math]::Round($sizeBefore - $sizeAfter, 2)
    Write-Host "  -> $sizeAfter MB (saved $saved MB)"
}

Write-Host "`nReplacing originals..."
Get-ChildItem "$tempDir\*.mp4" | ForEach-Object {
    $dest = Join-Path $publicDir $_.Name
    $backup = Join-Path $backupDir $_.Name
    if (-not (Test-Path $backup)) {
        Copy-Item $dest $backup
    }
    Move-Item $_.FullName $dest -Force
}

Remove-Item $tempDir -Force -Recurse -ErrorAction SilentlyContinue

Write-Host "`nDone. Originals backed up to public/_video-backup/"
Get-ChildItem "$publicDir\*.mp4" | ForEach-Object {
    [PSCustomObject]@{ Name = $_.Name; SizeMB = [math]::Round($_.Length / 1MB, 2) }
} | Sort-Object SizeMB -Descending | Format-Table -AutoSize

$total = (Get-ChildItem "$publicDir\*.mp4" | Measure-Object -Property Length -Sum).Sum
Write-Host "Total size: $([math]::Round($total / 1MB, 2)) MB"
