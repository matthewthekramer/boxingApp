import React, { Component } from 'react';
import {
  View,
  Text,
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
        <Text style={styles.textStyle}>
          {pad(this.props.minutes, 2)} : {pad(this.props.seconds, 2)}
        </Text>
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
}


export default Timer;
