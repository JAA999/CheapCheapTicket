import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function SearchVenues({ onOrderChange, onSortChange, onValuesChange, onSearchChange, minValue, maxValue, minRating, maxRating }) { //onRatingChange
    const [priceRange, setPriceRange] = useState([minValue, maxValue]);
    // const [ratingRange, setRatingRange] = useState([minRating, maxRating]);
    const [activeButton, setActiveButton] = useState(null);

    useEffect(() => {
        setPriceRange([minValue, maxValue]);
    }, [minValue, maxValue]);

    const handleSearchQuery = (event) => {
        onSearchChange(event.target.value);
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
        onValuesChange(value);
    };

    // const handleRatingChange = (value) => {
    //     setRatingRange(value);
    //     onRatingChange(value);
    // };

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
                <input type="text" placeholder="Search..." onChange={handleSearchQuery} />
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
                    <li>            
                        <div className="d-flex flex-column align-items-start p-2">
                            <span>Min Price: ${priceRange[0]}</span>
                            <span>Max Price: ${priceRange[1]}</span>
                            <ReactSlider
                                className="horizontal-slider d-flex align-items-center"
                                thumbClassName="thumb"
                                onChange={handlePriceChange}
                                value={priceRange}
                                pearling
                                minDistance={10}
                                min={minValue}
                                max={maxValue}
                            />
                            
                        </div>
                    </li>

                    {/* <li>            
                        <div className="d-flex flex-row align-items-center">
                            <span>Min Rating: {ratingRange[0]}</span>
                            <ReactSlider
                                className="horizontal-slider d-flex align-items-center"
                                thumbClassName="thumb"
                                onChange={handleRatingChange}
                                value={ratingRange}
                                pearling
                                minDistance={0.5}
                                min={minRating}
                                max={maxRating}
                            />
                            <span>Max Rating: {ratingRange[1]}</span>
                        </div>
                    </li> */}
                </ul>
            </div>

            <div className="dropdown me-2">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort By
                </button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={() => handleSortBy('name')}>Name</button></li>
                    <li><button className="dropdown-item" onClick={() => handleSortBy('priceRange')}>Price</button></li>
                    {/* <li><button className="dropdown-item" onClick={() => handleSortBy('eventsPriceMin')}>Lowest Ticket Price</button></li> */}
                    {/* <li><button className="dropdown-item" onClick={() => handleSortBy('eventsPriceMax')}>Highest Ticket Price</button></li> */}
                    <li><button className="dropdown-item" onClick={() => handleSortBy('venueRating')}>Rating</button></li>
                    <li><button className="dropdown-item" onClick={() => handleSortBy('dateAndTime')}>Date</button></li>
                </ul>
            </div>

            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Order By
                </button>
                <ul className="dropdown-menu">
                    <li><button className={`dropdown-item ${activeButton === 'asc' ? 'active' : ''}`} onClick={() => handleOrderBy('asc')}>Ascending</button></li>
                    <li><button className={`dropdown-item ${activeButton === 'desc' ? 'active' : ''}`} onClick={() => handleOrderBy('desc')}>Descending</button></li>
                </ul>
            </div>
        </div>
    );
}

export default SearchVenues;