import React from 'react';
import {  useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'


function VenueInfo() {

    const eventId = useParams()

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
        const getEventData = async () => {

            try {
                const response = await axios.get(`/GetEvent/${eventId}`);
                const newEventData = {
                    ...response.data,
                    ...eventData
                };
                setEventData(newEventData);
            } catch (error) {
                console.error("Error: ", error)
            }
        }
        getEventData()

    }, [eventData, eventId]);

    const [genreName, setGenreName] = useState("defaultGenreName")
    useEffect(() => {
        const getGenreName = async () => {
            try {
                const response = await axios.get(`/GetGenre/${eventData.genreId}`);
                setGenreName(response.data.name)
            } catch (error) {
                console.error("Error:", error)
            }
        }
        getGenreName()
    },[eventData.genreId]);

    return (
        <div>
            <h2>{eventData.eventName}</h2>
            {/* <img src="https://workingonmyredneck.com/wp-content/uploads/2021/07/iowa-speedway.jpeg" className="img-fluid rounded" alt="..." style={{
                width: '25%', height: '25%', objectFit: 'cover', objectPosition: 'center'
            }} /> */}
            <br></br>
            <span class="badge rounded-pill text-bg-secondary">Ticket Price <strong>${eventData.priceRange[0]} to ${eventData.priceRange[1]}</strong></span>
            <br></br>
            <br></br>
            <h6 className="inline">Artist: </h6> <p  className="event-box" >{eventData.artistNames[0]}</p>
            <br></br>
            <br></br>

            <p className="card-text">{eventData.dateAndTime[0]}-{eventData.dateAndTime[1]}-{eventData.dateAndTime[2]}</p>
            <p className="card-text"><small className="text-body-secondary">{eventData.venue.address}</small></p>
            <p><strong>Genres: </strong> <p className="event-box"> {genreName}</p> </p>
            <a href={eventData.ticketmasterURL} rel="noreferrer" target="_blank" class = "btn btn-primary">Go to TicketMaster</a>
        </div>
    )
}


export default VenueInfo