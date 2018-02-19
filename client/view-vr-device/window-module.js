import React from 'react';
import {Module} from 'react-vr-web';


export default class WindowModule extends Module {
  constructor() {
    super('WindowModule');

    this.pathName = window.location;
  }
}
