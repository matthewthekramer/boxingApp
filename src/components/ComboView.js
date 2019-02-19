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
  componentWillReceiveProps(newProps) {
    console.log('new props', newProps.selected);
    this.props = newProps;
  }
  renderItem(combo, rowID) {
    return (
      <ComboPreview
        key={rowID}
        idx={rowID}
        combo={combo}
        selected={this.props.selected[rowID]}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.combinations}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={(combo) => combo.name}
          extraData={this.props.selected}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    combinations: state.comboWorkout.combinations,
    selected: state.comboWorkout.selected,
  };
};

export default connect(mapStateToProps, {
  selectCombo,
})(ComboView);
