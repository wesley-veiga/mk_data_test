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
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={value ? '#f5dd4b' : '#f4f3f4'}
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
