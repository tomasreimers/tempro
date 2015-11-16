'use strict';

var React = require('react');
var Nav = require('./Nav');

var MarketingContentOne = React.createClass({
  render: function() {
    return (
      <div className='content'>
        <div className='header'>
          <h1>Tempro</h1>
        </div>
        <div className='quote'>
          Calendars made for startups.
        </div>
        <p>
          In one of his <a href='http://www.paulgraham.com/makersschedule.html'>essays</a>, PG describes the productivity drain meetings can cause.
        </p>
        <p>
          "For someone on the maker's schedule, having a meeting is like throwing an exception. It doesn't merely cause you to switch from one task to another; it changes the mode in which you work."
        </p>
        <p>
          At Tempro we are working hard to change this reality&mdash;building tools which allow high growth startups to optimize their calendars and resource usage.
        </p>
      </div>
    );
  }
});

var MarketingContentTwo = React.createClass({
  render: function() {
    return (
      <div className="valueprop">
        <div className='content'>
          <div className='row'>
            <div className="col-md-4">
              <div className='row valueprop__icon'>
                <i className="fa fa-building-o"></i>
              </div>
              <div className='row valueprop__text'>
                Tempro analyzes the way meetings are organized at your company: from room utilization to meeting frequency and attendance.
              </div>
            </div>
            <div className="col-md-4">
              <div className='row valueprop__icon'>
                <i className="fa fa-bar-chart"></i>
              </div>
              <div className='row valueprop__text'>
                We generate gorgeous, interactive graphics to demonstrate trends over time, and help company management identify problems and opportunities.
              </div>
            </div>
            <div className="col-md-4">
              <div className='row valueprop__icon'>
                <i className="fa fa-code"></i>
              </div>
              <div className='row valueprop__text'>
                And provide productivity tools optimized for your employees' individual preferences, including schedulers and internal relationship graphs.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var MarketingContent = React.createClass({
  render: function() {
    return (
      <div>
        <MarketingContentOne/>
        <MarketingContentTwo/>
      </div>
    );
  }
});

module.exports = MarketingContent;
