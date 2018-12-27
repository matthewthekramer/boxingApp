
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
  pauseTimer
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
  getContainerStyle() {
    if (this.props.paused) {
      return { ...styles.containerStyle, backgroundColor: '#c1c1c1' };
    }
    if (this.props.resting) {
      return { ...styles.containerStyle, backgroundColor: '#990000' };
    }
    return { ...styles.containerStyle, backgroundColor: '#00FF00' };
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
        {this.renderTimerButton()}
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
  } = state.timer;

  return {
    curMinutes,
    curSeconds,
    paused,
    roundTime,
    restTime,
    resting,
  };
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#c1c1c1',
  },
  sectionStyle: {
    backgroundColor: '#FF0000',
  }
};

export default connect(mapStateToProps, {
  decrementSec,
  initTimer,
  startTimer,
  pauseTimer,
})(TimerView);
