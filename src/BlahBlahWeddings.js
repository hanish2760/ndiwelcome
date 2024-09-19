import React from 'react';
import './BlahBlahWeddings.css'; // Importing the CSS for the weddings page
import { useNavigate } from 'react-router-dom'; // Importing the hook for navigation

import blahblah1 from './resources/blahblah1.jpeg';
import blahblah2 from './resources/blahblah2.jpeg';
import blahblah3 from './resources/blahblah3.jpeg';
import blahblah4 from './resources/blahblah4.jpeg';
import blahblah5 from './resources/blahblah5.jpeg';
import blahblah6 from './resources/blahblah6.jpeg';
import mandala from "./resources/mandala.jpeg"; // Updated path for images

const BlahBlahWeddings = () => {
  const navigate = useNavigate(); // Hook to navigate between routes

  // Handle return functionality to go back to the NDI homepage
  const homepage = () => {
    navigate('/'); // This will take the user to the NDI homepage
  };

  return (
    <div className="weddings-page">
      {/* Navigation Bar and Heading in the same line */}
      <header className="weddings-header">
        <div className="weddings-heading">Blah Blah Weddings..</div>
        <nav className="weddings-navbar">
          <ul className="nav-links">
            <li>Portfolio</li>
            <li>Services</li>
            <li>Rentals</li>
            <li>About</li>
            <li>Contact</li>
            <li>Blog</li>
            <li>Shop</li>
            <li className="mandala-icon-wrapper">
              <img
                src={mandala}
                alt="Return to Mandala"
                className="mandala-icon rotating"
                onClick={homepage} // Navigate back when mandala is clicked
              />
            </li>
          </ul>
        </nav>
      </header>

      {/* Portfolio Section */}
      <section className="portfolio-section">
        <div className="portfolio-grid">
          <div className="portfolio-item large-square">
            <img src={blahblah1} alt="Blah Blah Weddings 1" />
          </div>
          <div className="portfolio-item">
            <img src={blahblah2} alt="Blah Blah Weddings 2" />
          </div>
          <div className="portfolio-item">
            <img src={blahblah3} alt="Blah Blah Weddings 3" />
          </div>
          <div className="portfolio-item">
            <img src={blahblah4} alt="Blah Blah Weddings 4" />
          </div>
          <div className="portfolio-item">
            <img src={blahblah5} alt="Blah Blah Weddings 5" />
          </div>
          <div className="portfolio-item">
            <img src={blahblah6} alt="Blah Blah Weddings 6" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlahBlahWeddings;
