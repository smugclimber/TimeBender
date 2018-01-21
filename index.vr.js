import React from 'react';
import GazeButton from 'react-vr-gaze-button';
import { View, Text, Pano, AppRegistry, Plane, asset, StyleSheet, AmbientLight, VrButton, Animated, NativeModules, VrHeadModel} from 'react-vr';
import items0 from "./items0.json";
import items1 from "./items1.json";
import items2 from "./items2.json";
import items3 from "./items3.json";
import levels from "./levels.json";
import MissionItem from "./MissionItem.js";
import Timer from './Timer';
import Button from './Button';
import TextboxVr from './TextboxVr';

const domTextboxContent = {
  img1: '/static_assets/images/DNA_image.png',
  img2: '/static_assets/images/hour glass.png',
  img3: '/static_assets/images/bomb.png',
  description: '',
};
const vrTextboxContent =
  'The game Time Console is not available!';
const itemsArray = [items0, items1, items2, items3];

class TimeBender extends React.Component {
state = {
      level: 0,
      GazeButtClicked: false,
      items: items0,
      timer: 2,
      status: '',
      fadeAnim: new Animated.Value(1),
      currentItem: 1,
      deviceConnected: false,
      renderVrTextbox: false
    };

startTimer = this.startTimer.bind(this);
_toggleDisplay = this.toggleDisplay.bind(this);

   toggleDisplay() {
    if (VrHeadModel.inVR()) {
      this.setState({renderVrTextbox: !this.state.renderVrTextbox});
    } else {
      // Not in VR, so let's use the dom overlay!
      NativeModules.DomOverlayModule.openOverlay(domTextboxContent);
    }
  }

  componentDidUpdate(){
    switch (this.state.status) {
        case 'started':
          this.timer;
          break;
        case 'stopped':
          clearInterval(this.timer);
          break;
      }
  }

  startTimer(){
  let x = this.state.timer
  if(x === 0){
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 0}
    ).start();
    this.state.level +=1;
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 1}
    ).start();
   return this.setState({status: 'stopped', timer: levels[this.state.level].timer, items: itemsArray[this.state.level]});
  } else{
    x -= 1
    this.setState({timer: x})
  }
    }

  startGame(){
    this.timer = setInterval(this.startTimer,500);
    this.setState({status: 'started'})
  }

  render() {
    console.log("level: "+ this.state.level)
    const {GazeButtClicked} = this.state
    return (
      <View style={styles.rootView}>

        <View style={styles.triggerContainer}>
          <VrButton style={styles.triggerButton} onClick={this._toggleDisplay}>
            <Text style={styles.triggerText}>:Activate: Time Console</Text>
          </VrButton>
        </View>

        {this.state.renderVrTextbox && <TextboxVr text={vrTextboxContent} />}
        <Animated.View style={{opacity: this.state.fadeAnim}}>
          <AmbientLight intensity={ 1.6 }  />
          <Pano source={asset(levels[this.state.level].image)}/>
          <MissionItem
            title={this.state.items[0].title}
            source={this.state.items[0].source}
            texture={this.state.items[0].texture}
            translate={this.state.items[0].translate}
            rotate={this.state.items[0].rotate}
            scale={this.state.items[0].scale}
            found={this.state.items[0].found}
            image={this.state.items[0].image}
            lit={this.state.items[0].lit}
          />
          <MissionItem
            title={this.state.items[1].title}
            source={this.state.items[1].source}
            texture={this.state.items[1].texture}
            translate={this.state.items[1].translate}
            rotate={this.state.items[1].rotate}
            scale={this.state.items[1].scale}
            found={this.state.items[1].found}
            image={this.state.items[1].image}
            lit={this.state.items[1].lit}
          />
          <MissionItem
            title={this.state.items[2].title}
            source={this.state.items[2].source}
            texture={this.state.items[2].texture}
            translate={this.state.items[2].translate}
            rotate={this.state.items[2].rotate}
            scale={this.state.items[2].scale}
            found={this.state.items[2].found}
            image={this.state.items[2].image}
            lit={this.state.items[2].lit}
          />
          <MissionItem
            title={this.state.items[3].title}
            source={this.state.items[3].source}
            texture={this.state.items[3].texture}
            translate={this.state.items[3].translate}
            rotate={this.state.items[3].rotate}
            scale={this.state.items[3].scale}
            found={this.state.items[3].found}
            image={this.state.items[3].image}
            lit={this.state.items[3].lit}
          />
          <View style={styles.gazeView}>
            <GazeButton onClick={()=> this.startGame()} duration={500}
              >
              {time => (
                <Text style={styles.gazeText}>
                  {GazeButtClicked ? 'BLAST OFF!' : `Hidden Next Level btn ${time}`}
                </Text>
              )}
            </GazeButton>
          </View>
          <View>
            <Timer {...this.state} />
            <Button startGame={this.startGame.bind(this)} {...this.state} />
          </View>
        </Animated.View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  gazeView:{
    fontSize: 0.3,
    backgroundColor: '#fff',
    width: 0.7,
    height: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.01,
    color: 'black',
    borderRadius: 0.25,
    transform: [{translate: [0, 1, -4]}],
  },

  gazeText:{
    textAlign: 'center',
    fontSize: 0.15,
    color: 'red'
  },

  planeStyle:{
    color: 'yellow',
    transform: [{translate: [1, 2, -5]}]
  },

  timer:{
    textAlign: 'center',
    fontSize: 0.15,
    color: '#fff',
    transform: [{translate: [2, 0, -1]}]
  },

  rootView: {
    layoutOrigin: [0.5, 0.5],
    position: 'absolute',
  },
  triggerContainer: {
    transform: [{rotateY: 0}, {translate: [0.75, -3, -3]}]
  },
  triggerButton: {
    borderRadius: 0.05,
    height: 0.4,
    width: 0.4,
    backgroundColor: '#F00',
    justifyContent: 'center',
  },
  triggerText: {
    alignSelf: 'center',
    fontSize: 0.1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})

AppRegistry.registerComponent('TimeBender', () => TimeBender);
