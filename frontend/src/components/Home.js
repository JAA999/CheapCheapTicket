import React from 'react';

function Home() {
  return (
    <div>
      <h2>Cheap Cheap Tickets</h2>
      <p>Cheap tickets, Unforgettable Memories!</p>
      <hr></hr>
      <p> Start with one of the buttons below and begin exploring for the perfect events for you based on what is most important!</p>
      <div class="d-grid gap-2 col-6 mx-auto">
        <button class="btn btn-primary" type="button">Artists</button>
        <button class="btn btn-primary" type="button">Genres</button>
        <button class="btn btn-primary" type="button">Events</button>
      </div>
    </div>
  );
}

export default Home;