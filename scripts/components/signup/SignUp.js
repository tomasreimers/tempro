'use strict';

let React = require('react');
let $ = require('jquery');

(function($) {
    window.fnames = new Array();
    window.ftypes = new Array();
    fnames[0] = 'EMAIL';
    ftypes[0] = 'email';
    fnames[1] = 'NAME';
    ftypes[1] = 'text';
    fnames[2] = 'FEATURES';
    ftypes[2] = 'text';
    fnames[3] = 'COMPNAME';
    ftypes[3] = 'text';
}(jQuery));
var $mcj = jQuery.noConflict(true);

let SignUp = React.createClass({
  componentDidMount: function() {

    // Form Validation needs to be re-appended each time component mounts
    $('#mc_embed_signup').append("<script src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script>");
  },
  render: function() {
    return (
      <div className="content">
          <div className="row">
              <div id="mc_embed_signup">
                  <form action="//xyz.us11.list-manage.com/subscribe/post?u=8341b487988138ff16050e3b8&amp;id=8fd44abbf4" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>

                      <div id="mc_embed_signup_scroll">

                          <h2>
                            Want More Features?
                          </h2>
                          <h4>
                            We're thinking about adding user accounts, more detailed analytics, the ability for users to ask custom questions, and a bunch of other bits and pieces. If any of this would be interesting to you, please let us know! We want to build what you want to use.
                          </h4>
                          <h4>
                             You can also just drop your email and we'll let you know if we ever have any updates!
                           </h4>

                          <div className="indicates-required">
                              <span className="asterisk">*</span> indicates required
                          </div>

                          <div className="mc-field-group">
                          	<label htmlFor="mce-EMAIL">Email Address
                              <span className="asterisk">*</span>
                            </label>
                          	<input type="email" name="EMAIL" className="required email" id="mce-EMAIL"/>
                          </div>

                          <div className="mc-field-group">
                          	<label htmlFor="mce-NAME">Name  <span className="asterisk">*</span>
                          </label>
                          	<input type="text" name="NAME" className="required" id="mce-NAME"/>
                          </div>

                          <div className="mc-field-group">
                          	<label htmlFor="mce-FEATURES">Features You Want </label>
                          	<input type="text" name="FEATURES" className="" id="mce-FEATURES"/>
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
