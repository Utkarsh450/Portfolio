import { useState } from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';
import WhatIDo from './components/WhatIDo';
import Work from './components/Work';
import SectionSeparator from './components/SectionSeparator';
import AboutMe from './components/AboutMe';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Resume from './components/Resume';

const App = () => {
  const [currentView, setCurrentView] = useState<'home' | 'resume'>('home');

  const getOffsetTop = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY - 30;
  };

  const handleNavigate = (page: string) => {
    if (page === 'resume') {
      setCurrentView('resume');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'home') {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'work') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          const y = getOffsetTop('work');
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 200);
      } else {
        const y = getOffsetTop('work');
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (page === 'about') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          const y = getOffsetTop('about');
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 200);
      } else {
        const y = getOffsetTop('about');
        window.scrollTo({ top: y, behavior: 'smooth' });
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