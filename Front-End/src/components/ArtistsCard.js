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