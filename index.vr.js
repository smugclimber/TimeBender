import React from 'react';
import GazeButton from 'react-vr-gaze-button';
import { View, Text, Pano, AppRegistry, asset, StyleSheet, AmbientLight} from 'react-vr';
import items1 from "./items1.json";
import items2 from "./items2.json";
import levels from "./levels.json";
import MissionItem from "./MissionItem.js";

class TimeBender extends React.Component {

  state = {
  level: 0,
  GazeButtClicked: false,
  items: items1
  };


  render() {

    const {GazeButtClicked} = this.state

    return (
      <View>
        <AmbientLight intensity={ 1.6 }  />
        <Pano source={asset(levels[this.state.level].image)}/>
        <MissionItem
          title={this.state.items[0].title}
          source={this.state.items[0].source}
          texture={this.state.items[0].texture}
          translate={this.state.items[0].translate}
          rotate={this.state.items[0].rotate}
          scale={this.state.items[0].scale}
        />
        <MissionItem
          title={this.state.items[1].title}
          source={this.state.items[1].source}
          texture={this.state.items[1].texture}
          translate={this.state.items[1].translate}
          rotate={this.state.items[1].rotate}
          scale={this.state.items[1].scale}
        />
        <MissionItem
          title={this.state.items[2].title}
          source={this.state.items[2].source}
          texture={this.state.items[2].texture}
          translate={this.state.items[2].translate}
          rotate={this.state.items[2].rotate}
          scale={this.state.items[2].scale}
        />

        <View style={styles.gazeView}>
          <GazeButton onClick={() => this.setState({GazeButtClicked: true, level: 1, items: items2})} duration={1000}>
            {time => (
              <Text style={styles.gazeText}>
                {GazeButtClicked ? 'BLAST OFF!' : `START ${time}`}
              </Text>
            )}
          </GazeButton>
        </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  gazeView:{
    fontSize: 0.3,
    backgroundColor: '#fff',
    width: 0.5,
    height: 0.5,
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
  }
})
AppRegistry.registerComponent('TimeBender', () => TimeBender);
