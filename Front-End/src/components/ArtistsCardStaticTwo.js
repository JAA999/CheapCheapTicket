import React from "react";
import { Link } from 'react-router-dom';


function ArtistsCardStaticTwo(props) {
    return (
        <div class="card  text-black">
            <img class="card-img-top fixed-height-img" src="https://i.scdn.co/image/ab6761610000f178a0c87c8f329b436eac8b9784" alt="artistsPic" />
            <div class="card-body artist-card">

                <div class="d-flex justify-content-center">
                    <Link to={`/artists/artistspage/staticinstance2`}><h5><b>{props.ArtistsName}</b></h5></Link>
                    <p style={{ marginLeft: '10px' }}>#81</p>
                </div>
                <p><Link to={'/genre/genrestaticinstance1'}>{props.Genre}</Link></p>
                <p><b>Albums : </b>Higher, Starting Over, From A Room: Volume 2, ...</p>
            </div>
            <div class="card-footer d-flex flex-column align-items-center">
                <p><b>Venues:</b></p>
                <span>Chris Stapleton & Eric Church Tribute</span>
                <span>Chris Stapleton's All-American Road Show</span>
                <span>Chris Stapleton's All-American Road Show</span>
            </div>

        </div>


    );

}

export default ArtistsCardStaticTwo;