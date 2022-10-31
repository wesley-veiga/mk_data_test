import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

import {Team, reducer as teamReducer} from './teamReducer';
import {Customer, reducer as customerReducer} from './customersReducer';
import {reducer as loginReducer} from './loginReducer';

export type stateReducer = {
  teamReducer: {
    teams: Array<Team>;
  };
  customerReducer: {
    customers: Array<Customer>;
  };
};

const reducer = combineReducers({
  teamReducer,
  customerReducer,
  loginReducer,
});

const store = configureStore({
  reducer,
});

export default store;
