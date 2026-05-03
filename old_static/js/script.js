document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuBtn = document.querySelector('.menu-button');
  const navMenu = document.querySelector('.nav-menu-wrapper');
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar-logo-left-container');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255,255,255,0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.backdropFilter = 'none';
    }
  });

  // Accordion
  const triggers = document.querySelectorAll('.accordion-trigger');
  triggers.forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      const content = document.getElementById(targetId);
      const isOpen = content.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-content').forEach(function(c) {
        c.classList.remove('open');
        c.style.height = '0';
        c.style.opacity = '0';
        c.style.overflow = 'hidden';
      });
      triggers.forEach(function(t) { t.classList.remove('active'); });

      if (!isOpen) {
        content.classList.add('open');
        content.style.height = content.scrollHeight + 'px';
        content.style.opacity = '1';
        content.style.overflow = 'visible';
        this.classList.add('active');
      }
    });
  });

  // Initialize first accordion open
  const firstContent = document.querySelector('.accordion-content.first');
  if (firstContent) {
    firstContent.style.height = firstContent.scrollHeight + 'px';
    firstContent.style.opacity = '1';
    firstContent.style.overflow = 'visible';
    firstContent.classList.add('open');
    const firstTrigger = document.querySelector('[data-target="service-1"]');
    if (firstTrigger) firstTrigger.classList.add('active');
  }

  // Testimonial slider
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  function showSlide(index) {
    slides.forEach(function(s, i) {
      s.classList.remove('active');
      if (i === index) s.classList.add('active');
    });
  }

  if (leftArrow) {
    leftArrow.addEventListener('click', function() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }
  if (rightArrow) {
    rightArrow.addEventListener('click', function() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }

  // Intersection Observer for animations
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Image overlays
        if (entry.target.classList.contains('project-thumbnail') || entry.target.classList.contains('floating-image-wrapper')) {
          const overlay = entry.target.querySelector('.image-overlay');
          if (overlay) overlay.style.width = '100%';
        }
        // Hero overlay blocks
        if (entry.target.classList.contains('hero-images-wrapper')) {
          const leftBlock = entry.target.querySelector('.left-overlay-block');
          const rightBlock = entry.target.querySelector('.right-overlay-block');
          if (leftBlock) leftBlock.style.transform = 'translateX(0%)';
          if (rightBlock) rightBlock.style.transform = 'translateX(0%)';
        }
        // Fade in elements
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe project thumbnails for overlay animation
  document.querySelectorAll('.project-thumbnail').forEach(function(el) {
    el.style.opacity = '1';
    observer.observe(el);
  });

  // Observe hero
  const heroWrapper = document.querySelector('.hero-images-wrapper');
  if (heroWrapper) {
    const leftBlock = heroWrapper.querySelector('.left-overlay-block');
    const rightBlock = heroWrapper.querySelector('.right-overlay-block');
    if (leftBlock) {
      leftBlock.style.transition = 'transform 1.2s cubic-bezier(.785,.135,.15,.86)';
    }
    if (rightBlock) {
      rightBlock.style.transition = 'transform 1.2s cubic-bezier(.785,.135,.15,.86)';
    }
    observer.observe(heroWrapper);
  }

  // Observe stats, logos, gallery images for fade-in
  document.querySelectorAll('.stat-wrapper, .logo-wrapper, .gallery-image, .about-block, .service-bullet-point').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          if (navMenu) navMenu.classList.remove('active');
        }
      }
    });
  });
});
