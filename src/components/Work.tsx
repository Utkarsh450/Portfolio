import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Lock, ShieldCheck, ChevronRight, Zap, Bot, Sparkles, Layers, CreditCard } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        number: "01",
        year: "2025",
        title: "The checkout, rebuilt for 5M+ homes",
        tags: ["Payments", "iOS & Android", "FinTech"],
        description: "A checkout redesign focused on reducing friction, improving payment adoption, and supporting over 1M+ monthly transactions.",
        isComingSoon: false,
        link: "#",
        bgGradient: "from-[#0278FC] via-[#0060E6] to-[#0039A6]",
        accentColor: "bg-[#0278FC]",
        type: "checkout"
    },
    {
        id: 2,
        number: "02",
        year: "2026",
        title: "Bills for the whole household, not just you.",
        tags: ["Payments", "Bills & Recharges", "iOS & Android"],
        description: "Most apps let you pay bills. We designed one that knows who you live with. Households can now share, track, and pay bills together on Mygate.",
        isComingSoon: true,
        link: "#",
        bgGradient: "from-[#0082FC] via-[#005BC6] to-[#00379E]",
        accentColor: "bg-[#0082FC]",
        type: "bills"
    },
    {
        id: 3,
        number: "03",
        year: "2026",
        title: "Autonomous AI Agents & Enterprise Workflows",
        tags: ["Gen AI", "Agentic AI", "System Architecture"],
        description: "Orchestrating multi-agent LLM systems to automate enterprise workflows, complex decision trees, and real-time data pipelines.",
        isComingSoon: false,
        link: "#",
        bgGradient: "from-[#0F62FE] via-[#0043CE] to-[#001D6C]",
        accentColor: "bg-[#0F62FE]",
        type: "ai"
    }
];

// Fixed px offset between stacked cards — each card peeks this many px behind the next
const STACK_OFFSET = 35;

const Work = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Heading & Subheading Handwriting Animation
        const chars = gsap.utils.toArray<HTMLElement>('.work-char');
        gsap.set(chars, { opacity: 0, filter: 'blur(10px)' });
        gsap.to(chars, {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: "top 80%"
            }
        });

        // Stacking Card Scroll Animation
        const cards = gsap.utils.toArray<HTMLElement>('.stacked-card');
        const cardInners = gsap.utils.toArray<HTMLElement>('.stacked-card-inner');

        if (cards.length === 0) return;

        // Set the sticky `top` for each card to create the stacked look.
        // We use a base 12vh so it doesn't stick directly to the very top edge,
        // plus the stagger offset to create the layered folders look.
        cards.forEach((card, idx) => {
            gsap.set(card, { top: `calc(12vh + ${idx * STACK_OFFSET}px)` });
        });

        // Framer/Sanjay Menon style Premium Stack Animation (Progressive)
        const totalCards = cards.length;
        
        cards.forEach((card, index) => {
            if (index === totalCards - 1) return; // last card stays untouched

            // The number of cards that will stack on top of THIS card
            const remainingCards = totalCards - 1 - index;
            
            // Progressive Animation:
            // The animation maps over the entire scroll distance from when the immediate NEXT card 
            // enters the screen, until the VERY LAST card reaches its sticky resting point.
            // Because we use ease: 'none', the intermediate states (when intermediate cards pin)
            // will perfectly align with intermediate scale/opacity values.
            ScrollTrigger.create({
                trigger: cards[index + 1],
                start: 'top bottom', // Start when immediate next card enters from bottom
                endTrigger: cards[totalCards - 1], // End relative to the LAST card in the stack
                end: `top calc(12vh + ${(totalCards - 1) * STACK_OFFSET}px)`, // End when last card hits its sticky point
                scrub: 0.5, // Fluid interpolation
                invalidateOnRefresh: true,
                animation: gsap.to(cardInners[index], {
                    scale: 1 - (remainingCards * 0.05),          // Card 1 goes to 0.90, Card 2 goes to 0.95
                    opacity: 1 - (remainingCards * 0.3),         // Progressive dimming (0.4, 0.7)
                    filter: `blur(${remainingCards * 2}px)`,     // Progressive depth of field (4px, 2px)
                    y: -(remainingCards * 15),                   // Progressive shift up to compress stack
                    ease: 'none',                                // Linear ease ensures it matches the scroll precisely
                }),
            });
        });
    }, { scope: sectionRef });

    return (
        <section id="work" ref={sectionRef} className="w-full bg-[#FAFAFA] py-16 md:py-24 relative">
            {/* Header Section */}
            <div className="w-full flex flex-col items-center text-center px-6 mb-12 md:mb-16">
                {/* Badge */}
                <div className="font-semibold text-zinc-500 font-satoshi uppercase text-sm flex items-center justify-center gap-3 mb-4">
                    <span className="text-[#0066FF] text-xl leading-none">✦</span> SELECTED WORK
                </div>
                
                {/* Main Heading */}
                <h2 className="text-[#1a1a1a] text-[2rem] md:text-[3.5rem] font-satoshi leading-[1.1] font-bold tracking-tight mb-4 flex flex-wrap justify-center max-w-4xl">
                    {"check out some of my work".split('').map((char, index) => (
                        <span key={`h-${index}`} className="work-char" style={{ whiteSpace: 'pre' }}>
                            {char}
                        </span>
                    ))}
                </h2>
                
                {/* Sub Heading */}
                <p className="text-zinc-500 text-sm md:text-lg font-medium leading-relaxed font-satoshi max-w-[600px] mx-auto flex flex-wrap justify-center">
                    {"A few products I've helped shape, and the thinking behind them.".split('').map((char, index) => (
                        <span key={`p-${index}`} className="work-char" style={{ whiteSpace: 'pre' }}>
                            {char}
                        </span>
                    ))}
                </p>
            </div>

            {/* Stacking Cards Container */}
            <div className="w-full relative flex flex-col px-4 md:px-4">
                {projects.map((project, idx) => (
                    <div
                        key={project.id}
                        className="stacked-card sticky w-full px-2 md:px-3"
                        style={{ 
                            top: 0,                  /* overridden by GSAP */
                            zIndex: idx + 1,
                            marginBottom: idx < projects.length - 1 ? '25vh' : '10vh',
                        }}
                    >
                        <div 
                            className="stacked-card-inner w-full h-200 md:rounded-2xl bg-[url('/blue_sky.avif')] bg-cover bg-center bg-no-repeat border border-white/25 shadow-2xl p-6 sm:p-8 md:p-10 overflow-hidden relative flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8"
                            style={{
                                willChange: 'transform, opacity, filter',
                                transformOrigin: 'top center',
                            }}
                        >
                            
                            {/* Ambient Glow Orbs */}
                            <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>

                            {/* Left Side Glass Card */}
                            <div className="relative z-10 w-full lg:w-1/2 bg-white/10 backdrop-blur-xl rounded-[28px] md:rounded-[32px] p-7 sm:p-9 md:p-10 border border-white/20 shadow-inner flex flex-col justify-between h-full max-h-[460px]">
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-sm font-semibold text-white shadow-sm">
                                            {project.number}
                                        </div>
                                        <span className="text-sm font-medium text-white/80 font-satoshi tracking-wide">{project.year}</span>
                                    </div>
                                    
                                    <h3 className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold font-satoshi text-white leading-[1.2] tracking-tight mb-5">
                                        {project.title}
                                    </h3>

                                    <div className="w-full h-px bg-white/20 mb-5"></div>

                                    <div className="flex flex-wrap gap-2.5 mb-6">
                                        {project.tags.map((tag, tIdx) => (
                                            <span key={tIdx} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-medium text-white/90">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-white/80 text-sm md:text-base font-satoshi leading-relaxed mb-6">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white font-medium text-sm backdrop-blur-md hover:bg-white/15 transition-colors cursor-default">
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shadow-sm">
                                            <Lock size={12} className="text-white" />
                                        </div>
                                        <span className="pr-1">Coming Soon</span>
                                    </div>
                                    
                                    <a
                                        href={project.link}
                                        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white text-zinc-900 font-semibold text-sm hover:bg-white/90 transition-all shadow-lg"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white shadow-inner">
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 ml-0.5"><path d="M8 5v14l11-7z"/></svg>
                                        </div>
                                        <span className="pr-1">View in Playstore</span>
                                    </a>
                                </div>
                            </div>

                            {/* Right Side Visual Phone/UI Mockup */}
                            <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center h-full max-h-[460px]">
                                {project.type === 'checkout' && (
                                    <div className="relative w-[260px] sm:w-[290px] md:w-[310px] bg-[#121212] rounded-[44px] p-2.5 shadow-2xl border-[4px] border-zinc-700/60 rotate-1 hover:rotate-0 transition-transform duration-500">
                                        {/* Dynamic Island */}
                                        <div className="w-24 h-3.5 bg-black rounded-full mx-auto mb-1.5 flex items-center justify-end px-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
                                        </div>

                                        {/* Screen Content */}
                                        <div className="bg-white rounded-[34px] p-3.5 text-zinc-900 font-satoshi overflow-hidden min-h-[400px] flex flex-col justify-between text-xs">
                                            {/* Screen Header */}
                                            <div>
                                                <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 mb-1.5 px-1">
                                                    <span>9:41</span>
                                                    <div className="flex gap-1"><span>📶</span><span>🔋</span></div>
                                                </div>
                                                <div className="flex justify-between items-center border-b border-zinc-100 pb-2 mb-2">
                                                    <div>
                                                        <p className="font-bold text-zinc-900 text-[11px]">Pay Now</p>
                                                        <p className="text-[9.5px] text-zinc-400">A-503 • Society Dues</p>
                                                    </div>
                                                    <span className="text-zinc-400 font-semibold cursor-pointer">✕</span>
                                                </div>

                                                {/* Amount Box */}
                                                <div className="bg-gradient-to-b from-amber-50/60 to-orange-50/30 rounded-xl p-2.5 text-center border border-amber-100 mb-2.5">
                                                    <p className="text-zinc-500 text-[9.5px] font-medium">Total Payable</p>
                                                    <h4 className="text-xl font-extrabold text-zinc-900 my-0.5">₹ 9,500<span className="text-xs font-normal text-zinc-500">.00</span></h4>
                                                    <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[8.5px] font-semibold px-2 py-0.5 rounded-full border border-emerald-100 mt-0.5">
                                                        <ShieldCheck size={9} />
                                                        <span>Secure Payment</span>
                                                    </div>
                                                </div>

                                                {/* Saved Cards */}
                                                <p className="font-semibold text-zinc-700 text-[9.5px] mb-1">Saved Cards</p>
                                                <div className="flex gap-2 overflow-x-auto pb-1.5">
                                                    <div className="w-32 shrink-0 bg-gradient-to-br from-rose-900 to-red-600 text-white rounded-xl p-2 shadow-md">
                                                        <div className="flex justify-between text-[8.5px] font-semibold opacity-90 mb-2">
                                                            <span>AXIS BANK</span>
                                                            <CreditCard size={11} />
                                                        </div>
                                                        <p className="font-mono text-[9px] tracking-wider mb-1.5">•••• 6355</p>
                                                        <p className="text-[7.5px] opacity-75">08/29 CREDIT</p>
                                                    </div>
                                                    <div className="w-32 shrink-0 bg-gradient-to-br from-zinc-800 to-zinc-950 text-white rounded-xl p-2 shadow-md">
                                                        <div className="flex justify-between text-[8.5px] font-semibold opacity-90 mb-2">
                                                            <span>HSBC</span>
                                                            <CreditCard size={11} />
                                                        </div>
                                                        <p className="font-mono text-[9px] tracking-wider mb-1.5">•••• 2190</p>
                                                        <p className="text-[7.5px] opacity-75">06/27 CREDIT</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Payment Methods List */}
                                            <div className="space-y-1 mt-1">
                                                <div className="flex items-center justify-between p-1.5 rounded-lg border border-blue-200 bg-blue-50/50">
                                                    <div className="flex items-center gap-1.5">
                                                        <Zap size={13} className="text-blue-600" />
                                                        <span className="font-semibold text-[10px] text-zinc-900">Pay with CRED UPI</span>
                                                    </div>
                                                    <div className="w-3 h-3 rounded-full border-2 border-blue-600 bg-blue-600 flex items-center justify-center">
                                                        <div className="w-1 h-1 rounded-full bg-white"></div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between p-1.5 rounded-lg border border-zinc-100 hover:bg-zinc-50">
                                                    <span className="font-medium text-zinc-700 text-[9.5px]">RuPay Credit Card on UPI</span>
                                                    <ChevronRight size={11} className="text-zinc-400" />
                                                </div>

                                                <div className="flex items-center justify-between p-1.5 rounded-lg border border-zinc-100 hover:bg-zinc-50">
                                                    <span className="font-medium text-zinc-700 text-[9.5px]">Credit / Debit Card</span>
                                                    <ChevronRight size={11} className="text-zinc-400" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {project.type === 'bills' && (
                                    <div className="relative w-full max-w-[380px] flex items-center justify-center">
                                        {/* Background Paper Electricity Bill */}
                                        <div className="absolute -left-4 top-2 w-[230px] sm:w-[250px] bg-white rounded-2xl p-3 shadow-xl border border-zinc-200 text-zinc-800 font-mono text-[9px] -rotate-6 opacity-90 backdrop-blur-sm">
                                            <div className="flex items-center gap-1 border-b border-zinc-200 pb-1.5 mb-1.5 font-bold text-zinc-900 text-[11px]">
                                                <Zap size={13} className="text-amber-500" />
                                                <span>ELECTRICITY BILL</span>
                                            </div>
                                            <div className="space-y-0.5 text-zinc-600">
                                                <div className="flex justify-between"><span>Consumer:</span><span className="font-semibold text-zinc-900">Anjaneya Kumar</span></div>
                                                <div className="flex justify-between"><span>Account:</span><span>3601 2568 7410</span></div>
                                                <div className="flex justify-between"><span>Due Date:</span><span className="text-rose-600 font-semibold">15 Apr 2026</span></div>
                                            </div>
                                            <div className="border-t border-dashed border-zinc-300 my-1.5 pt-1.5 flex justify-between font-bold text-zinc-900 text-[11px]">
                                                <span>Total Amount Due:</span>
                                                <span className="text-blue-600">₹ 2,450.75</span>
                                            </div>
                                        </div>

                                        {/* Foreground Phone Mockup */}
                                        <div className="relative z-20 w-[250px] sm:w-[270px] bg-[#121212] rounded-[44px] p-2.5 shadow-2xl border-[4px] border-zinc-700/60 rotate-2 hover:rotate-0 transition-transform duration-500">
                                            {/* Dynamic Island */}
                                            <div className="w-24 h-3.5 bg-black rounded-full mx-auto mb-1.5"></div>
                                            
                                            {/* Screen Content */}
                                            <div className="bg-white rounded-[34px] p-3.5 text-zinc-900 font-satoshi min-h-[390px] flex flex-col justify-between text-xs">
                                                <div>
                                                    <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 mb-1.5">
                                                        <span>9:41</span>
                                                        <div className="flex gap-1"><span>📶</span><span>🔋</span></div>
                                                    </div>
                                                    
                                                    <div className="text-center py-1 mb-1.5">
                                                        <h4 className="font-bold text-zinc-900 text-xs">Bills & Recharges</h4>
                                                        <p className="text-[9px] text-zinc-500">Tracked, organized, and always on time.</p>
                                                    </div>

                                                    <p className="font-bold text-zinc-900 text-[10px] mb-1.5">Your Household Bills</p>
                                                    
                                                    {/* Overdue Card */}
                                                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-2 mb-1.5 flex items-center justify-between">
                                                        <div>
                                                            <p className="font-bold text-zinc-900 text-[10px]">HSBC Bank Card</p>
                                                            <p className="text-[9.5px] font-bold text-rose-600">₹ 73,214.21</p>
                                                            <span className="text-[8px] text-rose-500 font-medium">Overdue by 2 days</span>
                                                        </div>
                                                        <button className="px-2.5 py-1 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-bold text-[9px] rounded-lg shadow-sm">
                                                            Pay Now
                                                        </button>
                                                    </div>

                                                    {/* Electricity Bill Card */}
                                                    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-2 mb-1.5 flex items-center justify-between">
                                                        <div>
                                                            <p className="font-bold text-zinc-900 text-[10px]">Electricity Bill</p>
                                                            <p className="text-[9.5px] font-bold text-zinc-800">₹ 2,450.75</p>
                                                            <span className="text-[8px] text-amber-600 font-medium">Due in 3 days</span>
                                                        </div>
                                                        <button className="px-2.5 py-1 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-bold text-[9px] rounded-lg shadow-sm">
                                                            Pay Now
                                                        </button>
                                                    </div>

                                                    {/* Gas Bill */}
                                                    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-2 flex items-center justify-between">
                                                        <div>
                                                            <p className="font-bold text-zinc-900 text-[10px]">Piped Gas</p>
                                                            <p className="text-[9.5px] font-bold text-zinc-800">₹ 980.12</p>
                                                            <span className="text-[8px] text-amber-600 font-medium">Due in 3 days</span>
                                                        </div>
                                                        <button className="px-2.5 py-1 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-bold text-[9px] rounded-lg shadow-sm">
                                                            Pay Now
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {project.type === 'ai' && (
                                    <div className="relative w-full max-w-[380px] bg-zinc-950/85 backdrop-blur-xl rounded-3xl border border-white/20 p-4 shadow-2xl text-white font-mono">
                                        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                                            <div className="flex items-center gap-2">
                                                <Bot size={16} className="text-cyan-400" />
                                                <span className="font-bold text-[11px] tracking-wider">AGENT_ORCHESTRATOR.TS</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                                <span className="text-[9px] text-emerald-400 font-sans font-semibold">STATUS: ACTIVE</span>
                                            </div>
                                        </div>

                                        {/* Workflow Nodes */}
                                        <div className="space-y-2.5 mb-3 text-xs">
                                            <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-2.5 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Sparkles size={13} className="text-cyan-400" />
                                                    <div>
                                                        <p className="font-semibold text-white text-[10.5px]">LLM Reasoning Agent</p>
                                                        <p className="text-[8.5px] text-white/50">Multi-step Plan Generation</p>
                                                    </div>
                                                </div>
                                                <span className="text-[8.5px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-500/30">99.4% Acc</span>
                                            </div>

                                            <div className="bg-white/5 border border-indigo-500/30 rounded-xl p-2.5 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Layers size={13} className="text-indigo-400" />
                                                    <div>
                                                        <p className="font-semibold text-white text-[10.5px]">Vector RAG Pipeline</p>
                                                        <p className="text-[8.5px] text-white/50">Semantic Context Retrieval</p>
                                                    </div>
                                                </div>
                                                <span className="text-[8.5px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-500/30">42ms Latency</span>
                                            </div>
                                        </div>

                                        {/* Terminal Output */}
                                        <div className="bg-black/70 rounded-xl p-2.5 border border-white/10 font-mono text-[9.5px] leading-relaxed text-zinc-300">
                                            <p className="text-emerald-400">✔ Agent task dispatched successfully.</p>
                                            <p className="text-zinc-500">&gt; Executing step 3/3: Dispatch API Payload...</p>
                                            <p className="text-cyan-300">&gt; Output: &#123; status: 200, executionTime: &quot;38ms&quot; &#125;</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Work;
