import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';

//adds x leading 0s to create num with 'size' digits
function pad(num, size) {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
}
/*  A component to keep track of time that has an editable minute and second count
  props:
    seconds - the amount of seconds currently on the timer
    minutes - the amount of minutes currently on the timer
   onSecondUpdate(seconds) - called when the seconds on the timer is updated by the user
   onMinuteUpdate(minutes) - called when the minutes on the timer is updated by the user
*/
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutesFocused: false, //if the minutes are currently being edited (we dont want to pad then)
      secondsFocused: false, //if the seconds are currently being edited (we dont want to pad then)
    };
  }
  //uses minutes given by props and pads it when necessary
  getMinutes() {
    //currently being edited so don't pad
    if (this.state.minutesFocused) {
      return this.props.minutes;
    }
    return pad(this.props.minutes, 2);
  }
  //uses seconds given by props and pads it when necessary
  getSeconds() {
    //currently being edited so don't pad
    if (this.state.secondsFocused) {
      return this.props.seconds;
    }
    return pad(this.props.seconds, 2);
  }
  //called when minutes is clicked on
  focusMinutes() {
    this.setState({
      ...this.state,
      minutesFocused: true,
    });
    this.props.minuteUpdate('');
  }
  //called when submit button hit while editing minutes
  unfocusMinutes() {
    this.setState({
      ...this.state,
      minutesFocused: false,
    });
  }
  //called when seconds is clicked on
  focusSeconds() {
    this.setState({
      ...this.state,
      secondsFocused: true,
    });
    this.props.secondUpdate('');
  }
  //called when submit button hit while editing seconds
  unfocusSeconds() {
    this.setState({
      ...this.state,
      secondsFocused: false,
    });
  }
  render() {
    return (
      <View style={styles.containerStyle}>
        <TextInput
          style={styles.textStyle}
          keyboardType={'numeric'}
          value={this.getMinutes() + ''}
          onChangeText={this.props.minuteUpdate}
          onFocus={this.focusMinutes.bind(this)}
          onSubmitEditing={this.unfocusMinutes.bind(this)}
          editable={this.props.editable}
        />
        <Text style={styles.textStyle}>
          :
        </Text>
        <TextInput
          style={styles.textStyle}
          keyboardType={'numeric'}
          value={this.getSeconds() + ''}
          onChangeText={this.props.secondUpdate}
          onFocus={this.focusSeconds.bind(this)}
          onSubmitEditing={this.unfocusSeconds.bind(this)}
          editable={this.props.editable}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 120,
    color: '#000',
  }
};

export default Timer;
