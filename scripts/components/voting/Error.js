'use strict';

import React from 'react';
import { Router, Route, Link } from 'react-router';

let Failure = React.createClass({

  render: function() {
    return (
      <div className="message-container">
        <i className="message-icon fa fa-exclamation-triangle"></i>
        <p className="message">{this.props.message}</p>
      </div>
    );
  }

});

module.exports = Failure;
