import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import mandala from './art.jpeg'; // Ensure the correct path to your image

function App() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showHomepage, setShowHomepage] = useState(false);
  const [showDoubleTapText, setShowDoubleTapText] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [heroSubtitle, setHeroSubtitle] = useState('a community where every mind is valued, understood, and celebrated.');
  const [currentMessage, setCurrentMessage] = useState(''); // State to hold the current message to display
  const [showSpotlightText, setShowSpotlightText] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState([]);
  const animationRef = useRef(null); // Ref to manipulate the DOM element

  // Initial messages array
  const initialMessages = [
    "Unlock the Future of Inclusion",
    "A New Era Begins",
    "Discover the Hidden Potential",
    "Join the Movement",
    "Your Journey Starts Here",
    "Are You Ready to Rethink?",
    "How Will You Make a Difference?",
    "What's Missing in the Conversation?",
    "Something Extraordinary is Coming...",
    "Prepare to Be Inspired",
    "The Change Starts Now",
    "Connect with Kindred Spirits",
    "Be Part of the Revolution"
  ];

  // Repopulate messages when the list is empty
  useEffect(() => {
    if (remainingMessages.length === 0) {
      setRemainingMessages([...initialMessages]);
    }
  }, [remainingMessages.length]);

  // Function to reset animation by removing and re-adding the class
  const resetAnimation = () => {
    const element = animationRef.current;
    if (element) {
      element.classList.remove('spotlight-visible');
      // Force reflow
      void element.offsetWidth; // Force a reflow to reset the animation
      element.classList.add('spotlight-visible');
    }
  };

  // Function to cycle messages
  const cycleMessages = () => {
    setRemainingMessages((prevMessages) => {
      if (prevMessages.length === 0) {
        return [...initialMessages]; // Repopulate the list once it's empty
      }

      const newMessages = [...prevMessages];
      const nextMessage = newMessages.shift(); // Get the first message
      setCurrentMessage(nextMessage); // Set the current message
      setTimeout(() => {
        resetAnimation(); // Reset the animation for the next message after timeout
      }, 50); // Ensure the animation is reset after the DOM updates
      return newMessages; // Return the updated messages array
    });
  };

  // Cycle messages when the homepage is displayed
  useEffect(() => {
    if (showHomepage && !showSpotlightText) {
      cycleMessages(); // Immediately show the first message

      // Set an interval to continue showing messages
      const interval = setInterval(() => {
        cycleMessages();
      }, 4000); // Match the duration of the spotlight animation (7 seconds)

      return () => {
        clearInterval(interval); // Clear the interval on cleanup
      };
    }
  }, [showHomepage, showSpotlightText]);

  // Handle double-click to trigger transitions
  const handleDoubleClick = () => {
    setShowDoubleTapText(false);
    setShowSpotlightText(true); // Show the spotlight text after double-click

    // Hide the spotlight text after 5 seconds and proceed to homepage
    setTimeout(() => {
      setShowSpotlightText(false);
      setIsZoomed(true);
      setShowHomepage(true);
    }, 4000); // Duration of the spotlight effect (4 seconds)
  };

  // Handle return functionality to go back to the mandala page
  const handleZoomOut = () => {
    setShowHomepage(false);
    setIsZoomed(false);
    setShowSpotlightText(false);
    setShowDoubleTapText(true);
    setActiveSection('home'); // Reset to home section on returning
  };

  // Handle navigation clicks to change active section
  const handleNavClick = (section) => {
    setActiveSection(section);
    switch (section) {
      case 'home':
        setHeroSubtitle('a community where every mind is valued, understood, and celebrated.');
        break;
      case 'about':
        setHeroSubtitle('Discover our story and how we are redefining the future for neurodivergent individuals across India.');
        break;
      case 'mission':
        setHeroSubtitle('Empowering neurodivergent lives through awareness, education, advocacy, and unwavering support.');
        break;
      case 'community':
        setHeroSubtitle('Join a vibrant community where neurodiverse voices come together to connect, learn, and thrive.');
        break;
      case 'resources':
        setHeroSubtitle('Explore tools, guides, and expert insights tailored to help you navigate a neurodiverse world with confidence.');
        break;
      default:
        break;
    }
  };

  return (
    <div className={`App ${isZoomed ? 'zoomed' : ''}`}>
      {showHomepage ? (
        <div className="homepage">
          <nav className="navbar">
            <div className="nav-left">
              <img
                src={mandala}
                alt="Return to Mandala"
                className="mandala-icon rotating"
                onClick={handleZoomOut}
              />
            </div>
            <ul className="nav-links">
              <li onClick={() => handleNavClick('home')}>Home</li>
              <li onClick={() => handleNavClick('about')}>About Us</li>
              <li onClick={() => handleNavClick('mission')}>Our Mission</li>
              <li onClick={() => handleNavClick('community')}>Community</li>
              <li onClick={() => handleNavClick('resources')}>Resources</li>
            </ul>
            <div className="nav-right">
              <button className="buy-now-btn">Join Us</button>
            </div>
          </nav>
          <section className="hero-section">
            <h1 className="hero-title">Welcome to NeuroDiverse India</h1>
            <p className="hero-subtitle animate-text">{heroSubtitle}</p>
            <div
              ref={animationRef}
              className={`spotlight-message spotlight-visible`}
            >
              {currentMessage}
            </div>
          </section>
        </div>
      ) : (
        <>
          {showSpotlightText ? (
            <h1 className="transition-heading">What if everyone was understood?</h1>
          ) : (
            <>
              {showDoubleTapText && <h1 className="intro-heading">Double tap on mandala</h1>}
              <img
                src={mandala}
                alt="NDI LIVE Mandala"
                className={`rotating-mandala`}
                onDoubleClick={handleDoubleClick}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
