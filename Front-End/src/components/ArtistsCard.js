import React from "react";
import { Link } from 'react-router-dom';


function ArtistsCard(props) {
    return (
        <div class="card  text-black">
            <img class="card-img-top fixed-height-img" src="/public/logo192.png" alt="artistsPic" />
            <div class="card-body artist-card">

                <div class="d-flex justify-content-center">
                    {/* <Link to={`/artists/artistspage/${props.id}`}><h5><b>{props.ArtistsName}</b></h5></Link> */}
                    <p style={{ marginLeft: '10px' }}>#1</p>
                </div>
                <p>{props.Genre}</p>
                <p><b>Albums : </b>Ironman 1 Soundtrack, Ironman 2 Soundtrack</p>
            </div>
            <div class="card-body p-5">{props.VenueList}</div>
            {/* <div class="card-footer d-flex flex-column align-items-center">
                <p><b>Venues:</b></p>
                <span>Austin,TX</span>
                <span>NewJeresy, TX</span>
                <span>NYC, NY</span>
            </div> */}

        </div>


    );

}

export default ArtistsCard;