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
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="/home">
              {/* <img src="chick.png" alt="Logo" width="40" height="40" class="d-inline-block align-text-top"></img> */}
              CheapCheapTickets</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/about">About</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/Venue">Venues</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/Artists">Artists</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/Genre">Genre</a>
                </li>
              </ul>
            </div>
          </div>
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