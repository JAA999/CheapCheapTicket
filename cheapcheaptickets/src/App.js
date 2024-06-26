import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Venue from './components/Venue';
import Artists from './components/Artists';
import Genre from './components/Genre';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/artists">Artists</Link></li>
            <li><Link to="/venue">Venue</Link></li>
            <li><Link to="/genre">Genre</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/genre" element={<Genre />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;