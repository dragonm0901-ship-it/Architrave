import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './AboutSection.css';

const AboutSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 992px)",
      isMobile: "(max-width: 991px)"
    }, (context) => {
      let { isMobile } = context.conditions;
      
      gsap.from('.about-block', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 95%" : "top 80%",
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="section about-section" id="about-section" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          <h2>ABOUT</h2>
          <div className="about-blocks-wrapper">
            <div className="about-block">
              <p>Since 2010, Architrave Architects has been at the forefront of modern architectural design. We specialize in creating high-end residential and commercial spaces that harmonize with their natural surroundings while pushing the boundaries of contemporary structure.</p>
            </div>
            <div className="about-block">
              <p>Our philosophy is simple: design for the human experience. By blending meticulous attention to detail with sustainable practices and innovative materiality, we transform visions into timeless landmarks that feel uniquely like home.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
