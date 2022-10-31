import React from 'react';
import {Provider} from 'react-redux';
import Routes from './screens/routes';
import store from './reducer';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
