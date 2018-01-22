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
  ButtonText: {
    textAlign: 'center',
    fontSize: 0.5,
    color: '#000'
  }
});
export default Timer;
