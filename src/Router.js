import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Actions } from 'react-native-router-flux';
import TimerView from './components/TimerView';
import ComboView from './components/ComboView';
import ComboCreator from './components/ComboCreator';
import { saveCombo } from './actions';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" >
          <Scene
            key="comboCreator"
            title={this.props.editComboName}
            rightTitle="Save"
            onRight={() => this.props.saveCombo()}
            component={ComboCreator}
          />
          <Scene
            key="comboView"
            title="Combinations"
            onRight={() => Actions.comboCreator()}
            rightTitle="Add"
            component={ComboView}
            initial
          />

        </Scene>
      </Router>

    );
  }
}
const mapStateToProps = state => {
  return {
    editComboName: state.comboEditor.name,
  };
};
export default connect(mapStateToProps, { saveCombo })(RouterComponent);
