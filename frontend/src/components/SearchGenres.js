import React from 'react';
import ReactSlider from 'react-slider';

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function SearchGenres({ onOrderChange, onSortChange, onValuesChange, onSearchChange, minValue, maxValue }) {

    // search name - string 
    const [stringInput, setStringInput] = useState('');
    const handleChange = (event) => {
        setStringInput(event.target.value);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearchChange(stringInput);
            setStringInput('')
        }
    }

    const [rangeDisplay, setRangeDisplay] = useState([minValue, maxValue])
    const handleValuesChange = (value) => {
        // console.log("SLIDER DEBUG" + value)
        setRangeDisplay(value)
        onValuesChange(value)
    }

    // name, eventPricemin, eventPriceMax
    const [activeButtonSort, setActiveButtonSort] = useState(null);
    const handleSortBy = (value) => {
        setActiveButtonSort(value)
        onSortChange(value);
    }

    // ascending, descending
    const [activeButton, setActiveButton] = useState(null);
    const handleOrderBy = (value) => {
        setActiveButton(value);
        onOrderChange(value);
    }

    return (
        <>

            <div class="d-flex flex-row justify-content-center align-items-center p-4">

                <div class="me-2">
                    <input onKeyDown={handleKeyDown} type="text" value={stringInput} placeholder="Search..." onChange={handleChange} />
                </div>



                <div className="dropdown me-2">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Ranges
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <div class="d-flex flex-column align-items-start p-2">
                                
                                <span>Lowest ticket cost : {rangeDisplay[0]}</span>
                                <span>Highest ticket cost : {rangeDisplay[1]}</span>
                                <ReactSlider
                                    className="horizontal-slider d-flex align-items-center"
                                    thumbClassName="thumb"
                                    max={maxValue}
                                    min={minValue}
                                    onChange={handleValuesChange}
                                    defaultValue={[minValue, maxValue]}
                                    pearling
                                    minDistance={1}
                                />
                                
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="dropdown me-2">
                    <button class="btn btn-secondary dropdown-toggle" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sort By
                    </button>

                    <ul className="dropdown-menu">
                        <li><a className={`dropdown-item ${activeButtonSort === '' ? 'active' : ''}`} onClick={() => handleSortBy('')}>None</a></li>
                        <li><a className={`dropdown-item ${activeButtonSort === 'name' ? 'active' : ''}`} onClick={() => handleSortBy('name')}>Name</a></li>
                        <li><a className={`dropdown-item ${activeButtonSort === 'eventsPriceMin' ? 'active' : ''}`} onClick={() => handleSortBy('events_price_min')}>Events price minimum</a></li>
                        <li><a className={`dropdown-item ${activeButtonSort === 'eventsPriceMax' ? 'active' : ''}`} onClick={() => handleSortBy('events_price_max')}>Events price maximum</a></li>
                    </ul>
                </div>

                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Order By
                    </button>

                    <ul className="dropdown-menu">
                        <li><a className={`dropdown-item ${activeButton === '' ? 'active' : ''}`} onClick={() => handleOrderBy('')}>None</a></li>
                        <li><a className={`dropdown-item ${activeButton === 'ascending' ? 'active' : ''}`} onClick={() => handleOrderBy('asc')}>Ascending</a></li>
                        <li><a className={`dropdown-item ${activeButton === 'descending' ? 'active' : ''}`} onClick={() => handleOrderBy('desc')}>Descending</a></li>
                    </ul>
                </div>



            </div>

        </>
    );
}

export default SearchGenres;