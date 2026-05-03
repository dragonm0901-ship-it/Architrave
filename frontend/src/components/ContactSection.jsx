import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Starting position for parallax
      gsap.set(imageRef.current, { yPercent: -15 });

      // Image Parallax
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      
      // Fade up the form section elements
      gsap.from('.contact-left h2, .contact-left p, .form-group, .submit-btn', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.contact-left',
          start: "top 80%"
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact-section" id="contact-section" ref={sectionRef}>
      <div className="contact-container">
        <div className="contact-left">
          <h2>PARTNER WITH US</h2>
          <p>
            If you're someone who's looking to bring a space to life, share a few details to help me reach out to you so we can discuss how to bring your vision to life.
          </p>
          
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">Your full name</label>
              <input type="text" id="name" name="name" />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Your email address</label>
              <input type="email" id="email" name="email" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">A little bit about your project</label>
              <textarea id="message" name="message" placeholder="Example Text"></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
        
        <div className="contact-right">
          <img 
            src="https://cdn.prod.website-files.com/69f5a976715525ce3175cda8/69f5a978715525ce3175ce1b_Modern%20White%20Building%20(1).jpeg" 
            alt="Modern White Building" 
            className="contact-image" 
            ref={imageRef}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
