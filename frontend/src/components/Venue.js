import React from 'react';
import VenueCard from './VenueCard';
import { useState, useEffect } from 'react';
import axios from 'axios'
import SearchVenues from './SearchVenues';

function Venue() {

  const [eventData, setEventData] = useState({
    "events": [
      {
        "eventId": "Z698xZu0ZaGQo",
        "eventName": "Childish Gambino",
        "artistNames": ["Childish Gambino"],
        "dateAndTime": [2024, 11, 12],
        "salesStart-End": "2024-05-17T08:00:00Z to 2024-11-12T22:59:00Z",
        "priceRange": [1490.0, 4242.0],
        "genreId": "KnvZfZ7vAvv",
        "venue": { "name": "O2 Arena", "address": "\u010ceskomoravsk\u00e1 2345/17a, Praha 9", "phoneNumber": "020 8463 2000", "rating": "4.5 / 5", "website": "https://www.theo2.co.uk/" },
        "ticketmasterURL": "https://www.ticketmaster.cz/event/childish-gambino-tickets/50833?language=en-us"
      }
    ]
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000});

  // const [venueRatingRange, setVenueRatingRange] = useState([0, 5]);
  const [searchQuery, setSearchQuery] = useState('');
  // const [valuesRange, setValuesRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('');

  const fetchData = async (currentPage, priceRange, venueRatingRange, searchQuery, sortBy, orderBy) => {
    try {
      const response = await axios.get(`/GetEvents`, {
        params: { page: currentPage, 
          per_page: 30, 
          price_range_min : priceRange.min, 
          price_range_max: priceRange.max, 
          // min_rating: venueRatingRange[0],
          // max_rating: venueRatingRange[1],
          q: searchQuery,
          sort_by: sortBy,
          sort_order: orderBy,
        }
      });
      const responseLength = await axios.get(`http://127.0.0.1:5000/GetAllEvents`);

      const newEvents = response.data.events.map((newEvent, index) => {
        const defaultEvent = eventData.events[index] || {};
        return {
          ...defaultEvent,
          ...newEvent,
          venue: {
            ...defaultEvent.venue,
            ...newEvent.venue,
          },
        };
      });
      setTotalPages(responseLength.data.total)
      setEventData({ events: newEvents });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  
  useEffect(() => {


    fetchData(currentPage, priceRange, searchQuery, sortBy, orderBy); //venueRatingRange

  }, [currentPage, priceRange, searchQuery, sortBy, orderBy]); //venueRatingRange
  
  const handlePriceChange = (range) => {
    setPriceRange({ min: range[0], max: range[1] });
  };

  // const handleRatingChange = (range) => {
  //   setVenueRatingRange(range);
  // };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchQuery = (value) => {
    setSearchQuery(value);
  };
  // const handleValuesRange = (newValues) => {
  //   setValuesRange(newValues);
  // };
  const handleSortBy = (value) => {
    setSortBy(value);
  };
  const handleOrderBy = (value) => {
    setOrderBy(value);
  };


  return (
    <div>

      <div>
        <h2>Events</h2>
        <p>Events all across the US! </p>
      </div>

      <SearchVenues
        onSearchChange={handleSearchQuery}
        onValuesChange={handlePriceChange}
        // onRatingChange={handleRatingChange}
        minValue={0}
        maxValue={10000}
        minRating={0}
        maxRating={5}
        onSortChange={handleSortBy}
        onOrderChange={handleOrderBy}

        // onSearchChange={() => {}}

        // onValuesChange={() => {}}

        // minValue={0}

        // maxValue={100}

        // onSortChange={() => {}}

        // onOrderChange={() => {}}
      />

      <div class="row g-4 m-5">
        {
          eventData.events.map((event, index) => (
            <div className="col-lg-4" key={index}>
              <VenueCard
                eventId={event.eventId}
                eventName={event.eventName}
                artistNames={event.artistNames}
                dateAndTime={event.dateAndTime}
                //salesStartEnd={event['salesStart-End']} 
                salesStartEnd={event.salesStartEnd}
                priceRange={event.priceRange}
                genreId={event.genreId}
                venue={event.venue}
                ticketmasterURL={event.ticketmasterURL}
              />
            </div>
          ))
        }
      </div>

      <div class="d-flex justify-content-center align-items-center">
        <div className="pagination  p-5">
          <button class="page-item" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Back</button>
          {Array.from({ length: totalPages }, (_, index) => (
            currentPage === index + 1 ? (
              <button class=" page-item text-bg-dark" key={index}>
                {currentPage}
                </button>
            ) : null
          ))}
          <button class="page-item" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>
      </div>

    </div>

  );
}

export default Venue;


// <div className="card mb-3" style={{ maxWidth: '540px' }}>
// <div className="row g-0">
//   <div className="col-md-4">
//     <img src="https://www.lakemurraycountry.com/wp-content/uploads/2021/03/download23.jpg" className="img-fluid rounded-start" alt="..." style={{ 
//         width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' 
//       }}/>
//   </div>
//   <div className="col-md-8">
//     <div className="card-body">
//       <a href="/venueinfotwo"><h5 className="card-title">The 2nd Annual Capital City Blues Festival</h5></a> <p>Ticket Price: <strong>$55.0 to $175.0</strong></p>
//       <p className="card-text">2024-10-19</p>
//       <Link to={`/artists/artistspage/staticinstance6`} className="btn btn-primary" >Capital Ciites</Link>
//       <p className="card-text"><small className="text-body-secondary">Township Auditorium 1703 Taylor Street, Columbia, South Carolina</small></p>
//       <p><strong>Genres: </strong>  <Link to={'/genre/genrestaticinstance3'}>Pop</Link>  </p>
//     </div>
//   </div>
// </div>
// </div>
// <div className="card mb-3" style={{ maxWidth: '540px' }}>
// <div className="row g-0">
//   <div className="col-md-4">
//     <img src="https://footballgroundguide.com/wp-content/uploads/2021/03/DC-Uniteds-Audi-Field.jpg" className="img-fluid rounded-start" alt="..." style={{ 
//         width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' 
//       }}/>
//   </div>
//   <div className="col-md-8">
//     <div className="card-body">
//       <a href="/venueinfothree">Broccoli City Festival 2-day Ticket (7/27-7/28)<h5 className="card-title"></h5></a> <p>Ticket Price: <strong>$169.5 to $1069.5</strong></p>
//       <p className="card-text">2024-07-27</p>
//       <Link to={`/artists/artistspage/staticinstance5`} className="btn btn-primary" >Gunna</Link>
//       <p className="card-text"><small className="text-body-secondary">Audi Field 100 Potomac Ave. SW, Washington, District of Columbia</small></p>
//       <p><strong>Genres: </strong>  <Link to={'/genre/genrestaticinstance2'}>Hip-Hop/Rap</Link> </p>
//     </div>
//   </div>
// </div>
// </div> 