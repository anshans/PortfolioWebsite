import React, { Component } from 'react';
import { PersonalProjects } from './HomeSubComponents/PersonalProjects';
import './Home.css';

import Video from '../assets/warsaw.mp4';

export class Home extends Component {
    static displayName = Home.name;
    myName = "Jakub Miroś";

  render () {
      return (
          <div style={{ height: "100%" }}>

              <div id="vidtextHeader">
                  
                  <video loop autoPlay>
                      <source src={Video} type="video/mp4" />
                  </video>
                  <h1 id="IntroText">
                      Welcome to my Site!<br />
                      <h2 id="IntroTextH2">
                          Thanks for taking your time.
                      </h2>
                  </h1>
                  <hr id="h1h2" />
              </div>

              <div class='ContainerWithBorders'>
                  <div id="AboutMe" style={{ borderRadius: "15px 0px 0px 15px"}}>
                      <h1 style={{ color: "white" }} > About Me: </h1>
                      <h2 style={{ color: "white" }}>My name is {this.myName} and I am a senior year Computer Science student at the Rzeszow University of Technology.
                      I am passionate about programming, data science, and finance. Currently,
                      I am seeking internship opportunities or a job.
                          </h2>
                  </div>
                  <div id="Contact" style={{ borderRadius: "0px 15px 15px 0px" }}>
                      <h1 >Contact: </h1>
                      <h2>
                          jakubmiros99@gmail.com<br />
                          +48 667 951 156<br/>
                      </h2>
                      <h1>Accounts: </h1>
                      <h2>
                          <a href="https://www.linkedin.com/in/jakubmiros/" target="_blank">Linkedin: </a><br />
                          <a href="https://github.com/anshans" target="_blank">Github: </a><br />
                      </h2>
                      </div>
              </div>


              <div class="ContainerWithBorders">
                  <PersonalProjects/>
              </div>

          </div>
    );
  }
}
