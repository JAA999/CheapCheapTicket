import React from "react";
import { Link } from 'react-router-dom';


function ArtistsCardStaticThree(props) {
    return (
        <div class="card  text-black">
            <img class="card-img-top fixed-height-img" src="StaticImages/ttcp.jpeg" alt="artistsPic" />
            <div class="card-body artists-card ">
                <div class="d-flex justify-content-center">
                    <Link to={`/artists/artistspage/staticinstance3`}><h5><b>{props.ArtistsName}</b></h5></Link>
                    <p style={{ marginLeft: '10px' }}>#12</p>
                </div>                <p>{props.Genre}</p>
                <p><b>Albums : </b>Igor, Flowerboy</p>
            </div>
            <div class="card-footer d-flex flex-column align-items-center">
                <p><b>Venues:</b></p>
                <span>George, TX</span>
                <span>Dallas, TX</span>
                <span>NYC, NY</span>
            </div>

        </div>


    );

}

export default ArtistsCardStaticThree;