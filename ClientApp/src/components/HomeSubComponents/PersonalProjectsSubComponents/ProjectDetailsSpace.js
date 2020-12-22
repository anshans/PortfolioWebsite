import React, { Component } from 'react';
import { gsap } from "gsap";


import './ProjectDetailsSpace.css';


export class ProjectDetailsSpace extends Component {
    static displayName = ProjectDetailsSpace.name;

  render () {
      return (
          <div id="Details">
              <h1 style={{ fontSize: "30px" }}><a href={this.props.url} target="_blank">Link to repository:</a></h1>
              <h1 style={{ fontSize: "45px" }}>Description:</h1>
              <h2 style={{ fontSize: "21px" }}> {this.props.description} </h2>
               
          </div>
    );
  }
}
