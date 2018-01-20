import React, {Component} from 'react';
import {View, Text, StyleSheet } from 'react-vr';

class Timer extends Component{

render(){
    return(
      <View style={styles.Button}>
        <Text style={styles.ButtonText}>You Have {this.props.timer} Left</Text>
      </View>
    )
  }
};


const styles= StyleSheet.create({
Button: {
    backgroundColor: '#fff',
    borderRadius: 0.25,
    width: 3,
    height: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.01,
    transform: [
      {translate: [-2, 0, -5]}
    ]

  },
  ButtonText: {
    textAlign: 'center',
    fontSize: 0.15,
    color: '#000'
  }
});
export default Timer;
