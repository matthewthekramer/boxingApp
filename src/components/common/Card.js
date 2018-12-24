import React from 'react';
import { Text, View } from 'react-native';

/*
displays a vertical list of card components
*/
const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottom: 0,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,

    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
};

export { Card };
