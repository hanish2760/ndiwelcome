// src/App.js

import React, { useState } from 'react';
import './App.css';
import mandala from './art.jpeg'; // Ensure the correct path to your image

function App() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [movingToCorner, setMovingToCorner] = useState(false);
  const [showHomepage, setShowHomepage] = useState(false);
  const [showTransitionText, setShowTransitionText] = useState(false);
  const [showDoubleTapText, setShowDoubleTapText] = useState(true); // Show double-tap text initially

  // Handle double-click to trigger both transitions
  const handleDoubleClick = () => {
    setShowDoubleTapText(false); // Hide "Double tap on mandala" text when double-clicked
    setMovingToCorner(true);
    setShowTransitionText(true); // Start "NDI is LIVE" text spotlight effect
    setTimeout(() => {
      setIsZoomed(true); // After the movement, consider the mandala in the corner
      setMovingToCorner(false);
      setTimeout(() => {
        setShowHomepage(true); // Show homepage immediately after text transition completes
      }, 2500); // Duration of spotlight transition on text (5s)
    }, 2000); // Duration of the move animation (2s for smoother transition)
  };

  // Handle return functionality to go back to the mandala page
  const handleZoomOut = () => {
    setShowHomepage(false);
    setIsZoomed(false);
    setShowTransitionText(false);
    setShowDoubleTapText(true); // Show double-tap text again when returning
  };

  return (
    <div className={`App ${isZoomed ? 'zoomed' : ''}`}>
      {showHomepage ? (
        <div className="homepage">
          {/* Creative Button for Returning to Mandala View */}
          <div className="return-home-btn" onClick={handleZoomOut}>
            <img
              src={mandala}
              alt="Return to Mandala"
              className="mini-mandala"
            />
          </div>
          {/* Skeleton Homepage Design with Headings */}
          <section className="tab-heading">
            <h2>Home</h2>
          </section>
          <section className="tab-heading">
            <h2>About Us</h2>
          </section>
          <section className="tab-heading">
            <h2>Our Mission</h2>
          </section>
          <section className="tab-heading">
            <h2>Community</h2>
          </section>
          <section className="tab-heading">
            <h2>Resources</h2>
          </section>
        </div>
      ) : (
        <>
          {showTransitionText ? (
            <h1 className="transition-heading">NDI is LIVE</h1>
          ) : (
            <>
              <div className="dark-overlay"></div>
              {showDoubleTapText && <h1 className="intro-heading">Double tap on mandala</h1>}
              <img
                src={mandala}
                alt="NDI LIVE Mandala"
                className={`rotating-mandala ${movingToCorner ? 'move-to-corner' : ''}`}
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
