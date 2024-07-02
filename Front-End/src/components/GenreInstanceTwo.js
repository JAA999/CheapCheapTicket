import React from 'react';
import { Link } from 'react-router-dom';


function GenreInstanceTwo() {
    return (
        <>
            <h1 class="text-align-center pt-5">Hip-Hop/Rap</h1>
            <div class="row p-5 g-5">

                <div class="col-lg-4 ">
                    <div class="card">
                        <div class="card-header"> <h5>Top Songs</h5></div>
                        <div class="card-body  d-flex flex-column align-items-center ">
                            <p><Link to={`/artists/artistspage/staticinstance4`}>Central Cee</Link></p>
                            <p><Link to={`/artists/artistspage/staticinstance5`}>Gunna</Link></p>
                            <p>Kendrick Lamar</p>
                        </div>

                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header"><h5>Venues</h5></div>
                        <div class="card-body d-flex flex-column align-items-center ">

                            <p><Link to="/venueinfothree">Broccoli City Festival 2-day Ticket (7/27-7/28): </Link><b>$169.5 to $1069.5</b></p>

                            <p>Dallas, TX : <b>$150-200</b></p>
                            <p>Dallas, TX : <b>$150-500</b></p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header"> <h5>Top Artists</h5></div>
                        <div class="card-body d-flex flex-column align-items-center">
                            <p>BAND4BAND (feat. Lil Baby)"</p>
                            <p>"One of Wun"</p>
                            <p>"Not Like Us"</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GenreInstanceTwo;