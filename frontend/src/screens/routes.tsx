import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Login from './login';

export type RootStackParamList = {
  login: undefined;
};

const Routes = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  const is_logged = false;

  if (!is_logged) {
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

  return <React.Fragment />;
};

export default Routes;
