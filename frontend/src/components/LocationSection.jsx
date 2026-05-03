import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LocationSection.css';

gsap.registerPlugin(ScrollTrigger);

const LocationSection = () => {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const leftRef = useRef(null);
  const floatCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation for the whole section
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Map parallax effect
      gsap.to(mapRef.current, {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Left panel slide in
      gsap.from(leftRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%"
        }
      });

      // Floating card animation
      gsap.from(floatCardRef.current, {
        y: 150,
        rotate: 3,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%"
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="location-section" ref={sectionRef}>
      <div className="map-background" ref={mapRef}>
        {/* The new generated architectural map image */}
        <img 
          src="/map-bg.png" 
          alt="Architectural Map" 
          className="map-image-content"
        />
        <div className="map-overlay"></div>
        
        {/* Strategic Pins */}
        <div className="map-pin pin-main" style={{ top: '48%', left: '52%' }}></div>
        <div className="map-pin pin-sub" style={{ top: '42%', left: '46%' }}></div>
      </div>

      <div className="location-content">
        <div className="location-left" ref={leftRef}>
          <div className="location-panel">
            <h2 className="location-main-title">Our Studios</h2>
            
            <div className="location-card">
              <h3 className="location-name">Studio London</h3>
              <div className="location-detail">
                <i className="icon-map-pin"></i>
                <p>24 Berkeley Square, Mayfair,<br/>London W1J 6HE, United Kingdom</p>
              </div>
              <div className="location-detail">
                <i className="icon-phone"></i>
                <p>+44 20 7946 0123</p>
              </div>
              <button className="location-cta">Request an appointment</button>
            </div>

            <div className="location-card">
              <h3 className="location-name">Studio New York</h3>
              <div className="location-detail">
                <i className="icon-map-pin"></i>
                <p>45 East 20th Street, Flatiron District,<br/>New York, NY 10003, USA</p>
              </div>
              <div className="location-detail">
                <i className="icon-phone"></i>
                <p>+1 212 555 0198</p>
              </div>
              <button className="location-cta">Contact our US team</button>
            </div>
          </div>
        </div>

        <div className="location-float-card" ref={floatCardRef}>
          <div className="float-card-img">
            <img src="https://cdn.prod.website-files.com/69f5a976715525ce3175cda8/69f5a978715525ce3175ce0b_hero-fg.webp" alt="The Mayfair Residence" />
          </div>
          <div className="float-card-content">
            <h3>The Mayfair Residence</h3>
            <div className="float-card-button">
              <span>View Case Study</span>
              <div className="arrow-icon">→</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
