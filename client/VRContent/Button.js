import React from 'react';
import {
  StyleSheet,
  Text,
  VrButton,
  asset,
} from 'react-vr';

export default class Button extends React.Component {
  constructor() {
    super();
    this.styles = StyleSheet.create({
      button: {
        margin: 0.05,
        height: 0.5,
        width: 1,
        borderRadius: 0.05,
        backgroundColor: 'green',
        transform: [
          {translate: [0.34, -2.20, -5]},
          {rotateX: -45},
        ]
        },
      text: {
            fontSize: 0.2,
            textAlign: 'center',
      },
      });
    }
  render() {
    return (
      <VrButton style={this.styles.button}
        onClick={this.props.startGame}

          >
        <Text style={this.styles.text}>
          START LEVEL
        </Text>
      </VrButton>
    );
  }
}
