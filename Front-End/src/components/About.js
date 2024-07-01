import React from 'react';
import { Link } from 'react-router-dom';


function About() {
  return (
    <>
      <h1 class="text-align mt-5">About Us</h1>
      <div class="row g-5 m-2">
        <div class="genre-custom-col" >
          <div class="card about-fixed-height border-0 genre-colors">
            <img class="card-img-top fixed-height-img" src="StaticImages/aboutPageReact.png" alt="artistsPic1" />

            <div class="card-body  d-flex flex-column align-items-start genre-fixed-body">
              <p><b>Austin Nguyen</b></p>
              <p><b>Role: </b>Front-End</p>
              <p class="text-start"><b>About: </b>Junior Computer Science student at Univeristy of Texas at Austin.</p>
              <p><b>Stats:</b></p>
              <span>Commits: 6</span>
              <span>Issues closed:</span>
              <span>Unit tests:</span>
            </div>
          </div>

        </div>
        <div class="genre-custom-col" >
          <div class="card about-fixed-height border-0 genre-colors">
            <img class="card-img-top fixed-height-img" src="StaticImages/aboutPagePostman.png" alt="artistsPic1" />
            <div class="card-body  d-flex flex-column align-items-start genre-fixed-body">
              <p><b>(enter name)</b></p>
              <p><b>Role: </b>(enter role(s))</p>
              <p class="text-start"><b>About: </b>(enter bio)</p>
              <p><b>Stats: </b></p>
              <span>Commits: (enter num commits)</span>
              <span>Issues closed: (enter num tickets)</span>
              <span>Unit tests: (enter num tests)</span>
            </div>
          </div>
        </div>

        <div class="genre-custom-col" >
          <div class="card about-fixed-height border-0 genre-colors">
            <img class="card-img-top fixed-height-img" src="StaticImages/aboutPagePostman.png" alt="artistsPic1" />
            <div class="card-body  d-flex flex-column align-items-start genre-fixed-body">
              <p><b>(enter name)</b></p>
              <p><b>Role: </b>(enter role(s))</p>
              <p class="text-start"><b>About: </b>(enter bio)</p>
              <p><b>Stats: </b></p>
              <span>Commits: (enter num commits)</span>
              <span>Issues closed: (enter num tickets)</span>
              <span>Unit tests: (enter num tests)</span>
            </div>
          </div>
        </div>

        <div class="genre-custom-col" >
          <div class="card about-fixed-height border-0 genre-colors">
            <img class="card-img-top fixed-height-img" src="StaticImages/aboutPagePostman.png" alt="artistsPic1" />
            <div class="card-body  d-flex flex-column align-items-start genre-fixed-body">
              <p><b>(enter name)</b></p>
              <p><b>Role: </b>(enter role(s))</p>
              <p class="text-start"><b>About: </b>(enter bio)</p>
              <p><b>Stats: </b></p>
              <span>Commits: (enter num commits)</span>
              <span>Issues closed: (enter num tickets)</span>
              <span>Unit tests: (enter num tests)</span>
            </div>
          </div>
        </div>

        <div class="genre-custom-col" >
          <div class="card about-fixed-height border-0 genre-colors">
            <img class="card-img-top fixed-height-img" src="StaticImages/aboutPagePostman.png" alt="artistsPic1" />
            <div class="card-body  d-flex flex-column align-items-start genre-fixed-body">
              <p><b>(enter name)</b></p>
              <p><b>Role: </b>(enter role(s))</p>
              <p class="text-start"><b>About: </b>(enter bio)</p>
              <p><b>Stats: </b></p>
              <span>Commits: (enter num commits)</span>
              <span>Issues closed: (enter num tickets)</span>
              <span>Unit tests: (enter num tests)</span>
            </div>
          </div>
        </div>

      </div>

      <div class="row g-5 m-2 d-flex justify-content-center">

        <div class="about-custom-col" >
          <div class="card about-fixed-height-group border-0 genre-colors">
            <div class="card-header"> <b>Group Stats & Tools</b> </div>
            <div class="card-body  d-flex flex-column align-items-start genre-fixed-body">
              <p><b>Stats: </b></p>
              <span>Total commits: 42~</span>
              <span>Total issues closed: (enter num tickets)</span>
              <span>Total unit tests: (enter num tests)</span>
              <span>Postman API: </span>
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
              <span>(insert links here)</span>

            </div>
          </div>
        </div>


      </div>





    </>
  );
}

export default About;