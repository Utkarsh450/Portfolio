import React, { useState, useEffect } from 'react'
import { MoreHorizontal } from 'lucide-react'

const Navbar = () => {
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

  return (
    <div className="w-full p-2 fixed z-50 top-0 left-0 flex justify-center pointer-events-none">
        <div className='pointer-events-auto h-12 rounded-full mt-4 border border-zinc-100 flex items-center px-4 bg-[#9FCCF7] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-sm'>
            
            {/* Left Side: Avatar and Name (User's version) */}
            <div className='flex items-center gap-2 shrink-0 cursor-pointer'>
                <div className='w-4 h-4 rounded-full bg-zinc-50'></div>
                <div className='font-medium text-md font-satoshi uppercase'>Utkarsh</div>
            </div>
            
            {/* Expanded Links (User's version) */}
            <div className={`flex items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isScrolled ? 'max-w-0 opacity-0 gap-0' : 'max-w-[300px] opacity-100 gap-6 ml-8'}`}>
                <div className='font-medium font-satoshi tracking-tighter text-[0.9rem] cursor-pointer hover:opacity-70 whitespace-nowrap transition-opacity'>Work</div>
                <div className='font-medium font-satoshi tracking-tighter text-[0.9rem] cursor-pointer hover:opacity-70 whitespace-nowrap transition-opacity'>About</div>
                <div className='font-medium font-satoshi tracking-tighter text-[0.9rem] cursor-pointer hover:opacity-70 whitespace-nowrap transition-opacity'>Resume</div>
            </div>

            {/* Collapsed Menu Icon */}
            <div className={`flex items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isScrolled ? 'max-w-[50px] opacity-100 ml-4' : 'max-w-0 opacity-0'}`}>
                <button className="hover:bg-black/10 p-1 rounded-full transition-colors cursor-pointer text-black">
                    <MoreHorizontal size={20} className="shrink-0" />
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default Navbar