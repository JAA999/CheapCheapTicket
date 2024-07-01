import React from "react";
import { useParams } from "react-router-dom";
import { artist_information } from "./Artists";
import { Link } from 'react-router-dom';


// File not to be used

function ArtistsPageStaticThree() {
    let { artistId } = useParams();
    const artist = {
        name: "Ella Langley",
        id: 3,
        birth: "Aug 12",
        country: "Europe",
        popularity: 64,
        genre: "Country",
        albums: ["Pork", "Man Man"],
        futureEvents: ["Ella Langley", "Ella Langley", "Ella Langley", "Ella Langley"],
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
                    //         <img class="card-img-top " src="/chick.png" alt="albumCover" />
                    //         <p>{albums}</p>
                    //     </div>
                    // ))
                }
                <div class="card text-black col-lg-2 ms-4 p-0 border-0">
                    <img class="card-img-top " src="https://i.scdn.co/image/ab67616d0000b2735af0621852c2181c63954c20" alt="albumCover" />
                    <p><b>Excuse The Mess</b></p>
                </div>
                
            </div>

            <div class="row m-2 p-5 ">
                <h1 class="col-xl-6 text-start">Future Events</h1>
                {
                    artist.futureEvents.map((events) => (
                        <div class="artist-venue-links col-lg-12 text-start mb-3 p-2 rounded">
                            <p>{events} <p>Venue Link here</p></p>
                        </div>
                    ))
                }
            </div>


        </>
    );
}

export default ArtistsPageStaticThree;