import React from 'react';

const TextboxOverlay = props => {
  return (
    <div className="container">
      <div className="content">
        <p className="pStyle">:TIME CONSOLE:</p>
        <div className="close" onClick={props.onClose} />
        <div style={{display: 'inline', marginLeft: '25%'}}>
          <img className="help-images" src={props.img1} alt="missing image"/>
          <img className="help-images" src={props.img2} alt="missing image"/>
          <img className="help-images" src={props.img3} alt="missing image"/>
        </div>
      </div>
    </div>
  );
};

export default TextboxOverlay;
