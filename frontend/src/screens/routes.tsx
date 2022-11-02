import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Login from './login';
import Customers from './customers';
import DetailCustomer from './detailCustomer';
import AddCustomer from './addCustomer';
import Teams from './Teams';
import DetailTeam from './detailTeam';
import AddTeam from './addTeam';
import {Customer, Team} from '../configs/types';
import SideMenu from '../components/SideMenu';

export type LoginStackParamList = {
  login: undefined;
};

export type RootStackParamList = {
  customers: undefined;
  detailCustomer: {
    customer: Customer;
  };
  addCustomer: undefined;
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
      <Drawer.Navigator
        initialRouteName="customers"
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={props => <SideMenu {...props} />}>
        <Drawer.Screen name="customers" component={Customers} />
        <Drawer.Screen name="teams" component={Teams} />
        <Drawer.Screen name="detailTeam" component={DetailTeam} />
        <Drawer.Screen name="addTeam" component={AddTeam} />
        <Drawer.Screen name="detailCustomer" component={DetailCustomer} />
        <Drawer.Screen name="addCustomer" component={AddCustomer} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
