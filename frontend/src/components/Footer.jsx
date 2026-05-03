import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-brand-area">
          <img src="/logo-main.jpg" alt="Architrave Logo" className="footer-logo" />
        </div>
        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-list">
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#reviews">Reviews</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-list">
              <li><a href="#">Style guide</a></li>
              <li><a href="#">Licenses</a></li>
              <li><a href="#">Changelog</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-list">
              <li><a href="mailto:hi@architrave.com">hi@architrave.com</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>
          
          <div className="footer-col newsletter-col">
            <h4 className="footer-title">Newsletter</h4>
            <div className="newsletter-form">
              <div className="input-wrapper">
                <input type="email" placeholder="Your email address" />
              </div>
              <button className="submit-btn">SUBMIT</button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
          </div>
          <div className="footer-bottom-right">
            <p>Created by <a href="https://sagarluiteldev.vercel.app/" target="_blank" rel="noopener noreferrer" className="creator-link">Sagar Luitel</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
