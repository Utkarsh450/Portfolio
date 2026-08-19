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

            {/* Resume Sheet Paper */}
            <div className="w-full max-w-[760px] -rotate-2 mx-auto px-4 sm:px-6 relative z-10 transform origin-top hover:scale-[1.02] transition-transform duration-500">
                <div 
                    ref={paperRef} 
                    className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-zinc-200 p-8 sm:p-10 md:p-12 relative overflow-hidden text-zinc-900"
                >
                    {/* Header */}
                    <div className="mb-5 text-center sm:text-left">
                        <h2 className="text-2xl sm:text-[28px] font-extrabold text-zinc-900 tracking-tight font-serif mb-0.5">
                            Utkarsh Barnwal
                        </h2>
                        <p className="text-zinc-600 font-medium text-[11px] uppercase tracking-wider mb-3">
                            Greater Noida, Uttar Pradesh
                        </p>

                        {/* Contact Info */}
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-[11px] font-medium text-zinc-600">
                            <a href="tel:+917015589772" className="flex items-center gap-1.5 hover:text-black transition-colors">
                                <Phone size={12} className="text-zinc-400" />
                                <span>+91-7015589772</span>
                            </a>
                            <a href="mailto:ubarnwal0802@gmail.com" className="flex items-center gap-1.5 hover:text-black transition-colors">
                                <Mail size={12} className="text-zinc-400" />
                                <span>ubarnwal0802@gmail.com</span>
                            </a>
                            <a href="https://www.linkedin.com/in/utkarsh-barnwal-801b56255/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-black transition-colors">
                                <Globe size={12} className="text-zinc-400" />
                                <span>LinkedIn</span>
                            </a>
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-black transition-colors">
                                <Globe size={12} className="text-zinc-400" />
                                <span>Github</span>
                            </a>
                        </div>
                    </div>

                    {/* Section: SUMMARY */}
                    <div className="mb-4">
                        <div className="border-b border-zinc-400 pb-0.5 mb-2">
                            <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest font-serif">
                                Summary
                            </h3>
                        </div>
                        <p className="text-[11px] sm:text-xs text-zinc-800 leading-relaxed font-sans text-justify">
                            Full Stack Developer with experience building end-to-end web applications and AI-driven products. Skilled at transforming ideas into scalable, high-performance solutions with a focus on user experience and software quality.
                        </p>
                    </div>

                    {/* Section: EDUCATION */}
                    <div className="mb-4">
                        <div className="border-b border-zinc-400 pb-0.5 mb-2">
                            <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest font-serif">
                                Education
                            </h3>
                        </div>
                        <div className="flex justify-between items-start text-[11px] sm:text-xs text-zinc-800">
                            <div>
                                <h4 className="font-bold text-zinc-900">Lloyd Institute of Engineering and Technology</h4>
                                <p>Bachelor of Technology (B.Tech) &nbsp;|&nbsp; <span className="font-semibold">CGPA: 7.8</span></p>
                            </div>
                            <div className="text-right shrink-0">
                                <span className="font-bold block">Jun 2022 – Jun 2026</span>
                                <span className="italic text-zinc-600">Greater Noida, UP</span>
                            </div>
                        </div>
                    </div>

                    {/* Section: EXPERIENCE */}
                    <div className="mb-4">
                        <div className="border-b border-zinc-400 pb-0.5 mb-2">
                            <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest font-serif">
                                Experience
                            </h3>
                        </div>
                        <div className="space-y-3">
                            <div className="text-[11px] sm:text-xs text-zinc-800">
                                <div className="flex justify-between items-start mb-0.5">
                                    <div>
                                        <h4 className="font-bold text-zinc-900 text-[12px]">Excellence Technologies Pvt. Ltd.</h4>
                                        <p className="italic text-zinc-700">AI Developer</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="font-bold block">May 2026 – Present</span>
                                        <span className="italic text-zinc-600">Greater Noida, UP</span>
                                    </div>
                                </div>
                                <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-justify">
                                    <li>Developed AI-powered web applications using React.js, Next.js, TypeScript, and Tailwind CSS, delivering responsive and intuitive user experiences.</li>
                                    <li>Integrated OpenAI APIs and REST APIs to build intelligent, data-driven features while implementing efficient client-side state management.</li>
                                    <li>Optimized application performance using code splitting, lazy loading, and Server-Side Rendering (SSR), improving responsiveness and overall user experience.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section: TECHNICAL SKILLS */}
                    <div className="mb-4">
                        <div className="border-b border-zinc-400 pb-0.5 mb-2">
                            <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest font-serif">
                                Technical Skills
                            </h3>
                        </div>
                        <div className="text-[11px] sm:text-[11.5px] text-zinc-800 space-y-1">
                            <p><span className="font-bold">Languages:</span> JavaScript, TypeScript, Python</p>
                            <p><span className="font-bold">Frontend:</span> React.js, Next.js, Tailwind CSS, HTML5, CSS3, Framer Motion</p>
                            <p><span className="font-bold">Backend:</span> Node.js, Express.js, FastAPI, REST APIs, JWT</p>
                            <p><span className="font-bold">Databases & Storage:</span> PostgreSQL, MongoDB, Redis, pgvector, ChromaDB, Pinecone</p>
                            <p><span className="font-bold">AI & LLM:</span> OpenAI APIs, LLMs, RAG, LangChain, AI Agents</p>
                            <p><span className="font-bold">Background Processing:</span> Inngest, RabbitMQ, Redis Pub/Sub</p>
                            <p><span className="font-bold">State Management:</span> Redux Toolkit, Zustand, Context API, TanStack Query</p>
                            <p><span className="font-bold">Data Fetching:</span> Axios, Fetch API</p>
                            <p><span className="font-bold">Performance:</span> SSR, SSG, Code Splitting, Lazy Loading, Responsive Design, Accessibility (a11y)</p>
                            <p><span className="font-bold">Tools & DevOps:</span> Git, GitHub, Docker, Nginx, Linux, VPS, Vercel, Netlify, CI/CD (Basics)</p>
                        </div>
                    </div>

                    {/* Section: PROJECTS */}
                    <div className="mb-2">
                        <div className="border-b border-zinc-400 pb-0.5 mb-2">
                            <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest font-serif">
                                Projects
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {/* Project 1 */}
                            <div className="text-[11px] sm:text-xs text-zinc-800">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h4 className="font-bold text-zinc-900 text-[12px]">
                                        HireFlow <span className="font-normal text-zinc-700">– AI Job Automation Platform</span>
                                    </h4>
                                    <span className="font-bold shrink-0">2026</span>
                                </div>
                                <p className="italic text-zinc-600 mb-1">Next.js, Node.js, PostgreSQL (pgvector), Inngest, Playwright</p>
                                <ul className="list-disc list-outside ml-4 space-y-1 text-justify">
                                    <li>Built an AI-powered platform that automates job discovery, semantic matching, and ATS job applications.</li>
                                    <li>Engineered an asynchronous pipeline using Inngest, pgvector, and vector embeddings for intelligent job retrieval.</li>
                                    <li>Implemented AI-powered job ranking and gap analysis using OpenAI Agent SDK and BGE Cross-Encoder reranking.</li>
                                    <li>Automated end-to-end job applications using Playwright, AI-generated resumes, and cover letters.</li>
                                </ul>
                            </div>

                            {/* Project 2 */}
                            <div className="text-[11px] sm:text-xs text-zinc-800">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h4 className="font-bold text-zinc-900 text-[12px]">
                                        VocalAI <span className="font-normal text-zinc-700">– AI Voice Call Center Platform</span>
                                    </h4>
                                    <span className="font-bold shrink-0">2026</span>
                                </div>
                                <p className="italic text-zinc-600 mb-1">Next.js, FastAPI, PostgreSQL, Redis, LiveKit, WebSockets</p>
                                <ul className="list-disc list-outside ml-4 space-y-1 text-justify">
                                    <li>Built an AI-powered voice call center platform to automate customer support through real-time voice conversations.</li>
                                    <li>Integrated LiveKit and OpenAI APIs for low-latency speech recognition, LLM processing, and voice synthesis.</li>
                                    <li>Developed a FastAPI backend using PostgreSQL, Redis Pub/Sub, and WebSockets for real-time communication.</li>
                                    <li>Implemented RAG and an admin dashboard for AI agent management, analytics, and conversation history.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Resume;
