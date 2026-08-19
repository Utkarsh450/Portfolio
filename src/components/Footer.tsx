import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

const LinkedinIcon = ({ size = 22, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.65-1.64 1.65 1.65 0 0 0-1.65-1.65 1.64 1.64 0 0 0-1.64 1.65 1.64 1.64 0 0 0 1.64 1.64m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
);

const InstagramIcon = ({ size = 22, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const XIcon = ({ size = 22, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Heading Handwriting Animation for footer text
        const chars = gsap.utils.toArray<HTMLElement>('.footer-char');
        gsap.set(chars, { opacity: 0, filter: 'blur(12px)' });
        gsap.to(chars, {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.6,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 85%"
            }
        });

        // Video card — slide up from below
        const videoCard = footerRef.current?.querySelector('.footer-video-card');
        if (videoCard) {
            gsap.fromTo(videoCard,
                { y: 120, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: videoCard,
                        start: 'top 95%',
                        end: 'top 50%',
                        scrub: 1,
                    }
                }
            );
        }
    }, { scope: footerRef });

    return (
        <div ref={footerRef} className="w-full flex flex-col items-center">
            <style>{`
                @keyframes wordAnim {
                    0%, 28% { transform: translateY(0); opacity: 1; filter: blur(0px); }
                    33.33% { transform: translateY(-100%); opacity: 0; filter: blur(8px); }
                    94.66% { transform: translateY(-100%); opacity: 0; filter: blur(8px); }
                    94.67% { transform: translateY(100%); opacity: 0; filter: blur(8px); }
                    100% { transform: translateY(0); opacity: 1; filter: blur(0px); }
                }
                @keyframes drift {
                    0% { transform: translateX(-3%); }
                    100% { transform: translateX(3%); }
                }
            `}</style>

            {/* Main Footer Container with white-to-blue shadow effect at the top */}
            <footer className="w-full relative overflow-hidden text-white h-[95vh] min-h-[800px] flex flex-col justify-between pt-32 z-20 shadow-[0_-20px_50px_rgba(45,136,255,0.4)]">
                
                {/* Moving Clouds Background */}
                <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] z-0 pointer-events-none"
                    style={{
                        backgroundImage: 'url(/Image.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'bottom',
                        animation: 'drift 40s ease-in-out infinite alternate'
                    }}>
                </div>

                {/* Top Inner Glow Overlay */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/80 to-transparent z-10 pointer-events-none"></div>

                {/* Top Section: Text and Video Card */}
                <div className="w-full px-8 md:px-[10vw] mt-10 relative z-20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        {/* Text */}
                        <div className="flex flex-col shrink-0">
                            <div className="text-[3.5rem] md:text-[5.5rem] lg:text-[4rem] leading-[1.05] font-bold tracking-tight font-satoshi flex items-center gap-4">
                                <span className="flex flex-wrap">
                                    {"lets".split('').map((char, index) => (
                                        <span key={`l-${index}`} className="footer-char" style={{ whiteSpace: 'pre' }}>
                                            {char}
                                        </span>
                                    ))}
                                </span>
                                <div className="text-[3.5rem] md:text-[5rem] lg:text-[5.5rem] h-[1.3em] overflow-hidden relative inline-flex items-center justify-start pr-4">
                                    <span className="font-caveat font-medium opacity-0 pointer-events-none">design</span>
                                    <span className="font-caveat font-medium h-full flex items-center absolute left-0 top-0 opacity-0 animate-[wordAnim_12s_cubic-bezier(0.85,0,0.15,1)_infinite]" style={{ animationDelay: '0s' }}>create</span>
                                    <span className="font-caveat font-medium h-full flex items-center absolute left-0 top-0 opacity-0 animate-[wordAnim_12s_cubic-bezier(0.85,0,0.15,1)_infinite]" style={{ animationDelay: '-8s' }}>design</span>
                                    <span className="font-caveat font-medium h-full flex items-center absolute left-0 top-0 opacity-0 animate-[wordAnim_12s_cubic-bezier(0.85,0,0.15,1)_infinite]" style={{ animationDelay: '-4s' }}>build</span>
                                </div>
                            </div>
                            <div className="text-[3.5rem] md:text-[5.5rem] lg:text-[4rem] leading-[1.05] font-bold tracking-tight font-satoshi -mt-2 flex flex-wrap">
                                {"incredible work together.".split('').map((char, index) => (
                                    <span key={`i-${index}`} className="footer-char" style={{ whiteSpace: 'pre' }}>
                                        {char}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Video Card - Floating */}
                        <div className="footer-video-card w-[300px] h-[160px] md:w-[480px] md:h-[260px] rounded-[24px] overflow-hidden border-[3px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] rotate-3 shrink-0 transition-transform hover:rotate-0 duration-500 ease-out bg-black/10">
                            <video
                                src="/Video1.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Middle Section: Links and Copyright */}
                <div className="w-full px-8 md:px-[10vw] relative z-20 mb-[34vh] flex flex-col">
                    <div className="w-full flex flex-col md:flex-row items-start gap-12 md:gap-[25vw] pb-6">
                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <span className="text-white/60 text-[13px] font-medium font-satoshi mb-0.5">Email</span>
                            <a href="mailto:ubarnwal0802@gmail.com" className="text-white text-xl md:text-[0.9rem] font-medium font-satoshi hover:underline tracking-tight">
                                ubarnwal0802@gmail.com
                            </a>
                        </div>

                        {/* Social */}
                        <div className="flex flex-col gap-2">
                            <span className="text-white/60 text-[13px] font-medium font-satoshi mb-0.5">Social</span>
                            <div className="flex items-center gap-5">
                                <a
                                    href="https://www.linkedin.com/in/utkarsh-barnwal-801b56255/"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="LinkedIn"
                                    className="text-white hover:text-white/70 hover:scale-110 transition-all cursor-pointer flex items-center justify-center"
                                >
                                    <LinkedinIcon size={22} />
                                </a>
                                <a
                                    href="https://instagram.com/utkarshdotio"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Instagram"
                                    className="text-white hover:text-white/70 hover:scale-110 transition-all cursor-pointer flex items-center justify-center"
                                >
                                    <InstagramIcon size={22} />
                                </a>
                                <a
                                    href="https://x.com/UBarnwal15279"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="X (formerly Twitter)"
                                    className="text-white hover:text-white/70 hover:scale-110 transition-all cursor-pointer flex items-center justify-center"
                                >
                                    <XIcon size={22} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Divider Line */}
                    <div className="w-full h-[1px] bg-white/20"></div>

                    {/* Copyright */}
                    <div className="mt-4 text-white/60 text-[12px] font-satoshi font-medium tracking-wide">
                        © 2026 Utkarsh Barnwal
                    </div>
                </div>

                {/* Giant Background Text */}
                <div className="absolute bottom-[-0.8rem] left-0 w-full text-center pointer-events-none z-0 overflow-hidden flex items-end justify-center">
                    <h1 className="text-[18rem] font-black uppercase text-white/20 leading-[0.75] tracking-tighter select-none font-satoshi">
                        Utkarsh
                    </h1>
                </div>



                {/* Gradient mask at the bottom */}
                {/* <div className="absolute bottom-0 left-0 w-full h-[25vh] pointer-events-none z-10 bg-gradient-to-t from-[#2d88ff] to-transparent">
                </div> */}

            </footer>
        </div>
    );
};

export default Footer;
