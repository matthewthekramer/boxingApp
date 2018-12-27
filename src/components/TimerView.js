
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button
} from 'react-native';
import {
  Card,
  CardSection,
} from './common';
import Timer from './Timer';
import TimerButton from './TimerButton';


import {
  decrementSec,
  initTimer,
  startTimer,
  pauseTimer,
  setRest,
} from '../actions';

class TimerView extends Component {
  constructor(props) {
    super(props);
    this.props.initTimer({ minutes: 0, seconds: 15 });
    //this.interval = setInterval(
    //  () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
    //  1000
    //);
  }
  onStartPress() {
    this.props.startTimer();
  }
  onPausePress() {
    this.props.pauseTimer();
  }

  //background color should be grey if paused,
  //red if resting, yellow if warning, and green if during work
  getContainerStyle() {
    if (this.props.paused) {
      return { ...styles.containerStyle, backgroundColor: '#c1c1c1' };
    }
    if (this.props.resting) {
      return { ...styles.containerStyle, backgroundColor: '#990000' };
    }
    return { ...styles.containerStyle, backgroundColor: '#00FF00' };
  }
  //should render a counter for rounds at all times except when timer hasn't been initialized
  //should render an editable rest time when timer is paused
  renderBottomView() {
    //don't display round counter, just display editable rest time
    if (this.props.initialized) {
      return (
        <View style={styles.restRoundCountainer}>
          <View style={styles.restContainer}>
            <Text style={styles.restTitle}>
              REST TIME
            </Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.restRoundContainer}>
        <View style={styles.roundContainer}>
          <Text style={styles.roundText}>
            ROUND {this.props.roundCount}
          </Text>
        </View>
        <View style={styles.restContainer}>
          <Text style={styles.restTitle}>
            REST TIME
          </Text>
        </View>
      </View>
    );
  }

  renderTimerButton() {
    if (this.props.paused) {
      return (
        <TimerButton start onPress={this.onStartPress.bind(this)}>
          START
        </TimerButton>
      );
    }
    return (
      <TimerButton pause onPress={this.onPausePress.bind(this)}>
        PAUSE
      </TimerButton>
    );
  }
  render() {
    return (
      <View style={this.getContainerStyle()}>
        <Timer minutes={this.props.curMinutes} seconds={this.props.curSeconds} />
        <View style={styles.sectionStyle}>
          {this.renderTimerButton()}
        </View>
        <View style={styles.sectionStyle}>
          {this.renderBottomView()}
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  const {
    curMinutes,
    curSeconds,
    paused,
    roundTime,
    restTime,
    resting,
    initialized,
    roundCount,
  } = state.timer;

  return {
    curMinutes,
    curSeconds,
    paused,
    roundTime,
    restTime,
    resting,
    initialized,
    roundCount,
  };
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#c1c1c1',
  },
  sectionStyle: {
    position: 'relative',
  },

  restRoundContainer: {
    paddingTop: 20,
  },
  roundContainer: {
    alignItems: 'center',
  },
  roundText: {
    fontSize: 60,
    color: '#000000',
    borderBottomWidth: 2,
    borderColor: '#000000',
  },
  restContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  restTitle: {
    fontSize: 40,
    color: '#000000',
  },
};

export default connect(mapStateToProps, {
  decrementSec,
  initTimer,
  startTimer,
  pauseTimer,
  setRest,
})(TimerView);
