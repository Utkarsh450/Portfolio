import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const WhatIDo = () => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const words = gsap.utils.toArray<HTMLElement>('.reveal-word');
    
    // Start faded out
    gsap.set(words, { opacity: 0.2 });

    // Clean, fast word-by-word opacity reveal (no blur)
    gsap.to(words, {
      opacity: 1,
      duration: 1,
      stagger: 1, // Strict one-by-one sequence
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: '+=600',
        scrub: 1,
      }
    });
  }, { scope: containerRef });

  const text1 = "I turn messy, real-world problems into products people actually";
  const text2 = "— interfaces that feel obvious, systems";
  const text3 = "that scale, and details that quietly do the work.";

  const renderWords = (text: string) => {
    return text.split(' ').map((word, i) => (
        <span key={i} className="reveal-word">{word}{' '}</span>
    ));
  };

  return (
    <section className="w-full bg-white py-24 mt-28 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 md:gap-20">
            {/* Left column */}
            <div className="w-full md:w-1/3 shrink-0">
                <div className="font-semibold text-zinc-500 font-satoshi uppercase text-md flex items-center gap-3">
                    <span className="text-[#0066FF] text-xl leading-none">✦</span> WHAT I DO
                </div>
            </div>
            
            {/* Right column */}
            <div className="w-full md:w-2/3 flex font-satoshi flex-col">
                <h2 
                    ref={containerRef}
                    className="text-[2rem] sm:text-[2.5rem] md:text-5xl lg:text-[2.4rem] leading-[1.1] font-bold tracking-tight text-zinc-700 mb-24 md:mb-32 max-w-[1000px] indent-16 sm:indent-24 md:indent-32 lg:indent-48"
                >
                    {renderWords(text1)}
                    <span className="font-caveat text-[#0066FF] font-medium text-[2.4rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[3.8rem] reveal-word">
                        understand <br />
                    </span>{' '}
                    {renderWords(text2)}
                    {renderWords(text3)}
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-16 md:gap-24 w-full max-w-[800px]">
                    <div className="flex-1 flex flex-col">
                        <div className="text-[#0281e0] text-[4rem] md:text-[3rem] font-medium leading-none tracking-tighter pb-6 border-b border-zinc-200 mb-6">
                            <NumberScramble text="1 year" />
                        </div>
                        <div className="font-semibold text-xl md:text-xl text-[#1a1a1a] mb-3 tracking-tight">of development</div>
                        <p className="text-zinc-500 text-base font-medium md:text-md leading-relaxed">
                            consumer products, enterprise software & design systems
                        </p>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="text-[#0281e0] text-[4rem] md:text-[3rem] font-medium leading-none tracking-tighter pb-6 border-b border-zinc-200 mb-6">
                            <NumberScramble text="5M+" />
                        </div>
                        <div className="font-semibold text-xl md:text-xl text-[#1a1a1a] mb-3 tracking-tight">Users</div>
                        <p className="text-zinc-500 text-base font-medium md:text-md leading-relaxed">
                            reached by the products I've helped ship at Mygate.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

// Custom component for the hacker/scramble text effect triggered on scroll
const NumberScramble = ({ text }: { text: string }) => {
    const textRef = useRef<HTMLSpanElement>(null);
    
    useGSAP(() => {
        const chars = "0123456789";
        ScrollTrigger.create({
            trigger: textRef.current,
            start: "top 85%", // Trigger when it comes into view
            onEnter: () => {
                let iteration = 0;
                const maxIterations = 12; // Fewer total frames (thode hi random number)
                
                const interval = setInterval(() => {
                    if (!textRef.current) return;
                    
                    textRef.current.innerText = text
                        .split("")
                        .map((_, index) => {
                            // Progressively lock characters from left to right
                            if (index < (iteration / maxIterations) * text.length) {
                                return text[index];
                            }
                            // Otherwise return a random number
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("");
                        
                    iteration++;
                    
                    if (iteration > maxIterations) {
                        clearInterval(interval);
                        if (textRef.current) textRef.current.innerText = text; // Ensure final text is exact
                    }
                }, 80); // Slower updates (jyada fast nahi)
            },
            once: true // Only scramble once per page load
        });
    }, { scope: textRef });

    return <span ref={textRef} className="tabular-nums">{text}</span>;
};

export default WhatIDo