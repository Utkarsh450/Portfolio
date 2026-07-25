import { useRef } from 'react';
import { MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        id: 2,
        date: "Jun '23 - Present",
        role: "AI Developer",
        company: "Excellence Technologies",
        location: "Greater Noida, UP",
        theme: "blue",
        tilt: "rotate-2",
        bullets: [
            <>Developed intelligent backend services powered by <strong className="text-zinc-800 font-semibold">Generative AI</strong> and Agentic workflows.</>,
            <>Architected and deployed <strong className="text-zinc-800 font-semibold">scalable AI agents</strong> to automate complex enterprise tasks.</>,
            <>Integrated Large Language Models (LLMs) into applications to enhance data extraction and user interaction.</>
        ]
    },
    {
        id: 3,
        date: "Aug '22 - Dec '22",
        role: "Frontend Developer Intern",
        company: "BrandMeOnline.com",
        location: "Remote",
        theme: "gray",
        tilt: "-rotate-2",
        bullets: [
            <>Developed and maintained responsive user interfaces using <strong className="text-zinc-800 font-semibold">React.js</strong> and modern CSS frameworks.</>,
            <>Collaborated with designers to translate mockups into <strong className="text-zinc-800 font-semibold">pixel-perfect web components</strong>.</>,
            <>Optimized frontend performance to ensure fast load times and a smooth user experience.</>
        ]
    },
    {
        id: 4,
        date: "Jan '22 - Jul '22",
        role: "Frontend Developer Intern",
        company: "Penthara Technologies",
        location: "Mohali, Punjab",
        theme: "red",
        tilt: "rotate-3",
        bullets: [
            <>Built dynamic, interactive web applications focusing on <strong className="text-zinc-800 font-semibold">user-centric design principles</strong>.</>,
            <>Participated in agile development cycles, contributing to sprint planning and <strong className="text-zinc-800 font-semibold">code reviews</strong>.</>,
            <>Integrated RESTful APIs to connect frontend interfaces with robust backend services.</>
        ]
    }
];

const themeColors: Record<string, { badgeBg: string; badgeBorder: string; badgeText: string; dot: string; line: string }> = {
    green: { badgeBg: 'bg-[#f0fdf4]', badgeBorder: 'border-[#bbf7d0]', badgeText: 'text-[#166534]', dot: 'bg-[#22c55e]', line: 'bg-[#86efac]' },
    blue: { badgeBg: 'bg-[#eff6ff]', badgeBorder: 'border-[#bfdbfe]', badgeText: 'text-[#1e293b]', dot: 'bg-[#93c5fd]', line: 'bg-[#cbd5e1]' },
    gray: { badgeBg: 'bg-[#f8fafc]', badgeBorder: 'border-[#e2e8f0]', badgeText: 'text-[#334155]', dot: 'bg-[#cbd5e1]', line: 'bg-[#e2e8f0]' },
    red: { badgeBg: 'bg-[#fef2f2]', badgeBorder: 'border-[#fecaca]', badgeText: 'text-[#991b1b]', dot: 'bg-[#f87171]', line: 'bg-[#fca5a5]' },
};

const Experience = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const track = trackRef.current;
        const container = containerRef.current;
        if (!track || !container) return;
        
        const getScrollAmount = () => {
            const scrollWidth = track.scrollWidth - window.innerWidth;
            return scrollWidth > 0 ? -scrollWidth : 0;
        };

        const scrollTween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                pin: true,
                scrub: true,
                start: "top top",
                end: () => `+=${(track.scrollWidth - window.innerWidth) * 1.5}`,
                invalidateOnRefresh: true,
            }
        });

        // Heading Handwriting Animation
        const chars = gsap.utils.toArray<HTMLElement>('.journey-char');
        gsap.set(chars, { opacity: 0, filter: 'blur(12px)' });
        gsap.to(chars, {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: container,
                start: "top 85%"
            }
        });

        // Use the wrapper for GSAP animations so we don't overwrite Tailwind's tilt rotations on the inner card!
        const cards = gsap.utils.toArray('.timeline-card-wrapper');
        cards.forEach((card: any) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: "left 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-full bg-white">
            <div className="h-screen w-full flex flex-col overflow-hidden">
                
                {/* Header - Reduced padding and margins on small screens to give cards more space */}
                <div className="w-full flex flex-col items-center text-center px-6 z-30 pt-4 md:pt-16 shrink-0 pointer-events-none">
                    <div className="font-semibold text-zinc-500 font-satoshi uppercase text-sm flex items-center justify-center gap-3 mb-2">
                        <span className="text-[#0066FF] text-xl leading-none">✦</span> EXPERIENCE
                    </div>
                    <h2 className="text-[#1a1a1a] text-[2rem] md:text-[3.5rem] font-satoshi leading-[1.1] font-bold tracking-tight mb-2 md:mb-4 flex flex-wrap justify-center">
                        {"the journey so far".split('').map((char, index) => (
                            <span key={index} className="journey-char" style={{ whiteSpace: 'pre' }}>
                                {char}
                            </span>
                        ))}
                    </h2>
                    <p className="text-zinc-500 text-sm md:text-lg font-medium leading-relaxed font-satoshi max-w-[600px] mx-auto">
                        From healthcare SaaS to insurance to community tech — four roles across two years, and counting.
                    </p>
                </div>

                {/* Track Area */}
                <div className="flex-1 w-full relative mt-2 md:mt-4">
                    
                    {/* Moving Track */}
                    <div ref={trackRef} className="flex items-center w-max px-[10vw] relative z-10 h-full">
                        {experiences.map((exp, index) => {
                            const colors = themeColors[exp.theme] || themeColors.blue;

                            const cardUI = (
                                <div className="timeline-card-wrapper w-full h-[380px]">
                                    <div className={`w-full h-full bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden flex flex-col ${exp.tilt} transition-transform duration-300 hover:rotate-0`}>
                                        
                                        {/* Card Header */}
                                        <div className="flex items-start gap-4 p-8 pb-5 bg-white relative z-20 shrink-0 shadow-[0_8px_20px_rgba(0,0,0,0.025)]">
                                            <div className="p-[3px] border-[1.5px] border-dotted border-zinc-300 rounded-[4px] shrink-0">
                                                <div className="w-[42px] h-[42px] bg-gradient-to-br from-[#E3F2FD] to-[#FFF9C4] rounded-[2px] flex items-center justify-center font-bold text-xl text-[#1a1a1a]">
                                                    {exp.company.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="flex-1 pt-0.5">
                                                <h3 className="text-[1.15rem] font-bold text-[#1a1a1a] mb-1 font-satoshi tracking-tight leading-tight">{exp.role}</h3>
                                                <div className="flex items-center justify-between flex-wrap gap-2">
                                                    <p className="text-zinc-500 font-medium text-[14px] font-satoshi">{exp.company}</p>
                                                    <div className="flex items-center gap-1.5 text-zinc-500 text-[13px] font-medium font-satoshi">
                                                        <MapPin size={14} className="text-zinc-500" strokeWidth={2.5} />
                                                        {exp.location}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Card Bullets */}
                                        <div className="flex-1 px-8 pb-8 pt-5 bg-zinc-50/70 overflow-y-auto">
                                            <ul className="flex flex-col gap-4">
                                                {exp.bullets.map((bullet, i) => (
                                                    <li key={i} className="flex items-start gap-3.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-2.5"></span>
                                                        <span className="text-[#475569] text-[15px] leading-[1.6] font-medium font-satoshi tracking-[0.01em]">
                                                            {bullet}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );

                            return (
                                <div key={exp.id} className="relative w-[85vw] sm:w-[420px] shrink-0 flex flex-col mx-4 sm:mx-8">
                                    {index % 2 === 0 ? (
                                        <>
                                            <div className="flex justify-center pb-3 md:pb-5">
                                                <div className={`px-5 py-1.5 rounded-full border ${colors.badgeBorder} ${colors.badgeBg} ${colors.badgeText} text-[13px] font-medium font-satoshi tracking-wide shadow-sm`}>
                                                    {exp.date}
                                                </div>
                                            </div>
                                            <div className="h-[30px] md:h-[40px] w-full relative flex justify-center z-10">
                                                <div className={`absolute top-0 -translate-y-1/2 w-3.5 h-3.5 rounded-full ${colors.dot} ring-[6px] ring-[#FAFAFA] z-20`}></div>
                                                <div className={`w-[1.5px] h-full ${colors.line} z-10`}></div>
                                            </div>
                                            {cardUI}
                                        </>
                                    ) : (
                                        <>
                                            {cardUI}
                                            <div className="h-[30px] md:h-[40px] w-full relative flex justify-center z-10">
                                                <div className={`w-[1.5px] h-full ${colors.line} z-10`}></div>
                                                <div className={`absolute bottom-0 translate-y-1/2 w-3.5 h-3.5 rounded-full ${colors.dot} ring-[6px] ring-[#FAFAFA] z-20`}></div>
                                            </div>
                                            <div className="flex justify-center pt-3 md:pt-5">
                                                <div className={`px-5 py-1.5 rounded-full border ${colors.badgeBorder} ${colors.badgeBg} ${colors.badgeText} text-[13px] font-medium font-satoshi tracking-wide shadow-sm`}>
                                                    {exp.date}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
