import React from "react";
import { useParams } from "react-router-dom";
import { artist_information } from "./Artists";

// File not to be used

function ArtistsPageStaticThree() {
    let { artistId } = useParams();
    const artist = {
        name: "Tyler the Creator",
        id: 3,
        birth: "Aug 12",
        country: "Europe",
        popularity: 99,
        genre: "Pop",
        albums: ["Pork", "Man Man"],
        futureEvents: ["George, TX", "Dallas, TX", "NYC, NY"],
        image_url: "www"
    }

    return (
        <>
            <div class="row m-2 p-5">
                <h1 class="col-xl-7 text-start">{artist.name}</h1>
                <h1 class="col-xl-3 text-end " >#{artist.popularity}</h1>
                <h3 class="col-xl-3 text-start">{artist.genre}</h3>
                <div></div>
                <p class="col-xl-3 text-start">Personal information :<br></br> Birthdate : {artist.birth} <br></br>Country : {artist.country} </p>
            </div>

            <div class="row m-2 p-5">
                <h1 class="col-xl-6 text-start ">Albums</h1>
                <div></div>
                {
                    // artist.albums.map((albums) => (
                    //     <div class="card bg-secondary text-white col-lg-2 ms-4">
                    //         <img class="card-img-top " src="/chick.png" alt="albumCover" />
                    //         <p>{albums}</p>
                    //     </div>
                    // ))
                }
                <div class="card text-black col-lg-2 ms-4 p-0 border-0">
                    <img class="card-img-top " src="/StaticImages/igor.jpg" alt="albumCover" />
                    <p><b>Igor</b></p>
                </div>
                <div class="card text-black col-lg-2 ms-4 p-0 border-0">
                    <img class="card-img-top " src="/StaticImages/fb.png" alt="albumCover" />
                    <p><b>Flower Boy</b></p>
                </div>
            </div>

            <div class="row m-2 p-5 ">
                <h1 class="col-xl-6 text-start">Future Events</h1>
                {
                    artist.futureEvents.map((events) => (
                        <div class="bg-secondary col-lg-12 text-start mb-3 p-2 rounded">
                            <p>{events} <p>Venue Link here</p></p>
                        </div>
                    ))
                }
            </div>


        </>
    );
}

export default ArtistsPageStaticThree;