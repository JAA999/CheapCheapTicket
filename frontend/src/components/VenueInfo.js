import React from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'


function VenueInfo() {

    const {eventId} = useParams();
    const navigate = useNavigate();

    const [eventData, setEventData] = useState(
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


    const { eventName, artistNames, dateAndTime, salesStartEnd, priceRange, genreId, venue, ticketmasterURL } = eventData;


    const handleBackClick = () => {
        navigate('/venue');
    };

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


    return (
        <div className="container my-5">
        <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Back to Events</button>
            <h2>{eventName}</h2>
            <p><strong>Artists:</strong> {artistNames.join(', ')}</p>
            <p><strong>Date and Time:</strong> {new Date(dateAndTime).toLocaleString()}</p>
            <p><strong>Sales Start and End:</strong> {salesStartEnd}</p>
            <p><strong>Price Range:</strong> ${priceRange[0]} - ${priceRange[1]}</p>
            <p><strong>Genre:</strong> {genreId}</p>
            <h3>Venue Information</h3>
            <p><strong>Name:</strong> {venue.name}</p>
            <p><strong>Address:</strong> {venue.address}</p>
            <p><strong>Phone Number:</strong> {venue.phoneNumber}</p>
            <p><strong>Rating:</strong> {venue.rating}</p>
            <p><strong>Website:</strong> <a href={venue.website} target="_blank" rel="noopener noreferrer">{venue.website}</a></p>
            <a href={ticketmasterURL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Buy Tickets</a>
        </div>
    );
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


export default VenueInfo