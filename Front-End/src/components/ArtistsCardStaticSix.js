import React from "react";
import { Link } from 'react-router-dom';


function ArtistsCardStaticFour(props) {
    return (
        <div class="card  text-black">
            <img class="card-img-top fixed-height-img" src="https://i.scdn.co/image/04ac605956b34c1a2f6a4872554248e4f2276be9" alt="artistsPic" />
            <div class="card-body artist-card ">
                <div class="d-flex justify-content-center">
                    <Link to={`/artists/artistspage/staticinstance6`}><h5><b>{props.ArtistsName}</b></h5></Link>
                    <p style={{ marginLeft: '10px' }}>#65</p>
                </div>                <p><Link to={'/genre/genrestaticinstance3'}>{props.Genre}</Link></p>
                <p><b>Albums : </b>Napoleon, Solarize, In A Tidal Wave Of Mystery</p>
            </div>
            <div class="card-footer d-flex flex-column align-items-center artist-card-footer">
                <p><b>Venues:</b></p>
                <span>The 2nd Annual Capital City Blues Festival</span>
               
            </div>

        </div>


    );

}

export default ArtistsCardStaticFour;