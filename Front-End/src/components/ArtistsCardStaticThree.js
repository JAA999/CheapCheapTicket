import React from "react";
import { Link } from 'react-router-dom';


function ArtistsCardStaticThree(props) {
    return (
        <div class="card  text-black">
            <img class="card-img-top fixed-height-img" src="https://i.scdn.co/image/ab6761610000f17872f6aec99524045fbfd77598" alt="artistsPic" />
            <div class="card-body artist-card ">
                <div class="d-flex justify-content-center">
                    <Link to={`/artists/artistspage/staticinstance3`}><h5><b>{props.ArtistsName}</b></h5></Link>
                    <p style={{ marginLeft: '10px' }}>#12</p>
                </div>                <p><Link to={'/genre/genrestaticinstance1'}>{props.Genre}</Link></p>
                <p><b>Albums : </b>Excuse The Mess</p>
            </div>
            <div class="card-footer d-flex flex-column align-items-center">
                <p><b>Venues:</b></p>
                <span>Ella Langley</span>
                <span>Ella Langley</span>
                <span>Ella Langley</span>
            </div>

        </div>


    );

}

export default ArtistsCardStaticThree;