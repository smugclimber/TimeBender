import React, {Component} from 'react';
import {
  Pano,
  View,
  asset
} from 'react-vr';
import PanoNames from './panos.json';

export default class MainPano extends Component{
  render() {
    return <Pano source={{ uri: `../${PanoNames[this.props.level]}` }}/>;
  }
}
