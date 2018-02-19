import React, {Component} from 'react';
import {View, Text, StyleSheet, asset, Sound, Image } from 'react-vr';
const Score = props => {
const scoreMultiplier = parseInt(props.score) * 100;

return(
  <View style={styles.Button}>
      <Text style={styles.ButtonText}>Score: {scoreMultiplier}</Text>
  </View>
  )
};

const styles= StyleSheet.create({
  ButtonRed: {
      backgroundColor: 'red',
      borderRadius: 0.25,
      width: 4,
      height: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.1,
      borderColor: 'red',
      transform: [
        {translate: [-2, 0, -5]}
      ]
    },
Button: {
    backgroundColor: '#fff',
    borderRadius: 0.05,
    width: 1.3,
    height: 0.3,
    justifyContent: 'center',
    borderWidth: 0.025,
    borderColor: 'red',
    transform: [
      {translate: [0.40, -2.05, -5]},
    {rotateX: -45},
    ]
  },
  ButtonText: {
    margin: 0.05,
    textAlign: 'left',
    fontSize: 0.2,
    color: '#000'
  }
});
export default Score;
