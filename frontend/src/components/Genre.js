import React from 'react';
import { useState, useEffect } from 'react';
import GenreCard from './GenreCard';
import axios from 'axios'
import SearchGenres from './SearchGenres';

function Genre() {

  const [genresData, setGenresData] = useState(
    [
      
    ]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery, setSearchQuery] = useState('');
  const [valuesRange, setValuesRange] = useState([1, 10000])
  const [currentRange, setCurrentRange] = useState([-1, 1000000])
  const [sortBy, setSortBy] = useState('');
  const [orderby, setOrderby] = useState('');

  const fetchData = async (currentPage) => {
    try {
      const response = await axios.get(`/GetGenres`, {
      //const response = await axios.get(`https://backend-dot-cs373-idb-428121.uc.r.appspot.com/GetGenres`, {
        params: {
          page: currentPage,
          per_page: 5,
          sort_by: sortBy,
          sort_order: orderby,
          q: '',
          'events_price_min.min': currentRange[0],
          'events_price_max.max': currentRange[1],

        }
      });

      const newGenres = response.data.map((newGenre, index) => {
        const defaultGenre = genresData[index] || {};
        return {
          ...defaultGenre,
          ...newGenre
        };
      });

      setGenresData(newGenres);
      const responseLength = await axios.get(`/GetAllGenres`);
      // const responseLength = await axios.get(`https://backend-dot-cs373-idb-428121.uc.r.appspot.com/GetAllGenres`);
      const totalGenres = responseLength.data.length;
      setTotalPages(Math.ceil(totalGenres / 5));
    } catch (error) {
      console.error("Error:", error)
    }
  };

  useEffect(() => {
    console.log("New values =--------------")
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
              events_price_min={genre.events_price_min}
              events_price_max={genre.events_price_max}
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
