import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#1c1c1c]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'} py-4`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#84dbef]"></div>
            <a href="#" className="text-sm font-bold text-white tracking-widest uppercase">
              Leshanie<span className="text-[#84dbef]">.</span>M
            </a>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-12">
            <a href="#about" className="text-white hover:text-[#84dbef] text-[10px] font-bold tracking-widest uppercase transition-colors">About</a>
            <a href="#projects" className="text-white hover:text-[#84dbef] text-[10px] font-bold tracking-widest uppercase transition-colors">Projects</a>
            <a href="#experience" className="text-white hover:text-[#84dbef] text-[10px] font-bold tracking-widest uppercase transition-colors">Experience</a>
            <a href="#contact" className="text-white hover:text-[#84dbef] text-[10px] font-bold tracking-widest uppercase transition-colors">Contact</a>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-8">

            {/* Hamburger Icon */}
            <button className="flex flex-col gap-1.5 focus:outline-none">
              <span className="w-8 h-0.5 bg-white block"></span>
              <span className="w-8 h-0.5 bg-[#84dbef] block"></span>
              <span className="w-6 h-0.5 bg-white block ml-auto"></span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
