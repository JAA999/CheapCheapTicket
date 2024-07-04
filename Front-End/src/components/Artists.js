import React from 'react';
import ArtistsCard from "./ArtistsCard";
import { useState } from 'react';


import ArtistsCardStaticOne from './ArtistsCardStaticOne';
import ArtistsCardStaticTwo from './ArtistsCardStaticTwo';
import ArtistsCardStaticThree from './ArtistsCardStaticThree';
import ArtistsCardStaticFour from './ArtistsCardStaticFour';
import ArtistsCardStaticFive from "./ArtistsCardStaticFive";
import ArtistsCardStaticSix from "./ArtistsCardStaticSix";


function Artists(props) {

    const [data, setData] = useState();

    return (
        <>

            {/* <div class="row g-5 m-2" >
                <h1>Artists</h1>
                {
                    artist_information.map((artist) => (
                        <div id={artist.id} class="col-xl-3 h-25" key={artist.id}>
                            <ArtistsCard ArtistsName={artist.name} Genre={artist.genre} />
                        </div>
                    ))
                }
            </div> */}



            {/* static dont' use */}

            {/* <div class="row g-5 m-2 " >
                <h1>Artists</h1>
                <div class="col-xl-3 h-25" >
                    <ArtistsCardStaticOne ArtistsName={"Kelsea Ballerini'"} Genre={"Country"} />
                </div >
                <div class="col-xl-3 h-25" >
                    <ArtistsCardStaticTwo ArtistsName={"Chris Stapleton"} Genre={"Country"} />
                </div >
                <div class="col-xl-3 h-25" >
                    <ArtistsCardStaticThree ArtistsName={"Ella Langley"} Genre={"Country"} />
                </div >
                <div class="col-xl-3 h-25" >
                    <ArtistsCardStaticFour ArtistsName={"Central Cee"} Genre={"Hip-Hop/Rap"} />
                </div >
                <div class="col-xl-3 h-25" >
                    <ArtistsCardStaticFive ArtistsName={"Gunna"} Genre={"Hip-Hop/Rap"} />
                </div >
                <div class="col-xl-3 h-25" >
                    <ArtistsCardStaticSix ArtistsName={"Capital Cities"} Genre={"Pop"} />
                </div >
            </div> */}

        </>

    );
}

export default Artists;

