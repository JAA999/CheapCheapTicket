import React from "react";
import { Link } from 'react-router-dom';


function ArtistsCard(props) {
    return (
        <div class="card  text-black">
            <img class="card-img-top fixed-height-img" src="/public/logo192.png" alt="artistsPic" />
            <div class="card-header">

                {/* <Link to={`/artists/artistspage/${props.id}`}>{props.ArtistsName}</Link> */}
            </div>
            <div class="card-header">{props.Genre}</div>
            <div class="card-body p-5">{props.VenueList}</div>

        </div>


    );

}

export default ArtistsCard;