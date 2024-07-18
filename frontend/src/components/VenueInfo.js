import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'


function VenueInfo() {

    const { eventId } = useParams();
    const navigate = useNavigate();

    const [eventData, setEventData] = useState(
        {
            "id": "Z698xZu0ZaGQo",
            "event_name": "Childish Gambino",
            "artist_names": ["Childish Gambino"],
            "artistIds": ['id'],
            "event_date": 20240122,
            "sales_start": "2024-05-17T08:00:00Z to 2024-11-12T22:59:00Z",
            "price_range_min": 1,
            "price_range_max": 1,
            "venue": { "name": "O2 Arena", "address": "\u010ceskomoravsk\u00e1 2345/17a, Praha 9", "phoneNumber": "020 8463 2000", "rating": "4.5 / 5", "website": "https://www.theo2.co.uk/" },
            "ticketmaster_URL": "https://www.ticketmaster.cz/event/childish-gambino-tickets/50833?language=en-us",
            "eventImageURL": "www.",
            "genre_id": "KnvZfZ7vAvv",
            "genre_name": "alter",
        }
    )

    useEffect(() => {
        const fetchEventData = async () => {

            try {
                const response = await axios.get(`http://127.0.0.1:5000/GetEvent/${eventId}`);
                // const newEventData = {
                //     ...response.data,
                //     ...eventData
                // };
                setEventData(response.data);
            } catch (error) {
                console.error("Error fetching event data: ", error)
            }
        }
        fetchEventData()
    }, [eventId]);

    if (!eventData) {
        return <div>Loading...</div>;
    }




    const handleBackClick = () => {
        navigate('/venue');
    };

    const formattedSalesDate = formatDate(eventData.sales_start)
    const formattedEventDate = formatDate(eventData.event_date)

    return (
        <div className="container my-5 text-white ">
            <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Back to Events</button>
            <h2>{eventData.event_name}</h2>
            <p><strong>Artists:</strong> {eventData.artist_names.join(', ')}</p>
            <p><strong>Event Date: </strong>{formattedEventDate}</p>
            <p><strong>Sales Start On: </strong> {formattedSalesDate}</p>
            <p><strong>Price Range:</strong> ${eventData.price_range_min} - ${eventData.price_range_max}</p>
            <p><strong>Genre:</strong> {eventData.genre_name}</p>
            <h3>Venue Information</h3>
            <p><strong>Name:</strong> {eventData.venue.name}</p>
            <p><strong>Address:</strong> {eventData.venue.address}</p>
            <p><strong>Phone Number:</strong> {eventData.venue.phoneNumber}</p>
            <p><strong>Website:</strong> <a href={eventData.venue.website} target="_blank" rel="noopener noreferrer">{eventData.ticketmaster_URL}</a></p>
            <a href={eventData.ticketmaster_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Buy Tickets</a>
        </div>
    );
}

function formatDate(date) {
    if (date < 20230601) {
        return "Unavailable"
    } else {
        const date_str = date.toString();
        const year = date_str.slice(0,4);
        const month = date_str.slice(4,6);
        const day = date_str.slice(6,8);
        return `${year}-${month}-${day}`
    }
}


// return (
//     <div>
//         <h2>{eventData.eventName}</h2>
//         {/* <img src="https://workingonmyredneck.com/wp-content/uploads/2021/07/iowa-speedway.jpeg" className="img-fluid rounded" alt="..." style={{
//             width: '25%', height: '25%', objectFit: 'cover', objectPosition: 'center'
//         }} /> */}
//         <br></br>
//         <span class="badge rounded-pill text-bg-secondary">Ticket Price <strong>${eventData.priceRange[0]} to ${eventData.priceRange[1]}</strong></span>
//         <br></br>
//         <br></br>
//         <h6 className="inline">Artist: </h6> <p  className="event-box" >{eventData.artistNames[0]}</p>
//         <br></br>
//         <br></br>

//         <p className="card-text">{eventData.dateAndTime[0]}-{eventData.dateAndTime[1]}-{eventData.dateAndTime[2]}</p>
//         <p className="card-text"><small className="text-body-secondary">{eventData.venue.address}</small></p>
//         <p><strong>Genres: </strong> <p className="event-box"> {genreName}</p> </p>
//         <a href={eventData.ticketmasterURL} rel="noreferrer" target="_blank" class = "btn btn-primary">Go to TicketMaster</a>
//     </div>
// )
// }


    // const [genreName, setGenreName] = useState("defaultGenreName")
    // useEffect(() => {
    //     const getGenreName = async () => {
    //         try {
    //             const response = await axios.get(`/GetGenre/${eventData.genreId}`);
    //             setGenreName(response.data.name)
    //         } catch (error) {
    //             console.error("Error:", error)
    //         }
    //     }
    //     getGenreName()
    // },[eventData.genreId]);


export default VenueInfo