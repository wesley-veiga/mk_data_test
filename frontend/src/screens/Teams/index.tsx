import React from 'react';
import {View} from 'react-native';
import axios from 'axios';
import {Team} from '../../reducer/teamReducer';

const Teams = () => {
  const [teams, setTeams] = React.useState<Array<Team>>();

  React.useEffect(() => {
    axios.get('http://localhost:3333/teams/').then((response: Array<Team>) => {
      return setTeams(response);
    });
  }, []);

  return <View style={{flex: 1}} />;
};

export default Teams;
