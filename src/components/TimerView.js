
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button
} from 'react-native';
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
    this.props.initTimer({ minutes: 1, seconds: 10 });
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
      <View>
        <Timer minutes={this.props.minutes} seconds={this.props.seconds} />
        {this.renderTimerButton()}
      </View>
    );
  }
}
const mapStateToProps = state => {
  const { minutes, seconds, paused } = state.timer;

  return { minutes, seconds, paused };
};

export default connect(mapStateToProps, {
  decrementSec,
  initTimer,
  startTimer,
  pauseTimer,
})(TimerView);
