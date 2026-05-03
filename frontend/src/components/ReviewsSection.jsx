import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ReviewsSection.css';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    id: 1,
    text: "Architrave Architects completely transformed our vision into a breathtaking reality. Their attention to detail and understanding of space is unmatched in the industry.",
    author: "Elena Rodriguez",
    role: "Homeowner, Coastal Villa"
  },
  {
    id: 2,
    text: "Working with this team was seamless from concept to completion. They listened to our needs and delivered a minimalist masterpiece that feels like home.",
    author: "Marcus Chen",
    role: "CEO, TechFlow HQ"
  },
  {
    id: 3,
    text: "The interior design choices were impeccable. Every material, every texture feels deliberate and harmonious. Truly a top-tier design agency.",
    author: "Sarah Jenkins",
    role: "Founder, Bloom Studios"
  },
  {
    id: 4,
    text: "Their project management kept everything on time and under budget without compromising a single ounce of aesthetic quality. Highly recommended.",
    author: "David Althaus",
    role: "Property Developer"
  }
];

const ReviewsSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 60}%`, 
          pin: true,
          scrub: 0.3,
        }
      });

      cards.forEach((card, i) => {
        if (!card) return;

        // Slide card in
        if (i > 0) {
          tl.fromTo(card, 
            { yPercent: 100 }, 
            { 
              yPercent: 0, 
              ease: "power3.out",
              duration: 1
            }, 
            i
          );
        }

        // Reveal words stagger
        const words = card.querySelectorAll('.reveal-word');
        tl.fromTo(words, 
          { yPercent: 100, opacity: 0 },
          { 
            yPercent: 0, 
            opacity: 1,
            stagger: 0.02, 
            duration: 0.6, 
            ease: "power2.out" 
          }, 
          i + 0.1 // Slight offset after card start
        );

        // Hide previous card
        if (i > 0) {
          tl.to(cards[i-1], {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
          }, i);
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderSplitText = (text) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word-wrapper">
        <span className="reveal-word">{word}</span>
        <span className="space">&nbsp;</span>
      </span>
    ));
  };

  return (
    <section className="reviews-section" id="reviews-section" ref={sectionRef}>
      <div className="reviews-header-sticky">
        <h2>TESTIMONIALS</h2>
      </div>
      
      <div className="reviews-stack-container">
        {reviews.map((review, index) => (
          <div 
            className="review-card-wide" 
            key={review.id}
            ref={el => cardsRef.current[index] = el}
            style={{ backgroundColor: "#ffffff", zIndex: index + 1 }}
          >
            <div className="review-card-inner">
              <div className="review-quote-large">"</div>
              <p className="review-text-large">
                {renderSplitText(review.text)}
              </p>
              <div className="review-meta">
                <h4 className="review-author-name">{review.author}</h4>
                <p className="review-author-role">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
