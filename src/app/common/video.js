export function VideoPlayer({ src, width = 600, height = 800, controls = true, className = '' }) {
    return (
        <video 
            src={src} 
            width={width} 
            height={height} 
            autoPlay={true}
            muted={true}
            loop={true}
            className={`object-cover ${className} h-full w-full`}
            
        />
    )
}
