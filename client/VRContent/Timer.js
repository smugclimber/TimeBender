import React, {Component} from 'react';
import {View, Text, StyleSheet, asset, Sound, Image } from 'react-vr';
const Timer = props => {
  {(props.timer < 6) ?
    item =  <View style={styles.ButtonRed}>
          <Text style={styles.ButtonText}>Time Left: 0:{props.timer}</Text>
          <Sound source={{mp3: asset('/audio/54321count.mp3')}} />
        </View>
      :
      item = <View style={styles.Button}>
          <Text style={styles.ButtonText}>Time Left: 0:{props.timer}</Text>
        </View>
      }
  return(
    <View>
    {item}
  </View>
)
};
const styles= StyleSheet.create({
  ButtonRed: {
    backgroundColor: 'red',
    borderRadius: 0.05,
    width: 1.5,
    height: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.025,
    borderColor: 'red',
    transform: [
      {translate: [0.40, -1.35, -5]},
      {rotateX: -45},
    ]
  },
Button: {
    backgroundColor: '#fff',
    margin: 0.05,
    borderRadius: 0.05,
    width: 1.5,
    height: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.025,
    borderColor: 'red',
    transform: [
      {translate: [0.40, -1.35, -5]},
    {rotateX: -45},
    ]
  },
  ButtonText: {
    textAlign: 'center',
    fontSize: 0.2,
    color: '#000'
  }
});
export default Timer;
