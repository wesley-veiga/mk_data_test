import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import axios from 'axios';

import Button from '../../components/Button';
import Input from '../../components/Input';
import {RootStackParamList} from '../routes';
import {SwitchButton} from '../../components/SwithButton';
import Header from '../../components/Header';

const DetailTeam = ({route}: any) => {
  const {team} = route.params;

  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const [editing, setEditing] = React.useState({
    loading: false,
    isEditing: false,
    name: '',
    is_active: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      setEditing({
        ...editing,
        isEditing: false,
        name: team.name,
        is_active: team.is_active,
      });
    }, []),
  );

  const editOrSave = () => {
    if (!editing.isEditing) {
      setEditing({...editing, isEditing: true});
    } else {
      setEditing({...editing, loading: true});
      axios
        .put('http://localhost:3333/team/' + team.id, {
          name: editing.name,
          isActive: editing.is_active,
        })
        .then(res => {
          res.data.result === 'success'
            ? Alert.alert(
                'Sucesso',
                'A alteração no grupo foi salva com sucesso',
                [
                  {
                    text: 'Ok',
                    onPress: () => {
                      navigation.navigate('teams');
                      setEditing({
                        ...editing,
                        loading: false,
                        isEditing: false,
                        name: '',
                        is_active: false,
                      });
                    },
                  },
                ],
              )
            : Alert.alert('Falha', 'Não foi possível salvar a alteração', [
                {
                  text: 'Ok',
                  onPress: () => setEditing({...editing, loading: false}),
                },
              ]);
        });
    }
  };

  const deleteTeam = () => {
    const executeDelete = () =>
      axios
        .delete('http://localhost:3333/team/' + team.id)
        .then(res => navigation.navigate('teams'));

    Alert.alert(
      'Atenção',
      'Deseja realmente excluir o grupo ' + team.name + '?',
      [{text: 'Ok', onPress: () => executeDelete()}, {text: 'cancelar'}],
    );
  };

  return (
    <>
      <Header
        title="Editar Grupo"
        leftIcon="back"
        leftAction={() => navigation.navigate('teams')}
      />
      <View style={styles.container}>
        <Input
          question="Nome"
          placeholder={team.name}
          editable={editing.isEditing}
          onChangeText={t => setEditing({...editing, name: t})}
        />

        <View style={{height: 10}} />

        <SwitchButton
          value={editing.is_active}
          text="Status: "
          onValueChange={(value: boolean) =>
            setEditing({...editing, is_active: value})
          }
          disabled={!editing.isEditing}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          variant="primary"
          text={editing.isEditing ? 'Salvar' : 'Editar'}
          onPress={() => editOrSave()}
        />
        <View style={{height: 10}} />
        <Button variant="destroy" text="Excluir" onPress={() => deleteTeam()} />
      </View>
    </>
  );
};

export default DetailTeam;

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
