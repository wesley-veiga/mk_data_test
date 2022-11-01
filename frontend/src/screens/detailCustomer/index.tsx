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
const DetailCustomer = ({route}: any) => {
  const {customer} = route.params;

  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const dataType = [
    {label: 'PF', value: 'PF'},
    {label: 'PJ', value: 'PJ'},
  ];

  const [editing, setEditing] = React.useState({
    isEditing: false,
    name: '',
    is_active: false,
    team: '',
    rg_ie: '',
    cpf_cnpj: '',
    type: '',
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

  const editOrSave = () => {
    if (!editing.isEditing) {
      setEditing({...editing, isEditing: true});
    } else {
      axios
        .put('http://localhost:3333/customer/' + customer.id, {
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
                'A alteração no grupo foi salva com sucesso',
                [{text: 'Ok', onPress: () => navigation.navigate('customers')}],
              )
            : Alert.alert('Falha', 'Não foi possível salvar a alteração', [
                {text: 'Ok'},
              ]);
        });
    }
  };

  console.log('sa s', customer);

  return (
    <>
      <View style={styles.container}>
        <Input
          question="Nome"
          placeholder={customer.name}
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

        <View style={{height: 10}} />

        <Dropdown
          question="Tipo: "
          label={customer.type}
          data={dataType}
          onSelect={value => setEditing({...editing, type: value.value})}
          disabled={!editing.isEditing}
        />

        <View style={{height: 10}} />

        <Input
          question={editing.type === 'PF' ? 'CPF' : 'CNPJ'}
          placeholder={customer.cpf_cnpj}
          editable={editing.isEditing}
          onChangeText={t => setEditing({...editing, name: t})}
        />

        <View style={{height: 10}} />

        <Input
          question={editing.type === 'PF' ? 'RG' : 'IE'}
          placeholder={customer.rg_ie}
          editable={editing.isEditing}
          onChangeText={t => setEditing({...editing, name: t})}
        />

        <View style={{height: 10}} />

        <Dropdown
          question="Grupo: "
          label={customer.team_name}
          data={teams.data}
          onSelect={value =>
            setTeams({...teams, teamSelected: parseInt(value.value)})
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
        <Button variant="destroy" text="Excluir" onPress={() => {}} />
      </View>
    </>
  );
};

export default DetailCustomer;

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
