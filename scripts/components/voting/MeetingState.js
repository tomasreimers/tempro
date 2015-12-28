'use strict';

import React from 'react'
import { Router, Route, Link } from 'react-router'
let temproApi = require('../../libs/temproApi');
let _ = require('lodash');
let moment = require('moment');
let $ = require('jquery');

let MeetingState = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {

    return (

      <div>
        {/* TODO [Tomas, 12-22-2015] : All of these ternary operators seem like the encourage invariant breaking code. */}
        <div className='votePrompt'>
          <p className='voteTitle'>
            {this.props.data.title ? this.props.data.title : 'Not found'}
          </p>
          <p className='voteDate'>
            {moment(this.props.data.start).calendar() ? moment(this.props.data.start).calendar() : 'Not sure.'}
          </p>
          <p className='voteQuestion'>
            How could the meeting have been improved?
          </p>
        </div>

      </div>

    );
  }
});

module.exports = MeetingState;
