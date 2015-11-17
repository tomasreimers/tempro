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
      apiSuccess: false,
      data: {},
      query: {},
      confirmation_message: ''
    }
  },

  handleSubmit: function (event) {

    var _this = this;

    let comment = $('#additional-feedback').val();

    event.preventDefault();
    temproApi.vote.put({
      token: this.state.query.token,
      email: this.state.query.email,
      ceid: this.state.query.ceid,
      vote: this.state.data.vote,
      comment: comment
    }).done(function(data) {

      _this.setState({
        confirmation_message: 'Your vote has been cast! Thanks for submitting the form.'
      });

    }).fail(function(error) {

      _this.setState({
        confirmation_message: 'Something went wrong. Could you try submitting the form again?'
      });

    });
  },

  componentDidMount: function () {

    var _this = this;


    // Get query params and share with rest of component
    let { query } = this.props.location;

    _this.setState({
      query: query
    });

    if (query && query.token && query.email && query.ceid) {
      // TODO [Tomas, 11-9-2015] : BUG FIX : Make sure two queries doesn't lead to race conditions

      // Immediately submit vote if possible
      if (!_.isUndefined(query.vote)) {
        temproApi.vote.put({
          token: query.token,
          email: query.email,
          ceid: query.ceid,
          vote: query.vote
        }).done(function(data) {

          // If vote retrieved from URL, and submitted successfully, notify user.
          _this.setState({
            confirmation_message: 'Your vote has been submitted!'
          });

        }).fail(function(error) {

          // Vote val present in URL params, but put request failed, notify user
          _this.setState({
            confirmation_message: 'Something went wrong. Please revote by submitting the form below!'
          });

        });
      } else {

        if (_this.state.data.vote < 1 || _this.state.data.vote > 3) {

          // If vote not present in URL params, AND not already set in state, notify user.
          _this.setState({
            confirmation_message: 'We weren\'t able to retrieve your vote. Please submit the form below.'
          });
        }

      }

      // Get data to populate component
      temproApi.vote.get({
        token: query.token,
        email: query.email,
        ceid: query.ceid
      }).done(function(data) {

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

        _this.setState({
          confirmation_message: 'We weren\'t able to retrieve the meeting details. Please try reloading the page'
        });
      });

    } else {

      _this.setState({
        confirmation_message: 'Sorry! Your URL is broken. Please try clicking on the email link again.'
      });
    }
  },

  // TODO [Joe, 11-9-2015] : ENHANCEMENT : Add dynamic references to number of users and number of meetings
  renderForm: function () {
    return (
      <div>
        <div id="vote-template">

          <div>
            <p>
              Thanks for taking the time to give {this.state.data.host} feedback. {this.state.confirmation_message}
            </p>
            {/* TODO [Joe, 11-17-2015] : ENHANCEMENT : Add a cute Slack-like tool to change the greeting randomly! */}
            <p>
               If you'd like to change your vote, or leave an anonymous comment, feel free to submit the form below. If not, have a unreal day!
            </p>
            {/* TODO [Joe, 11-9-2015] : Add validation in case this data isn't available */}
            <p>
              Event Title: {this.state.data.title ? this.state.data.title : 'Not found'}
            </p>
            <p>
              Time: {moment(this.state.data.start).calendar() ? moment(this.state.data.start).calendar() : 'Not sure.'}
            </p>
            <p>
              Location: {this.state.data.location ? this.state.data.location : 'Unknown'}
            </p>
          </div>

          <form onSubmit={this.handleSubmit}>

            <div className="question-text">
              <p>
                {this.state.data.question.question ? this.state.data.question.question : 'Question From Email...'}
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
    // TODO [Tomas, 11-5-2015] : Design a better loading screen
    return (
      <div className="loading">
        Currently retrieving
      </div>
    );
  },

  apiFailure: function () {
    return (
      <div className="api-error">
        {this.state.confirmation_message}
      </div>
    );
  },

  render: function() {

    if (this.state.loadedData) {

      // All meeting data retrieved
      var mainContent = this.renderForm();

    } else if (!this.state.loadedData) {

      // Still loading
      var mainContent = this.renderLoading();

    } else {

      // API Failure
      var mainContent = this.renderApiFailure();
    }
    return (
      <div>
        {mainContent}
      </div>
    );
  }
});
