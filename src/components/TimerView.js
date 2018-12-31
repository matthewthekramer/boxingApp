
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Switch,
  Button,
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
  toggleEditable,
  toggleEditType,
} from '../actions';

//home page of the app, is a basic round-based work-out timer
class TimerView extends Component {
  //sets editable to false and starts the timer
  onStartPress() {
    if (this.props.editable) {
      this.props.toggleEditable();
    }
    this.props.startTimer();
  }
  onPausePress() {
    this.props.pauseTimer();
  }
  onResetPress() {
    if (this.props.editable) {
      this.props.toggleEditable();
    }
    this.props.resetTimer();
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
    if (this.props.warning) {
      return { ...styles.containerStyle, backgroundColor: '#FFFF00' }
    }
    return { ...styles.containerStyle, backgroundColor: '#00FF00' };
  }
  getUpdateMinuteFunction() {
    if (this.props.editingRound) {
      return (minutes) => this.props.setRoundMinutes({ minutes });
    } else {
      return (minutes) => this.props.setRestMinutes({ minutes });
    }
  }
  getUpdateSecondFunction() {
    if (this.props.editingRound) {
      return (seconds) => this.props.setRoundSeconds({ seconds });
    } else {
      return (seconds) => this.props.setRestSeconds({ seconds });
    }
  }
  //returns current minutes unless editing rest timer, then shows rest minutes
  getCurMinutes() {
    if (this.props.editingRest) {
      return this.props.restTime.minutes;
    } else {
      return this.props.curMinutes;
    }
  }
  //returns current seconds unless editing rest timer, then shows rest seconds
  getCurSeconds() {
    if (this.props.editingRest) {
      return this.props.restTime.seconds;
    } else {
      return this.props.curSeconds;
    }
  }

  getTitleStyle() {
    if (this.props.editable) {
      return {
        ...styles.mainTitle,
        fontSize: 24,
        color: '#474747',
        marginTop: 27,
        marginBottom: 27,
        borderBottomWidth: 1,
      }
    }
    return styles.mainTitle;
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
        <View style={{ paddingLeft: 20 }} />
        <TimerButton
          style={[styles.halfTimerButton, styles.resetButton]}
          onPress={this.onResetPress.bind(this)}
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
  renderTitle() {
    if (this.props.editingRound) {
      return 'Touch Timer to Edit Round Time';
    } else if (this.props.editingRest) {
      return 'Touch Timer to Edit Rest Time';
    } else if (this.props.initialized) {
      return 'READY!?';
    } else if (this.props.resting) {
      return 'REST';
    } else {
      return 'WORK!';
    }
  }
  //renders nothing if timer is counting down, otherwise renders toggle switch to edit timer
  //with a button to toggle editing the work/rest time
  renderEditSection() {
    if (this.props.paused) {
      if (this.props.editable) {
        let buttonTitle = '';
        if (this.props.editingRound) {
          buttonTitle = 'Edit Rest Time';
        } else {
          buttonTitle = 'Edit Work Time';
        }
        return (
          <View style={styles.editToggleContainer}>
            <Text style={styles.editToggleTitle}>
              Edit Mode
            </Text>
            <Switch
              value={this.props.editable}
              onValueChange={() => this.props.toggleEditable()}
            />
            <Button
              onPress={() => this.props.toggleEditType()}
              title={buttonTitle}
            />
          </View>

        );
      }
      return (
        <View style={styles.editToggleContainer}>
          <Text style={styles.editToggleTitle}>
            Edit Mode
          </Text>
          <Switch
            value={this.props.editable}
            onValueChange={() => this.props.toggleEditable()}
          />
        </View>
      );
    }
  }
  render() {
    return (
      <View style={this.getContainerStyle()}>
        <Text style={this.getTitleStyle()}>
          {this.renderTitle()}
        </Text>
        <Timer
          minutes={this.getCurMinutes()}
          seconds={this.getCurSeconds()}
          secondUpdate={this.getUpdateSecondFunction()}
          minuteUpdate={this.getUpdateMinuteFunction()}
          editable={this.props.editable}
        />
        <View>
          {this.renderTimerButton()}
        </View>
        <View>
          {this.renderBottomView()}
        </View>
          {this.renderEditSection()}
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
    warning,
    editable,
    editingRound,
    editingRest,
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
    warning,
    editable,
    editingRound,
    editingRest,
  };
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#c1c1c1',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 80,
    color: '#000000',
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
  },
  editToggleContainer: {
    marginTop: 25,
    paddingLeft: 20,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  editToggleTitle: {
    fontSize: 18,
    paddingRight: 10,
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
  toggleEditable,
  toggleEditType,
})(TimerView);
