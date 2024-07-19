import React from 'react';
import { useState, useEffect } from 'react';
import GenreCard from './GenreCard';
import axios from 'axios'
import SearchGenres from './SearchGenres';

function Genre() {

  const [genresData, setGenresData] = useState(
    [
      // {
      //   "genreId": "KnvZfZ7vAvv",
      //   "name": "GenreName",
      //   "popular_artists": ["73sIBHcqh3Z3NyqHKZ7FOL", "Artists 2 id", "Artists 3 id"],
      //   "upcoming_events": ["Event ID"],
      //   "top_songs": ["Song 1", "Song 2", "Song 3"],
      //   "events_price_range": [0, 0]
      // }
    ]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery, setSearchQuery] = useState('');
  const [valuesRange, setValuesRange] = useState([1, 10000])
  const [currentRange, setCurrentRange] = useState([1, 10000])
  const [sortBy, setSortBy] = useState('');
  const [orderby, setOrderby] = useState('');

  const fetchData = async (currentPage) => {
    try {
      const response = await axios.get(`/GetGenres`, {
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
      const responseLength = await axios.get(`/GetAllGenres`);

      const newGenres = response.data.map((newGenre, index) => {
        const defaultGenre = genresData[index] || {};
        return {
          ...defaultGenre,
          ...newGenre
        };
      });

      setGenresData(newGenres);
      const totalGenres = responseLength.data.length;
      setTotalPages(Math.ceil(totalGenres / 5));
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

      <h1 class="m-5 page-title">Genres</h1>
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
          genresData.map.length > 0 ?
          genresData.map((genre, index) => (
            <GenreCard key={index}
              genreId={genre.id}
              name={genre.name}
              popularArtists={genre.popular_artists}
              upcomingEvents={genre.upcoming_events}
              topSongs={genre.top_songs}
              eventsPriceRange={genre.events_price_range}
            />
          ))
          :
          <></>
        }
      </div>

      <div class="d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center">
          <div className="pagination p-5">
            <button className="page-item" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Back</button>
            {Array.from({ length: totalPages }, (_, index) => (
              currentPage === index + 1 ?
                <button class=" page-item text-bg-dark" >{currentPage}</button>
                :
                <></>
            ))}
            <button className="page-item" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </div>
        </div>
      </div>
    </>

  );
}

export default Genre;
