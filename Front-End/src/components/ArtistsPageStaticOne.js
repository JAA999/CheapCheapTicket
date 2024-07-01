import React from "react";
import { useParams } from "react-router-dom";
import { artist_information } from "./Artists";
import { Link } from 'react-router-dom';


// File not to be used

function ArtistsPageStaticOne() {
    let { artistId } = useParams();
    const artist = {
        name: "Kelsea Ballerini",
        id: 67,
        birth: "May 1",
        country: "America",
        popularity: 12,
        genre: "Country",
        albums: ["astro world", "MBDTF"],
        futureEvents: ["Hy-Vee INDYCAR Sunday Race + Post Malone & Kelsea Ballerini"],
        image_url: "www"

    }

    return (
        <>
            <div class="row m-2 p-5">
                <h1 class="col-xl-7 text-start">{artist.name}</h1>
                <h1 class="col-xl-3 text-end " >#{artist.popularity}</h1>
                <h3 class="col-xl-3 text-start"><Link to={'/genre/genrestaticinstance1'}>{artist.genre}</Link></h3>
                <div></div>
                <p class="col-xl-3 text-start">Personal information :<br></br> Birthdate : {artist.birth} <br></br>Country : {artist.country} </p>
            </div>

            <div class="row m-2 p-5">
                <h1 class="col-xl-6 text-start ">Albums</h1>
                <div></div>
                {
                    // artist.albums.map((albums) => (
                    //     <div class="card bg-secondary text-white col-lg-2 ms-4">
                    //         <img class="card-img-top " src="/StaticImages/aw.jpg" alt="albumCover" />
                    //         <p>{albums}</p>
                    //     </div>
                    // ))

                }

                <div class="card text-black col-lg-2 ms-4 p-0 border-0">
                    <img class="card-img-top " src="https://i.scdn.co/image/ab67616d0000b273cae570218a1b4e5572b8c279" alt="albumCover" />
                    <p><b>Rolling Up the Welcome Mat</b></p>
                </div>
                <div class="card text-black col-lg-2 ms-4 p-0 border-0">
                    <img class="card-img-top " src="https://i.scdn.co/image/ab67616d0000b2737de9d89cc5220c52c731db5c" alt="albumCover" />
                    <p><b>SUBJECT TO CHANGE</b></p>
                </div>
                <div class="card text-black col-lg-2 ms-4 p-0 border-0">
                    <img class="card-img-top " src="https://i.scdn.co/image/ab67616d0000b2736cfd8376a0faaf6e9a5240b6" alt="albumCover" />
                    <p><b>ballerini</b></p>
                </div>
                <div class="card text-black col-lg-2 ms-4 p-0 border-0">
                    <img class="card-img-top " src="https://i.scdn.co/image/ab67616d0000b2739b166795e8069959a5c2645b" alt="albumCover" />
                    <p><b>kelsea</b></p>
                </div>
                <div class="card text-black col-lg-2 ms-4 p-0 border-0">
                    <img class="card-img-top " src="https://i.scdn.co/image/ab67616d0000b2737dab00afddeab0d3ee19ff7d" alt="albumCover" />
                    <p><b>Unapologetically (Deluxe Edition)</b></p>
                </div>

                <div class="card text-black col-lg-2 ms-4 p-0 border-0">
                    <img class="card-img-top " src="https://i.scdn.co/image/ab67616d0000b2737cc5cee7a9cce28c932661c8" alt="albumCover" />
                    <p><b>The First Time</b></p>
                </div>


            </div>

            <div class="row m-2 p-5 ">
                <h1 class="col-xl-6 text-start">Future Events</h1>
                
                <div class="artist-venue-links col-lg-12 text-start mb-3 p-2 rounded">
                    <p>Hy-Vee INDYCAR Sunday Race + Post Malone & Kelsea Ballerini
                        <p><Link to={'/venueinfo'}>Link to Venue</Link></p></p>

                </div>
            </div>


        </>
    );
}

export default ArtistsPageStaticOne;