import React from 'react';
import ReactDOM from 'react-dom';
import {Module} from 'react-vr-web';

import TextboxOverlay from './TextboxOverlay';

export default class DomOverlayModule extends Module {
  constructor(overlayContainer) {
    super('DomOverlayModule');

    this._closeOverlay = this.closeOverlay.bind(this);
    this._overlayContainer = overlayContainer;
  }

  // This method call opens up the overlay for display.
  openOverlay(props) {
    ReactDOM.render(
      <TextboxOverlay {...props} onClose={this._closeOverlay} />,
      this._overlayContainer
    );
  }

  closeOverlay() {
    ReactDOM.unmountComponentAtNode(this._overlayContainer);
  }
}
