import React from 'react';
import { Link } from 'react-router-dom';


function GenreInstanceOne() {
    return (
        <>
            <h1 class="text-align-center pt-5">Country</h1>
            <div class="row p-5 g-5">

                <div class="col-lg-4 ">
                    <div class="card">
                        <div class="card-header"> <h5>Top Songs</h5></div>
                        <div class="card-body  d-flex flex-column align-items-center ">
                            <p><Link to={`/artists/artistspage/staticinstance1`}>Kelsea Ballerini</Link></p>
                            <p><Link to={`/artists/artistspage/staticinstance2`}>Chris Stapleton</Link></p>
                            <p><Link to={`/artists/artistspage/staticinstance3`}>Ella Langley</Link></p>
                        </div>

                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header"><h5>Venues</h5></div>
                        <div class="card-body d-flex flex-column align-items-center ">
                            <p><a href="/venueinfo">Hy-Vee INDYCAR Sunday Race + Post Malone & Kelsea Ballerini</a> <b>$75.0 to $1000</b></p>
                            <p>Dallas, TX : <b>$150-200</b></p>
                            <p>Dallas, TX : <b>$150-500</b></p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header"> <h5>Top Artists</h5></div>
                        <div class="card-body d-flex flex-column align-items-center">
                            <p>Cowboys Cry Too (with Noah Kahan)</p>
                            <p>Think I’m In Love With You</p>
                            <p>you look like you love me (feat. Riley Green)</p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default GenreInstanceOne;