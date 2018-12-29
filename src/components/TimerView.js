
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
  startTimer,
  pauseTimer,
  setRoundMinutes,
  setRoundSeconds,
  setRestMinutes,
  setRestSeconds,
  resetTimer,
} from '../actions';

//home page of the app, is a basic round-based work-out timer
class TimerView extends Component {
  constructor(props) {
    super(props);
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
    if (!this.props.initialized) {
      return (
        <View style={styles.roundContainer}>
          <Text style={styles.roundText}>
            ROUND {this.props.roundCount}
          </Text>
        </View>
      );
    }
  }
  //renders start/pause button of the timer depending on state of timer
  renderTimerButton() {
    if (this.props.paused && this.props.initialized) {
      return (
        <TimerButton
          style={styles.startButton}
          onPress={this.onStartPress.bind(this)}
        >
          START
        </TimerButton>
      );
    } else if (this.props.paused) {
      return (
      <View style={{ flexDirection: 'row' }}>
        <TimerButton
          style={[styles.halfTimerButton, styles.startButton]}
          onPress={this.onStartPress.bind(this)}
        >
          RESUME
        </TimerButton>
        <TimerButton
          style={[styles.halfTimerButton, styles.resetButton]}
          onPress={() => this.props.resetTimer()}
        >
          RESET
        </TimerButton>
      </View>
      );
    }
    return (
      <TimerButton
        style={styles.pauseButton}
        onPress={this.onPausePress.bind(this)}
      >
        PAUSE
      </TimerButton>
    );
  }
  render() {
    return (
      <View style={this.getContainerStyle()}>
        <Timer
          minutes={this.props.curMinutes}
          seconds={this.props.curSeconds}
          secondUpdate={(seconds) => {
            this.props.setRoundSeconds({ seconds });
          }}
          minuteUpdate={(minutes) => {
            this.props.setRoundMinutes({ minutes });
          }}
          editable={this.props.paused}
        />
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
  startButton: {
    backgroundColor: '#00FF00',
  },
  //used when on pause to display two smaller buttons
  halfTimerButton: {
    borderRadius: 160,
    width: 160,
    height: 160,
    fontSize: 20,
  },
  resetButton: {
    backgroundColor: '#0000FF',
  },
  pauseButton: {
    backgroundColor: '#FF0000',
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
  startTimer,
  pauseTimer,
  setRoundMinutes,
  setRoundSeconds,
  setRestMinutes,
  setRestSeconds,
  resetTimer,
})(TimerView);
