/*
 * This class displays an editable punch with a way to adjust the speed
 * for the punch as well as change the type of punch through directly
 * calling action creators on the redux store
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Slider,
  Text,
} from 'react-native';
import PunchImage from './PunchImage';

const maxSpeed = 5;
const minSpeed = 0;
class PunchEditView extends Component {
  render() {
    //the state for each punch comes directly from redux store
    const { name, speed } = this.props.punches[this.props.idx];
    return (
      <View style={styles.mainContainer}>
        <View style={styles.punchRow}>
          <View style={styles.imgContainer}>
            <PunchImage name={name} />
          </View>
          <Slider
            style={styles.slider}
            step={1}
            maximumValue={maxSpeed}
            minimumValue={minSpeed}
          />
          <View style={styles.speedTxtContainer}>
            <Text style={styles.speedTitle}>
              Speed
            </Text>
            <Text style={styles.speedTxt}>
              {speed}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const squareDim = 100;
const styles = {
  mainContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  punchRow: {
    flexDirection: 'row',
    height: squareDim,
  },
  imgContainer: {
    width: squareDim,
  },
  slider: {
    width: 100,
    transform: [{ rotate: '90deg' }],
  },
  speedTxtContainer: {
    justifyContent: 'center',
  },
  speedTitle: {
    fontSize: 20,
  },
  speedTxt: {
    fontSize: 50,
  }
};

const mapStateToProps = state => {
  const { punches } = state.comboEditor;
  return {
    punches
  };
};


export default connect(mapStateToProps, {})(PunchEditView);
