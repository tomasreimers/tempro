'use strict';

let React = require('react');

let Splashpage = React.createClass({
  render: function() {
    return (
      <div className='wrapper'>

        {/* _hero.scss */}
        <div className='hero'>
          <img className="hero-img" src={"images/hero.jpg"} />
        </div>

        {/* _intro.scss */}
        <div className='intro'>
          <div className='intro__text'>
            <p>
              For most people on the <a href="http://www.paulgraham.com/makersschedule.html">maker's schedule</a>, meetings are a disaster.
            </p>
            <p>
              Despite best intentions, you wasted time, didn’t follow the agenda, and ended up feeling miserable and unproductive.
              You wanted to run a great meeting, but you didn’t.
            </p>
            <p>
              So, how can you improve?
            </p>
          </div>
        </div>

        {/* _steps.scss */}
        <div className='add-tempro'>
          <div className='flexbox-container'>
            <div className='left'>
              <div className='text'>
                <h1>Feedback.</h1>
                <p>If your calendar is powered by Google, invite “feedback@tempro.xyz” along with the other attendees.</p>
                <p>No sign-ups. No downloads.</p>
              </div>
            </div>
            <div className='right'>
              <img src={'images/calendar_example.png'}/>
            </div>
          </div>
        </div>

        <div className='voting-email'>
          <div className='flexbox-container'>
            <div className='left'>
              <div className='text'>
                <h3>After the meeting, attendees are invited to share their feedback via a super fast email survey.</h3>
              </div>
            </div>
            <div className='right'>
              <img src={'images/voting_email.png'}/>
            </div>
          </div>
        </div>

        <div className='results-email'>
          <div className='flexbox-container'>
            <div className='left'>
              <div className='text'>
                <h3>Organizers receive clear, actionable insights.</h3>
              </div>
            </div>
            <div className='right'>
              <img src={'images/results_email.png'}/>
            </div>
          </div>
        </div>

        {/* _call-to-action.scss */}
        <div className='call-to-action'>
          <div className='border'>
            <div className='text'>
              <p>Invite</p>
              <h1>feedback@tempro.xyz</h1>
              <p>to your next meeting</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = Splashpage;
