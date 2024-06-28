import React from "react";
import { Link } from 'react-router-dom';


function ArtistsCardStaticTwo(props) {
    return (
        <div class="card  text-black">
            <img class="card-img-top fixed-height-img" src="StaticImages/imp.jpeg" alt="artistsPic" />
            <div class="card-header">


            <Link to={`/artists/artistspage/staticinstance2`}><b>{props.ArtistsName}</b></Link>
            </div>
            <div class="card-header">{props.Genre}</div>
            <div class="card-body p-5">{props.VenueList}</div>

        </div>


    );

}

export default ArtistsCardStaticTwo;