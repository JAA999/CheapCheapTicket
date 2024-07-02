import React from "react";
import { Link } from 'react-router-dom';


function ArtistsCardStaticFour(props) {
    return (
        <div class="card  text-black">
            <img class="card-img-top fixed-height-img" src="https://i.scdn.co/image/ab6761610000f1785fe7cabb8de1c0266cd2179c" alt="artistsPic" />
            <div class="card-body artist-card ">
                <div class="d-flex justify-content-center">
                    <Link to={`/artists/artistspage/staticinstance4`}><h5><b>{props.ArtistsName}</b></h5></Link>
                    <p style={{ marginLeft: '10px' }}>#82</p>
                </div>                <p><Link to={'/genre/genrestaticinstance2'}>{props.Genre}</Link></p>
                <p><b>Albums : </b>23, Wild West</p>
            </div>
            <div class="card-footer d-flex flex-column align-items-center artist-card-footer">
                <p><b>Venues:</b></p>
               
            </div>

        </div>


    );

}

export default ArtistsCardStaticFour;