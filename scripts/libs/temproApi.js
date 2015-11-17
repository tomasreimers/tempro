var $ = require('jquery');
var testing = require('../tests/testData');

var apiBase = 'http://api.tempro.xyz/v1';

// TODO [Tomas, 11-9-2015]: Automatically create this (path dot method name)

module.exports = {

  vote: {
    get: function (queryParams) {
      return $.ajax({
        url: apiBase + '/vote',
        type: 'get',
        contentType: 'application/json',
        data: queryParams
      });
    },

    put: function (queryParams) {
      return $.ajax({
        url: apiBase + '/vote',
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify(queryParams)
      });
    }

  }
};
