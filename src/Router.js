import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import TimerView from './components/TimerView';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="main">
          <Scene
            rightTitle="Add"
            key="employeeList"
            component={TimerView}
            title="Employees"
            initial
          />

        </Scene>
      </Scene>
    </Router>

  );
};

export default RouterComponent;
