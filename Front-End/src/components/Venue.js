import React from 'react';

function Venue() {
  return (
    <div>
      <div>
        <h2>Venue</h2>
        <p>Venues all across the US! </p>
      </div>

      <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src="https://heyaustin.com/wp-content/uploads/2015/05/bp_long_center_03-e1581877716911.jpg" className="img-fluid rounded-start" alt="..." style={{ 
                width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' 
              }}/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <a href="/venueinfo"><h5 className="card-title">Long Center</h5></a> <p>Ticket Price: <strong>$15-$320</strong></p>
              <p className="card-text">October 12th, 2024</p>
              <a href="https://heyaustin.com/wp-content/uploads/2015/05/bp_long_center_03-e1581877716911.jpg" className="btn btn-primary">Travis Scott</a>
              <p className="card-text"><small className="text-body-secondary">701 W Riverside Dr, Austin, TX 78704</small></p>
              <p><strong>Genres: </strong> <a href="#">Hip-Hop</a> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Venue;