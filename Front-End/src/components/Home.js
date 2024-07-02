import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>
      <h2>Cheap Cheap Tickets</h2>
      <p>Cheap tickets, Unforgettable Memories!</p>
      <hr></hr>
      <p> Start with one of the buttons below and begin exploring for the perfect events for you based on what is most important!</p>
      <div class="d-grid gap-2 col-6 mx-auto">
        <Link to="/artists" class=" btn btn-primary" >Artists</Link>
        <Link to="/genre" class=" btn btn-primary" >Genres</Link>
        <Link to="/venue" class=" btn btn-primary" >Events</Link>
    </div>
    </div >
  );
}

export default Home;