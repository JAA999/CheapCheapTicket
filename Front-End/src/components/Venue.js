import React from 'react';

function Venue() {
  return (
    <div>
      <div>
        <h2>Events</h2>
        <p>Events all across the US! </p>
      </div>

      <div className="card mb-3" style={{ maxWidth: '540px'}}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src="https://workingonmyredneck.com/wp-content/uploads/2021/07/iowa-speedway.jpeg" className="img-fluid rounded-start" alt="..." style={{ 
                width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' 
              }}/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <a href="/venueinfo"><h5 className="card-title">Hy-Vee INDYCAR Sunday Race + Post Malone & Kelsea Ballerini</h5></a> <p>Ticket Price: <strong>$75.0 to $1000</strong></p>
              <p className="card-text">2024-07-14</p>
              <a href="https://heyaustin.com/wp-content/uploads/2015/05/bp_long_center_03-e1581877716911.jpg" className="btn btn-primary">Kelsea Ballerini</a>
              <p className="card-text"><small className="text-body-secondary">Iowa Speedway 3333 Rusty Wallace Dr., Newton, Iowa</small></p>
              <p><strong>Genres: </strong> <a href="#">Country</a> </p>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src="https://www.lakemurraycountry.com/wp-content/uploads/2021/03/download23.jpg" className="img-fluid rounded-start" alt="..." style={{ 
                width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' 
              }}/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <a href="/venueinfotwo"><h5 className="card-title">The 2nd Annual Capital City Blues Festival</h5></a> <p>Ticket Price: <strong>$55.0 to $175.0</strong></p>
              <p className="card-text">2024-10-19</p>
              <a href="https://heyaustin.com/wp-content/uploads/2015/05/bp_long_center_03-e1581877716911.jpg" className="btn btn-primary">Capital Cities</a>
              <p className="card-text"><small className="text-body-secondary">Township Auditorium 1703 Taylor Street, Columbia, South Carolina</small></p>
              <p><strong>Genres: </strong> <a href="#">Pop</a> </p>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src="https://footballgroundguide.com/wp-content/uploads/2021/03/DC-Uniteds-Audi-Field.jpg" className="img-fluid rounded-start" alt="..." style={{ 
                width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' 
              }}/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <a href="/venueinfothree">Broccoli City Festival 2-day Ticket (7/27-7/28)<h5 className="card-title"></h5></a> <p>Ticket Price: <strong>$169.5 to $1069.5</strong></p>
              <p className="card-text">2024-07-27</p>
              <a href="https://heyaustin.com/wp-content/uploads/2015/05/bp_long_center_03-e1581877716911.jpg" className="btn btn-primary">Gunna</a>
              <p className="card-text"><small className="text-body-secondary">Audi Field 100 Potomac Ave. SW, Washington, District of Columbia</small></p>
              <p><strong>Genres: </strong> <a href="#">Hip-Hop/Pop</a> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Venue;