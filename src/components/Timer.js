import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';

//adds x leading 0s to create num with 'size' digits
function pad(num, size) {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
}

class Timer extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <TextInput
          style={styles.textStyle}
          keyboardType={'number-pad'}
          value={pad(this.props.minutes)}
          onChangeText={this.props.minuteUpdate}
        />
        <Text style={styles.textStyle}>
          :
        </Text>
        <TextInput
          style={styles.textStyle}
          keyboardType={'number-pad'}
          value={pad(this.props.seconds)}
          onChangeText={this.props.secondUpdate}
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
    flex: 1,

  }
}


export default Timer;
