'use strict';

import React from 'react'
import { Router, Route, Link } from 'react-router'
var temproApi = require('../libs/temproApi');
var _ = require('lodash');
var moment = require('moment');
var jQuery = require('jquery');

module.exports = React.createClass({
  mixins: [Router.Navigation],

  getInitialState: function () {
    return {
      loadedData: false,
      data: {}
    }
  },

  handleSubmit: function (event) {

    // TODO [Joe, 11-13-2015] : Share data more elegantly
    let { query } = this.props.location;

    let comment = $('#additional-feedback').val();

    event.preventDefault();
    temproApi.vote.put({
      token: query.token,
      email: query.email,
      ceid: query.ceid,
      vote: this.state.data.vote,
      comment: comment
    }).done(function(data) {

      console.log('Updates Confirmed: ', data);
    }).fail(function(error) {

      console.log('Could not update vote or comment: ', error);
    });
  },

  componentDidMount: function () {

    // Avoid closure problems later on.
    var _this = this;

    let { query } = this.props.location;

    if (query && query.token && query.email && query.ceid) {
      // TODO [Tomas, 11-9-2015] : Make sure two queries doesn't lead to race conditions

      // Immediately submit vote if possible
      if (!_.isUndefined(query.vote)) {
        temproApi.vote.put({
          token: query.token,
          email: query.email,
          ceid: query.ceid,
          vote: query.vote
        }).done(function(data) {

          // TODO [Joe, 11-13-2015] : Only at this point should user see confirmation that vote was sent from image URL
          console.log('Voted!', data)
        }).fail(function(error) {

          // TODO [Joe, 11-13-2015] : Handle Error, suggest that user resubmits through form
          console.log('Vote Fail:', error);
        });
      }

      // Get data to populate component
      temproApi.vote.get({
        token: query.token,
        email: query.email,
        ceid: query.ceid
      }).done(function(data) {

        console.log('Request Successful: ', data);

        _this.setState({
          data: data,
          loadedData: true
        });

        _this.render();

        if (data.vote != -1) {
          $('#vote_'+data.vote).addClass('selected-vote')
        }

        // Allow users to change their vote from email
        $('.email-option').click(function(event) {
          $('#vote_'+data.vote).removeClass('selected-vote');
          $(event.target).addClass('selected-vote');
          data.vote = event.target.id.slice(-1);
          _this.state.data.vote = data.vote;
        });

      }).fail(function(error) {

        // TODO [Joe, 11-13-2015] : Handle Errors
        console.log('API Call Failure', error);
      });

    } else {

      console.log('Query object not found.');
      // TODO [Joe, 11-9-2015] : Handle Error Notification and Mixin Scoping
      // this.transitionTo('/');
    }
  },

  // TODO [Joe, 11-9-2015] : Add dynamic references to number of users and number of meetings
  renderForm: function () {
    return (
      <div>
        <div id="vote-template">

          <div>
            <p>
              Thanks for taking the time to give {this.state.data.host} feedback. Your vote has been cast!
            </p>
            {/* Add a cute Slack-like tool to change the greeting randomly! */}
            <p>
               If you'd like to change your vote, or leave an anonymous comment, feel free to submit the form below. If not, have a unreal day!
            </p>
            {/* TODO [Joe, 11-9-2015] : Add validation in case this data isn't available */}
            <p>
              Event Title: {this.state.data.title}
            </p>
            <p>
              Time: {moment(this.state.data.start).calendar()}
            </p>
            <p>
              Location: {this.state.data.location}
            </p>
          </div>

          <form onSubmit={this.handleSubmit}>

            <div className="question-text">
              <p>
                {this.state.data.question.question}
              </p>
            </div>


            <div className="row vote-from-email">
              <div className="col-md-4 email-option">
                <p id="vote_1" className="vote">{this.state.data.question.votes[0]}</p>
              </div>
              <div className="col-md-4 email-option">
                <p id="vote_2" className="vote">{this.state.data.question.votes[1]}</p>
              </div>
              <div className="col-md-4 email-option">
                <p id="vote_3" className="vote">{this.state.data.question.votes[2]}</p>
              </div>
            </div>

            <div>
              <textarea id="additional-feedback" maxLength="200" cols="50" row="4" id="additional-comments" />
            </div>

            <div>
              <input className="vote-button" type="submit"/>
            </div>

          </form>

        </div>

        <div className="survey-marketing">
          <p>
            To start boosting productivity at your own meetings, simply invite feedback@tempro.xyz and join thousands of others doing the same.
          </p>
        </div>

      </div>
    );
  },

  renderLoading: function () {
    // TODO [Tomas, 11-5-2015] : Find a better loading screen
    return (
      <div className="loading">
        Just give me 7 seconds...
      </div>
    );
  },


  // Instead of wrapping entire render in vote-template, only apply class to survey form, and apply different class to marketing content.
  // This will ensure that they render at the same time, but one wraps across entire screen.
  render: function() {
    if (this.state.loadedData) {
      var mainContent = this.renderForm();
    } else {
      var mainContent = this.renderLoading();
    }
    return (
      <div>
        {mainContent}
      </div>
    );
  }
});
