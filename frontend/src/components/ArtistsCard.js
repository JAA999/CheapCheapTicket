import React from "react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios'


function ArtistsCard(props) {

    const [genreName, setGenreName] = useState("defaultGenreName");

    useEffect(() => {
        const getGenreName = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/GetGenre/${props.genreId}`);
                setGenreName(response.data.name);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getGenreName()
    }, [props.genreId])

    const [eventIdPairs, setEventIdPairs] = useState({});

    useEffect(() => {
        const fetchEventNames = async () => {
            const eventNames = ["defaultEventName 1", "defaultEventName 2", "defaultEventName 3"];
            const limitedFutureEvents = props.futureEvents.slice(0, 3);

            while (limitedFutureEvents.length < 3) {
                limitedFutureEvents.push("");
            }
            for (let i = 0; i < 3; i++) {
                if (limitedFutureEvents[i] !== "") {
                    try {
                        const response = await axios.get(`http://localhost:5000/GetEvent/${limitedFutureEvents[i]}`);
                        eventNames[i] = response.data.event_name;
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
            }

            const eventIdPairs = Object.fromEntries(
                limitedFutureEvents.map((key, index) => [key, eventNames[index]])
            );
            setEventIdPairs(eventIdPairs);
        };
        fetchEventNames();
    }, [props.futureEvents]);

    return (
        <div class="card  artist-card p-2 border-0">

            <div class="d-flex justify-content-center mt-3">
                <img class="card-img-top circle-image" src={props.image_url} alt="artistsPic" />
            </div>

            <div class="card-body text-start d-flex flex-column">
                <div class="artist-card-container mb-4">
                    {
                        props.name.length < 6 ?
                            <Link class=" artist-card-link artist-card-title" to={`/artists/artistspage/${props.id}`}>{props.name}</Link>
                            :
                            props.name.length < 11 ?
                                <Link class=" artist-card-link artist-card-title2" to={`/artists/artistspage/${props.id}`}>{props.name}</Link>
                                :
                                <Link class=" artist-card-link artist-card-title3" to={`/artists/artistspage/${props.id}`}>{props.name}</Link>
                    }
                </div>
                <span><h1 class="artist-card-text">#{props.popularity}</h1></span>
                <span><h1 class="artist-card-text"><Link class="artist-card-link artist-card-genre" to={`/genre/${props.genreId}`}>{genreName}</Link></h1></span>
                {
                    props.albums.length === 0 ?
                        <span><h1 class="artist-card-text">&nbsp;</h1></span>
                        :
                        <span><h1 class="artist-card-text">Latest Album : {props.albums[0]}</h1></span>
                }
            </div>

            <div class="card-body text-start d-flex flex-column">
                <h1 class="artist-card-subtitle">Events</h1>
                {
                    Object.entries(eventIdPairs).map(([key, value], index) => (
                        key !== "" ?
                            props.futureEvents[0]?.length < 21 ?
                                <span key={index}><Link className="artist-card-link artist-card-text" to={`/venue/${key}`}>{value}</Link></span>
                                :
                                <span key={index}><Link className="artist-card-link artist-card-text" to={`/venue/${key}`}>{value.substring(0, 21) + "..."}</Link></span>
                            :
                            <span key={index}><Link className="artist-card-link artist-card-text">&nbsp;</Link></span>
                    ))
                }
            </div>

        </div>
    );
}

export default ArtistsCard;

