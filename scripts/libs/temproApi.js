var $ = require('jquery');
var testing = require('../tests/testData');
var config = require('config');

var apiBase = config.api.base;

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
