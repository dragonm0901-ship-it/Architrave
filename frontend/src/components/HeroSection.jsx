import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const skyRef = useRef(null);
  const houseRef = useRef(null);
  const charRefs = useRef([]);
  const titleText = "ARCHITRAVE";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      gsap.from(houseRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      });

      // Pin the hero section and animate the text rising up
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=150%", // Scroll duration for the pinning effect
          pin: true,
          scrub: 1 // Smooth scrubbing
        }
      });

      // Text starts hidden and lifts fast, then slows down at the end.
      // We stagger from the "edges" so the outer letters move first, creating a wavy effect.
      tl.to(charRefs.current, {
        y: 0, 
        opacity: 0.6, // Animating to the desired visible opacity
        ease: "power3.out", 
        duration: 0.7,
        stagger: {
          each: 0.05,
          from: "edges" 
        }
      }, 0);

      // Slight parallax for the house and sky while pinned.
      tl.to(houseRef.current, {
        scale: 1.05,
        transformOrigin: "bottom center",
        ease: "none",
        duration: 1
      }, 0);

      tl.to(skyRef.current, {
        yPercent: 10,
        ease: "none",
        duration: 1
      }, 0);

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-container">
        <div className="hero-sky-layer" ref={skyRef}></div>
        <div className="hero-text-layer">
          <h1 className="hero-bg-title">
            {titleText.split('').map((char, index) => (
              <span 
                key={index} 
                ref={el => charRefs.current[index] = el}
                className="hero-char"
              >
                {char}
              </span>
            ))}
          </h1>
        </div>
        <div className="hero-house-layer" ref={houseRef}></div>
      </div>
    </section>
  );
};

export default HeroSection;
