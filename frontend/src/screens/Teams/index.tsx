import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Team} from '../../reducer/teamReducer';

type Item = {
  item: Team;
  index: number;
};

const Teams = () => {
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
      teams.data.length == 0 && getAllTeams();
    }, []),
  );

  const renderTeams = ({item, index}: Item) => (
    <View style={styles.renderItemContainer}>
      <Text style={styles.renderItemText}>Nome: {item.name}</Text>
    </View>
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
  );
};

export default Teams;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F9F9F9',
  },
  renderItemContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#C9C9C9',
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
  },
  renderItemText: {
    color: '#000',
  },
});
