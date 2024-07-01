import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Venue from './components/Venue';
import Genre from './components/Genre';
import VenueInfo from './components/VenueInfo';
import Artists from './components/Artists';
import ArtistsPage from './components/ArtistsPage';
import './App.css';
import ArtistsPageStaticOne from './components/ArtistsPageStaticOne';
import ArtistsPageStaticTwo from './components/ArtistsPageStaticTwo';
import ArtistsPageStaticThree from './components/ArtistsPageStaticThree';
import ArtistsPageStaticFour from './components/ArtistsPageStaticFour';
import ArtistsPageStaticFive from './components/ArtistsPageStaticFive';
import ArtistsPageStaticSix from './components/ArtistsPageStaticSix';


import GenreInstanceOne from './components/GenreInstanceOne';
import GenreInstanceTwo from './components/GenreInstanceTwo';
import GenreInstanceThree from './components/GenreInstanceThree';




function App() {
  return (
    <Router>
      <div className="App">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">
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
          <Route path="/artists/artistspage/staticinstance1" element={<ArtistsPageStaticOne />} />
          <Route path="/artists/artistspage/staticinstance2" element={<ArtistsPageStaticTwo />} />
          <Route path="/artists/artistspage/staticinstance3" element={<ArtistsPageStaticThree />} />
          <Route path="/artists/artistspage/staticinstance4" element={<ArtistsPageStaticFour />} />
          <Route path="/artists/artistspage/staticinstance5" element={<ArtistsPageStaticFive />} />
          <Route path="/artists/artistspage/staticinstance6" element={<ArtistsPageStaticSix />} />

          <Route path="/artists/artistspage/:artistsId" element={<ArtistsPage />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/venueinfo" element={<VenueInfo />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/genre/genrestaticinstance1" element={<GenreInstanceOne/>}/>
          <Route path="/genre/genrestaticinstance2" element={<GenreInstanceTwo/>}/>
          <Route path="/genre/genrestaticinstance3" element={<GenreInstanceThree/>}/>



        </Routes>
      </div>
    </Router>
  );
}

export default App;