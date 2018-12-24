import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Timer from './components/Timer';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="main">
          <Scene
            rightTitle="Add"
            key="employeeList"
            component={Timer}
            title="Employees"
            initial
          />

        </Scene>
      </Scene>
    </Router>

  );
};

export default RouterComponent;
