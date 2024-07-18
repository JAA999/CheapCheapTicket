import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'


function VenueCard(props) {
    console.log(props)

    const [genreName, setGenreName] = useState("defaultGenreName")
    useEffect(() => {
        const getGenreName = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/GetGenre/${props.genreId}`);
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
                <div className="col-md-4"> 
                    <img src="https://workingonmyredneck.com/wp-content/uploads/2021/07/iowa-speedway.jpeg" className="img-fluid rounded-start" alt="..." style={{
                        width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'
                    }} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <Link to={`/venue/${props.id}`}><h5 className="card-title">{props.event_name}</h5></Link> <p>Ticket Price: <strong>${props.price_range_min} to ${props.price_range_max}</strong></p>
                        <p className="card-text">{`${Math.floor(props.event_date / 10000)}-${String(Math.floor((props.event_date % 10000) / 100)).padStart(2, '0')}-${String(props.event_date % 100).padStart(2, '0')}`}</p>
                        <Link  className="btn btn-primary" >{props.artist_names[0]}</Link>
                        <p className="card-text"><small className="text-body-secondary">{props.venue.address}</small></p>
                        <p><strong>Genres: </strong> <Link to={`/genre/${props.genre_id}`}>{props.genre_name}</Link> </p> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VenueCard;