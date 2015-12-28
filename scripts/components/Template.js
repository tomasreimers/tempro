'use strict';

var React = require('react');
var Nav = require('./Nav');

var Template = React.createClass({
  render: function() {
    return (
      <div>
        <Nav />
        {this.props.children}
        <div className="footer">
            <p><i className="fa fa-creative-commons"></i> Tempro 2015</p>
        </div>
      </div>
    );
  }
});

module.exports = Template;
