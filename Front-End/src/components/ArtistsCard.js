import React from "react";
import { Link } from 'react-router-dom';


function ArtistsCard(props) {
    return (
        <div class="card  text-black">
            <img class="card-img-top fixed-height-img" src="/public/logo192.png" alt="artistsPic" />
            <div class="card-body">

                {/* <Link to={`/artists/artistspage/${props.id}`}><h5><b>{props.ArtistsName}</b></h5></Link> */}
                <p>{props.Genre}</p>
            </div>
            
            <div class="card-body p-5">{props.VenueList}</div>
            
            

        </div>


    );

}

export default ArtistsCard;