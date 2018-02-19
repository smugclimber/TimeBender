import React from 'react';
import FoundItems from './found-items.js';
import '../App.css';



class GameView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vrUrl: window.location.hostname === 'localhost' ? `http://localhost:8081/vr/` : `${window.location.origin}/vr/${this.props.room}`
    };
  }

  render(){
    let content;
    if (this.props.deviceConnected) {
      content =
        <FoundItems
          items={ this.props.items }
          currentItem={ this.props.currentItem }
        />;
    } else {
      content =
      <iframe src={ this.state.vrUrl } title="vr"></iframe>;
    }
    return (
      <div className="game-view">
        { content }
      </div>
    );
  }
};

export default GameView;
