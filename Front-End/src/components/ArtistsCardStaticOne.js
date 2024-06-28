import React from "react";
import { Link } from 'react-router-dom';


function ArtistsCardStaticOne(props) {
    return (
        <div class="card  text-black">
            <img class="card-img-top fixed-height-img" src="StaticImages/tp.jpeg" alt="artistsPic1" />
            <div class="card-header">


            <Link to={`/artists/artistspage/staticinstance1`}>{props.ArtistsName}</Link>
            </div>
            <div class="card-header">{props.Genre}</div>
            <div class="card-body p-5">{props.VenueList}</div>

        </div>


    );

}

export default ArtistsCardStaticOne;