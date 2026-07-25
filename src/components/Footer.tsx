import { Globe, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

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
            stagger: 0.04, // Faster stagger since it's a long sentence
            ease: 'power2.out',
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 85%"
            }
        });
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
                        <div className="w-[300px] h-[160px] md:w-[480px] md:h-[260px] rounded-[24px] overflow-hidden border-[3px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] rotate-3 shrink-0 transition-transform hover:rotate-0 duration-500 ease-out bg-black/10">
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
                            <a href="mailto:snj.menon05@gmail.com" className="text-white text-xl md:text-[0.9rem] font-medium font-satoshi hover:underline tracking-tight">
                                ubarnwal0802@gmail.com
                            </a>
                        </div>

                        {/* Social */}
                        <div className="flex flex-col gap-2">
                            <span className="text-white/60 text-[13px] font-medium font-satoshi mb-1">Social</span>
                            <div className="flex items-center gap-3">
                                <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform">
                                    <Globe size={14} className="fill-current" />
                                </a>
                                <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform">
                                    <Mail size={14} className="fill-current" />
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
