import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, ImageBackground } from 'react-native';
import Selection from './Selection.js';
import {
  removeCombo,
  selectCombo,
} from '../actions'
import punchNameToImg from '../util/PunchNameToImg';

//Provides a preview of a combination containing name, first 4 punch numbers
//buttons to edit, delete or select

/*
 * props:
 *  combo - the combo to display the preview for
 *  idx - the index of this combo on the list
 */
class ComboPreview extends Component {
  renderPunches() {
    console.log(this.props.combo);
    const { punches } = this.props.combo.item;
    const punchesView = [];
    //displays the first 5 punches of a combo as images
    for (let i = 0; i < 5 && i < punches.length; ++i) {
      punchesView.push(
        <View key={i * 10} style={styles.punchContainer}>
          <ImageBackground
            key={(i * 10) + 1}
            source={punchNameToImg(punches[i].name)}
            style={styles.punchImg}
          >
            <View key={(i * 10) + 2} style={styles.imgOverlay}>
              <View key={(i * 10) + 3} style={styles.punchTxtContainer} >
                <Text key={(i * 10) + 4} style={styles.punchTxt}>
                  {punches[i].name}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    }
    return punchesView;
  }
  render() {
    const { name } = this.props.combo.item;
    return (
      <View style={styles.container}>
        <Text>
          {name}
        </Text>
        <View style={styles.punchesContainer}>
          {this.renderPunches()}
        </View>
      </View>
    );
  }
}


const styles = {
  container: {
    paddingTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    flex: 1,
  },
  punch: {
  },
  punchesContainer: {
    flexDirection: 'row',
  },
  punchContainer: {
    paddingLeft: 10,
  },
  punchImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
    justifyContent: 'flex-end',
  },
  //container on top of image
  imgOverlay: {

    alignItems: 'center',
    height: 50,
    width: 90,
    justifyContent: 'flex-end',
  },
  punchTxt: {
    fontWeight: 'bold',
  },
  punchTxtContainer: {
  },
};

export default connect()(ComboPreview);
