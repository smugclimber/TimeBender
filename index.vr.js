import React from 'react';
import GazeButton from 'react-vr-gaze-button';
import { View, Text, Pano, AppRegistry, asset, StyleSheet, AmbientLight, VrButton, Animated} from 'react-vr';
import items0 from "./items0.json";
import items1 from "./items1.json";
import items2 from "./items2.json";
import items3 from "./items3.json";
import levels from "./levels.json";
import MissionItem from "./MissionItem.js";
import Timer from './Timer';
import Button from './Button';

const itemsArray = [items0, items1, items2, items3]
const x = 0


class TimeBender extends React.Component {
constructor(){
  super();
  this.state = {
      level: 0,
      GazeButtClicked: false,
      items: itemsArray[x],
      timer: 2,
      status: '',
      fadeAnim: new Animated.Value(1),
      currentItem: 1,
      deviceConnected: false
    };
    this.startTimer = this.startTimer.bind(this);
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
    // this.setState({intervalId: ''});
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 1}
    ).start();
   return this.setState({status: 'stopped', timer: levels[this.state.level].timer, items: itemsArray[x+1]});
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
    const {GazeButtClicked} = this.state
    const levelIterator = this.state.level+1
    return (
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

  timer:{
    textAlign: 'center',
    fontSize: 0.15,
    color: '#fff',
    transform: [
      {translate: [2, 0, -1]}
    ]
  }
})

AppRegistry.registerComponent('TimeBender', () => TimeBender);
