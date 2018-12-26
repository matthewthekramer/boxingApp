
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button
} from 'react-native';
import Timer from './Timer';
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
  render() {
    return (
      <View>
        <Timer minutes={this.props.minutes} seconds={this.props.seconds} />
        <Button onPress={this.onStartPress.bind(this)} title='start'>
          START
        </Button>
        <Button onPress={this.onPausePress.bind(this)} title='pause'>
          PAUSE
        </Button>
      </View>
    );
  }
}
const mapStateToProps = state => {
  const { minutes, seconds } = state.timer;

  return { minutes, seconds };
};

export default connect(mapStateToProps, {
  decrementSec,
  initTimer,
  startTimer,
  pauseTimer,
})(TimerView);
