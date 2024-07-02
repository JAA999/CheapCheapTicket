import React from 'react';
import { Link } from 'react-router-dom';


function GenreInstanceThree() {
    return (
        <>
            <h1 class="text-align-center pt-5">Pop</h1>
            <div class="row p-5 g-5">

                <div class="col-lg-4 ">
                    <div class="card">
                        <div class="card-header"> <h5>Top Songs</h5></div>
                        <div class="card-body  d-flex flex-column align-items-center ">
                            <p>"In A Tidal Wave Of Mystery (Deluxe Edition)"</p>
                            <p>"Stories"</p>
                            <p>"So Good"</p>
                        </div>

                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header"><h5>Venues</h5></div>
                        <div class="card-body d-flex flex-column align-items-center ">
                            <p><Link to="/venueinfotwo">The 2nd Annual Capital City Blues Festival </Link><b> : $55.0 to $175.0 </b></p>
                            <p>Maverick City Music : <b>$31.5 to $111.5</b></p>
                            <p>Killer Queen : <b>$34.0 to $69.0</b></p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header"> <h5>Top Artists</h5></div>
                        <div class="card-body d-flex flex-column align-items-center">
                            <p><Link to={`/artists/artistspage/staticinstance6`}>Capital Cities</Link></p>
                            <p>Avicii</p>
                            <p>Zara Larsson</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GenreInstanceThree;