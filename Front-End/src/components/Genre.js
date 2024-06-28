import React from 'react';

function Genre() {
  return (
    <>
      <div >
        <h1>Genres</h1>

        <div class="row g-5 m-2">
          <div class="custom-col" >
            <div class="card fixed-height-genre border-0 genre-colors ">
              <div class="card-header">Pop</div>
              <div class="card-body p-5">Venues</div>
            </div>
          </div >
          <div class="custom-col" >
            <div class="card fixed-height-genre border-0 genre-colors  ">
              <div class="card-header">Hip Hop</div>
              <div class="card-body p-5">Venues</div>
            </div>
          </div ><div class="custom-col" >
            <div class="card fixed-height-genre border-0 genre-colors ">
              <div class="card-header">Country</div>
              <div class="card-body p-5">Venues</div>
            </div>
          </div ><div class="custom-col" >
            <div class="card fixed-height-genre border-0 genre-colors ">
              <div class="card-header">Rap</div>
              <div class="card-body p-5">Venues</div>
            </div>
          </div ><div class="custom-col" >
            <div class="card fixed-height-genre border-0 genre-colors ">
              <div class="card-header">Jazz</div>
              <div class="card-body p-5">Venues</div>
            </div>
          </div >





        </div>

      </div>
    </>
    // <div>
    //   <h2>Genre</h2>
    //   <p>Pop, Country, Classic, Hip-Hop, and more!</p>
    // </div>
  );
}

export default Genre;