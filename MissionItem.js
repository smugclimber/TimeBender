import React from "react";
import { View, Model, Text, asset} from 'react-vr';

const MissionItem = props => {

  return(
    <View>
      <Text
          style={{
            fontSize: 0.3,
            color: 'black',
            layoutOrigin: [0.5, 0.5],
            transform: [{translate: [props.translate[0], props.translate[1], props.translate[2]]}],
          }}>Item#{props.title}</Text>
      <Model
  	      style={{
            transform: [
              {translate: [props.translate[0], props.translate[1], props.translate[2]]},
              {scale: props.scale},
              {rotateX: props.rotate[0]},
              {rotateY: props.rotate[1]},
              {rotateZ: props.rotate[2]}
            ],
          }}
          source={{obj: asset(props.source[0]), mtl:asset(props.source[1])}}
        texture={asset(props.texture)}
        lit={true}
      />
    </View>
  );
};

export default MissionItem;
