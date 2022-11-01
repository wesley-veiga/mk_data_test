import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Team} from '../reducer/teamReducer';

import Login from './login';
import Customers from './customers';
import Teams from './Teams';
import DetailTeam from './detailTeam';
import AddTeam from './addTeam';

export type LoginStackParamList = {
  login: undefined;
};

export type RootStackParamList = {
  customers: undefined;
  teams: undefined;
  detailTeam: {
    team: Team;
  };
  addTeam: undefined;
};

const Routes = () => {
  const Stack = createStackNavigator<LoginStackParamList>();
  const Drawer = createDrawerNavigator<RootStackParamList>();

  const is_logged = false;

  if (is_logged) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="customers">
        <Drawer.Screen name="customers" component={Customers} />
        <Drawer.Screen name="teams" component={Teams} />
        <Drawer.Screen name="detailTeam" component={DetailTeam} />
        <Drawer.Screen name="addTeam" component={AddTeam} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
