import React from 'react';

const TextboxOverlay = props => {

  console.log("Props Image1:" +props[0].image)
  console.log("Props Image2:" +props[1].image)
  console.log("Props Image3:" +props[2].image)
  return (
    <div className="container">
      <div className="content">
        <p className="pStyle">:TIME CONSOLE INFO:</p>
        <div className="close" onClick={props.onClose} />
        <div style={{display: 'inline', marginLeft: '25%'}}>
          <img className="help-images" src={props[0].image} alt="missing image"/>
          <img className="help-images" src={props[1].image} alt="missing image"/>
          <img className="help-images" src={props[2].image} alt="missing image"/>
        </div>
      </div>
    </div>
  );
};

export default TextboxOverlay;
