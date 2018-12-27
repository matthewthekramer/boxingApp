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
          style={this.getButtonStyle()}
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
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 260,
    borderWidth: 1,
    width: 260,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
      color: '#000',
      textAlign: 'center',
      fontSize: 50,
  }
};


export default TimerButton;
