import React from 'react';
import {
  StyleSheet,
  Text,
  VrButton,
  asset,
} from 'react-vr';

export default class StartButton extends React.Component {
  constructor() {
    super();
    this.styles = StyleSheet.create({
      button: {
            margin: 0.05,
        height: 0.4,
        backgroundColor: 'red',
        transform: [
          {translate: [-2, 0, -5]}
        ]
        },
      text: {
            fontSize: 0.3,
            textAlign: 'center',
      },
      });
  }
  render() {
    return (
      <VrButton style={this.styles.button}
        onClick={this.props.start}
          >
        <Text style={this.styles.text}>
          Start Button
        </Text>
      </VrButton>
    );
  }
}
