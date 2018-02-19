import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  NativeModules,
  VrButton,
} from 'react-vr';
import MainPano from './components/main-pano.js';
import LevelButton from './components/level-button.js';
import ItemBox from './components/item-box.js';
import itemsList from './items.js';
import GazeButton from 'react-vr-gaze-button';

// WindowMoudule custom Native Module for location url
const moduleLocation = NativeModules.WindowModule.pathName;

// socket.io setup (url to production or dev)
import io from 'socket.io-client';
let ioUrl;
let roomId;
if (moduleLocation.hostname === 'localhost') {
  // set dev defaults
  ioUrl = 'http://localhost:3001';
  roomId = 12341234;
} else  {
  // set production defaults
  ioUrl = moduleLocation.origin;
  roomId = moduleLocation.pathname.slice(4);
}

const socket = io(ioUrl);


export default class view_vr_device extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      room: roomId,
      level: 0,
      status: 'stopped',
      startButtonStatus: true,
      currentItem: 0,
      items: itemsList[0].items,
      deviceConnected: false
    };
  }

  increment = () => {
    console.log(`increment triggered`);
    const nextState = {
      level: this.state.level + 1,
      status: 'stopped',
      startButtonStatus: false,
      currentItem: 0,
      items: itemsList[this.state.level + 1].items
    };
    this.setState(nextState, () => {
      const stateToEmit = {
        level: this.state.level,
        status: this.state.status,
        startButtonStatus: this.state.startButtonStatus,
        currentItem: this.state.currentItem,
        items: itemsList[this.state.level].items
      };
      socket.emit('updateState', stateToEmit);
      console.log(`VR emitted ${JSON.stringify(stateToEmit)}`);
    });

  }

  handleStartClick = () => {
    this.setState({
      startButtonStatus: true,
      status: 'started',
      currentItem: 1,
    }, () => {
      let nextState = {
        level: this.state.level,
        startButtonStatus: this.state.startButtonStatus,
        status: this.state.status,
        currentItem: this.state.currentItem,
        items: this.state.items,
      };
      socket.emit('updateState', nextState);
      console.log(`VR emitted ${JSON.stringify(nextState)}`);
    });
  }

  handleItemBoxClick = () => {
    let nextCurrentItem = this.state.currentItem + 1;
    let nextStatus = this.state.status;
    // check for winning condition
    if (nextCurrentItem >= this.state.items.length) {
      nextStatus = 'stopped';
    }

    this.setState({
      currentItem: nextCurrentItem,
      status: nextStatus
    }, () => {
      socket.emit('updateState', {
        currentItem: this.state.currentItem,
        status: this.state.status
      });
      console.log(`VR emitted currentItem ${this.state.currentItem}`);
    });

  }

  render() {

    let button = null;
    if (!this.state.startButtonStatus) {
      button = <LevelButton text="start" onClick={ this.handleStartClick } deviceConnected={ this.state.deviceConnected } />;
    }

    let itemBox = null;
    if (this.state.items[this.state.currentItem] !== undefined && this.state.currentItem !== 0) {
      itemBox = (
        <ItemBox
          item={ this.state.items[this.state.currentItem] }
          onClick={ this.handleItemBoxClick }
          deviceConnected={ this.state.deviceConnected}
        />
      );
    }


    return (
      <View>
        <MainPano level={ this.state.level }/>
        { button }
        { itemBox }
      </View>
    );
  }

  componentDidMount() {

    socket.emit(
      'joinRoom',
      {room: this.state.room, client: "vr"}
    );
    console.log(`VR joining room: ${this.state.room}`);

    socket.on('updateState', nextState => {
      console.log(`received nextState: ${JSON.stringify(nextState)}`);
      this.setState(nextState, () => {
        console.log(`level ${this.state.level}`);
      });
    });
    socket.on('increment', () => {
      this.increment();
    })
  }

};

AppRegistry.registerComponent('view_vr_device', () => view_vr_device);
