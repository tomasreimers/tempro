'use strict';

import React from 'react'
import { Router, Route, Link } from 'react-router'
let temproApi = require('../../libs/temproApi');
// let MeetingStateFooter = require('../marketing/MeetingStateFooter');
let MeetingState = require('./MeetingState');
let _ = require('lodash');
let moment = require('moment');
let $ = require('jquery');
let Loading = require('./Loading');
let Success = require('./Success');
let Error = require('./Error');

let UpdateMeetingState = React.createClass({
  getInitialState: function() {
    return {
      loadedData: 'waiting',
      apiSuccess: false,
      data: {},
      query: {},
      confirmation_message: 'Currently retrieving',
      voted_in_url: false
    }
  },

  handleSubmit: function(event) {
    event.preventDefault();

    let _this = this;

    // Start loading animation
    _this.setState({
      loadedData: 'waiting'
    });

    let successCallback = function (data) {
      _this.setState({
        confirmation_message: 'Your feedback has been sent. Thank you!',
        loadedData: 'success'
      });
    };

    let failureCallback = function (error) {
      _this.setState({
        confirmation_message: 'Something went wrong. Could you please try submitting the form again?',
        loadedData: 'error'
      });
    };

    let { query } = _this.props.location;

    // Submit vote (via ajax)
    temproApi.vote.put({
      'token': query.token,
      'email': query.email,
      'ceid': query.ceid,
      'comment': _this.state.data.comment
    })
      .done(successCallback)
      .fail(failureCallback);

  },

  handleCommentChange: function(event) {
    let _this = this;

    let updated_data = _this.state.data;
    updated_data.comment = event.target.value;

    _this.setState({
      data: updated_data
    });
  },

  changeVoteCallback: function(vote_i) {
    let _this = this;

    return function() {
      let updated_data = _this.state.data;
      updated_data.axes[vote_i].voted = !updated_data.axes[vote_i].voted;

      _this.setState({
        data: updated_data
      });

      // make the ajax request
      let vote_data = {}
      vote_data[vote_i] = updated_data.axes[vote_i].voted

      _this.castVote(vote_data);
    };
  },

  castVote: function (vote) {
    let _this = this;

    let successCallback = function(data) {
      _this.setState({
        confirmation_message: 'Your feedback has been sent. Thank you!'
      });
    }

    let failureCallback = function(error) {
      _this.setState({
        confirmation_message: 'Something went wrong. Could you try voting again?',
        loadedData: 'error'
      });
    }

    let { query } = _this.props.location;

    // Submit vote (via ajax)
    temproApi.vote.put({
      'token': query.token,
      'email': query.email,
      'ceid': query.ceid,
      'vote': vote
    })
      .done(successCallback)
      .fail(failureCallback);

  },

  loadEventData: function () {
    let _this = this;

    let { query } = _this.props.location;

    /*
      Get data to populate component. It's possible
      they've already voted, so check that before displaying
      error messages.
    */
    temproApi.vote.get({
      token: query.token,
      email: query.email,
      ceid: query.ceid
    }).done(function(data) {

      /*
       This is necessary because the DB is temporally behind the web app if
       the vote is updated in the URL, but already exists in the DB.

       Furthermore, the vote in the URL should always take precedence over
       vote already submitted if it is available.

       Otherwise, we default to pulling out a previously submitted vote.
      */
      let true_vote = _this.state.data.vote;

      if (true_vote && (data.vote != true_vote)) {
        data.vote = true_vote
      }

      _this.setState({
        data: data,
        loadedData: 'loaded'
      });

    }).fail(function(error) {

      _this.setState({
        confirmation_message: 'Sorry, something went wrong! Please try reloading the page or checking your connection.',
        loadedData: 'error'
      });

    });
  },

  componentDidMount: function() {
    let _this = this;

    // Get query params and share with rest of component
    let { query } = this.props.location;

    // TODO [Tomas, 11-9-2015] : BUG FIX : Make sure two queries doesn't lead to race conditions
    if (!(query && query.token && query.email && query.ceid)) {
      // TODO [Tomas, 11-17-2015] : Consider simply redirecting to index, it seems it would be more likely they're fiddling with the URL than our emails broke.
      _this.setState({
        loadedData: 'error',
        confirmation_message: 'Sorry! Your URL is broken. Please try clicking on the email link again, or navigate to the home page if you\'re just fiddling with the URL'
      });
      return;
    }

    this.loadEventData()

    // Submit vote if available in URL params
    if (!_.isUndefined(query.vote)) {
      if (_.indexOf(["1","2","3","4","5","6"], query.vote) != -1){
        let vote_data = {};
        vote_data[query.vote] = true;

        this.castVote(vote_data);

        this.setState({voted_in_url: true});
      }
    }
  },

  // TODO [Joe, 11-9-2015] : ENHANCEMENT : Add dynamic references to number of users and number of meetings
  renderForm: function() {
    let _this = this;

    // define votes
    let votes = []
    _.each(this.state.data.axes, function (axis, i){
      votes.push(
        <div key={i} onClick={_this.changeVoteCallback(axis.id)} className={axis.voted ? 'vote selected-vote' : 'vote'}>
          <p>{axis.text}</p>
        </div>
      );
    });

    let top_message = "";
    if (this.state.voted_in_url) {
      top_message = (
        <div>
          <div className='thanksForVoting'>
            Thanks for voting! You don't need to do anything else.
          </div>
          <hr className='thanksDivider'/>
          <div className='butAddMore'>
            But feel free to add more.
          </div>
        </div>
      );
    }

    return (
      <div className='vote-holder'>
        {top_message}
        <div className="vote-template">
          <form onSubmit={this.handleSubmit}>
            {/* TODO [Tomas, 12-22-2015] : Let's be more explicit about what we pass */}
            <MeetingState data={this.state.data}/>

            <div className='votes'>
              {votes}
            </div>

            <div className='feedback-section'>
              <textarea onChange={this.handleCommentChange} value={this.state.data.comment} id="additional-feedback" placeholder='Any additional comments...' maxLength="200" cols="50" row="4" id="additional-comments"></textarea>
            </div>
            <div className='feedback-section'>
              <input className="vote-button" type="submit"/>
            </div>
          </form>
        </div>

        { /* <MeetingStateFooter/> */ }

      </div>
    );
  },

  // TODO [Joe, 12-04-2015] : ENHANCEMENT : Different CSS different message types
  // TODO [Tomas, 11-5-2015] : Design a better loading screen
  renderMessage: function(style) {
    return (
      <div className={style}>
        {this.state.confirmation_message}
      </div>
    );
  },

  render: function() {
    let mainContent;

    console.log('RENDERING', this.state.loadedData);

    switch (this.state.loadedData) {

      case 'loaded':
        mainContent = this.renderForm();
        break;

      case 'waiting':
        mainContent = <Loading/>;
        break;

      case 'error':
        mainContent = <Error message={this.state.confirmation_message}/>;
        break;

      case 'success':
        mainContent = <Success message={this.state.confirmation_message}/>;
        break;

      default:
        mainContent = <Loading/>;
        break;
    }

    return (
      <div>
        {mainContent}
      </div>
    );
  }
});

module.exports = UpdateMeetingState;
