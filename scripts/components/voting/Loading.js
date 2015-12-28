'use strict';

import React from 'react';
import { Router, Route, Link } from 'react-router';

let Loading = React.createClass({

  render: function() {

    return (
      <div className="loading-container">
        <i className="fa fa-cog fa-spin loading"></i>
      </div>
    );
  }

});

module.exports = Loading;
