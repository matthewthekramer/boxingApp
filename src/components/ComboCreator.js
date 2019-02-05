
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import PunchEditView from './PunchEditView';

class ComboCreator extends Component {
  renderItem(punch, idx) {
    console.log('idx', idx);
    return <PunchEditView key={idx} punch={punch} />;
  }
  render() {
    console.log('punches', this.props.punches);
    return (
      <View>
        <FlatList
          data={this.props.punches}
          renderItem={({ item, index }) => this.renderItem(item, index)}
        />

      </View>
    );
  }
}
const mapStateToProps = state => {
  console.log('state', state);
  return { punches: state.comboEditor.punches };
};

export default connect(mapStateToProps, {})(ComboCreator);
