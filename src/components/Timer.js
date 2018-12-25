import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
} from 'react-native';

class Timer extends Component {
  render() {
    return (
      <View>
        <Text>
          {this.props.minutes}
        </Text>
        <Text>
          {this.props.seconds}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { minutes, seconds } = state.timer;

  return { minutes, seconds };
};

export default connect((mapStateToProps), {})(Timer);
