import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootStackParamList} from '../screens/routes';
import Icon from 'react-native-vector-icons/Octicons';
import {logoff} from '../reducer/loginReducer';
import {useDispatch} from 'react-redux';

const SideMenu = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.exitContainer}
        onPress={() => dispatch(logoff())}>
        <Icon name="sign-out" color="#FFF" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => navigation.navigate('customers')}>
        <Text style={styles.optionText}>Lista de Clientes</Text>
        <Icon name="chevron-right" size={20} color="#FFF" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => navigation.navigate('teams')}>
        <Text style={styles.optionText}>Lista de Grupos</Text>
        <Icon name="chevron-right" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#336699',
  },
  optionContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    marginBottom: 40,
    paddingBottom: 10,
  },
  optionText: {
    fontSize: 25,
    color: '#FFF',
  },
  exitContainer: {
    position: 'absolute',
    top: '95%',
    left: '80%',
  },
});
