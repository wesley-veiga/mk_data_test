import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {SwitchButton} from '../../components/SwithButton';
import {RootStackParamList} from '../routes';

const AddTeam = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const [newTeam, setNewTeam] = React.useState({
    name: '',
    is_active: false,
  });

  const saveTeam = () => {
    axios
      .post('http://localhost:3333/team/', {
        name: newTeam.name,
        isActive: newTeam.is_active,
      })
      .then(res => {
        res.data.result === 'success'
          ? Alert.alert(
              'Sucesso',
              'O novo grupo foi salvo com sucesso. Adicionar um novo?',
              [
                {text: 'Não', onPress: () => navigation.navigate('teams')},
                {
                  text: 'Sim',
                  onPress: () => setNewTeam({name: '', is_active: false}),
                },
              ],
            )
          : Alert.alert('Falha', 'Não foi possível salvar o grupo');
      });
  };
  return (
    <>
      <View style={styles.container}>
        <Input
          question="Nome"
          value={newTeam.name}
          onChangeText={text => setNewTeam({...newTeam, name: text})}
        />

        <View style={{height: 10}} />

        <SwitchButton
          value={newTeam.is_active}
          text="Status: "
          onValueChange={(value: boolean) =>
            setNewTeam({...newTeam, is_active: value})
          }
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button variant="primary" text="Salvar" onPress={() => saveTeam()} />
        <View style={{height: 10}} />
      </View>
    </>
  );
};

export default AddTeam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    paddingBottom: 20,
    width: '100%',
  },
});
