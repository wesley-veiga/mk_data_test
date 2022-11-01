import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootStackParamList} from '../routes';
import Input from '../../components/Input';
import {SwitchButton} from '../../components/SwithButton';
import Dropdown from '../../components/DropDown';
import {Team} from '../../reducer/teamReducer';
import Button from '../../components/Button';
import axios from 'axios';

type Data = {
  label: string;
  value: number;
};
const AddCostumer = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const dataType = [
    {label: 'PF', value: 'PF'},
    {label: 'PJ', value: 'PJ'},
  ];

  const [editing, setEditing] = React.useState({
    name: '',
    is_active: false,
    team: '',
    rg_ie: '',
    cpf_cnpj: '',
    type: 'PF',
  });

  const [teams, setTeams] = React.useState({
    loading: false,
    error: false,
    url: 'http://localhost:3333/teams/',
    data: [],
    teamSelected: 0,
  });

  useFocusEffect(
    React.useCallback(() => {
      fetch(teams.url)
        .then(res => res.json())
        .then(res => {
          setTeams({
            ...teams,
            loading: false,
            error: false,
          });

          let data: Array<Data> = [];
          res.map((item: Team) =>
            data.push({label: item.name, value: item.id}),
          );

          setTeams({...teams, data: data});
        });

      setEditing({
        ...editing,
        name: '',
        is_active: false,
        team: '',
        rg_ie: '',
        cpf_cnpj: '',
        type: '',
      });
    }, []),
  );

  const saveCustomer = () => {
    axios
      .post('http://localhost:3333/customer/', {
        name: editing.name,
        isActive: editing.is_active,
        team: teams.teamSelected,
        rgIe: editing.rg_ie,
        cpfCnpj: editing.cpf_cnpj,
        type: editing.type,
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
                  onPress: () => {},
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
          value={editing.name}
          onChangeText={t => setEditing({...editing, name: t})}
        />

        <View style={{height: 10}} />

        <SwitchButton
          value={editing.is_active}
          text="Status: "
          onValueChange={(value: boolean) =>
            setEditing({...editing, is_active: value})
          }
          disabled={false}
        />

        <View style={{height: 10}} />

        <Dropdown
          question="Tipo: "
          label={'Selecione um tipo'}
          data={dataType}
          onSelect={value => setEditing({...editing, type: value.value})}
          disabled={false}
        />

        <View style={{height: 10}} />

        <Input
          question={editing.type === 'PF' ? 'CPF' : 'CNPJ'}
          value={editing.cpf_cnpj}
          onChangeText={t => setEditing({...editing, cpf_cnpj: t})}
        />

        <View style={{height: 10}} />

        <Input
          question={editing.type === 'PF' ? 'RG' : 'IE'}
          value={editing.rg_ie}
          onChangeText={t => setEditing({...editing, rg_ie: t})}
        />

        <View style={{height: 10}} />

        <Dropdown
          question="Grupo: "
          label={'Selecione um grupo'}
          data={teams.data}
          onSelect={value =>
            setTeams({...teams, teamSelected: parseInt(value.value)})
          }
          disabled={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          variant="primary"
          text={'Salvar'}
          onPress={() => saveCustomer()}
        />
        <View style={{height: 10}} />
      </View>
    </>
  );
};

export default AddCostumer;

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
