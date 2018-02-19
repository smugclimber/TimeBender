import React from "react";
import { View, Image, Text, Model, asset} from 'react-vr';

const TimeConsole = props => {

  return(
    <View>
      <View>
        <Model
          style={{
            transform: [
              {translate: [12, -10, -10]},
              {scale: 0.10 },
              {rotateX: -90},
              {rotateY: 0},
              {rotateZ: 0}
            ],
          }}
          source={{obj: asset('TimeConsole.obj'), mtl: asset('TimeConsole.mtl')}}
          texture={asset('')}
          lit={false}
        />
      </View>
      <View>
        <Text style={{ fontSize: '25pt', color: 'red', transform: [{translate: [2, -3, -3]}] }} >Have You Seen Me?</Text>
      </View>
      <View style={{display:'inline'}}>
        <Image style={{width: 1, transform: [{translate: [1.9, -2.5, -4]}], height: 1}} source={asset('DNA_image.png')} />
      </View>
    </View>
  );
};

export default TimeConsole;
