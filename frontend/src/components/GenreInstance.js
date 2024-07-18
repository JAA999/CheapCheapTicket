import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import axios from 'axios'

function GenreInstance() {
    const { genreId } = useParams()

    const [genreData, setGenreData] = useState({
        "id": "1",
        "name": "GenreName",
        "popularArtists": ["73sIBHcqh3Z3NyqHKZ7FOL", "Artists 2 id", "Artists 3 id"],
        "upcomingEvents": ["Z698xZu0ZaGQo", "Event 2 id", "Event 3 id", "Event 4 id"],
        "topSongs": ["Song 1", "Song 2", "Song 3"],
        "events_price_min": 0,
        "events_price_max": 0
    });
    
    useEffect(() => {
        const getGenreData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/GetGenre/${genreId}`);
                const newGenreData = {
                    ...response.data,
                    ...genreData
                };
                setGenreData(newGenreData);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getGenreData();
    }, [genreId]);
    

    const [eventIdPairs, setEventIdPairs] = useState({});
    useEffect(() => {
        const getEventNames = async () => {
            if (genreData && genreData.upcomingEvents) {
                try {
                    const eventPromises = genreData.upcomingEvents.map(async (eventId) => {
                        const response = await axios.get(`http://127.0.0.1:5000/GetEvent/${eventId}`);
                        return { eventId, eventName: response.data.eventName };
                    });
                    const eventNames = await Promise.all(eventPromises);
    
                    const eventIdPairs = Object.fromEntries(
                        eventNames.map(event => [event.eventId, event.eventName])
                    );
                    setEventIdPairs(eventIdPairs);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };
        if (genreData && genreData.upcomingEvents.length > 0) {
            getEventNames();
        }
    }, [genreData]);

    const [artistsIdPairs, setArtistsIdPairs] = useState({});
    useEffect(() => {
        const fetchArtistsNames = async () => {
            try {
                const artistIds = genreData.popularArtistsId;
                const namePromises = artistIds.map(async (artistId) => {
                    const response = await axios.get(`http://127.0.0.1:5000/GetArtist/${artistId}`);
                    return { artistId, name: response.data.name };
                });
                const artistsNames = await Promise.all(namePromises);
                const artistsIdPairs = Object.fromEntries(
                    artistIds.map((key, index) => [key, artistsNames[index]])
                )
                setArtistsIdPairs(artistsIdPairs);
            } catch (error) {
                console.error('Error ', error);
            }
        }
        fetchArtistsNames();
    }, [genreData.popularArtistsId]);

    return (
        <>
            <div class="d-flex flex-column align-items-center genre-page  text-start mt-5">
                <div>
                    <h1 class="genre-page-title mb-5 ">{genreData.name}</h1>
                </div>

                <div class="genre-page-con d-flex flex-column mb-5">
                    <h1 class="genre-page-subtitle">Top songs </h1>
                    {
                        genreData.topSongs.map((song, index) => (
                            index < 3 ?
                                <h1 key={index} class="genre-page-text">{song}</h1>
                                :
                                null
                        ))
                    }

                </div>
                <div class="genre-page-con d-flex flex-column mb-5">
                    <h1 class="genre-page-subtitle">Top Artists </h1>
                    {
                        Object.entries(artistsIdPairs).map(([key, value], index) => (
                            <h1 key={index} class="genre-page-text "><Link class=" genre-page-link" to={`/artists/artistspage/${key}`}>{value}</Link></h1>
                        ))
                    }
                </div>
                <div class="genre-page-con genre-page-venue d-flex flex-column mb-5 p-2 pb-3 rounded-4">
                    <h1 class="genre-page-subtitle mt-2">Venues </h1>
                    <h1 class="genre-page-price mb-4 ">${genreData.events_price_min} - ${genreData.events_price_max}</h1>
                    {
                        Object.entries(eventIdPairs).map(([key, value], index) => (
                            <h1 key={index} class="genre-page-text mb-2"><Link class=" genre-page-link" to={`/venue/${key}`}>{value}</Link></h1>
                        ))
                    }
                </div>

            </div>

        </>
    )
}

export default GenreInstance;

