import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const chars = gsap.utils.toArray<HTMLElement>('.about-char');
    
    // Start completely transparent and heavily blurred
    gsap.set(chars, { opacity: 0, filter: 'blur(12px)' });

    // Play handwriting-style sequence when it enters viewport
    gsap.to(chars, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.6,
      stagger: 0.08, // Character by character delay
      ease: 'power2.out',
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 85%',
      }
    });
  }, { scope: headingRef });

  const headingText = "a little about myself";

  return (
    <section className="w-full bg-white py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-16 md:gap-20">
            {/* Left column - Image */}
            <div className="w-full md:w-5/12 flex justify-center md:justify-start lg:justify-center shrink-0">
                <div className="bg-white p-4 pb-16 md:pb-20 shadow-xl shadow-black/5 -rotate-3 transition-transform hover:rotate-0 duration-500 max-w-[320px] md:max-w-[380px] w-full border border-zinc-100">
                    <img src="./Image.png" alt="About Me" className="w-full h-[400px] md:h-[480px] object-cover bg-zinc-100" />
                </div>
            </div>
            
            {/* Right column - Text */}
            <div className="w-full md:w-7/12 flex flex-col pt-8 md:pt-0 max-w-[800px]">
                <div className="font-semibold text-zinc-500 font-satoshi uppercase text-sm flex items-center gap-3 mb-8">
                    <span className="text-[#0066FF] text-xl leading-none">✦</span> ABOUT ME
                </div>
                
                <h2 ref={headingRef} className="text-[#1a1a1a] text-[2.5rem] sm:text-[3.5rem] md:text-[3.5rem] font-satoshi lg:text-[3rem] leading-[1] font-semibold tracking-tight mb-8 flex flex-wrap">
                    {headingText.split('').map((char, index) => (
                        <span key={index} className="about-char" style={{ whiteSpace: 'pre' }}>
                            {char}
                        </span>
                    ))}
                </h2>
                
                <div className="flex flex-col gap-6 text-zinc-600 text-base font-satoshi sm:text-lg leading-relaxed font-medium mb-12 max-w-[650px]">
                    <p>
                        My journey into software development started with a deep curiosity for how things work on the web. I began by building simple interfaces and gradually expanded my skills across the entire stack, working on everything from robust APIs and responsive user interfaces to complex system architecture.
                    </p>
                    <p>
                        Today, my focus has evolved towards the intersection of traditional full-stack development and artificial intelligence. I specialize in designing scalable applications powered by Gen AI and Agentic AI. I'm particularly drawn to architectural challenges where I can orchestrate intelligent AI agents to automate complex workflows, turning ambitious technical concepts into seamless, user-centric experiences.
                    </p>
                </div>
                
                <div className="font-caveat text-[#0066FF] text-[3.5rem] sm:text-[3.5rem] leading-none">
                    Utkarsh.
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutMe
