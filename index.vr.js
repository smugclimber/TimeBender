import React from 'react';
import GazeButton from 'react-vr-gaze-button';
import { View, Text, Pano, AppRegistry, Plane, asset, Image, StyleSheet, AmbientLight, VrButton, Animated, NativeModules, VrHeadModel} from 'react-vr';
import items0 from "./items0.json";
import items1 from "./items1.json";
import items2 from "./items2.json";
import items3 from "./items3.json";
import levels from "./levels.json";
import MissionItem from "./MissionItem.js";
import TimeConsole from "./TimeConsole.js";
import Timer from './Timer';
import Button from './Button';
import TextboxVr from './TextboxVr';
import MissionItemExpir from './MissionItemExpir';
import Score from './Score.js';


const vrTextboxContent =
  'The game Time Console is not available!';

const itemsArray = [items0, items1, items2, items3];

class TimeBender extends React.Component {
state = {
      level: 0,
      GazeButtClicked: false,
      items: items0,
      timer: 6,
      status: '',
      fadeAnim: new Animated.Value(1),
      currentItem: 1,
      deviceConnected: false,
      renderVrTextbox: false,
      visible: 'active',
      score: 0,
      win: false
    };

startTimer = this.startTimer.bind(this);
_toggleDisplay = this.toggleDisplay.bind(this);

animateProgress = this.animateProgress.bind(this);
stopProgress = this.stopProgress.bind(this);
onGaze = this.onGaze.bind(this);

   toggleDisplay() {
    if (VrHeadModel.inVR()) {
      this.setState({renderVrTextbox: !this.state.renderVrTextbox});
    } else {
      // Not in VR, so let's use the dom overlay!
      NativeModules.DomOverlayModule.openOverlay(this.state.items);
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
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 1}
    ).start();
   return this.setState({status: 'stopped', timer: levels[this.state.level].timer});
  } else{
    x -= 1
    this.setState({timer: x})
    }
  }

  startGame(){
    this.timer = setInterval(this.startTimer,1000);
    this.setState({status: 'started'})
  }

  animateProgress() {
    console.log("Progress helloo");
    this.timeout = setTimeout(this.onGaze, 1000);
    // begin animation
  }

  stopProgress() {
    clearTimeout(this.timeout);
    this.timeout = null;
    // end animation
  }

  onGaze(){
  //set state which sets opacity? set opacity?
    console.log("helloo");
    this.state.score +=1;
    this.setState({visible: 'inactive'})
  //  this.toggleDisplay()
  if(this.state.score == 1 && this.state.status == 'started'){
    this.setState({win: true, timer: 0, status: 'stopped'})
    }
  }

  increment(){
    this.state.level +=1;
   return this.setState({status: 'stopped', timer: levels[this.state.level].timer, items: itemsArray[this.state.level]});
  }

  render() {
    const {GazeButtClicked} = this.state
    return (
      <View style={styles.rootView}>

        <View style={styles.triggerContainer}>
          <VrButton style={styles.triggerButton} onEnter={this._toggleDisplay}>
            <Text style={styles.triggerText}>AMPLIFY!</Text>
          </VrButton>
        </View>

        {this.state.renderVrTextbox && <TextboxVr text={vrTextboxContent} />}
          <AmbientLight intensity={ 1.6 }  />
          <Pano source={asset(levels[this.state.level].image)}/>
          <TimeConsole/>
          <MissionItemExpir
            state={this.state}
            title={this.state.items[0].title}
            source={this.state.items[0].source}
            texture={this.state.items[0].texture}
            translate={this.state.items[0].translate}
            rotate={this.state.items[0].rotate}
            scale={this.state.items[0].scale}
            found={this.state.items[0].found}
            image={this.state.items[0].image}
            lit={this.state.items[0].lit}
            onEnter={ () => this.animateProgress() }
            onExit={ () => this.stopProgress() }
            onClick={ () => this.onGaze() }
          />
          <MissionItemExpir
            state={this.state}
            title={this.state.items[1].title}
            source={this.state.items[1].source}
            texture={this.state.items[1].texture}
            translate={this.state.items[1].translate}
            rotate={this.state.items[1].rotate}
            scale={this.state.items[1].scale}
            found={this.state.items[1].found}
            image={this.state.items[1].image}
            onEnter={ () => this.animateProgress() }
            onExit={ () => this.stopProgress() }
            onClick={ () => this.onGaze() }
            />
          <MissionItemExpir
            state={this.state}
            title={this.state.items[2].title}
            source={this.state.items[2].source}
            texture={this.state.items[2].texture}
            translate={this.state.items[2].translate}
            rotate={this.state.items[2].rotate}
            scale={this.state.items[2].scale}
            found={this.state.items[2].found}
            image={this.state.items[2].image}
            lit={this.state.items[2].lit}
            onEnter={ () => this.animateProgress() }
            onExit={ () => this.stopProgress() }
            onClick={ () => this.onGaze() }
          />
          <View>
            { this.state.win ?
              <View style={styles.gazeView}>
                  <GazeButton onClick={()=> this.increment()} duration={500}
                    >
                    {time => (
                      <Text style={styles.gazeText}>
                        {GazeButtClicked ? 'BLAST OFF!' : `YOU WON. NICE.${time}`}
                      </Text>
                    )}
                  </GazeButton>
                </View>
                  :
            <View>
            </View>
              }
              <Score score={this.state.score} />
              <Timer timer={this.state.timer} score={this.state.score}{...this.state} />
            <Button startGame={this.startGame.bind(this)} {...this.state} />
        </View>
    </View>
    );
  }
};

const styles = StyleSheet.create({
  onGaze:{
    fontSize: 0.3,
    backgroundColor: '#fff',
    width: 0.5,
    height: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.01,
    color: 'black',
    borderRadius: 0.25,
    transform: [{translate: [2, 2, -4]}],
  },

  imageStyle:{
    width: 50,
    height: 50,
    transform: [{translate: [1, 2, -5]}]
  },

  invisiGaze:{
    display: 'none',
    fontSize: 0.3,
    backgroundColor: '#fff',
    width: 0.5,
    height: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.01,
    color: 'black',
    borderRadius: 0.25,
    transform: [{translate: [2, 2, -4]}],
  },

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
    transform: [{translate: [0.75, -3.4, -3]}]
  },
  triggerButton: {
    transform: [{rotateX: -35}],
    borderRadius: 0.05,
    height: 0.2,
    width: 0.5,
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
