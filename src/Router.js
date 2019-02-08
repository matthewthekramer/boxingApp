import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import TimerView from './components/TimerView';
import ComboView from './components/ComboView';
import ComboCreator from './components/ComboCreator';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" >
        <Scene
          key="comboCreator"
          title=""
          component={ComboCreator}
        />
        <Scene
          onRight={() => Actions.comboCreator()}
          rightTitle="Add"
          key="comboView"
          title="Combinations"
          component={ComboView}
          initial
        />

      </Scene>
    </Router>

  );
};

export default RouterComponent;
