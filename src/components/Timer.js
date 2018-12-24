
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { decrementSec, initTimer } from '../actions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.props.initTimer({ minutes: 1, seconds: 10 });
    const self = this;
    this.interval = setInterval(() => {
      self.props.decrementSec();
    }, 1000);
    //this.interval = setInterval(
    //  () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
    //  1000
    //);
  }

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

export default connect(mapStateToProps, { decrementSec, initTimer })(Timer);
