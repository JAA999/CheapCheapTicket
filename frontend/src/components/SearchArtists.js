import React from 'react';
import ReactSlider from 'react-slider';

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function SearchContainer({ onOrderChange, onSortChange, onFilterChange, onValuesChange,onSearchChange, filterOptions }) {

    // search name - string
    const [stringInput, setStringInput] = useState('');
    const handleChange = (event) => {
        setStringInput(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearchChange(stringInput);
            setStringInput('');
        }
    };

    const [rangeDisplay, setRangeDisplay] = useState([100, 1])
    const handleValuesChange = (value) => {
        // console.log("SLIDER DEBUG" + value)
        setRangeDisplay(value)
        onValuesChange(value)
    }

    // genres 
    const [activeButtonFilter, setActiveButtonFilter] = useState('');
    const handleFilterBy = (value) => {
        setActiveButtonFilter(value)
        onFilterChange(value);
    }

    // name and popularity
    const [activeButtonSort, setActiveButtonSort] = useState('');
    const handleSortBy = (value) => {
        setActiveButtonSort(value)
        onSortChange(value);
    }

    const [activeButton, setActiveButton] = useState('');
    // true ascending false descending
    const handleOrderBy = (value) => {
        setActiveButton(value);
        onOrderChange(value);
    }

    return (
        <>

            <div class="d-flex flex-row justify-content-center align-items-center p-4">

                <div class="me-2">
                    <input onKeyDown={handleKeyDown} type="text" value={stringInput} placeholder="Search..." maxlength={100} onChange={handleChange} />
                </div>

                <div class="d-flex flex-row align-items-center">
                    <span>Min : {rangeDisplay[0]}</span>
                    <ReactSlider
                        className="horizontal-slider d-flex align-items-center"
                        thumbClassName="thumb"
                        
                        min={1}
                        max={100}
                        onChange={handleValuesChange}
                        defaultValue={[1, 100]}
                        pearling
                        minDistance={1}
                    />
                    <span>Max : {rangeDisplay[1]}</span>
                </div>

                <div class="dropdown me-2">
                    <button class="btn btn-secondary dropdown-toggle" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter By (genres)
                    </button>
                    <ul class="dropdown-menu">
                        <li><a className={`dropdown-item ${activeButtonFilter === '' ? 'active' : ''}`} onClick={() => handleFilterBy('')}>none</a></li>
                        {
                            filterOptions.map((option, index) =>
                                <li key={index}><a class={`dropdown-item ${activeButtonFilter === option.genre_id ? 'active' : ''}`} onClick={() => handleFilterBy(option.name)} >{option.name}</a></li>
                            )
                        }
                    </ul>
                </div>

                <div class="dropdown me-2">
                    <button class="btn btn-secondary dropdown-toggle" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sort By
                    </button>

                    <ul className="dropdown-menu">
                        <li><a className={`dropdown-item ${activeButtonSort === '' ? 'active' : ''}`} onClick={() => handleSortBy('')}>none</a></li>
                        <li><a className={`dropdown-item ${activeButtonSort === 'name' ? 'active' : ''}`} onClick={() => handleSortBy('name')}>Name</a></li>
                        <li><a className={`dropdown-item ${activeButtonSort === 'popularity' ? 'active' : ''}`} onClick={() => handleSortBy('popularity')}>popularity</a></li>
                    </ul>
                </div>

                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Order By
                    </button>

                    <ul className="dropdown-menu">
                        <li><a className={`dropdown-item ${activeButton === '' ? 'active' : ''}`} onClick={() => handleOrderBy('')}>none</a></li>
                        <li><a className={`dropdown-item ${activeButton === 'ascending' ? 'active' : ''}`} onClick={() => handleOrderBy('asc')}>Ascending</a></li>
                        <li><a className={`dropdown-item ${activeButton === 'descending' ? 'active' : ''}`} onClick={() => handleOrderBy('desc')}>Descending</a></li>
                    </ul>
                </div>



            </div>

        </>
    );
}

export default SearchContainer;