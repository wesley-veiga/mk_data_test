import React from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootStackParamList} from '../routes';
import {AddButton} from '../../components/AddButton';
import {Team} from '../../configs/types';
import Header from '../../components/Header';

type Item = {
  item: Team;
  index: number;
};

type DetailSreenProp = DrawerNavigationProp<RootStackParamList, 'detailTeam'>;

const Teams = () => {
  const navigation = useNavigation<DetailSreenProp>();

  const [teams, setTeams] = React.useState({
    loading: false,
    error: false,
    teams: [],
    data: [],
    url: 'http://localhost:3333/teams/',
  });

  const getAllTeams = () => {
    setTeams({...teams, loading: true});
    fetch(teams.url)
      .then(res => res.json())
      .then(res => {
        setTeams({
          ...teams,
          loading: false,
          error: false,
          teams: res,
          data: res,
        });
      })
      .catch(ex => {
        setTeams({
          ...teams,
          loading: false,
          teams: [],
          data: [],
          error: true,
        });
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      setTeams({...teams, teams: [], data: []});
      getAllTeams();
    }, []),
  );

  const renderTeams = ({item, index}: Item) => (
    <TouchableOpacity
      style={styles.renderItemContainer}
      onPress={() =>
        navigation.navigate('detailTeam', {
          team: item,
        })
      }>
      <Text style={styles.renderItemTitle}>{item.name}</Text>
      <Text style={styles.renderItemText}>
        Status: {item.is_active ? 'Ativo' : 'Desativado'}
      </Text>
    </TouchableOpacity>
  );

  const renderEmptyData = () => {
    if (teams.data.length == 0 && teams.loading === false) {
      return (
        <View>
          <Text>
            Hmm...{'\n'}
            {'\n'}
            Parece que não tem nenhum grupo cadastrado! {'\n'}
            {'\n'}Puxe para atualizar.
          </Text>
        </View>
      );
    } else return <React.Fragment />;
  };

  return (
    <>
      <Header
        title="Lista de Grupos"
        leftIcon="menu"
        leftAction={() => navigation.openDrawer()}
      />
      <FlatList
        style={styles.container}
        data={teams.teams}
        refreshing={teams.loading}
        onRefresh={() => getAllTeams()}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={renderTeams}
        ListEmptyComponent={renderEmptyData}
      />
      <View style={{height: 20}} />
      <AddButton
        iconColor="#FFF"
        iconSize={40}
        onPress={() => navigation.navigate('addTeam')}
      />
    </>
  );
};

export default Teams;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eef0f2',
  },
  renderItemContainer: {
    backgroundColor: '#e9e9e8',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  renderItemTitle: {
    fontSize: 25,
    color: '#353b3c',
    fontWeight: 'bold',
  },
  renderItemText: {
    color: '#353b3c',
  },
});
