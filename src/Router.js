import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import TimerView from './components/TimerView';
import ComboView from './components/ComboView';
import ComboCreator from './components/ComboCreator';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="main" hideNavBar>
          <Scene
            key="timer"
            component={ComboCreator}
            initial
            hideNavBar
          />

        </Scene>
      </Scene>
    </Router>

  );
};

export default RouterComponent;
