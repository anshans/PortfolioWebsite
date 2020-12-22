import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Video from '../assets/warsaw.mp4';


export class Layout extends Component {
  static displayName = Layout.name;

    render() {
        return (
            <div style={{ height:"100%" }}>
          {this.props.children}
        </div>
    );
  }
}
