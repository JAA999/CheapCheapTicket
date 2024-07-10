import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'


function VenueCard(props) {
    console.log(props)

    const [genreName, setGenreName] = useState("")
    useEffect(() => {
        const getGenreName = async () => {
            try {
                const response = await axios.get(`/api/GetGenre/${props.genreId}`);
                setGenreName(response.data.name)
            } catch (error) {
                console.error("Error:", error)
            }
        }
        getGenreName()
    },[props.genreId]);

    return (
        <div className="card mb-3">
            <div className="row g-0">
                {/* <div className="col-md-4">
                    <img  className="img-fluid rounded-start" alt="..." style={{
                        width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'
                    }} />
                </div> */}
                <div className="col-md-12">
                    <div className="card-body">
                        <Link to={`/venue/${props.eventId}`}><h5 className="card-title">{props.eventName}</h5></Link> <p>Ticket Price: <strong>${props.priceRange[0]} to ${props.priceRange[1]}</strong></p>
                        <p className="card-text">{props.dateAndTime[0]}-{props.dateAndTime[1]}-{props.dateAndTime[2]}</p>
                        <Link  className="btn btn-primary" >{props.artistNames[0]}</Link>
                        <p className="card-text"><small className="text-body-secondary">{props.venue.address}</small></p>
                        <p><strong>Genres: </strong> <Link to={`/genre/${props.genreId}`}>{genreName}</Link> </p> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VenueCard;