//displays a number if selected, or a selectable circle if not selected

import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

const renderButtonContent = (selected) => {
  if (selected === 0) {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>Select</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{selected}</Text>
      </View>
    );
  }
};

const Selector = (props) => {
  return (
    <View style={[styles.container, props.style]} >
      <TouchableOpacity style={styles.opacity} onPress={props.onPress}>
        {renderButtonContent(props.selected)}
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: '#000F0F',
    width: '100%',
    backgroundColor: 'rgba(255,220,220,.3)',
  },
  opacity: {
    width: '100%',
  },
  number: {
    width: '100%',
    textAlign: 'center',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: '#000F0F',
    borderRadius: 10,
    color: '#000F0F',
    fontWeight: 'bold',
    backgroundColor: 'rgba(200,20,20,.2)',
  },
  numberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',

  }
};

export default Selector;
