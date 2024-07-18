import React from 'react';
import { useState, useEffect } from 'react';
import GenreCard from './GenreCard';
import axios from 'axios'
import SearchGenres from './SearchGenres';


function Genre() {

  const [genresData, setGenresData] = useState({
    "Genres": [
      {
        "genreId": "KnvZfZ7vAvv",
        "name": "GenreName",
        "popularArtists": ["73sIBHcqh3Z3NyqHKZ7FOL", "Artists 2 id", "Artists 3 id"],
        "upcomingEvents": ["Z698xZu0ZaGQo", "Event 2 id", "Event 3 id", "Event 4 id"],
        "topSongs": ["Song 1", "Song 2", "Song 3"],
        "events_price_min": 0,
        "events_price_max": 0

      }
    ]
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery, setSearchQuery] = useState('');
  const [valuesRange, setValuesRange] = useState([1, 10000])
  const [currentRange, setCurrentRange] = useState([1, 10000])
  const [sortBy, setSortBy] = useState('');
  const [orderby, setOrderby] = useState('');

  useEffect(() => {
    const fetchMinMaxPrice = async () => {
      try {
        const response = await axios.get('/GetAllEvents');
        let min = Number.MAX_SAFE_INTEGER
        let max = 0
        response.data.forEach((event) => {
          min = event.events_price_min < min ? event.events_price_min : min
          max = event.events_price_max > max ? event.events_price_max : max
        })
        setValuesRange([min, max]);
        setCurrentRange([min, max]);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchMinMaxPrice();
  }, []);


  const fetchData = async (currentPage) => {
    try {
      const response = await axios.get(`http://localhost:5000/GetGenres`, {
        params: {
          page: currentPage,
          per_page: 5,
          sort_by: sortBy,
          sort_order: orderby,
          q: searchQuery,
          'events_price_min.min': currentRange[0],
          'events_price_max.max': currentRange[1],

        }
      });
      const responseLength = await axios.get(`http://loclahost:5000/GetAllGenres`);

      const newGenres = response.data.Genres.map((newGenre, index) => {
        const defaultGenre = genresData.Genres[index] || {};
        return {
          ...defaultGenre,
          ...newGenre
        };
      });

      setGenresData({ Genres: newGenres });
      setTotalPages(responseLength.data.length)
    } catch (error) {
      console.error("Error:", error)
    }
  };

  useEffect(() => {
    console.log(searchQuery + " debug search value(string) ")
    console.log(valuesRange + " debug price range wip")
    console.log(currentRange + " debug current price range wip")
    console.log(sortBy + " debug sort value(string) ")
    console.log(orderby + " debug order value(string)")
    fetchData(currentPage);
  }, [currentPage, orderby, currentRange, sortBy, searchQuery]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchQuery = (value) => {
    setSearchQuery(value)
  }
  const handleValuesRange = (newValues) => {
    setCurrentRange(newValues);
  };
  const handleSortBy = (value) => {
    setSortBy(value)
  }
  const handleOrderBy = (value) => {
    setOrderby(value)
  }

  return (
    <>

      <h1 class="m-5">Genres</h1>

      <SearchGenres
        onSearchChange={handleSearchQuery}
        onValuesChange={handleValuesRange}
        minValue={valuesRange[0]}
        maxValue={valuesRange[1]}
        onSortChange={handleSortBy}
        onOrderChange={handleOrderBy}
      />

      <div class="row d-flex justify-content-center genre-card-container ">
        {
          genresData["Genres"].map((genre, index) => (
            <GenreCard key={index}
              genreId={genre.genreId}
              name={genre.name}
              popularArtists={genre.popularArtists}
              upcomingEvents={genre.upcomingEvents}
              topSongs={genre.topSongs}
             
              // eventsMin = {genre.genre_price_min}
              // eventsMax = {genre.genre_price_max}
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
              <></>
          ))}
          <button class="page-item" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>
      </div>
    </>

  );
}

export default Genre;
