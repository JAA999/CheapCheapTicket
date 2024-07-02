import React from 'react';
import { Link } from 'react-router-dom';
import AboutCard from './AboutCard';


function About() {
  return (
    <>
      <h1 class="text-align mt-5">About Us</h1>
      <div class="row g-5 m-2">
        
        <AboutCard name ="Austin Nguyen" role="Frontend" image ="aboutPageAustin.jpg" bio="Junior Computer Science student at Univeristy of Texas at Austin. In my free time, I like to workout and swim." commits ="10" issues ="3" tests ="1"/>
        <AboutCard name ="Hudson Whipple" role="Frontend and Database" image = "aboutPageHudson.jpg"bio="I’m a junior in CS at UT Austin that is fascinated by the innovation of Machine Learning, Data Science, and Software Engineering." commits ="10" issues ="3" tests ="1"/>
        <AboutCard name ="Christopher Huelitl" role="Backend" image="aboutPageChris.jpg" bio="I am a sophomore CS major at UT Austin. I like to workout, play chess, and volunteer in my free time." commits ="10" issues ="3" tests ="1"/>
        <AboutCard name ="Joseph Arteaga" role="APIs and Flask" image ="aboutPageJosephArteaga.jpg"bio="Third year CS major at UT Austin with interest in cybersecurity and artificial intelligence."commits ="10" issues ="3" tests ="1"/>
        <AboutCard name ="Joseph Lee" image ="aboutPageJosephLee.jpg" role="Backend" bio=" I am junior CS major at UT Austin. In my free time I enjoy swimming laps and watching movies."commits ="10" issues ="3" tests ="1"/>

      </div >

      <div class="row g-5 m-2 d-flex justify-content-center">
        <div class="about-custom-col" >
          <div class="card about-fixed-height-group border-0 genre-colors">
            <div class="card-header"> <b>Group Stats & Tools</b> </div>
            <div class="card-body  d-flex flex-column align-items-start genre-fixed-body text-start">
              <p><b>Stats: </b></p>
              <span>Total commits: 50</span>
              <span>Total issues closed: 15</span>
              <span>Total unit tests: 5</span>
              <span>Postman API: <a href="https://swe2024.postman.co/workspace/SWE2024~3231d72a-7b9f-433a-8568-37710e0405b5/collection/36526083-b00b3adc-0cb6-44cb-ad61-01962ea8ec6b?action=share&creator=36526083" target="_blank">https://swe2024.postman.co/workspace/SWE2024~3231d72a-7b9f-433a-8568-37710e0405b5/collection/36526083-b00b3adc-0cb6-44cb-ad61-01962ea8ec6b?action=share&creator=36526083</a></span>
              <span>Issue Tracker: <a href="https://gitlab.com/chrisproj1/cs373-idb/-/issues" target="_blank">https://gitlab.com/chrisproj1/cs373-idb/-/issues</a> </span>
              <span>Git Repo: <a href="https://gitlab.com/chrisproj1/cs373-idb" target="_blank">https://gitlab.com/chrisproj1/cs373-idb</a></span>
              <span>Git wiki: <a href="https://gitlab.com/chrisproj1/cs373-idb/-/wikis/CheapCheapTicket?redirected_from=home" target="_blank">https://gitlab.com/chrisproj1/cs373-idb/-/wikis/CheapCheapTicket?redirected_from=home</a></span>
              <br></br>
              <p><b>Tools:  </b></p>
              <div class="d-flex flex-wrap flex-row">
                <a href="https://react.dev/" target="_blank"> <img class="about-tool-photo" src="/StaticImages/aboutPageReact.png"></img></a>
                <a href="https://getbootstrap.com/" target="_blank"> <img class="about-tool-photo" src="/StaticImages/aboutPageBootstrap.jpeg"></img></a>
                <a href="https://www.postman.com/" target="_blank"> <img class="about-tool-photo" src="/StaticImages/aboutPagePostman.png"></img></a>
                <a href="https://cloud.google.com/" target="_blank"> <img class="about-tool-photo" src="/StaticImages/aboutPageGCP.png"></img></a>
                <a href="https://flask.palletsprojects.com/en/3.0.x/" target="_blank"> <img class="about-tool-photo" src="/StaticImages/aboutPageFlask.png"></img></a>
              </div>
              <br></br>
              <p><b>Data:  </b></p>
              <span>Spotify API : <a href ="https://developer.spotify.com/documentation/web-api" target="blank">https://developer.spotify.com/documentation/web-api</a></span>
              <span>TicketMaster API : <a href ="https://developer.ticketmaster.com/products-and-docs/apis/getting-started/" target="blank">https://developer.ticketmaster.com/products-and-docs/apis/getting-started/</a></span>

              <span>Collection : <a href ="https://identity.getpostman.com/login?continue=https%3A%2F%2Fgo.postman.co%2Fworkspace%2FSWE2024~3231d72a-7b9f-433a-8568-37710e0405b5%2Fcollection%2F36526083-b00b3adc-0cb6-44cb-ad61-01962ea8ec6b%3Faction%3Dshare%26creator%3D36549615&intent=switch-account&target_team=swe2024" target="_blank">https://identity.getpostman.com/login?continue=https%3A%2F%2Fgo.postman.co%2Fworkspace%2FSWE2024~3231d72a-7b9f-433a-8568-37710e0405b5%2Fcollection%2F36526083-b00b3adc-0cb6-44cb-ad61-01962ea8ec6b%3Faction%3Dshare%26creator%3D36549615&intent=switch-account&target_team=swe2024</a></span>
            </div>
           </div>
        </div>
      </div>

    </>
  );
}

export default About;