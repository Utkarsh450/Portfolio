import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Content from './components/Content';
import WhatIDo from './components/WhatIDo';
import Work from './components/Work';
import SectionSeparator from './components/SectionSeparator';
import AboutMe from './components/AboutMe';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Resume from './components/Resume';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [currentView, setCurrentView] = useState<'home' | 'resume'>('home');
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis and sync with GSAP
  useEffect(() => {
    // Lenis Optimizations:
    // 1. autoRaf: false prevents double requestAnimationFrame cycles since we drive it via gsap.ticker
    // 2. lerp: 0.08 gives a buttery smooth momentum scroll
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.08,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  const getOffsetTop = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY - 30;
  };

  const scrollToPosition = (y: number) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(y, { duration: 1.2 });
    } else {
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleNavigate = (page: string) => {
    if (page === 'resume') {
      setCurrentView('resume');
      scrollToPosition(0);
    } else if (page === 'home') {
      setCurrentView('home');
      scrollToPosition(0);
    } else if (page === 'work') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          const y = getOffsetTop('work');
          scrollToPosition(y);
        }, 200);
      } else {
        const y = getOffsetTop('work');
        scrollToPosition(y);
      }
    } else if (page === 'about') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          const y = getOffsetTop('about');
          scrollToPosition(y);
        }, 200);
      } else {
        const y = getOffsetTop('about');
        scrollToPosition(y);
      }
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-[#FAFAFA]">
      <Navbar onNavigate={handleNavigate} activePage={currentView} />

      {currentView === 'resume' ? (
        <>
        <Resume onBack={() => handleNavigate('home')} />
        <Footer/>
        </>
      ) : (
        <>
          <Content />
          <WhatIDo />
          <SectionSeparator />
          <Work />
          <SectionSeparator />
          <AboutMe />
          <SectionSeparator />
          <Experience />
          
          {/* Gap and Separator before Footer */}
          <div className="py-16 md:py-24 bg-[#FAFAFA]">
            <SectionSeparator />
          </div>
          
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;