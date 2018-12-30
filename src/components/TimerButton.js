import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

class TimerButton extends Component {
  getButtonStyle() {
    if (this.props.start) {
      return { ...styles.buttonStyle, backgroundColor: '#00FF00' };
    }
    return { ...styles.buttonStyle, backgroundColor: '#FF0000' };
  }
  render() {
    return (
      <View style={styles.containerStyle}>
        <TouchableOpacity
          onPress={this.props.onPress}
          style={[styles.buttonStyle, this.props.style]}
          activeOpacity={0.5}
        >
          <View>
            <Text style={styles.textStyle}>
              {this.props.children}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonStyle: {
    paddingBottom: 15,
    borderRadius: 260,
    borderWidth: 1,
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
      color: '#000',
      textAlign: 'center',
      fontSize: 40,
  }
};


export default TimerButton;
