import React, { Component } from 'react';
import Photo from "../../../assets/qt.jpg"
import PreviousIcon from "../../../assets/prev.png";

import './ProjectsSpace.css';

export class ProjectsSpace extends Component {
    static displayName = ProjectsSpace.name;
    constructor(props) {
        super(props);
        this.nextArticle = this.nextArticle.bind(this);
        this.prevArticle = this.prevArticle.bind(this);
    }
    //to do Bar

    nextArticle(e){
        this.props.onArticleChanged(e, +1);
    }
    prevArticle(e) {
        this.props.onArticleChanged(e, -1);
    }

  render () {
      return (
          <div id="ProjectsSpaceDiv">
              <div id="Photo">
                  <img id="overviewImg" src={this.props.photo}/>
              </div>

              <div id="Text">
                  <h1 style={{ fontSize: "45px", color: "white" }}>
                      {this.props.title}
                  </h1>
                  <h2 style={{ fontSize: "21px", color: "white" }}>
                      {this.props.overview}
                  </h2>
              </div>
              <div id="NavigationButtonSection">
                  <img class="NavButton" onClick={this.prevArticle} src={PreviousIcon} />

                  <h2 style={{ display: "inline-block", position: "relative", top: "3px", color: "white" }}>
                      {this.props.article + 1}/{this.props.maxArticle}</h2>
                  <img class="NavButton" onClick={this.nextArticle} src={PreviousIcon} style={{ transform: "rotate(180deg)" }} /> 
              </div>

          </div>
          
    );
  }
}
