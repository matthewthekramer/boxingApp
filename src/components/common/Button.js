import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

/*
Component that renders a button with blue next that executes
onPress prop on click
*/
const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Text style={styles.textStyle}> {children} </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',

    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',

    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    //flex: 1, //expand to fill max amount of content
    alignSelf: 'stretch',
    backgroundColor: '#fff',

    borderRadius: 5,
    borderColor: '#007aff',

    marginLeft: 5,
    marginRight: 5,

  }

};

export { Button };
