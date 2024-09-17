// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import mandala from './art.jpeg'; // Ensure the correct path to your image

function App() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [movingToNav, setMovingToNav] = useState(false);
  const [showHomepage, setShowHomepage] = useState(false);
  const [showTransitionText, setShowTransitionText] = useState(false);
  const [showDoubleTapText, setShowDoubleTapText] = useState(true); // Show double-tap text initially
  const [activeSection, setActiveSection] = useState('home'); // State to manage the active content

  // Handle double-click to trigger both transitions
  const handleDoubleClick = () => {
    setShowDoubleTapText(false); // Hide "Double tap on mandala" text when double-clicked
    setShowTransitionText(true); // Start "NDI is LIVE" text spotlight effect immediately
    setMovingToNav(true); // Start moving mandala art to navigation beside the "Home" button
    setTimeout(() => {
      setIsZoomed(true); // After the movement, consider the mandala in the navigation
      setMovingToNav(false);
      setTimeout(() => {
        setShowHomepage(true); // Show homepage immediately after text transition completes
        setShowTransitionText(false); // Ensure "NDI is LIVE" text hides after the transition
      }, 1700); // Duration of spotlight transition on text (2s)
    }, 2000); // Duration of the move animation (2s for smoother transition)
  };

  // Handle return functionality to go back to the mandala page
  const handleZoomOut = () => {
    setShowHomepage(false);
    setIsZoomed(false);
    setShowTransitionText(false);
    setShowDoubleTapText(true); // Show double-tap text again when returning
    setActiveSection('home'); // Reset to home section on returning
  };

  // Handle navigation clicks to change active section
  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  // Use effect to handle button animations on section change
  useEffect(() => {
    const buttons = document.querySelectorAll('.nav-links li');
    buttons.forEach((button) => {
      button.classList.remove('active-btn');
    });
    
    const activeButton = document.querySelector(`.nav-links li[data-section="${activeSection}"]`);
    if (activeButton) {
      activeButton.classList.add('active-btn');
    }
  }, [activeSection]);
  

  return (
    <div className={`App ${isZoomed ? 'zoomed' : ''}`}>
      {showHomepage ? (
        <div className="homepage">
          {/* Apple-like Navigation with Rotating Mandala Art */}
          <nav className="navbar">
            <div className="nav-left">
              <img
                src={mandala}
                alt="Return to Mandala"
                className="mandala-icon rotating" // Rotating mandala icon
                onClick={handleZoomOut} // Return to mandala view on click
              />
            </div>
            <ul className="nav-links">
              <li data-section="home" onClick={() => handleNavClick('home')}>Home</li>
              <li data-section="about" onClick={() => handleNavClick('about')}>About Us</li>
              <li data-section="mission" onClick={() => handleNavClick('mission')}>Our Mission</li>
              <li data-section="community" onClick={() => handleNavClick('community')}>Community</li>
              <li data-section="resources" onClick={() => handleNavClick('resources')}>Resources</li>
            </ul>
            <div className="nav-right">
              <button className="buy-now-btn">Join Us</button>
            </div>
          </nav>
          {/* Hero Section */}
          <section className="hero-section">
            <h1 className="hero-title">Welcome to NeuroDiverse India</h1>
            <p className="hero-subtitle animate-text">
              {activeSection === 'home' && 'a community where every mind is valued, understood, and celebrated.'}
              {activeSection === 'about' && 'Discover our story and how we are redefining the future for neurodivergent individuals across India.'}
              {activeSection === 'mission' && 'Empowering neurodivergent lives through awareness, education, advocacy, and unwavering support.'}
              {activeSection === 'community' && 'Join a vibrant community where neurodiverse voices come together to connect, learn, and thrive.'}
              {activeSection === 'resources' && 'Explore tools, guides, and expert insights tailored to help you navigate a neurodiverse world with confidence.'}
            </p>
          </section>
        </div>
      ) : (
        <>
          {showTransitionText && (
            <h1 className="transition-heading">NDI is LIVE</h1>
          )}
          {!showTransitionText && (
            <>
              <div className="dark-overlay"></div>
              {showDoubleTapText && <h1 className="intro-heading">Double tap on mandala</h1>}
              <img
                src={mandala}
                alt="NDI LIVE Mandala"
                className={`rotating-mandala ${movingToNav ? 'move-to-nav' : ''}`}
                onDoubleClick={handleDoubleClick} // Trigger both transitions on double-click
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
