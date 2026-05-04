import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' }); // 'loading', 'success', 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 992px)",
      isMobile: "(max-width: 991px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      gsap.set(imageRef.current, { yPercent: -15 });

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
      
      gsap.from('.contact-left h2, .contact-left p, .form-group, .submit-btn', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.contact-left',
          start: isMobile ? "top 95%" : "top 80%"
        }
      });
    });

    return () => mm.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatus({ 
          type: 'error', 
          message: data.errors ? data.errors[0].message : (data.message || 'Something went wrong. Please try again.') 
        });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Unable to connect to the server. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact-section" ref={sectionRef}>
      <div className="contact-container">
        <div className="contact-left">
          <h2>PARTNER WITH US</h2>
          <p>
            If you're someone who's looking to bring a space to life, share a few details to help me reach out to you so we can discuss how to bring your vision to life.
          </p>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your full name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Your email address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">A little bit about your project</label>
              <textarea 
                id="message" 
                name="message" 
                placeholder="Tell us about your vision..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'SENDING...' : 'SUBMIT'}
            </button>

            {status.message && (
              <div className={`form-status status-${status.type}`}>
                {status.message}
              </div>
            )}
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

