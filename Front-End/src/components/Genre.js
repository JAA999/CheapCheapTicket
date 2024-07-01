import React from 'react';
import { Link } from 'react-router-dom';


function Genre() {
  return (
    <>
      <div >
        <h1>Genres</h1>

        <div class="row g-5 m-2">
          <div class="genre-custom-col" >
            <div class="card genre-fixed-height border-0 genre-colors">
              <div class="card-header"><Link to={'/genre/genrestaticinstance1'}><b>Country</b></Link> </div>

              <div class="card-body  d-flex flex-column align-items-center genre-fixed-body">
                <p><b>Artists:</b></p>
                <span><Link to={`/artists/artistspage/staticinstance1`}>Kelsea Ballerini</Link></span>
                <span><Link to={`/artists/artistspage/staticinstance2`}>Chris Stapleton</Link></span>
                <span><Link to={`/artists/artistspage/staticinstance3`}>Ella Langley</Link></span>
              </div>
              <div class="card-body d-flex flex-column align-items-center genre-fixed-body">
                <p><b>Venues:</b></p>
                <span>Hy-Vee INDYCAR Sunday Race + Post Malone & Kelsea Ballerini : <b>$75 to $1000</b></span>
                <span>Chris Stapleton & Eric Church Tribute : <b>$15.0 to $107.85</b></span>
                <span>Chris Stapleton's All-American Road Show : <b>$59.5 to $189.5</b></span>
              </div>
              <div class="card-body d-flex flex-column align-items-center genre-fixed-body">
                <p><b>Top songs:</b></p>
                <span>"Cowboys Cry Too (with Noah Kahan)"</span>
                <span>"Think I’m In Love With You"</span>
                <span>"you look like you love me (feat. Riley Green)"</span>
              </div>
            </div>
          </div>

          <div class="genre-custom-col" >
          <div class="card genre-fixed-height border-0 genre-colors">
              <div class="card-header"><Link to={'/genre/genrestaticinstance2'}><b>Hip-Hop/Rap</b></Link></div>
              <div class="card-body  d-flex flex-column align-items-center genre-fixed-body">
                <p><b>Artists:</b></p>
                <span><Link to={`/artists/artistspage/staticinstance4`}>Central Cee</Link></span>
                <span>Gunna</span>
                <span>Kendrick Lamar</span>
              </div>
              <div class="card-body d-flex flex-column align-items-center genre-fixed-body">
                <p><b>Venues:</b></p>
                <span>Broccoli City Festival 2-day Ticket (7/27-7/28) : <b>$169.5 to $1069.5</b></span>
                <span>Broccoli City Festival - SUNDAY SINGLE DAY : <b>$99.5 to $544.5</b></span>
                <span>Rockstar Energy presents Wireless - Saturday Payment Plan : <b>$49.0 to $49.0</b></span>
              </div>
              <div class="card-body d-flex flex-column align-items-center genre-fixed-body">
                <p><b>Top songs:</b></p>
                <span>"BAND4BAND (feat. Lil Baby)"</span>
                <span>"One of Wun"</span>
                <span>"Not Like Us"</span>
              </div>
            </div>
          </div ><div class="genre-custom-col" >
          <div class="card genre-fixed-height border-0 genre-colors">
              <div class="card-header"><Link to={'/genre/genrestaticinstance3'}><b>Pop</b></Link></div>
              <div class="card-body  d-flex flex-column align-items-center genre-fixed-body">
                <p><b>Artists:</b></p>
                <span><Link to={`/artists/artistspage/staticinstance6`}>Capital Cities</Link></span>
                <span>Avicii</span>
                <span>Zara Larsson</span>
              </div>
              <div class="card-body d-flex flex-column align-items-center genre-fixed-body">
                <p><b>Venues:</b></p>
                <span>The 2nd Annual Capital City Blues Festival' : <b>$55.0 to $175.0</b></span>
                <span>Maverick City Music : <b>$31.5 to $111.5</b></span>
                <span>Killer Queen : <b>$34.0 to $69.0</b></span>
              </div>
              <div class="card-body d-flex flex-column align-items-center genre-fixed-body">
                <p><b>Top songs:</b></p>
                <span>"In A Tidal Wave Of Mystery (Deluxe Edition)"</span>
                <span>"Stories"</span>
                <span>"So Good"</span>
              </div>
            </div>
          </div ><div class="genre-custom-col" >
          {/* <div class="card genre-fixed-height border-0 genre-colors">
              <div class="card-header">Pop</div>
              <p><b>#44</b></p>
              <div class="card-body  d-flex flex-column align-items-center genre-fixed-body">
                <p><b>Artists:</b></p>
                <span>Travis Scott</span>
                <span>First, Last</span>
                <span>First, Last</span>
              </div>
              <div class="card-body d-flex flex-column align-items-center genre-fixed-body">
                <p><b>Venues:</b></p>
                <span>Austin,TX : <b>$150-200</b></span>
                <span>Dallas, TX : <b>$150-200</b></span>
                <span>Dallas, TX : <b>$150-500</b></span>
              </div>
              <div class="card-body d-flex flex-column align-items-center genre-fixed-body">
                <p><b>Top songs:</b></p>
                <span>Song1</span>
                <span>Song2</span>
                <span>Song3</span>
              </div>
            </div> */}
          </div ><div class="genre-custom-col" >
          {/* <div class="card genre-fixed-height border-0 genre-colors">
              <div class="card-header">Jazz</div>
              <p><b>#44</b></p>
              <div class="card-body  d-flex flex-column align-items-center genre-fixed-body">
                <p><b>Artists:</b></p>
                <span>Travis Scott</span>
                <span>First, Last</span>
                <span>First, Last</span>
              </div>
              <div class="card-body d-flex flex-column align-items-center genre-fixed-body">
                <p><b>Venues:</b></p>
                <span>Austin,TX : <b>$150-200</b></span>
                <span>Dallas, TX : <b>$150-200</b></span>
                <span>Dallas, TX : <b>$150-500</b></span>
              </div>
              <div class="card-body d-flex flex-column align-items-center genre-fixed-body">
                <p><b>Top songs:</b></p>
                <span>Song1</span>
                <span>Song2</span>
                <span>Song3</span>
              </div>
            </div> */}
          </div >

        </div >




      </div>

    
    </>
    // <div>
    //   <h2>Genre</h2>
    //   <p>Pop, Country, Classic, Hip-Hop, and more!</p>
    // </div>
  );
}

export default Genre;