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
    const ctx = gsap.context(() => {
      // Create a timeline that pins the section and scrubs
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%", // Pin for 2 viewports
          pin: true,
          scrub: 1
        }
      });

      // Initial state: Everything is clustered in the center and scaled down (0.5)
      // Since CSS has translate(-50%, -50%), we must use xPercent: -50, yPercent: -50 in GSAP to maintain centering while adding specific x/y values.
      
      gsap.set('.gallery-image-wrapper', {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        scale: 0.5
      });

      // Center image just scales up
      tl.to('.gallery-center', {
        scale: 1,
        ease: "power2.inOut"
      }, 0);

      // Top Left moves up and left, scales up
      tl.to('.gallery-tl', {
        x: "-28vw",
        y: "-22vh",
        scale: 1,
        ease: "power2.inOut"
      }, 0);

      // Top Right moves up and right, scales up
      tl.to('.gallery-tr', {
        x: "26vw",
        y: "-26vh",
        scale: 1,
        ease: "power2.inOut"
      }, 0);

      // Bottom Left moves down and left, scales up
      tl.to('.gallery-bl', {
        x: "-30vw",
        y: "28vh",
        scale: 1,
        ease: "power2.inOut"
      }, 0);

      // Bottom Right moves down and right, scales up
      tl.to('.gallery-br', {
        x: "28vw",
        y: "24vh",
        scale: 1,
        ease: "power2.inOut"
      }, 0);

    }, sectionRef);

    return () => ctx.revert();
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
