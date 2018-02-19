import React from 'react';
import '../App.css';

class Story extends React.Component {
  state = {
    1: [<p className="story-text blue">Hey, can you hear me?
    Good. <span className="yellow">I'm stuck in time,</span> and you're the only one who can get me out!
    It's fine, I'm a super-scientist, these things happen...
    The only way to get time moving again is for you to <span className="yellow"> find the items I need for my time machine. </span>
    I'll send you an illustration of an item, then you find it using the time-viewer. <span className="yellow"> Ok? Here we go!
    <br></br>-Dr Bender</span>
     </p>, "1", this.props.onClick, "Level 1"],
    2: [<p className="story-text blue">Alright! I'm glad this is working. I wasn't sure if I could freeze your time without making you explode! But I guess it all worked out.<br/><br/>
    There's one more place you need to go to get the items I need. I'll send it to your viewer now.</p>, "2", this.props.onClick, "Level 2"],
    3: [<p className="story-text blue">Great I have all the items I need! Now I can restart time and try to get everything back to normal! Thanks for your help. I think I'll celebrate by taking my new and improved time machine out to the bar! What could go wrong?<br></br>
    <span className="yellow"> To Be Continued...</span></p>, "End", () => {window.location.reload()}, "Game Over"]

  };

  render() {

    return (
      <div className="story-container">
        <div>
          <h1 className="title yellow">{ this.state[this.props.level][1] }</h1>
            { this.state[this.props.level][0] }
        </div>
        <div className="button yellow" onClick={ this.state[this.props.level][2] }>{ this.state[this.props.level][3] }</div>

      </div>
    );
  }
};

export default Story;
