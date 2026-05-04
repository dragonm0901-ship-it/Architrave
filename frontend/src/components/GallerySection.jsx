import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GallerySection.css';
import gallery1 from '../assets/images/gallery_1_center_1777865420748.png';
import gallery2 from '../assets/images/gallery_2_tl_1777865449758.png';
import gallery3 from '../assets/images/gallery_3_tr_1777865476721.png';
import gallery4 from '../assets/images/gallery_4_bl_1777865505030.png';
import gallery5 from '../assets/images/gallery_5_br_1777865535850.png';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { className: 'gallery-center', src: gallery1, alt: 'Center Image' },
  { className: 'gallery-tl', src: gallery2, alt: 'Top Left Image' },
  { className: 'gallery-tr', src: gallery3, alt: 'Top Right Image' },
  { className: 'gallery-bl', src: gallery4, alt: 'Bottom Left Image' },
  { className: 'gallery-br', src: gallery5, alt: 'Bottom Right Image' },
];

const GallerySection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 992px)",
      isMobile: "(max-width: 991px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1.5, // Slightly more lag for smoothness
          invalidateOnRefresh: true
        }
      });

      // Initial state: Everything is clustered in the center and scaled down (0.5)
      gsap.set('.gallery-image-wrapper', {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        scale: 0.5
      });

      // Background text initial state: Visible and at the top for both Desktop and Mobile
      gsap.set('.gallery-bg-text', {
        y: -window.innerHeight * 0.35, // Positioned at the top
        opacity: 1
      });

      if (isMobile) {
        gsap.set('.gallery-center', { scale: 1 });
      }

      // Animate background text to center: Faster slide and earlier fade-out
      tl.to('.gallery-bg-text', {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      }, 0);

      // Fade out earlier
      tl.to('.gallery-bg-text', {
        opacity: 0,
        duration: 0.2,
        ease: "power1.inOut"
      }, 0.3);

      tl.to('.gallery-center', {
        scale: isMobile ? 0.5 : 1,
        ease: "power2.inOut"
      }, 0);

      // Top Left
      tl.to('.gallery-tl', {
        x: isMobile ? "-25vw" : "-28vw",
        y: isMobile ? "-15vh" : "-22vh",
        scale: 1,
        ease: "power2.inOut"
      }, 0);

      // Top Right
      tl.to('.gallery-tr', {
        x: isMobile ? "25vw" : "26vw",
        y: isMobile ? "-20vh" : "-26vh",
        scale: 1,
        ease: "power2.inOut"
      }, 0);

      // Bottom Left
      tl.to('.gallery-bl', {
        x: isMobile ? "-25vw" : "-30vw",
        y: isMobile ? "20vh" : "28vh",
        scale: 1,
        ease: "power2.inOut"
      }, 0);

      // Bottom Right
      tl.to('.gallery-br', {
        x: isMobile ? "25vw" : "28vw",
        y: isMobile ? "18vh" : "24vh",
        scale: 1,
        ease: "power2.inOut"
      }, 0);
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="gallery-section" id="gallery-section" ref={sectionRef}>
      <div className="gallery-bg-text-wrapper">
        <h2 className="gallery-bg-text">GALLERY</h2>
      </div>
      
      <div className="gallery-images-container">
        {images.map((img, index) => (
          <div key={index} className={`gallery-image-wrapper ${img.className}`}>
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
