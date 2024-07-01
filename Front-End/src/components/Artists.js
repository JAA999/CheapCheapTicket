import React from 'react';
import ArtistsCard from "./ArtistsCard";
import ArtistsCardStaticOne from './ArtistsCardStaticOne';
import ArtistsCardStaticTwo from './ArtistsCardStaticTwo';
import ArtistsCardStaticThree from './ArtistsCardStaticThree';
import ArtistsCardStaticFour from './ArtistsCardStaticFour';
import ArtistsCardStaticFive from "./ArtistsCardStaticFive";
import ArtistsCardStaticSix from "./ArtistsCardStaticSix";





export const artist_information = [
    {

        name: "Travis Scott",
        id: 1,
        birth: "May 1",
        country: "America",
        popularity: 12,
        genre: "Hip Hop",
        albums: ["astro world", "MBDTF"],
        futureEvents: ["Austin,TX", "Dallas, TX", "NYC, NY"],
        image_url: "www"

    },
    {
        name: "Tony Stark",
        id: 2,
        birth: "May 51",
        country: "USA",
        popularity: 1,
        genre: "Rap",
        albums: ["mark1", "mark2", "mark3", "mark4", "mark5"],
        futureEvents: ["Austin,TX", "NewJeresy, TX", "NYC, NY", "Deep ,Sea"],
        image_url: "www"
    },
    {
        name: "John Doe",
        id: 3,
        birth: "Aug 12",
        country: "Europe",
        popularity: 99,
        genre: "Pop",
        albums: ["Pork", "Man Man"],
        futureEvents: ["George, TX", "City, TX", "NYC, NY"],
        image_url: "www"
    },
    // {
    //     name: "first last",
    //     id: 4,
    //     birth: "mm/dd",
    //     country: "country",
    //     popularity: 100,
    //     genre: "genre",
    //     albums : ["album1" ,"album2"],
    //     futureEvents: ["city, state", "city, state", "city, state"],
    //     image_url : "www"
    // }

];

function Artists(props) {
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

            <div class="row g-5 m-2 " >
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
                
                
            </div>
            




        </>

    );
}

export default Artists;

