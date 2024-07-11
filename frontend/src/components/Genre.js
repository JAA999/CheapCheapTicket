import React from 'react';
import { useState, useEffect } from 'react';
import GenreCard from './GenreCard';
import axios from 'axios'


function Genre() {

  const [genresData, setGenresData] = useState({
    "Genres": [
      {
        "genreId": "KnvZfZ7vAvv",
        "name": "GenreName",
        "popularArtists": ["73sIBHcqh3Z3NyqHKZ7FOL", "Artists 2 id", "Artists 3 id"],
        "upcomingEvents": ["Z698xZu0ZaGQo", "Event 2 id", "Event 3 id", "Event 4 id"],
        "topSongs": ["Song 1", "Song 2", "Song 3"],
        "eventsPriceRange": [0, 0]
      },
      {
        "genreId": "KnvZfZ7vAvd",
        "name": "GenreName 2",
        "popularArtists": ["Artists 1 ID", "Artists 2 ID", "Artists 3 ID"],
        "upcomingEvents": ["Event 1 ID", "Event 2 ID", "Event 3", "Event 4 ID"],
        "topSongs": ["Song 1", "Song 2", "Song 3"],
        "eventsPriceRange": [0, 0]
      }
    ]
  });

  const fetchData = async (page) => {
    try {
      const response = await axios.get(`/GetAllEvents?page=${page}&limit=25`);
      setGenresData(response.data)
    } catch (error) {
      console.error("Error:", error)
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(11);


  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>

      <h1 class="m-5">Genres</h1>
      <div class="row d-flex justify-content-center genre-card-container ">
        {
          genresData["Genres"].map((genre, index) => (
            <GenreCard key={index}
              genreId={genre.genreId}
              name={genre.name}
              popularArtists={genre.popularArtists}
              upcomingEvents={genre.upcomingEvents}
              topSongs={genre.topSongs}
              eventsPriceRange={genre.eventsPriceRange}
            />
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
              <button class="page-item text-bg-light" >{index + 1}</button>
          ))}
          <button class="page-item" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>
      </div>
    </>

  );
}

export default Genre;
