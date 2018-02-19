import React from 'react';
import GameView from './game-view.js';
import Dashboard from './dashboard.js';
import '../App.css';

class LevelView extends React.Component {
  render() {
    return(
      <div className="level-view">
        <GameView
          items={ this.props.items }
          deviceConnected={ this.props.deviceConnected }
          currentItem={ this.props.currentItem }
          room={ this.props.room }
        />
        <Dashboard
          startButtonStatus ={ this.props.startButtonStatus }
          currentItem={ this.props.currentItem }
          items={ this.props.items }
          status={ this.props.status}
          level={ this.props.level }
        />
      </div>
    );
  }
};

export default LevelView;
