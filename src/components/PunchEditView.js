import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

class PunchEditView extends Component {

  render() {
    return (
      <Text>{this.props.punch.name}</Text>
    );
  }
}

export default PunchEditView;
