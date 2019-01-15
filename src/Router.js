import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import TimerView from './components/TimerView';
import ComboView from './components/ComboView';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="main" hideNavBar>
          <Scene
            key="timer"
            component={ComboView}
            initial
            hideNavBar
          />

        </Scene>
      </Scene>
    </Router>

  );
};

export default RouterComponent;
