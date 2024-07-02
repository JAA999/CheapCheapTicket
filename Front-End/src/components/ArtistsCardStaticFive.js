import React from "react";
import { Link } from 'react-router-dom';

// Kelsea Ballerini', 'id': '3RqBeV12Tt7A8xH3zBDDUF
// static component, not to be used on phase 2


function ArtistsCardStaticFive(props) {
    return (
        <div class="card  text-black">
            <img class="card-img-top fixed-height-img" src="https://i.scdn.co/image/ab6761610000f178b978b95b8e03351df8e103af" alt="artistsPic1" />
            <div class="card-body artist-card ">
                <div class ="d-flex justify-content-center">
                    <Link to={`/artists/artistspage/staticinstance5`}><h5><b>{props.ArtistsName}</b></h5></Link>
                    <p style={{ marginLeft: '10px' }}>#67</p>
                </div>
                <p><Link to={'/genre/genrestaticinstance2'}>{props.Genre}</Link></p>
                <p><b>Albums : </b>One of Wun, a Gift & a Curse, DS4EVER, ...</p>

            </div>
            <div class="card-footer d-flex flex-column align-items-center artist-card-footer">
                <p><b>Venues:</b></p>
                <span>Broccoli City Festival 2-day Ticket (7/27-7/28)</span>
                <span>Broccoli City Festival - SUNDAY SINGLE DAY</span>
                <span>Rockstar Energy presents Wireless - Saturday Payment Plan</span>

            </div>

        </div>


    );

}

export default ArtistsCardStaticFive;