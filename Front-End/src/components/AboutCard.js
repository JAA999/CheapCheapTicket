import React from 'react';
import About from './About';

function AboutCard(props) {
    return (
        <div class="genre-custom-col" >
            <div class="card about-fixed-height border-0 genre-colors">
                <img class="card-img-top fixed-height-img" src={`StaticImages/${props.image}`} alt="artistsPic1" />
                <div class="card-body  d-flex flex-column align-items-start genre-fixed-body text-start">
                    <p><b>{props.name}</b></p>
                    <div class="about-bio">
                        <p><b>Role: </b>{props.role}</p>
                        <p class="text-start"><b>About: </b>{props.bio}</p>
                    </div>
                    <p><b>Stats: </b></p>
                    <span>Commits: {props.commits}</span>
                    <span>Issues closed: {props.issues}</span>
                    <span>Unit tests: {props.tests}</span>
                </div>
            </div>
        </div>
    );
}

export default AboutCard;