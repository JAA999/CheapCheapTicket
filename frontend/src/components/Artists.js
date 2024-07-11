import React from 'react';
import ArtistsCard from "./ArtistsCard";
import { useState, useEffect } from 'react';
import axios from 'axios'

function Artists() {

    const [artistsData, setArtistsData] = useState({
        "Artists": [
            {
                "name": "Chidish Gambino",
                "id": "73sIBHcqh3Z3NyqHKZ7FOL",
                "popularity": 79,
                "albums": ["Atavista"],
                "album_covers": ["https://i.scdn.co/image/ab67616d0000b273a9afb2484111b87abc2b4a80", "https://i.scdn.co/image/ab67616d0000b2737582716b3666a5235d5af4ea", "https://i.scdn.co/image/ab67616d0000b273d98a6832141788d8c355852b"],
                "future_events": ["Z698xZu0ZaGQo", "Z698xZbpZ17GA_K", "G5vHZb1niHezV", "Event 4 id"],
                "image_url": "https://i.scdn.co/image/ab6761610000f178c3dc5429b676b16d451e5f77",
                "genre_id": "KnvZfZ7vAvv",
            }
        ]
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (currentPage) => {
        try {
            const response = await axios.get(`/GetArtist`, {
                params: { page: currentPage, per_page: 20 }
            });
            const responseLength = await axios.get(`/GetAllArtists`);
            setArtistsData(response.data)
            setTotalPages(responseLength.data.length)
        } catch (error) {
            console.error("Error:", error);
        }
    };
    fetchData();

    useEffect(() => {
        fetchData(currentPage);
    }, [ currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <h1 class=" m-5">Artists</h1>

            <div class="row g-5 m-5" >
                {
                    artistsData["Artists"].map((artist, index) => (
                        <div class="col-xl-3 ">
                            <ArtistsCard key={index}
                                name={artist.name}
                                id={artist.id}
                                popularity={artist.popularity}
                                genreId={artist.genre_id}
                                albums={artist.albums}
                                albumCovers={artist.album_covers}
                                futureEvents={artist.future_events}
                                image_url={artist.image_url}
                            > </ArtistsCard>
                        </div>
                    ))
                }
            </div>

            <div class="d-flex justify-content-center align-items-center">
                <div className="pagination  p-5">
                    <button class="page-item" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Back</button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        currentPage === index + 1 ?
                            <button class=" page-item text-bg-dark" >{currentPage}</button>
                            :
                            <></>
                    ))}
                    <button class="page-item" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                </div>
            </div>
        </>
    );
}

export default Artists;

