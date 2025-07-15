import React from 'react';
import './Packages.css';
import Nav2 from '../Nav/Nav2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faLinkedinIn, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faComments, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Packages = () => {
  return (
    <div className="packages-page">
      {/* Navigation */}
      <Nav2 />

      {/* Pricing Header */}
      <header className="pricing-header">
        <h1>The Perfect Plan for Your Driving Journey</h1>
        <p>Our transparent pricing makes it easy to find a plan that works within your financial constraints.</p>
      </header>

      {/* Pricing Cards Container */}
      <div className="pricing-container">
        {/* Basic Package */}
        <div className="pricing-card">
          <div className="card-header">
            <h3>Basic</h3>
            <div className="price">
              <span className="amount">$99</span>
              <span className="period">/course</span>
            </div>
            <p className="referral">Up to $50 referral bonus</p>
          </div>
          
          <div className="card-content">
            <p className="includes">Includes:</p>
            <ul className="features-list">
              <li>
                <FontAwesomeIcon icon={faCheck} className="check-icon" />
                <span>5 Hours of driving lessons</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} className="check-icon" />
                <span>Basic theory materials</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} className="check-icon" />
                <span>Core platform features</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Standard Package - Recommended */}
        <div className="pricing-card recommended">
          <div className="card-header">
            <h3>Standard</h3>
            <div className="price">
              <span className="amount">$350</span>
              <span className="period">/course</span>
            </div>
            <p className="referral">Up to $100 referral bonus</p>
          </div>
          
          <div className="card-content">
            <p className="package-intro">Everything in Basic, Plus:</p>
            <ul className="features-list">
              <li>
                <FontAwesomeIcon icon={faCheck} className="check-icon" />
                <span>10 Hours of driving lessons</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} className="check-icon" />
                <span>Advanced theory training</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} className="check-icon" />
                <span>Mock driving tests</span>
              </li>
            </ul>
          </div>
          
          <div className="recommend-badge">Recommended</div>
        </div>

        {/* Premium Package */}
        <div className="pricing-card">
          <div className="card-header">
            <h3>Premium</h3>
            <div className="price">
              <span className="amount">$750</span>
              <span className="period">/course</span>
            </div>
            <p className="referral">Up to $150 referral bonus</p>
          </div>
          
          <div className="card-content">
            <p className="package-intro">Everything in Standard, Plus:</p>
            <ul className="features-list">
              <li>
                <FontAwesomeIcon icon={faCheck} className="check-icon" />
                <span>20 Hours of driving lessons</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} className="check-icon" />
                <span>Premium 1-on-1 instructor</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} className="check-icon" />
                <span>Guaranteed test booking</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="pricing-cta">
        <div className="cta-left">
          <h3>Get It Fast to Lock In Special Price</h3>
        </div>
        <div className="cta-right">
          <button className="book-demo-btn">Book Demo Lesson Now!</button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="driving-footer">
        <div className="footer-container">
          {/* Contact Section */}
          <div className="footer-contact">
            <div className="contact-item">
              <FontAwesomeIcon icon={faComments} />
              <span>Chat With Us</span>
            </div>
            
            <div className="contact-item">
              <FontAwesomeIcon icon={faPhone} />
              <span>1 (555) 123-4567</span>
            </div>
            
            <div className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>info@drivemaster.com</span>
            </div>
          </div>

          {/* Footer Columns */}
          <div className="footer-columns">
            {/* Services Column */}
            <div className="footer-column">
              <h3>Services</h3>
              <ul>
                <li><a href="#">Beginner Lessons</a></li>
                <li><a href="#">Advanced Training</a></li>
                <li><a href="#">Defensive Driving</a></li>
                <li><a href="#">Senior Refreshers</a></li>
                <li><a href="#">License Test Prep</a></li>
                <li><a href="#">International Drivers</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Our Instructors</a></li>
                <li><a href="#">Student Stories</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Press</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="footer-column">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Driving Tips</a></li>
                <li><a href="#">Road Rules</a></li>
                <li><a href="#">Student Reviews</a></li>
                <li><a href="#">Affiliate Program</a></li>
                <li><a href="#">School Partners</a></li>
              </ul>
            </div>

            {/* Social Media Icons */}
            <div className="footer-social">
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faYoutube} /></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <img src="/logo-small.png" alt="Drive Master" className="footer-logo" />
            <span>Powered by Drive Master Academy</span>
          </div>
          <div className="footer-legal">
            <a href="#">Book Your Lesson Today</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Packages;