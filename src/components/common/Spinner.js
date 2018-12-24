import React from 'react';
import {View, ActivityIndicator} from 'react-native';

/*
a resusable, moving spinner to show the users something is happening
*/
const Spinner = ({size}) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export {Spinner};
