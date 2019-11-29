
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Switch,
  Button,
  Picker,
} from 'react-native';
import Sound from 'react-native-sound';
import { Actions } from 'react-native-router-flux';
import BackgroundTimer from 'react-native-background-timer';
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
  toggleMode,
} from '../actions';
import {
  MODE_NONE,
  MODE_RANDOM,
  MODE_ORDER,
} from '../reducers/ComboWorkoutReducer';

//mp3 file names (android must be lower case with underscore)
const roundIndicatorFN = 'round_time.mp3';
const warningIndicatorFN = 'warning_time.mp3';

//initialize sounds
Sound.setCategory('Playback', true);
const roundIndicator = new Sound(roundIndicatorFN, Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the round sound', error);
    return;
  }
});
Sound.setCategory('Playback', true);
const warningIndicator = new Sound(warningIndicatorFN, Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the warning sound', error);
    return;
  }
});

//return value will be in the range [0 59]
const validateSeconds = (seconds) => {
  if (seconds > 59) {
    return 59;
  } else if (seconds < 0) {
    return 0;
  }
  return seconds;
};

//return value will be be in the range [0 99]
const validateMinutes = (minutes) => {
  if (minutes > 99) {
    return 99;
  } else if (minutes < 0) {
    return 0;
  }
  return minutes;
};

//the different states of a round
const roundTypes = {
  WORK: 'work',
  WARNING: 'warning',
  REST: 'rest',
};

//The different states this whole view can be in
const timerStatuses = {
  ...roundTypes,
  PAUSED: 'paused',
  INITIALIZED: 'initialized,'
};

//Each status has a title displayed at the top of the screen
const statusesToTitles = {
  [timerStatuses.WORK]: 'WORK',
  [timerStatuses.WARNING]: 'WORK!!!',
  [timerStatuses.INITIALIZED]: 'READY!?',
  [timerStatuses.REST]: 'REST',
  [timerStatuses.PAUSED]: 'Paused'
};

//The different states that can be edited
const editTypes = {
  ...roundTypes,
  //If nothing is currently being edited
  NONE: 'none',
};

//home page of the app, is a basic round-based work-out timer
class TimerView extends Component {
  state = {
    selectedEditType: editTypes.NONE,
    status: timerStatuses.INITIALIZED,
    //If the timer is paused, this keeps track of the status of the timer
    //once it is resumed again
    resumeStatus: undefined,
    roundTimes: {
      [roundTypes.WORK]: {
        minutes: 3,
        seconds: 0,
      },
      [roundTypes.REST]: {
        minutes: 0,
        seconds: 45,
      },
      [roundTypes.WARNING]: {
        minutes: 0,
        seconds: 30,
      },
    },
    curTime: {
      minutes: 3,
      seconds: 0,
    },
    roundCount: 1, //keeps track of number of work rounds completed
  }

  /*
   * Sets either the minutes or seconds for the time of rest, warning, or work times
   * @param {string} secondsOrMinutes - either 'seconds' or 'minutes'
   * @param {number} time - the time to update with
   */
  setTime(secondsOrMinutes, time) {
    let { selectedEditType } = this.state;
    //Race condition if edit mode selected at same point that time is reset
    selectedEditType = selectedEditType === editTypes.NONE
      ? editTypes.WORK : selectedEditType;

    let validatedTime = parseInt(time, 10);
    //validate the inputted time since this can come from user input
    validatedTime = isNaN(validatedTime) ? 0
        : secondsOrMinutes === 'seconds'
        ? validateSeconds(validatedTime) : validateMinutes(validatedTime);
    this.setState(state => ({
      ...state,
      roundTimes: {
        ...state.roundTimes,
        [selectedEditType]: {
          ...state.roundTimes[selectedEditType],
          [secondsOrMinutes]: validatedTime,
        }
      }
    }));
  }

  decrementTimer() {
    this.setState(state => {
      if (parseInt(state.curTime.seconds, 10) === 0 || state.curTime.seconds === '') {
        //convert a minute into 60 seconds if there are minutes remaining
        if (parseInt(state.curTime.minutes, 10) > 0 || state.curTime.minutes === '') {
          return {
            ...state,
            curTime: {
              seconds: 59,
              minutes: state.curTime.minutes - 1
            }
          };
        }
        //out of time
        roundIndicator.play();
        //if the period that just ran out was a rest period
        if (state.status === timerStatuses.REST) {
          return {
            ...state,
            status: timerStatuses.WORK,
            curTime: {
              seconds: state.roundTimes[roundTypes.WORK].seconds,
              minutes: state.roundTimes[roundTypes.WORK].minutes,
            }
          };
        }
        //if the period that just ran out was a work/warning period
        return {
          ...state,
          curTime: {
            seconds: state.roundTimes[roundTypes.REST].seconds,
            minutes: state.roundTimes[roundTypes.REST].minutes,
          },
          status: timerStatuses.REST,
          roundCount: state.roundCount + 1,
        };
    //if we should set warning FIXME edge case when warning time
    //only has minutes and no seconds
    } else if (!state.status === timerStatuses.REST
                && state.curTime.seconds + (state.curTime.minutes * 60)
                  <= state.roundTimes[roundTypes.WARNING].seconds
                    + state.roundTimes[roundTypes.WARNING].minutes * 60) {
        warningIndicator.play();
        return {
          ...state,
          curTime: {
            ...state.curTime,
            curSeconds: state.curTime.seconds - 1,
          },
          status: timerStatuses.WARNING,
       };
      }
      //if not out of time, just decrement normally
      return {
        ...state,
        curTime: {
          ...state.curTime,
          seconds: state.curTime.seconds - 1
        }
      };
    });
  }

  //plays sounds on state change
  componentDidUpdate(prevProps) {
    //change from no warning to warning mode (yellow)
    if (!prevProps.warning && this.props.warning) {
      warningIndicator.play();
      //change from rest->working or warning->rest
    } else if (!this.props.initialized && prevProps.resting !== this.props.resting) {
      roundIndicator.play();
    }
  }

  onStartPress() {
    const curTime = { ...this.state.curTime };
    if (this.state.status === timerStatuses.INITIALIZED) {
      roundIndicator.play();
      curTime.seconds = this.state.roundTimes[roundTypes.WORK].seconds;
      curTime.minutes = this.state.roundTimes[roundTypes.WORK].minutes;
    }
    BackgroundTimer.runBackgroundTimer(this.decrementTimer.bind(this), 1000);
    this.setState(state => ({
      ...state,
      status: state.resumeStatus || timerStatuses.WORK,
      selectedEditType: editTypes.NONE,
      curTime: {
        ...curTime,
      }
    }));
  }

  onPausePress() {
    BackgroundTimer.stopBackgroundTimer();
    this.setState(state => ({
      status: timerStatuses.PAUSED,
      selectedEditType: editTypes.NONE,
      resumeStatus: state.status,
    }));
  }

  onResetPress() {
    BackgroundTimer.stopBackgroundTimer();
    this.setState(state => ({
      ...state,
      status: timerStatuses.INITIALIZED,
      selectedEditType: editTypes.NONE,
      resumeStatus: undefined,
      curTime: {
        seconds: state.roundTimes[roundTypes.WORK].seconds,
        minutes: state.roundTimes[roundTypes.WORK].minutes,
      }
    }));
  }

  getComboModeTitle() {
    switch (this.props.comboMode) {
      case MODE_NONE:
        return 'No Combos';
      case MODE_RANDOM:
        return 'Random Combo Order';
      case MODE_ORDER:
        return 'In order Combos';
      default:
        return 'No Combos';
    }
  }

  //background color should be grey if paused,
  //red if resting, yellow if warning, and green if during work
  getContainerStyle() {
    switch (this.state.status) {
      case timerStatuses.INITIALIZED:
      case timerStatuses.PAUSED:
        return { ...styles.containerStyle, backgroundColor: '#eff5ff' };
      case timerStatuses.REST:
        return { ...styles.containerStyle, backgroundColor: '#990000' };
      case timerStatuses.WARNING:
        return { ...styles.containerStyle, backgroundColor: '#FFFF00' };
      default:
        return { ...styles.containerStyle, backgroundColor: '#00FF00' };
    }
  }
  //returns current time unless editing timer, then shows time to edit
  getDisplayTime(secondsOrMinutes) {
    switch (this.state.selectedEditType) {
      case editTypes.WORK:
        return this.state.roundTimes[roundTypes.WORK][secondsOrMinutes];
      case editTypes.REST:
        return this.state.roundTimes[roundTypes.REST][secondsOrMinutes];
      case editTypes.WARNING:
        return this.state.roundTimes[roundTypes.WARNING][secondsOrMinutes];
      default:
        return this.state.curTime[secondsOrMinutes];
    }
  }

  render() {
    return (
      <View style={this.getContainerStyle()}>
        {this.state.selectedEditType === editTypes.NONE ?
          <Text style={styles.mainTitle}>
            {statusesToTitles[this.state.status]}
          </Text>
          :
          <Fragment>
            <Text> Editing: </Text>
            <Picker
              value={this.state.selectedEditType}
              onValueChange={itemValue =>
                  this.setState({ selectedEditType: itemValue })}
            >
              <Picker.Item label="Work" value="work" />
              <Picker.Item label="Warning" value="warning" />
              <Picker.Item label="Rest" value="rest" />
            </Picker>
          </Fragment>
        }
        <Timer
          minutes={this.getDisplayTime('minutes')}
          seconds={this.getDisplayTime('seconds')}
          onUpdateSeconds={seconds => this.setTime('seconds', seconds)}
          onUpdateMinutes={minutes => this.setTime('minutes', minutes)}
          onEdit={() => this.setState({ selectedEditType: editTypes.WORK })}
          isEditable={this.state.status === timerStatuses.INITIALIZED}
        />
        <View>
          {this.renderTimerButton()}
        </View>
        <View>
          {this.state.status === timerStatuses.WORK
            || this.state.status === timerStatuses.WARNING
            || this.state.status === timerStatuses.REST ?
            <View style={styles.roundContainer}>
              <Text style={styles.roundText}>
                ROUND {this.props.roundCount}
              </Text>
            </View>
          : null}
        </View>
        <View>
          <Button
            onPress={() => Actions.comboView()}
            title="Combo Selector"
          />
          <Button
            onPress={() => this.props.toggleMode()}
            title={this.getComboModeTitle()}
          />
        </View>
      </View>
    );
  }

  //renders start/pause button of the timer depending on state of timer
  renderTimerButton() {
    if (this.state.status === timerStatuses.INITIALIZED) {
      return (
        <TimerButton
          style={styles.startButton}
          onPress={this.onStartPress.bind(this)}
        >
          START
        </TimerButton>
      );
    } else if (this.state.status === timerStatuses.PAUSED) {
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
    editingRound,
    editingRest,
    comboMode: state.comboWorkout.mode,
  };
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#eff5ff',
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
  toggleMode,
})(TimerView);
