import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {Customer, Team} from '../configs/types';

import {reducer as loginReducer} from './loginReducer';

export type stateReducer = {
  teamReducer: {
    teams: Array<Team>;
  };
  customerReducer: {
    customers: Array<Customer>;
  };
  loginReducer: {
    is_logged: boolean;
  };
};

const reducer = combineReducers({
  loginReducer,
});

const store = configureStore({
  reducer,
});

export default store;
