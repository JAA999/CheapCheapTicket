import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import axios from 'axios';

function SearchContainer({ onOrderChange, onSortChange, onFilterChange, onValuesChange, onSearchChange }) {

    const [filterValues, setfilterValues] = useState([]);
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get('/GetAllGenres');
                console.log(response.data);
                const optionList = response.data.map(event => ({ id: event.id, name: event.name }));
                console.log(optionList);
                setfilterValues(optionList);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };
        fetchOptions();
    }, []);

    // search name - string
    const [stringInput, setStringInput] = useState('');
    const handleChange = (event) => {
        setStringInput(event.target.value);
        onSearchChange(event.target.value); // Call onSearchChange on every input change
    };

    const [rangeDisplay, setRangeDisplay] = useState([100, 1]);
    const handleValuesChange = (value) => {
        setRangeDisplay(value);
        onValuesChange(value);
    };

    // genres 
    const [activeButtonFilter, setActiveButtonFilter] = useState('');
    const handleFilterBy = (value) => {
        setActiveButtonFilter(value);
        onFilterChange(value);
    };

    // name and popularity
    const [activeButtonSort, setActiveButtonSort] = useState('');
    const handleSortBy = (value) => {
        setActiveButtonSort(value);
        onSortChange(value);
    };

    const [activeButton, setActiveButton] = useState('');
    const handleOrderBy = (value) => {
        setActiveButton(value);
        onOrderChange(value);
    };

    const handleMouseDown = (event) => {
        event.stopPropagation();
    };

    return (
        <>
            <div className="d-flex flex-row justify-content-center align-items-center p-4">
                <div className="me-2">
                    <input type="text" value={stringInput} placeholder="Search..." maxLength={100} onChange={handleChange} />
                </div>

                <div className="dropdown me-2">
                    <button className="btn btn-secondary dropdown-toggle drop-down-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Ranges
                    </button>
                    <ul className="dropdown-menu" data-bs-auto-close="false" onMouseDown={handleMouseDown}>
                        <li>
                            <div className="d-flex flex-column align-items-start p-2">
                                <span>Popularity out of 100 </span>
                                <span>Highest : {rangeDisplay[0]}</span>
                                <span>Lowest : {rangeDisplay[1]}</span>
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
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="dropdown me-2">
                    <button className="btn btn-secondary dropdown-toggle drop-down-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Genres
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className={`dropdown-item ${activeButtonFilter === '' ? 'active' : ''}`} onClick={() => handleFilterBy('')}>None</button></li>
                        {
                            filterValues.map((option, index) =>
                                <li key={index}><button className={`dropdown-item ${activeButtonFilter === option.name ? 'active' : ''}`} onClick={() => handleFilterBy(option.name)}>{option.name}</button></li>
                            )
                        }
                    </ul>
                </div>

                <div className="dropdown me-2">
                    <button className="btn btn-secondary dropdown-toggle drop-down-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sort By
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className={`dropdown-item ${activeButtonSort === '' ? 'active' : ''}`} onClick={() => handleSortBy('')}>None</button></li>
                        <li><button className={`dropdown-item ${activeButtonSort === 'name' ? 'active' : ''}`} onClick={() => handleSortBy('name')}>Name</button></li>
                        <li><button className={`dropdown-item ${activeButtonSort === 'popularity' ? 'active' : ''}`} onClick={() => handleSortBy('popularity')}>Popularity</button></li>
                    </ul>
                </div>

                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle drop-down-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Order By
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className={`dropdown-item ${activeButton === '' ? 'active' : ''}`} onClick={() => handleOrderBy('')}>None</button></li>
                        <li><button className={`dropdown-item ${activeButton === 'ascending' ? 'active' : ''}`} onClick={() => handleOrderBy('asc')}>Ascending</button></li>
                        <li><button className={`dropdown-item ${activeButton === 'descending' ? 'active' : ''}`} onClick={() => handleOrderBy('desc')}>Descending</button></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SearchContainer;
