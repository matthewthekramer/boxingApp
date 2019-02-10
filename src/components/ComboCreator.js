
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  Button,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import PunchEditView from './PunchEditView';
import {
  setSpeed,
  setPunchName,
  addPunch,
} from '../actions';
import { types } from '../util/PunchNameToImg';

const defaultPunch = {
  name: types[0],
  speed: 3,
};
class ComboCreator extends Component {
  renderItem(punch, idx) {
    console.log('idx', idx);
    return (
      <PunchEditView
        key={idx}
        punch={punch}
        onUpdateSpeed={(speed) => this.props.setSpeed(speed, idx)}
        onUpdatePunch={(punchName) => this.props.setPunchName(punchName, idx)}
      />
    );
  }
  render() {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Button
            style={styles.addPunchBtn}
            color={'#F00'}
            title={'Add Punch'}
            onPress={() => this.props.addPunch(Object.assign({}, defaultPunch))}
          />
        </View>
        <FlatList
          data={this.props.punches}
          renderItem={({ item, index }) => this.renderItem(item, index)}
        />
      </View>
    );
  }
}
const styles = {
  headerContainer: {
    paddingTop: 15,
    paddingRight: 40,
    paddingLeft: 40,
  },
  comboNameTxt: {
    paddingLeft: 10,
    fontSize: 20,
  },
  addPunchBtn: {
    paddingRight: 100,
    height: 30,
  },
};
const mapStateToProps = state => {
  console.log('state', state);
  return {
    punches: state.comboEditor.punches,
    comboName: state.comboEditor.name,
  };
};

export default connect(mapStateToProps, {
  setSpeed,
  setPunchName,
  addPunch,
})(ComboCreator);
