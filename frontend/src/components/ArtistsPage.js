import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


// useState initialization has default data

function ArtistsPage() {
    const { artistId } = useParams();
    const [artistData, setArtistData] = useState({
        "name": "Childish Gambino",
        "id": "73sIBHcqh3Z3NyqHKZ7FOL",
        "popularity": 79,
        "albums": ["Atavista", "\"Awaken, My Love!\"", "Kauai"],
        "album_covers": ["https://i.scdn.co/image/ab67616d0000b273a9afb2484111b87abc2b4a80", "https://i.scdn.co/image/ab67616d0000b2737582716b3666a5235d5af4ea", "https://i.scdn.co/image/ab67616d0000b273d98a6832141788d8c355852b"],
        "future_events": ["Z698xZu0ZaGQo", "Z698xZbpZ17GA_K", "G5vHZb1niHezV", "Event 4 id"],
        "image_url": "https://i.scdn.co/image/ab6761610000f178c3dc5429b676b16d451e5f77",
        "genre_id": "KnvZfZ7vAvv",
    })
    const [genreName, setGenreName] = useState("defaultGenreName")
    const [albumCoverPairs, setAlbumCoverPairs] = useState({});

    useEffect(() => {
        const GetArtistInfo = async () => {
            try {
                const artistResponse = await axios.post(`/GetArtist/${artistId}`);
                setArtistData(artistResponse.data);
            } catch (error) {
                console.error('Error ', error);
            }
        };
        GetArtistInfo();
    }, [artistId]);

    useEffect(() => {
        if (artistData.genre_id) {
            const GetGenreName = async () => {
                try {
                    const genreResponse = await axios.post(`/GetGenre/${artistData.genre_id}`);
                    setGenreName(genreResponse.data.name);
                } catch (error) {
                    console.error('Error ', error);
                }
            };
            GetGenreName();
        }
    }, [artistData.genre_id]);

    useEffect(() => {
        if (artistData.albums && artistData.album_covers) {
            const albumCoverPairs = Object.fromEntries(
                artistData.albums.map((key, index) => [key, artistData.album_covers[index]])
            );
            setAlbumCoverPairs(albumCoverPairs);
        }
    }, [artistData.albums, artistData.album_covers]);

    const [eventIdPairs, setEventIdPairs] = useState({});
    useEffect(() => {
        const getEventNames = async () => {
            try {
                const eventPromises = artistData["future_events"].map(async (eventId) => {
                    const response = await axios.post(`/GetEvent/${eventId}`);
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
        };
        if (artistData["future_events"].length > 0) {
            getEventNames();
        }
    }, [artistData, artistData.future_events]);

    return (
        <>
            <div class="artist-page m-5 g-5 text-start d-flex flex-column">
                <h1 class="artist-page-title">{artistData["name"]}</h1>
                <h3 class="artist-page-text">#{artistData["popularity"]}</h3>
                <h1 class="artist-page-text mb-5"><Link to={`/genre/${artistData["genre_id"]}`} class="">{genreName}</Link></h1>
                <h1 class="artist-page-subtitle" >Albums</h1>
                <div class="row artist-page-albums flex-wrap">
                    {
                        Object.entries(albumCoverPairs).map(([key, value]) => (
                            <div className="text-black col-lg-4" key={key}>
                                <img className="artist-page-album" src={value} alt="albumCover" />
                                <p><b>{key}</b></p>
                            </div>
                        ))
                    }
                </div>
                <h1 class="artist-page-subtitle mb-4">Venues</h1>
                <div class=" d-flex flex-column ">
                    {
                        Object.entries(eventIdPairs).map(([key, value]) => (
                            <p><b><Link to={`/venue/${value}`} class="artist-page-smalltext  ">{key}</Link></b></p>
                        ))
                    }
                </div>
            </div >
        </>
    );
}

export default ArtistsPage;
