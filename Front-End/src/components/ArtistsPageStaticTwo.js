import React from "react";
import { useParams } from "react-router-dom";
import { artist_information } from "./Artists";
import { Link } from 'react-router-dom';


// File not to be used

function ArtistsPageStaticTwo() {
    let { artistId } = useParams();
    const artist =
    {
        name: "Chris Stapleton",
        id: 2,
        birth: "May 14",
        country: "USA",
        popularity: 81,
        genre: "Country",
        albums: ["mark1", "mark2", "mark3", "mark4", "mark5"],
        futureEvents: ["Chris Stapleton & Eric Church Tribute", "Chris Stapleton's All-American Road Show", "Chris Stapleton's All-American Road Show" , "Chris Stapleton's All-American Road Show" , "Chris Stapleton's All-American Road Show"],
        image_url: "www"


    }

    return (
        <>
            <div class="row m-2 p-5">
                <h1 class="col-xl-7 text-start">{artist.name}</h1>
                <h1 class="col-xl-3 text-end " >#{artist.popularity}</h1>
                <h3 class="col-xl-3 text-start"><Link to={'/genre/genrestaticinstance1'}>{artist.genre}</Link></h3>
                <div></div>
                <p class="col-xl-3 text-start">Personal information : <br></br>Birthdate : {artist.birth}<br></br> Country : {artist.country} </p>
            </div>

            <div class="row m-2 p-5">
                <h1 class="col-xl-6 text-start ">Albums</h1>
                <div></div>
                {/* {
                    artist.albums.map((albums) => (
                        <div class="card bg-secondary text-white col-lg-2 ms-4">
                            <img class="card-img-top " src="/chick.png" alt="albumCover" />
                            <p>{albums}</p>
                        </div>
                    ))
                } */}
                <div class="card text-black col-lg-2 ms-4 p-0 border-0">
                    <img class="card-img-top " src="https://i.scdn.co/image/ab67616d0000b273de2e30cf7205b45a0ba3877f" alt="albumCover" />
                    <p><b>Higher</b></p>
                </div>
                <div class="card text-black col-lg-2 ms-4 p-0 border-0">
                    <img class="card-img-top " src="https://i.scdn.co/image/ab67616d0000b2739408342067e2ff50d69a3c98" alt="albumCover" />
                    <p><b>Starting Over</b></p>
                </div>
                <div class="card text-black col-lg-2 ms-4 p-0 border-0">
                    <img class="card-img-top " src="https://i.scdn.co/image/ab67616d0000b27303c4f794113255be4038e45d" alt="albumCover" />
                    <p><b>From A Room: Volume 2</b></p>
                </div>
                <div class="card text-black col-lg-2 ms-4 p-0 border-0">
                    <img class="card-img-top " src="https://i.scdn.co/image/ab67616d0000b2736b3e3357c9192722c1236b49" alt="albumCover" />
                    <p><b>From A Room: Volume 1</b></p>
                </div>
                <div class="card text-black col-lg-2 ms-4 p-0 border-0">
                    <img class="card-img-top " src="https://i.scdn.co/image/ab67616d0000b273540fc1d083eac5bcff8dad21" alt="albumCover" />
                    <p><b>Traveller</b></p>
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

export default ArtistsPageStaticTwo;