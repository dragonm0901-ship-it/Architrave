import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesSection.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Architecture',
    description: 'We design buildings that are purposeful, enduring, and deeply connected to their surroundings.',
    list: ['Concept Design', 'Architectural Planning', '3D Visualization & Modeling', 'Construction Documentation'],
    image: 'https://cdn.prod.website-files.com/69f5a976715525ce3175cda8/69f5a978715525ce3175ce10_service-1-img.webp'
  },
  {
    id: '02',
    title: 'Interior Design',
    description: 'Beyond surface-level styling, we craft interiors that feel as good as they look.',
    list: ['Spatial Identity', 'Material & Finish Selection', 'Furniture & Lighting Design', 'Detail Development'],
    image: 'https://cdn.prod.website-files.com/69f5a976715525ce3175cda8/69f5a978715525ce3175ce11_service-2-img.webp'
  },
  {
    id: '03',
    title: 'Layout Planning',
    description: 'We organize environments around people, movement, and use, creating clarity, comfort, and adaptability.',
    list: ['Functional Zoning', 'Human-Centered Design', 'Circulation Strategy', 'Flexibility & Future Use'],
    image: 'https://cdn.prod.website-files.com/69f5a976715525ce3175cda8/69f5a978715525ce3175ce0c_service-3-img.webp'
  },
  {
    id: '04',
    title: 'Project Management',
    description: 'We ensure your vision is delivered on time, on budget, and to the highest standards.',
    list: ['Concept Design', 'Stakeholder Coordination', 'Quality Control', 'Budget & Timeline Tracking'],
    image: 'https://cdn.prod.website-files.com/69f5a976715525ce3175cda8/69f5a978715525ce3175ce0f_service-4-img.webp'
  }
];

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Force initial states directly via GSAP to prevent any CSS conflicts
      itemsRef.current.forEach((item, index) => {
        const wrapper = item.querySelector('.service-content-wrapper');
        const inner = item.querySelector('.service-content-inner');
        const image = item.querySelector('.service-image-container');
        const icon = item.querySelector('.icon-vertical');

        if (index === 0) {
          gsap.set(wrapper, { gridTemplateRows: "1fr" });
          gsap.set(inner, { paddingTop: 40, paddingBottom: 20 });
          gsap.set(image, { opacity: 1, scale: 1 });
          gsap.set(icon, { rotation: 90 });
        } else {
          gsap.set(wrapper, { gridTemplateRows: "0fr" });
          gsap.set(inner, { paddingTop: 0, paddingBottom: 0 });
          gsap.set(image, { opacity: 0, scale: 0.95 });
          gsap.set(icon, { rotation: 0 });
        }
      });

      // Create a pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Pin when section reaches top
          end: "+=400%", // Scroll distance (4 viewports for 4 items)
          pin: true,
          scrub: 1, // Smooth scrubbing
        }
      });

      // Add an initial pause so the first service sits on screen for a moment before transitioning
      tl.to({}, { duration: 0.5 });

      // The loop to create the sequence
      for (let i = 1; i < itemsRef.current.length; i++) {
        const prevItem = itemsRef.current[i - 1];
        const currentItem = itemsRef.current[i];

        // Selectors for previous item elements
        const prevWrapper = prevItem.querySelector('.service-content-wrapper');
        const prevInner = prevItem.querySelector('.service-content-inner');
        const prevImage = prevItem.querySelector('.service-image-container');
        const prevIcon = prevItem.querySelector('.icon-vertical');

        // Selectors for current item elements
        const currentWrapper = currentItem.querySelector('.service-content-wrapper');
        const currentInner = currentItem.querySelector('.service-content-inner');
        const currentImage = currentItem.querySelector('.service-image-container');
        const currentIcon = currentItem.querySelector('.icon-vertical');

        // Define a label for this step so animations happen simultaneously
        const label = `step${i}`;
        tl.add(label);

        // Close previous
        tl.to(prevWrapper, { gridTemplateRows: "0fr", duration: 1, ease: "power2.inOut" }, label);
        tl.to(prevInner, { paddingTop: 0, paddingBottom: 0, duration: 1, ease: "power2.inOut" }, label);
        tl.to(prevImage, { opacity: 0, scale: 0.95, duration: 0.8, ease: "power2.inOut" }, label);
        tl.to(prevIcon, { rotation: 0, duration: 1, ease: "power2.inOut" }, label);

        // Open current
        tl.to(currentWrapper, { gridTemplateRows: "1fr", duration: 1, ease: "power2.inOut" }, label);
        tl.to(currentInner, { paddingTop: 40, paddingBottom: 20, duration: 1, ease: "power2.inOut" }, label);
        tl.to(currentImage, { opacity: 1, scale: 1, duration: 1, ease: "power2.inOut" }, label);
        tl.to(currentIcon, { rotation: 90, duration: 1, ease: "power2.inOut" }, label);

        // Add a slight pause after opening so the user can read it before the next one starts
        if (i < itemsRef.current.length - 1) {
          tl.to({}, { duration: 0.5 }); 
        }
      }
      
      // Add a final pause so the last service stays visible before unpinning
      tl.to({}, { duration: 0.5 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-section" id="services-section" ref={sectionRef}>
      <div className="services-container">
        <div className="services-left">
          <h2>SERVICES</h2>
        </div>
        <div className="services-right">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="service-item"
              ref={el => itemsRef.current[index] = el}
            >
              <div className="service-header">
                <div className="service-header-left">
                  <span className="service-number">{service.id}</span>
                  <h3 className="service-title">{service.title}</h3>
                </div>
                <div className="service-icon">
                  <span className="icon-horizontal"></span>
                  <span className="icon-vertical"></span>
                </div>
              </div>
              
              <div className="service-content-wrapper">
                <div className="service-content-inner">
                  <div className="service-text">
                    <p className="service-desc">{service.description}</p>
                    <ul className="service-bullets">
                      {service.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="service-image-container">
                    <img src={service.image} alt={service.title} className="service-image" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
