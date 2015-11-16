'use strict';

var React = require('react');
var $ = require('jquery');

(function($) {
    window.fnames = new Array();
    window.ftypes = new Array();
    fnames[0] = 'EMAIL';
    ftypes[0] = 'email';
    fnames[1] = 'FNAME';
    ftypes[1] = 'text';
    fnames[2] = 'LNAME';
    ftypes[2] = 'text';
    fnames[3] = 'COMPNAME';
    ftypes[3] = 'text';
}(jQuery));
var $mcj = jQuery.noConflict(true);

var SignUp = React.createClass({
  componentDidMount: function() {

    // Form Validation
    $('#mc_embed_signup').append("<script src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script>")
  },
  render: function() {
    return (
      <div className="content">
          <div className="row">
              <div id="mc_embed_signup">
                  <form action="//xyz.us11.list-manage.com/subscribe/post?u=8341b487988138ff16050e3b8&amp;id=8fd44abbf4" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                      <div id="mc_embed_signup_scroll">
                          <h2>Get in touch</h2>
                          <h4>Send us your contact details if you'd like to schedule a demo or request access to the private beta.</h4>
                              <div className="indicates-required">
                                  <span className="asterisk">*</span> indicates required</div>
                              <div className="mc-field-group">
                                  <label htmlFor="mce-EMAIL">Email Address
                                      <span className="asterisk">*</span>
                                  </label>
                                  <input type="email" name="EMAIL" className="required email" id="mce-EMAIL"/>
                              </div>
                              <div className="mc-field-group">
                                  <label htmlFor="mce-FNAME">First Name
                                      <span className="asterisk">*</span>
                                  </label>
                                  <input type="text" name="FNAME" className="required" id="mce-FNAME"/>
                              </div>
                              <div className="mc-field-group">
                                  <label htmlFor="mce-LNAME">Last Name
                                      <span className="asterisk">*</span>
                                  </label>
                                  <input type="text" name="LNAME" className="required" id="mce-LNAME"/>
                              </div>
                              <div className="mc-field-group">
                                  <label htmlFor="mce-COMPNAME">Company </label>
                                  <input type="text" name="COMPNAME" className="" id="mce-COMPNAME"/>
                              </div>
                              <div id="mce-responses" className="clear">
                                  <div className="response" id="mce-error-response"></div>
                                  <div className="response" id="mce-success-response"></div>
                              </div>
                              <div id="hidden-field">
                                  <input type="text" name="b_8341b487988138ff16050e3b8_8fd44abbf4" tabIndex="-1" value=""/>
                              </div>
                              <div className="clear">
                                  <input type="submit" value="Get in touch" name="subscribe" id="mc-embedded-subscribe" className="button"/>
                              </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    );
  }
});

module.exports = SignUp;
