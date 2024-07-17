import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function SearchVenues({ onOrderChange, onSortChange, onValuesChange, onSearchChange, minValue, maxValue }) {
    const [rangeDisplay, setRangeDisplay] = useState([minValue, maxValue]);
    const [activeButton, setActiveButton] = useState(null);

    useEffect(() => {
        setRangeDisplay([minValue, maxValue]);
    }, [minValue, maxValue]);

    const handleSearchQuery = (value) => {
        onSearchChange(value);
    };

    const handleValuesChange = (value) => {
        setRangeDisplay(value);
        onValuesChange(value);
    };

    const handleSortBy = (value) => {
        onSortChange(value);
    };

    const handleOrderBy = (value) => {
        setActiveButton(value);
        onOrderChange(value);
    };

    return (
        <div className="d-flex flex-row justify-content-center align-items-center p-4">
            <div className="me-2">
                <input type="text" placeholder="Search..." onChange={(event) => handleSearchQuery(event.target.value)} />
            </div>

            {/* <div className="d-flex flex-row align-items-center">
                <span>Min Price: {rangeDisplay[0]}</span>
                <ReactSlider
                    className="horizontal-slider d-flex align-items-center"
                    thumbClassName="thumb"
                    onChange={handleValuesChange}
                    value={rangeDisplay}
                    pearling
                    minDistance={1}
                />
                <span>Max Price: {rangeDisplay[1]}</span>
            </div> */}

            <div className="dropdown me-2">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Ranges
                </button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={() => handleSortBy('name')}>Name</button></li>
                    <li>            
                        <div className="d-flex flex-row align-items-center">
                            <span>Min Price: {rangeDisplay[0]}</span>
                            <ReactSlider
                                className="horizontal-slider d-flex align-items-center"
                                thumbClassName="thumb"
                                onChange={handleValuesChange}
                                value={rangeDisplay}
                                pearling
                                minDistance={1}
                            />
                            <span>Max Price: {rangeDisplay[1]}</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="dropdown me-2">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort By
                </button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={() => handleSortBy('name')}>Name</button></li>
                    <li><button className="dropdown-item" onClick={() => handleSortBy('eventsPriceMin')}>Lowest Ticket Price</button></li>
                    <li><button className="dropdown-item" onClick={() => handleSortBy('eventsPriceMax')}>Highest Ticket Price</button></li>
                    <li><button className="dropdown-item" onClick={() => handleSortBy('date')}>Date</button></li>
                </ul>
            </div>

            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Order By
                </button>
                <ul className="dropdown-menu">
                    <li><button className={`dropdown-item ${activeButton === 'ascending' ? 'active' : ''}`} onClick={() => handleOrderBy('ascending')}>Ascending</button></li>
                    <li><button className={`dropdown-item ${activeButton === 'descending' ? 'active' : ''}`} onClick={() => handleOrderBy('descending')}>Descending</button></li>
                </ul>
            </div>
        </div>
    );
}

export default SearchVenues;