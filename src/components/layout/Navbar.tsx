
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useMode } from '@/context/ModeContext';
import { Linkedin, Settings, Info, Menu, X, FileEdit } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { mode } = useMode();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: null },
    { path: '/posts', label: 'Posts', icon: <FileEdit className="w-4 h-4" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
    { path: '/about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-8 py-4",
        scrolled ? "bg-white/90 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-semibold text-lg transition-opacity duration-200 hover:opacity-80"
        >
          <Linkedin className={cn(
            "h-6 w-6 transition-colors duration-300",
            mode === 'assisted' ? "text-assisted-DEFAULT" : "text-autonomous-DEFAULT"
          )} />
          <span>LinkedBoost</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-md transition-all duration-200",
                location.pathname === link.path 
                  ? "bg-secondary font-medium" 
                  : "hover:bg-secondary/60"
              )}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-secondary/60 transition-all duration-200 hover:bg-secondary"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-50 pt-20 bg-white flex flex-col items-center animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-2 px-5 py-4 w-full text-center justify-center transition-all duration-200",
                  location.pathname === link.path 
                    ? "bg-secondary font-medium" 
                    : "hover:bg-secondary/60"
                )}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
