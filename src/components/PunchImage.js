/*
 * A simple component for displaying an image of a punch with the punch
 * name on top of it
 * props:
 *  name - name of the punch (use strings from util/PunchNameToImg)
 *  key - unique identifier for this component
 */

import React, { Component } from 'react';
import {
 ImageBackground,
 View,
 Text,
} from 'react-native';
import punchNameToImg from '../util/PunchNameToImg';

class PunchImage extends Component {
 render() {
   return (
    <ImageBackground
      key={this.props.key}
      source={punchNameToImg(this.props.name)}
      style={styles.punchImgBg}
      imageStyle={styles.punchImg}
    >
      <View style={styles.imgOverlay}>
          <Text style={styles.punchTxt}>
            {this.props.name}
          </Text>
      </View>
    </ImageBackground>

   );
 }
}

const styles = {
  punchImgBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: '#a8a8a8',
  },
  punchImg: {
    resizeMode: 'stretch',
    backgroundColor: '#a8a8a8',
  },
  //container on top of image
  imgOverlay: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'flex-end',
  },
  punchTxt: {
    fontWeight: 'bold',
  },
};

export default PunchImage;
