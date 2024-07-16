import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function SearchContainer({ onOrderChange, onSortChange,onFilterChange, onSearchChange, filterOptions }) {

    // search name - string
    const handleSearchQuery = (value) => {
        onSearchChange(value);
    }

    // genres 
    const handleFilterBy = (value) => {
        onFilterChange(value);
    }

    // name and popularity
    const handleSortBy = (value) => {
        onSortChange(value);
    }

    const [activeButton, setActiveButton] = useState(null);
    // true ascending false descending
    const handleOrderBy = (value) => {
        setActiveButton(value);
        onOrderChange(value);
    }

    return (
        <>

            <div class="d-flex flex-row justify-content-center align-items-center p-4">

                <div class="me-2">
                    <input type="text" placeholder="Search..." onChange={(event) => handleSearchQuery(event.target.value)} />
                </div>

                <div class="dropdown me-2">
                    <button class="btn btn-secondary dropdown-toggle" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter By (genres)
                    </button>
                    <ul class="dropdown-menu">
                        {
                            filterOptions.map((option, index) =>
                                <li key={index}><a class="dropdown-item" onClick={() => handleFilterBy(option.genre_id)} >{option.name}</a></li>
                            )
                        }
                    </ul>
                </div>

                <div class="dropdown me-2">
                    <button class="btn btn-secondary dropdown-toggle" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sort By
                    </button>

                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" onClick={() => handleSortBy('name')}>Name</a></li>
                        <li><a className="dropdown-item" onClick={() => handleSortBy('popularity')}>popularity</a></li>
                    </ul>
                </div>

                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Order By
                    </button>

                    <ul className="dropdown-menu">
                        <li><a className={`dropdown-item ${activeButton === 'ascending' ? 'active' : ''}`} onClick={() => handleOrderBy('ascending')}>Ascending</a></li>
                        <li><a className={`dropdown-item ${activeButton === 'descending' ? 'active' : ''}`} onClick={() => handleOrderBy('descending')}>Descending</a></li>
                    </ul>
                </div>



            </div>

        </>
    );
}

export default SearchContainer;