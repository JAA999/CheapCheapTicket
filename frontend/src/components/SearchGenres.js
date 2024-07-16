import React from 'react';
import ReactSlider from 'react-slider';

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function SearchGenres({ onOrderChange, onSortChange, onValuesChange, onSearchChange, minValue, maxValue }) {

    const [value, setValue] = useState(124);
    // search name - string
    const handleSearchQuery = (value) => {
        onSearchChange(value);
    }

    const [rangeDisplay, setRangeDisplay] = useState([minValue, maxValue])
    const handleValuesChange = (value) => {
        console.log("SLIDER DEBUG" + value)
        onValuesChange(value)
    }

    // name , eventPricemin, eventPriceMax
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

                <div class="d-flex flex-row align-items-center">
                    <span>Min : {rangeDisplay[0]}</span>
                    <ReactSlider
                        className="horizontal-slider d-flex align-items-center"
                        thumbClassName="thumb"
                        onChange={handleValuesChange}
                        defaultValue={[rangeDisplay[0],rangeDisplay[1]]}
                        pearling
                        minDistance={1}
                    />
                    <span>Max : {rangeDisplay[1]}</span>
                </div>

                <div class="dropdown me-2">
                    <button class="btn btn-secondary dropdown-toggle" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sort By
                    </button>

                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" onClick={() => handleSortBy('name')}>Name</a></li>
                        <li><a className="dropdown-item" onClick={() => handleSortBy('eventsPriceMin')}>Events price minimum</a></li>
                        <li><a className="dropdown-item" onClick={() => handleSortBy('eventsPriceMax')}>Events price maximum</a></li>
                    </ul>
                </div>

                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Order By
                    </button>

                    <ul className="dropdown-menu">
                        <li><a className={`dropdown-item ${activeButton ? 'active' : ''}`} onClick={() => handleOrderBy('ascending')}>Ascending</a></li>
                        <li><a className={`dropdown-item ${!activeButton && activeButton !== null ? 'active' : ''}`} onClick={() => handleOrderBy('descending')}>Descending</a></li>
                    </ul>
                </div>



            </div>

        </>
    );
}

export default SearchGenres;