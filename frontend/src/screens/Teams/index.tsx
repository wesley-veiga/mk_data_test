import React from 'react';
import {View} from 'react-native';

const Teams = () => {
  React.useEffect(() => {
    getTeams();
  }, []);

  const getTeams = async () => {
    await fetch('http://192.168.100.23/3333/')
      .then(res => res.json())
      .then(res => {
        console.log('res', res);
      })
      .catch(ex => {
        console.log('ex', ex);
      });
  };

  return <View style={{flex: 1}} />;
};

export default Teams;
