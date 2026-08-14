import { ArrowLeft, Download, Mail, Phone, Globe } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

interface ResumeProps {
    onBack: () => void;
}

const Resume = ({ onBack }: ResumeProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const paperRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Handwriting animation for heading
        const chars = gsap.utils.toArray<HTMLElement>('.resume-char');
        gsap.set(chars, { opacity: 0, filter: 'blur(10px)', y: 10 });
        gsap.to(chars, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.4,
            stagger: 0.03,
            ease: 'power2.out',
            delay: 0.15
        });

        // Entrance animation for other elements
        gsap.fromTo('.resume-header-item', 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
        );

        if (paperRef.current) {
            gsap.fromTo(paperRef.current,
                { y: 60, opacity: 0, scale: 0.97 },
                { y: 0, opacity: 1, scale: 1, duration: 0.9, delay: 0.3, ease: 'power3.out' }
            );
        }
    }, { scope: containerRef });

    const handlePrint = () => {
        window.print();
    };

    return (
        <div ref={containerRef} className="w-full min-h-screen relative pb-32 bg-[#FAFAFA] text-zinc-900 font-satoshi selection:bg-blue-200">
            {/* Mid-to-bottom blue sky gradient backdrop */}
            <div className="absolute top-[340px] left-0 w-full bottom-0 bg-gradient-to-b from-[#FAFAFA] via-[#85BAFC] to-[#4592F5] pointer-events-none z-0"></div>
            
            {/* Top Back Button */}
            <div className="w-full max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between sticky top-4 z-50 pointer-events-none">
                <button
                    onClick={onBack}
                    className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-lg text-sm font-semibold text-zinc-800 hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back</span>
                </button>
            </div>

            {/* Header Hero Section */}
            <div className="w-full flex flex-col items-center text-center px-6 pt-10 md:pt-14 pb-10">
                {/* Badge */}
                <div className="resume-header-item font-bold text-zinc-800 uppercase text-xs tracking-widest flex items-center justify-center gap-2 mb-4 bg-white/60 backdrop-blur-md px-3.5 py-1">
                    <span className="text-[#0066FF] text-base leading-none">✦</span> RESUME
                </div>

                {/* Title with Handwriting Character Animation */}
                <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[2.8rem] font-extrabold tracking-tight text-[#111] leading-none mb-3 max-w-3xl flex flex-wrap justify-center">
                    {"oh sure, let's keep it formal".split('').map((char, index) => (
                        <span key={`rc-${index}`} className="resume-char" style={{ whiteSpace: 'pre' }}>
                            {char}
                        </span>
                    ))}
                </h1>

                {/* Subtitle */}
                <p className="resume-header-item text-zinc-700 text-sm sm:text-base font-medium max-w-xl mb-8 leading-relaxed">
                    For recruiters, hiring managers, and anyone who prefers <br className="hidden sm:inline" /> the short version.
                </p>

                {/* Download Button */}
                <div className="resume-header-item">
                    <button
                        onClick={handlePrint}
                        className="inline-flex items-center gap-3 px-1.5 py-1.5 pr-6 rounded-full bg-white border border-white/60 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                    >
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
                            <Download size={16} />
                        </div>
                        <span className="font-medium text-sm text-zinc-900">Download</span>
                    </button>
                </div>
            </div>

            {/* Resume Sheet Paper - UI Matching Reference Image */}
            <div className="w-full max-w-3xl -rotate-1 mx-auto px-4 sm:px-6 relative z-10">
                <div 
                    ref={paperRef} 
                    className="bg-white  shadow-[0_30px_90px_rgba(0,0,0,0.12)] border border-white/80 p-8 sm:p-14 md:p-16 relative overflow-hidden"
                >
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight font-satoshi mb-1">
                            Utkarsh Barnwal
                        </h2>
                        <p className="text-[#0278FC] font-bold text-xs tracking-wider uppercase font-satoshi mb-6">
                            Full Stack & Systems Engineer
                        </p>

                        {/* Contact Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-xs font-medium text-zinc-600">
                            {/* Phone */}
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-[#EBF3FF] text-[#0278FC] flex items-center justify-center shrink-0 shadow-2xs">
                                    <Phone size={13} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-400 font-semibold uppercase">Phone</span>
                                    <span className="text-zinc-800 font-semibold">+91 98765 43210</span>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-[#EBF3FF] text-[#0278FC] flex items-center justify-center shrink-0 shadow-2xs">
                                    <Mail size={13} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-400 font-semibold uppercase">Email</span>
                                    <a href="mailto:ubarnwal0802@gmail.com" className="text-zinc-800 font-semibold hover:text-[#0278FC] transition-colors">ubarnwal0802@gmail.com</a>
                                </div>
                            </div>

                            {/* Portfolio */}
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-[#EBF3FF] text-[#0278FC] flex items-center justify-center shrink-0 shadow-2xs">
                                    <Globe size={13} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-400 font-semibold uppercase">Portfolio</span>
                                    <a href="#" className="text-zinc-800 font-semibold hover:text-[#0278FC] transition-colors">utkarsh.dev</a>
                                </div>
                            </div>

                            {/* LinkedIn */}
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-[#EBF3FF] text-[#0278FC] flex items-center justify-center shrink-0 shadow-2xs">
                                    {/* <Linkedin size={13} /> */}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-400 font-semibold uppercase">LinkedIn</span>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-800 font-semibold hover:text-[#0278FC] transition-colors">linkedin.com/in/utkarsh</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section: SUMMARY */}
                    <div className="mb-9">
                        <div className="border-b border-zinc-200/80 pb-1 mb-3">
                            <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                                Summary
                            </h3>
                        </div>
                        <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed font-satoshi">
                            Full Stack & Systems Engineer with experience across consumer and enterprise products spanning payments, agentic AI, real-time access control, and high-concurrency cloud architecture. Experienced in taking complex products from early solutioning through launch while working closely with product managers and engineers.
                        </p>
                    </div>

                    {/* Section: EXPERIENCE */}
                    <div className="mb-9">
                        <div className="border-b border-zinc-200/80 pb-1 mb-6">
                            <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                                Experience
                            </h3>
                        </div>

                        <div className="space-y-7">
                            {/* Job 1: Mygate */}
                            <div className="flex items-start gap-3.5">
                                <div className="w-9 h-9 rounded-lg bg-amber-400 text-zinc-950 font-bold flex items-center justify-center text-xs shrink-0 shadow-xs border border-amber-300">
                                    <span className="font-mono">mr</span>
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className="font-bold text-sm text-zinc-900">Mygate</h4>
                                        <span className="text-[11px] text-zinc-400 font-medium italic">Aug 2024 – Present</span>
                                    </div>
                                    <p className="text-xs font-semibold text-zinc-500 mb-2">Product Engineer</p>
                                    <p className="text-xs text-zinc-600 leading-relaxed mb-2.5">
                                        Worked across Resident App, ERP, Payments, Helpdesk, AI Initiatives, and Smart Devices, partnering closely with PMs and engineers from solutioning through launch.
                                    </p>
                                    <ul className="text-xs text-zinc-600 space-y-1.5 list-disc list-inside leading-relaxed pl-1">
                                        <li>Owned the end-to-end design & architecture of QuickPass, a 0→1 access solution that streamlined delivery entry workflows and is now used across 500+ societies with 28K+ downloads.</li>
                                        <li>Designed & engineered Mira, an AI support assistant within the Mygate app that now resolves 85% of resident queries without human intervention.</li>
                                        <li>Led the engineering of Bills & Recharges, enabling residents to complete utility payments and recharges directly within Mygate through Bharat Connect.</li>
                                        <li>Led the design of Saarthi, a dedicated technician workflow app for managing and resolving society maintenance requests, now adopted across 1,700+ societies by 8,000+ staff members.</li>
                                        <li>Redesigned Mygate's checkout experience, reducing payment drop-offs by 14%, improving transaction success rates by 11%, and increasing card transaction share by 12%.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Job 2: Mygate Intern */}
                            <div className="flex items-start gap-3.5">
                                <div className="w-9 h-9 rounded-lg bg-amber-400 text-zinc-950 font-bold flex items-center justify-center text-xs shrink-0 shadow-xs border border-amber-300">
                                    <span className="font-mono">mr</span>
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className="font-bold text-sm text-zinc-900">Mygate</h4>
                                        <span className="text-[11px] text-zinc-400 font-medium italic">Jun 2024 – Aug 2024</span>
                                    </div>
                                    <p className="text-xs font-semibold text-zinc-500 mb-2">Software Design Intern</p>
                                    <ul className="text-xs text-zinc-600 space-y-1.5 list-disc list-inside leading-relaxed pl-1">
                                        <li>Designed the MVP experience for Mygate Video Doorbell and contributed to onboarding and management experiences across the Smart Devices ecosystem.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Job 3: Gida Technologies */}
                            <div className="flex items-start gap-3.5">
                                <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                                    <span className="font-mono">g</span>
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className="font-bold text-sm text-zinc-900">Gida Technologies</h4>
                                        <span className="text-[11px] text-zinc-400 font-medium italic">Dec 2023 – Apr 2024</span>
                                    </div>
                                    <p className="text-xs font-semibold text-zinc-500 mb-2">UI / UX & Systems Intern</p>
                                    <ul className="text-xs text-zinc-600 space-y-1.5 list-disc list-inside leading-relaxed pl-1">
                                        <li>Designed key experiences for HDFC ERGO's HERE App, including insurance purchase journeys and HERE Pets.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section: EDUCATION */}
                    <div>
                        <div className="border-b border-zinc-200/80 pb-1 mb-4">
                            <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                                Education
                            </h3>
                        </div>
                        <div className="flex justify-between items-start text-xs">
                            <div>
                                <h4 className="font-bold text-zinc-900">Bachelor of Technology in Computer Science & Engineering</h4>
                                <p className="text-zinc-500 font-medium">Autonomous Institute of Engineering & Technology</p>
                            </div>
                            <span className="text-zinc-400 font-medium italic text-[11px]">2020 – 2024</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Resume;
