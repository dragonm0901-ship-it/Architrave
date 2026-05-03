import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectsSection.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Pacific Horizon Villa',
    location: 'Malibu, CA',
    category: 'Residential',
    year: '2023',
    description: 'A seamless integration of indoor and outdoor living, this residence features floor-to-ceiling glass walls that frame the Pacific horizon, utilizing sustainable timber and local stone.',
    image: 'https://cdn.prod.website-files.com/69f5a976715525ce3175cda8/69f5a978715525ce3175ce05_Contemporary%20House%20at%20Dawn_Dusk.jpeg',
    align: 'left'
  },
  {
    id: 2,
    title: 'The Industrial Sanctuary',
    location: 'Shoreditch, London',
    category: 'Mixed-Use',
    year: '2022',
    description: 'A transformation of a historic industrial warehouse into a light-filled sanctuary, combining raw structural elements with refined minimalist interiors and smart-glass technology.',
    image: 'https://cdn.prod.website-files.com/69f5a976715525ce3175cda8/69f5a978715525ce3175ce04_Modern%20Minimalist%20House%20with%20Garden.jpeg',
    align: 'right'
  },
  {
    id: 3,
    title: 'Tuscan Heritage Pavilion',
    location: 'Siena, Italy',
    category: 'Hospitality',
    year: '2024',
    description: 'Merging traditional Italian masonry with modern glass volumes, this retreat serves as a masterclass in restorative architecture within a protected heritage landscape.',
    image: 'https://cdn.prod.website-files.com/69f5a976715525ce3175cda8/69f5a978715525ce3175ce13_project-2-img.webp',
    align: 'left'
  }
];

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image Parallax Effect
      imageRefs.current.forEach((img) => {
        // Start the image shifted up
        gsap.set(img, { yPercent: -15 });
        
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // Fade up the info cards
      const infoCards = gsap.utils.toArray('.project-info');
      infoCards.forEach(card => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-section" id="projects-section" ref={containerRef}>
      <div className="projects-container">
        <h2 className="projects-title">PROJECTS</h2>
        <div className="project-list">
          {projects.map((project, index) => (
            <div key={project.id} className={`project-card ${project.align}`}>
              <div className="project-image-wrapper">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image"
                  ref={el => imageRefs.current[index] = el}
                />
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <div className="project-tags">
                  <span className="project-tag">{project.location}</span>
                  <div className="project-tag-dot"></div>
                  <span className="project-tag">{project.category}</span>
                  <div className="project-tag-dot"></div>
                  <span className="project-tag">{project.year}</span>
                </div>
                <p className="project-desc">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
