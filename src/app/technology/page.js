import { VideoPlayer } from "../common/video"

export default function Technology() {
    return (
        <div>
            <div className="flex min-h-[80vh]  font-medium  justify-center bg-black font-sans dark:bg-black">
                    <VideoPlayer src="/hero.mp4" className=" object-cover " />
                    <h1 className="absolute top-[40%] text-6xl  text-white font-inter">UCR shapping the future</h1>
                  </div>
        </div>
    )
}