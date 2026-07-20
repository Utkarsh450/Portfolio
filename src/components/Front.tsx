import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

const Front = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
      const chars = gsap.utils.toArray<HTMLElement>('.hero-char');
      gsap.set(chars, { opacity: 0, filter: 'blur(12px)' });
      gsap.to(chars, {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: 0.03, // slightly faster stagger since there's a lot of text
          ease: 'power2.out',
          delay: 0.3 // brief pause on initial load before writing
      });

      // Animate the mygate pill badge
      gsap.fromTo('.mygate-badge', 
          { opacity: 0, scale: 0.9, filter: 'blur(8px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out', delay: 2.2 }
      );
  }, { scope: container });

  const splitText = (text: string, prefix: string) => {
      // standard inline span preserves text layout perfectly for blur/opacity animations
      return text.split('').map((char, index) => (
          <span key={`${prefix}-${index}`} className="hero-char" style={{ whiteSpace: 'pre' }}>
              {char}
          </span>
      ));
  };

  return (
    <div ref={container} className='w-fit absolute top-48 flex flex-col justify-center gap-4 left-28 p-4 z-20'>
        <div className='font-regular text-2xl text-zinc-50'>
            <span className="hero-char mr-2">🖐️</span>
            {splitText("Hey, I'm ", 'h')}
            <span className='font-semibold text-zinc-50'>
                {splitText("Utkarsh", 'u')}
            </span>
        </div>
        
        <div className="flex flex-col -my-10">
           <div className='text-[8.8rem] text-zinc-50 font-regular font-satoshi tracking-tight'>
              {splitText("Software", 'p')}
           </div>
        
           <div className='text-[11rem] font-caveat text-zinc-50 mx-34 -my-36 animate-float'>
              {splitText("developer", 'd')}
           </div>
        </div>
      
        <div className='text-zinc-50 text-[1.2rem] mt-34 flex items-center font-medium font-satoshi tracking-wide'>
            {splitText("Building consumer & enterprise products @ ", 'b')}
            
            <div className="mygate-badge ml-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 shadow-sm">
                <div className="w-5 h-5 rounded bg-[#FFD700] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-black leading-none">m</span>
                </div>
                <span className="text-white text-base font-bold tracking-wide">mygate</span>
            </div>
        </div>
    </div>
  )
}

export default Front