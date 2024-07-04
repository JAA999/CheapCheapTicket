import React from "react";
import { useParams } from "react-router-dom";


function ArtistsPage() {
    let { artistId } = useParams();
    const artist = {
        name :"poop",
        popularity: 12,
        genre : "pop",
        birth: "s",
        country: "asd",
    }
    console.log(artist.name);
    if (!artist) {
        return <p>Artist not found.</p>;
    }

    return (
        <>
            <div class="row m-2 p-5">
                <h1 class="col-xl-7 text-start">{artist.name}</h1>
                <h1 class="col-xl-3 text-end " >#{artist.popularity}</h1>
                <h3 class="col-xl-3 text-start">{artist.genre}</h3>
                <div></div>
                <p class="col-xl-3 text-start">Personal information : Birthdate : {artist.birth} Country : {artist.country} </p>
            </div>

            <div class="row m-2 p-5">
                <h1 class="col-xl-6 text-start ">Albums</h1>
                <div></div>
                {
                    artist.albums.map((albums) => (
                        <div class="card bg-secondary text-white col-lg-2 ms-4">
                            <img class="card-img-top " src="/chick.png" alt="albumCover" />
                            <p>{albums}</p>
                        </div>
                    ))
                }
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

export default ArtistsPage;