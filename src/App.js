import logo from './logo.svg';
import './App.css';
import mandala from './art.jpeg'; // Make sure to use the correct path

// src/App.js

import React from 'react';

function App() {
  return (
    <div className="App">
      <h1 className="intro-heading">NDI is LIVE</h1>
      <img src={mandala} alt="NDI LIVE Mandala" className="rotating-mandala" />
    </div>
  );
}
export default App;