import Navbar from './components/Navbar'
import Content from './components/Content'
import WhatIDo from './components/WhatIDo';
import Work from './components/Work';
import SectionSeparator from './components/SectionSeparator';
import AboutMe from './components/AboutMe';
import Experience from './components/Experience';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="w-full min-h-screen relative">
     
      <Navbar/>
      <Content/>
      {/* <SectionSeparator /> */}
      <WhatIDo/>
      <SectionSeparator />
      <Work/>
      <SectionSeparator />
      <AboutMe/>
      <SectionSeparator />
      <Experience/>
      
      {/* Gap and Separator before Footer */}
      <div className="py-16 md:py-24 bg-[#FAFAFA]">
        <SectionSeparator />
      </div>
      
      <Footer />
   
    </div>
  )
}

export default App