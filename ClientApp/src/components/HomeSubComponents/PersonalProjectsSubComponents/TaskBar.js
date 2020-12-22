import React, { Component } from 'react';
import GithubLogo from "../../../assets/github.png";
import Kaggle from "../../../assets/kaggle.png";
import './TaskBar.css';

export class TaskBarElement extends Component {
    static displayName = TaskBarElement.name;
    //Creates a element with vertical line 
    // props: src and vertical_line
    
    render() {
            return (
                <div>
                    <input id="icon" type="image" style={{ marginLeft: "10px", marginRight:"10px" }} src={this.props.src} />
                </div>
            );
        }
}

export class TaskBar extends Component {
    static displayName = TaskBar.name;

  render () {
      return (
          <div id="base">
              <TaskBarElement src={GithubLogo} vertical_line={true} />
          </div>
    );
  }
}
