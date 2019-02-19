//displays a number if selected, or a selectable circle if not selected

import React from 'react';
import {
  TouchableHighlight,
  View,
} from 'react-native';

const Selector = (props) => {
  console.log('in selector', props.selected);
  return (
    <TouchableHighlight onPress={props.onPress} >
      <View style={[styles.container, props.style]} >
        {
          props.selected > 0 ?
            <View style={styles.innerContainer} />
            : null
        }
      </View>
    </TouchableHighlight>
  );
};
const styles = {
  container: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
};

export default Selector;
