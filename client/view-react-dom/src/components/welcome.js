import React from 'react';
import '../App.css';

class Welcome extends React.Component {
  state = {
    view: 0,
    playTwo: false,
  }

  handleTwoDeviceClick = () => {
    this.setState({playTwo: true}, () => {
      this.handleIncrementClick();
    });
  };

  handleIncrementClick = () => {
    this.setState({view: this.state.view + 1});
  }


  render() {

    const viewZero = (
      <div className="flex">
        <h1 className="title"><span className="yellow">Time</span> <span className="blue">Bender</span></h1>
        <div className="button-group">
          <div onClick={ this.handleIncrementClick } className="button blue"><p>play game</p></div>;
        </div>
      </div>
    );

    const viewOne = (
      <div className="flex">
        <div className="button-group">
          <img className="devices" src="images/devices-01.svg"/>
          <img className="devices" src="images/devices-02.svg"/>
        </div>
        <p className="story-text yellow">
          <br/>
          <span className="blue">Instructions:</span><br/>
          Time Bender can be played with any device <span className="blue">(one device)</span>.<br/> Or, it can be played with a computer (or tablet) and a phone with Google Cardboard <span className="blue">(two devices)</span> for a full VR experience.
        </p>
        <div className="button-group">
          <div onClick={ this.props.handleOneDevice } className="button blue"><p>play with one device</p></div>;
          <div onClick={ this.handleTwoDeviceClick } className="yellow button"><p>play with two devices</p></div>
        </div>
      </div>
    );

    let vrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=https://time-bender.herokuapp.com/st/${this.props.room}&size=200x200`;

    const viewTwo = (
      <div className="flex">
        <p className="story-text blue">
          <br/>
          <span className="yellow">1 </span>
          Scan the QR code using your phone camera<br/><br/>
          <span className="yellow">2 </span>
          Place your phone in your Google Cardboard<br/><br/>
          <span className="yellow">3 </span>
          Click the "Next" button below<br/><br/>
          <span className="yellow">4 </span>
          When you start level 1, "point" to the item in the scene you want to "grab" by place the dot in the center of your <span className="yellow">time viewer</span> (Google Cardboard) on the item for about a second. If it's the correct item, the next item to find will appear. Monitor your progress by looking on the dashboard that will be shown on this screen.
        </p>
        <div className="button-group">
          <div className="blue">
            <img src={ vrUrl } alt="QR Code" />
          </div>;
          <div onClick={ this.props.handleTwoDevice } className="yellow button"><p>next</p></div>
        </div>
      </div>
    );

    let view;
    switch (this.state.view) {
      case 0:
        view = viewZero;
        break;
      case 1:
        view = viewOne;
        break;
      case 2:
        view = viewTwo;
        break;
      default:
        console.log('welcome screen broken')
    }



    return (
      <div className="welcome">
        { view }
      </div>
    );
  }
};

export default Welcome;





















//
