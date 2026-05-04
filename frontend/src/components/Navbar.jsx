import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 991);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 991);
    };

    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 1.5;
      setIsScrolledPastHero(window.scrollY > triggerPoint);
      if (window.scrollY > 50) {
        setIsMenuOpen(false); // Close menu on scroll
      }
    };

    const handleMouseMove = (e) => {
      if (e.clientY < 100) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Determine CSS classes based on state
  let navbarClass = "navbar";
  
  if (isScrolledPastHero) {
    if (isHovered || isMenuOpen || isMobileView) {
      navbarClass += " navbar-scrolled-visible"; 
    } else {
      navbarClass += " navbar-hidden"; 
    }
  } else {
    navbarClass += " navbar-top"; 
  }

  if (isMenuOpen) {
    navbarClass += " mobile-menu-open";
  }

  return (
    <nav className={navbarClass}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="/" className="logo-img-link">
            <img src="/logo-main.jpg" alt="Architrave Logo" className="navbar-logo" />
          </a>
        </div>
        
        <div className="navbar-links-desktop">
          <a href="#services-section" className="nav-link">SERVICES</a>
          <a href="#projects-section" className="nav-link">PROJECTS</a>
          <a href="#about-section" className="nav-link">ABOUT</a>
          <a href="#reviews-section" className="nav-link">REVIEWS</a>
          <a href="#gallery-section" className="nav-link">GALLERY</a>
          <a href="#contact-section" className="nav-btn">PARTNER WITH US</a>
        </div>

        <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-links">
          <a href="#services-section" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>SERVICES</a>
          <a href="#projects-section" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>PROJECTS</a>
          <a href="#about-section" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>ABOUT</a>
          <a href="#reviews-section" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>REVIEWS</a>
          <a href="#gallery-section" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>GALLERY</a>
          <a href="#contact-section" className="mobile-nav-btn" onClick={() => setIsMenuOpen(false)}>PARTNER WITH US</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
