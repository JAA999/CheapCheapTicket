import React from 'react';

function VenueInfoThree() {
    return (
    <div>
        <h2>Broccoli City Festival 2-day Ticket (7/27-7/28)</h2>
        <img src="https://footballgroundguide.com/wp-content/uploads/2021/03/DC-Uniteds-Audi-Field.jpg" className="img-fluid rounded" alt="..." style={{ 
                width: '25%', height: '25%', objectFit: 'cover', objectPosition: 'center' 
              }}/>
        <br></br>
        <span class="badge rounded-pill text-bg-secondary">Ticket Price <strong>$169.5 to $1069.5</strong></span>
        <br></br>
        <br></br>
        <h6 className="inline">Artists: </h6> <a href="#" className="btn btn-primary">Gunna</a>
        <br></br>
        <br></br>

        <p className="card-text">2024-07-27</p>
              <p className="card-text"><small className="text-body-secondary">Audi Field 100 Potomac Ave. SW, Washington, District of Columbia</small></p>
              <p><strong>Genres: </strong> <a href="#">Hip-Hop/Pop</a> </p>
    </div>
    )
}


export default VenueInfoThree