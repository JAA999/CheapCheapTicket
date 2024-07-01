import React from 'react';

function VenueInfo() {
    return (
    <div>
        <h2>Hy-Vee INDYCAR Sunday Race + Post Malone & Kelsea Ballerini</h2>
        <img src="https://workingonmyredneck.com/wp-content/uploads/2021/07/iowa-speedway.jpeg" className="img-fluid rounded" alt="..." style={{ 
                width: '25%', height: '25%', objectFit: 'cover', objectPosition: 'center' 
              }}/>
        <br></br>
        <span class="badge rounded-pill text-bg-secondary">Ticket Price <strong>$75.0 to $1000</strong></span>
        <br></br>
        <br></br>
        <h6 className="inline">Artist(s): </h6> <a href="#" className="btn btn-primary">Kelsea Ballerini</a>
        <br></br>
        <br></br>

        <p className="card-text">2024-07-14</p>
              <p className="card-text"><small className="text-body-secondary">Iowa Speedway 3333 Rusty Wallace Dr., Newton, Iowa</small></p>
              <p><strong>Genres: </strong> <a href="#">Country</a> </p>
    </div>
    )
}


export default VenueInfo