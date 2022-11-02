import React from 'react';
import {View, Switch, Text, StyleSheet, SwitchProps} from 'react-native';

type Props = {
  text: string;
  value: boolean;
} & SwitchProps;

export const SwitchButton = (props: Props) => {
  const {text, value} = props;
  return (
    <View style={styles.switchContainer}>
      <Text style={{fontSize: 18, color: '#000'}}>{text}</Text>
      <Switch
        {...props}
        trackColor={{false: '#bd2020', true: '#daf7dc'}}
        thumbColor={value ? '#9EE493' : '#3e3e3e'}
        ios_backgroundColor="#3e3e3e"
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
