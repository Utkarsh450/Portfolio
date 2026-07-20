import Front from './Front'
import { LocationDot } from "./LocationDot"

const Content = () => {
  return (
    
    <div className='w-full h-176 mb-10 relative bg-white'>

      {/* Sky Background */}
      <img src="./blue_sky.avif" className='w-full h-full object-cover absolute z-0 object-bottom' alt="" />

      {/* Front Text Layer */}
      <Front />

      {/* Boy Image Layer */}
      <img src="./Image4.png" className='absolute w-150 scale-180 top-62 right-28 z-10' alt="" />

      {/* Smooth gradient fade to embed the images into the white background seamlessly */}
      <div className="absolute bottom-0 left-0 w-full h-[100] bg-gradient-to-t from-white via-white/90 to-transparent backdrop-blur-[2px] pointer-events-none z-10"></div>

      {/* Extra layer of gradient to make the transition near the bottom even thicker */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-white via-white/90 to-transparent backdrop-blur-sm pointer-events-none z-10"></div>

      {/* Solid white block at the very bottom to give the footer a clean background */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-white shadow-[0_-20px_40px_20px_white] pointer-events-none z-10"></div>

      {/* Bottom Footer Area */}
      <div className="w-full px-28 flex flex-col absolute -bottom-28 z-30">
        <div className="w-full flex items-center justify-between mb-5">
          <div className="font-satoshi flex items-center gap-2 text-xs sm:text-sm tracking-wide">
            <span className="font-semibold text-zinc-400">BASED IN</span>
            <span className="text-black"><LocationDot /></span>
            <span className="font-bold text-black">GREATER NOIDA, UP</span>
          </div>
          <div className="font-bold font-satoshi text-zinc-400 text-xs sm:text-sm tracking-wide">
            CREATE {'>'} CONSUME
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content