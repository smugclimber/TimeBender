import React from 'react';
import {
  Image,
  View,
  VrButton,
  asset,
} from 'react-vr';
import GazeButton from './gaze-button.js';


export default class LevelButton extends React.Component{

  render() {
    const buttonContent =
      <Image
        source={{ uri: "../images/start.svg" }}
        key={ Date.now() }
        style={{
          position: 'absolute',
          height: 8,
          width: 8,
          transform: [
            {translate: [-4, 4, -10]},
          ],
        }}
      />
    ;

    const buttonGaze = 
      <GazeButton onClick={ this.props.onClick } duration={1200}>
        { time => buttonContent }
      </GazeButton>
    ;
    const buttonClick =
      <VrButton onClick={ this.props.onClick }>
        { buttonContent }
      </VrButton>
    ;

    return this.props.deviceConnected ? buttonGaze : buttonClick;
  }
};
