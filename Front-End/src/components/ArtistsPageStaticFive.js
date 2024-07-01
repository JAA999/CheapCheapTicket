import React from "react";
import { useParams } from "react-router-dom";
import { artist_information } from "./Artists";
import { Link } from 'react-router-dom';


// File not to be used

function ArtistsPageStaticFive() {
    let { artistId } = useParams();
    const artist =
    {
        name: "Gunna ",
        id: 2,
        birth: "May 14",
        country: "USA",
        popularity: 86,
        genre: "Hip-Hop/Rap",
        albums: ["mark1", "mark2", "mark3", "mark4", "mark5"],
        futureEvents: ["Broccoli City Festival 2-day Ticket (7/27-7/28)", "Broccoli City Festival - SUNDAY SINGLE DAY", "Rockstar Energy presents Wireless - Saturday Payment Plan"],
        image_url: "www"


    }
    // let albums_covers = ['https://i.scdn.co/image/ab67616d0000b273c67636f3021f5869095c0fc5', 'https://i.scdn.co/image/ab67616d0000b273017d5e26552345c4b1575b6c', 'https://i.scdn.co/image/ab67616d0000b27314d91ebdd6d7e2931322cc1a', 'https://i.scdn.co/image/ab67616d0000b273bbb071648c950e560ae95b76', 'https://i.scdn.co/image/ab67616d0000b2737939ff11c32b23060cc22bb5', 'https://i.scdn.co/image/ab67616d0000b273fae944bd93dd1e47591a0df9', 'https://i.scdn.co/image/ab67616d0000b273d7547a7624116ac5f8a51fd2', 'https://i.scdn.co/image/ab67616d0000b273bddf008ccaea655e61892c27', 'https://i.scdn.co/image/ab67616d0000b273ce159a3ba2096e13fa9d4b4c', 'https://i.scdn.co/image/ab67616d0000b273d00a36fea0639c48eb0ee312', 'https://i.scdn.co/image/ab67616d0000b273dcb5f3bbd5e9fbe873ac68f4', 'https://i.scdn.co/image/ab67616d0000b273d7ee986deb6c2903b225ada4', 'https://i.scdn.co/image/ab67616d0000b273d85ca96db7186d800e75e895'];
    return (
        <>
            <div class="row m-2 p-5">
                <h1 class="col-xl-7 text-start">{artist.name}</h1>
                <h1 class="col-xl-3 text-end " >#{artist.popularity}</h1>
                <h3 class="col-xl-3 text-start"><Link to={'/genre/genrestaticinstance2'}>{artist.genre}</Link></h3>
                <div></div>
                <p class="col-xl-3 text-start">Personal information : <br></br>Birthdate : {artist.birth}<br></br> Country : {artist.country} </p>
            </div>

            <div class="row m-2 p-5">
                <h1 class="col-xl-6 text-start ">Albums</h1>
                <div></div>
                <div class="card text-black col-lg-2 ms-4 p-0 border-0">
                    <img class="card-img-top " src="https://i.scdn.co/image/ab67616d0000b273c67636f3021f5869095c0fc5" alt="albumCover" />
                    <p><b>One of Wun</b></p>
                </div>


            </div>

            <div class="row m-2 p-5 ">
                <h1 class="col-xl-6 text-start">Future Events</h1>
                {/* {
                    artist.futureEvents.map((events) => (
                        <div class="artist-venue-links col-lg-12 text-start mb-3 p-2 rounded">
                            <p>{events} <p>Venue Link here</p></p>
                        </div>
                    ))
                } */}

<div class="artist-venue-links col-lg-12 text-start mb-3 p-2 rounded">
                    <p>Broccoli City Festival 2-day Ticket (7/27-7/28)
                <p><Link to={'/venueinfothree'}>Link to Venue</Link></p></p>
                        </div>
            </div>




        </>
    );
}

export default ArtistsPageStaticFive;