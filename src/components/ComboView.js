//A component for a scrollable list of combinations the user can
//edit, delete, or select in a certain order for their workout
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import ComboPreview from './ComboPreview';
import {
  selectCombo,
} from '../actions';

class ComboView extends Component {

  componentWillMount() {
    console.log('component will mount', this.props.combinations);
  }

  renderItem(combo, rowID) {
    return <ComboPreview idx={rowID} combo={combo} />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.combinations}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={(combo) => combo.name}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.comboWorkout.combinations);
  return { combinations: state.comboWorkout.combinations };
};

export default connect(mapStateToProps, {
  selectCombo,
})(ComboView);
