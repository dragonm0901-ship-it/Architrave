import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The hero section pins for 150% of the viewport.
      // We hide the navbar after that point.
      const triggerPoint = window.innerHeight * 1.5;
      setIsScrolledPastHero(window.scrollY > triggerPoint);
    };

    const handleMouseMove = (e) => {
      // If mouse is within the top 100px of the screen, reveal the navbar
      if (e.clientY < 100) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Determine CSS classes based on state
  let navbarClass = "navbar";
  
  if (isScrolledPastHero) {
    if (isHovered) {
      navbarClass += " navbar-scrolled-visible"; // White background, visible
    } else {
      navbarClass += " navbar-hidden"; // Hidden off screen
    }
  } else {
    navbarClass += " navbar-top"; // Transparent, visible
  }

  return (
    <nav className={navbarClass}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="/" className="logo-img-link">
            <img src="/logo-main.jpg" alt="Architrave Logo" className="navbar-logo" />
          </a>
        </div>
        <div className="navbar-links">
          <a href="#services-section" className="nav-link">SERVICES</a>
          <a href="#projects-section" className="nav-link">PROJECTS</a>
          <a href="#about-section" className="nav-link">ABOUT</a>
          <a href="#reviews-section" className="nav-link">REVIEWS</a>
          <a href="#gallery-section" className="nav-link">GALLERY</a>
          <a href="#contact-section" className="nav-btn">PARTNER WITH US</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
