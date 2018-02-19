import React, {Component} from 'react';
import {
  View,
  VrButton,
  Image,
  asset,
} from 'react-vr';
import GazeButton from 'react-vr-gaze-button';

export default class ItemBox extends Component {
  render() {
    const item = this.props.item;

    let headsUpView = null;
    let itemBox = null;
    // check for 2 device mode
    if (this.props.deviceConnected) {
      headsUpView =
        <Image
          source={{ uri: `../${item.hintUrl}` }}
          key={ Date.now() }
          style={{
            position: 'absolute',
            height: item.hintSize[1],
            width: item.hintSize[0],
            transform: [
              {rotateY: item.hintRotation[1]},
              {rotateX: item.hintRotation[0]},
              {translate: item.hintTranslate},
            ],
          }}
        />
      ;

      itemBox =
        <GazeButton
          onClick={ this.props.onClick }
          duration={800}
        >
          { time => (
            <View
              style={{
                position: 'absolute',
                height: item.boxSize[1],
                width: item.boxSize[0],
                transform: [
                  {rotateY: item.boxRotation[1]},
                  {rotateX: item.boxRotation[0]},
                  {translate: item.boxTranslate},
                ],
                // change borderColor alpha to 1 for dev
                borderWidth: .25,
                borderColor: "rgba(0,0,0,0)",

              }}
            />
          )}
        </GazeButton>
      ;
    } else {
      itemBox =
        <VrButton onClick={ this.props.onClick } >
            <View
              style={{
                position: 'absolute',
                height: item.boxSize[1],
                width: item.boxSize[0],
                transform: [
                  {rotateY: item.boxRotation[1]},
                  {rotateX: item.boxRotation[0]},
                  {translate: item.boxTranslate},
                ],
                // change borderColor alpha to 1 for dev
                borderWidth: .25,
                borderColor: "rgba(0,0,0,0)",
              }}
            />
        </VrButton>
      ;

    }


    return (
      <View>
        { headsUpView }
        { itemBox }
      </View>
    );
  }
}
