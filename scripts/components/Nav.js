'use strict';

import React from 'react'
import { Router, Route, Link } from 'react-router'
let _ = require('lodash');

var Nav = React.createClass({

  mixins: [ Router.State ],

  contextTypes: {
    location: React.PropTypes.object
  },

  matchNavToPath: function(nav, path) {

    _.forOwn(nav, function(value, key) {

      if (path.pathname.includes(key)) {
        nav[key] = true;
      } else {
        nav[key] = false;
      }

    });

    return nav;

  },

  getInitialState: function() {

    let path = this.context.location;

    let nav = {
      'how-it-works': false,
      'sign-up': false
    }

    let updated_nav = this.matchNavToPath(nav, path);

    return {
      nav: updated_nav
    }
  },

  changeActiveNav: function(key_to_update) {

    let _this = this;

    return function() {

      let nav = _this.state.nav;

      // If already selected, do nothing
      if (nav[key_to_update]) {
        return
      } else {

        _.forOwn(nav, function(value, key) {

          // Deselect previously selected nav
          if (value) {
            nav[key] = false;
          }

        });

        // Select new nav
        nav[key_to_update] = true;
      }

      _this.setState({
        nav
      });
    }
  },

  render: function() {
    return (
      <div>
        <div className="nav">
          <ul className="custom-nav">
            <li><Link to="/how-it-works" onClick={this.changeActiveNav('how-it-works')} className={this.state.nav['how-it-works'] ? 'nav-link--active' : 'nav-link'}>How It Works</Link></li>
            <li><Link to="/sign-up" onClick={this.changeActiveNav('sign-up')} className={this.state.nav['sign-up'] ? 'nav-link--active' : 'nav-link'}>Grow The Community</Link></li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Nav;
