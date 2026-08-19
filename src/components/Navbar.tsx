import { useState, useEffect } from 'react'
import { MoreHorizontal } from 'lucide-react'

interface NavbarProps {
  onNavigate?: (page: string) => void;
  activePage?: string;
}

const AnimatedNavLink = ({ text, onClick, isActive, isLogo = false }: { text: string, onClick: () => void, isActive?: boolean, isLogo?: boolean }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer whitespace-nowrap group ${
        isLogo 
          ? 'font-semibold text-sm tracking-tight font-satoshi uppercase text-zinc-900' 
          : `font-medium font-satoshi tracking-tighter text-[0.8rem] ${isActive ? 'text-[#0066FF] font-bold' : 'text-zinc-700'}`
      }`}
    >
      <div className="flex">
        {text.split('').map((char, i) => (
          <span 
            key={`primary-${i}`} 
            className="transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 0.025}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      <div className="absolute top-0 left-0 flex w-full h-full">
        {text.split('').map((char, i) => (
          <span 
            key={`secondary-${i}`} 
            className={`translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 text-[#0066FF]`}
            style={{ transitionDelay: `${i * 0.025}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
};

const Navbar = ({ onNavigate, activePage = 'home' }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always expand when at the very top
      if (currentScrollY < 50) {
        setIsScrolled(false);
      } 
      // Collapse when scrolling down
      else if (currentScrollY > lastScrollY) {
        setIsScrolled(true);
      } 
      // Expand when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="w-full p-2 fixed z-50 top-0 left-0 flex justify-center pointer-events-none">
        <div className='pointer-events-auto h-14 rounded-full mt-4 border border-zinc-100 flex items-center px-4 bg-zinc-300/40 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-sm'>
            
            {/* Left Side: Avatar and Name */}
            <div 
              onClick={() => handleNavClick('home')}
              className='flex items-center gap-2.5 shrink-0 cursor-pointer group'
            >
                <div className='w-8 h-8 rounded-full overflow-hidden border border-black/10 shadow-sm shrink-0 bg-zinc-100 flex items-center justify-center transition-transform group-hover:scale-105'>
                  <img className='w-full h-full object-cover object-top' src="./Image6.png" alt="Utkarsh" />
                </div>
                <AnimatedNavLink text="Utkarsh" onClick={() => handleNavClick('home')} isLogo={true} />
            </div>
            
            {/* Expanded Links */}
            <div className={`flex items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isScrolled ? 'max-w-0 opacity-0 gap-0' : 'max-w-[300px] opacity-100 gap-6 ml-8'}`}>
                <AnimatedNavLink 
                  text="Work" 
                  onClick={() => handleNavClick('work')} 
                  isActive={activePage === 'work'} 
                />
                <AnimatedNavLink 
                  text="About" 
                  onClick={() => handleNavClick('about')} 
                  isActive={activePage === 'about'} 
                />
                <AnimatedNavLink 
                  text="Resume" 
                  onClick={() => handleNavClick('resume')} 
                  isActive={activePage === 'resume'} 
                />
            </div>

            {/* Collapsed Menu Icon */}
            <div className={`flex items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isScrolled ? 'max-w-[50px] opacity-100 ml-4' : 'max-w-0 opacity-0'}`}>
                <button 
                  onClick={() => setIsScrolled(false)}
                  className="hover:bg-black/10 p-1.5 rounded-full transition-colors cursor-pointer text-black"
                  title="Expand menu"
                >
                    <MoreHorizontal size={20} className="shrink-0" />
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default Navbar