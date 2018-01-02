/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';

// import * as WebStorage from '../utilities/WebStorage'
import Map from "./components/Map.js"

class Root extends Component {

  render() {

    const appStyle = {
      backgroundColor: "black"
    };

    return (
      <div style = {appStyle}>
        <Map />
      </div>
    )
  }
}

const root = document.createElement('div');
document.body.appendChild(root);
render(<Root />, root);
