'use strict';

import React from 'react'
import { Router, Route, Link } from 'react-router'

var Nav = React.createClass({
  render: function() {
    return (
      <div>
        <div className="top">
          <video autoPlay loop poster="images/hourglass.png" id="bgvid">
            <source src="images/hourglass.mp4" type="video/mp4" />
          </video>
          <div className="shade" />
          <ul className="custom-nav">
            <li className="login"><Link to="/how-it-works" className="login">How It Works</Link></li>
            <li className="login"><Link to="/sign-up" className="login">Sign Up</Link></li>
          </ul>
          <div className="main">
            <img className="logo" src="images/logo.png" alt="logo" />
            <h2>It's about time.</h2>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Nav;
