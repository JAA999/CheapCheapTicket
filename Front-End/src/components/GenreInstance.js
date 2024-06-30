import React from 'react';

function GenreInstance() {
    return (
        <>
            <h1 class="text-align-center pt-5">Pop #44</h1>
            <div class="row p-5 g-5">

                <div class="col-lg-4 ">
                    <div class="card">
                        <div class="card-header"> <h5>Top Songs</h5></div>
                        <div class="card-body  d-flex flex-column align-items-center ">
                            <p>Travis Scott</p>
                            <p>First, Last</p>
                            <p>First, Last</p>
                        </div>

                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header"><h5>Venues</h5></div>
                        <div class="card-body d-flex flex-column align-items-center ">
                            <p>Austin,TX : <b>$150-200</b></p>
                            <p>Dallas, TX : <b>$150-200</b></p>
                            <p>Dallas, TX : <b>$150-500</b></p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header"> <h5>Top Artists</h5></div>
                        <div class="card-body d-flex flex-column align-items-center">
                            <p>Song1</p>
                            <p>Song2</p>
                            <p>Song3</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GenreInstance;