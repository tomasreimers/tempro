'use strict';

import React from 'react';
import { Router, Route, Link } from 'react-router';

let Success = React.createClass({

  render: function() {

    return (
      <div className="message-container">
        <i className="message-icon fa fa-check"></i>
        <p className="message">{this.props.message}</p>
      </div>
    );
  }

});

module.exports = Success;
