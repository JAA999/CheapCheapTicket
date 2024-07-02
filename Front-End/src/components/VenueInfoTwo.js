import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function VenueInfoTwo() {
    return (
    <div>
        <h2>The 2nd Annual Capital City Blues Festival</h2>
        <img src="https://heyaustin.com/wp-content/uploads/2015/05/bp_long_center_03-e1581877716911.jpg" className="img-fluid rounded" alt="..." style={{ 
                width: '25%', height: '25%', objectFit: 'cover', objectPosition: 'center' 
              }}/>
        <br></br>
        <span class="badge rounded-pill text-bg-secondary">Ticket Price <strong>$55.0 to $175.0</strong></span>
        <br></br>
        <br></br>
        <h6 className="inline">Artists: </h6><Link to={`/artists/artistspage/staticinstance6`} className="btn btn-primary" >Capital Ciites</Link>
        <br></br>
        <br></br>

        <p className="card-text">2024-10-19</p>
              <p className="card-text"><small className="text-body-secondary">Township Auditorium 1703 Taylor Street, Columbia, South Carolina</small></p>
              <p><strong>Genres: </strong> <Link to={'/genre/genrestaticinstance3'}>Pop</Link> </p>
    </div>
    )
}


export default VenueInfoTwo