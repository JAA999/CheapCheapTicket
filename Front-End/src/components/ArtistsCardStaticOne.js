import React from "react";
import { Link } from 'react-router-dom';

// Kelsea Ballerini', 'id': '3RqBeV12Tt7A8xH3zBDDUF
// static component, not to be used on phase 2


function ArtistsCardStaticOne(props) {
    return (
        <div class="card  text-black">
            <img class="card-img-top fixed-height-img" src="https://i.scdn.co/image/ab6761610000f17855610aaacf2c2cceb1c7fb19" alt="artistsPic1" />
            <div class="card-body artist-card ">
                <div class ="d-flex justify-content-center">
                    <Link to={`/artists/artistspage/staticinstance1`}><h5><b>{props.ArtistsName}</b></h5></Link>
                    <p style={{ marginLeft: '10px' }}>#67</p>
                </div>
                <p><Link to={'/genre/genrestaticinstance1'}>{props.Genre}</Link></p>
                <p><b>Albums : </b>Rolling Up the Welcome Mat (For Good), SUBJECT TO CHANGE, ballerini, ...</p>

            </div>
            <div class="card-footer d-flex flex-column align-items-center">
                <p><b>Venues:</b></p>
                <span>Hy-Vee INDYCAR Sunday Race + Post Malone & Kelsea Ballerini</span>
            </div>

        </div>


    );

}

export default ArtistsCardStaticOne;