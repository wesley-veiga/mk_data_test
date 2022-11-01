import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  iconColor: string;
  iconSize: number;
  onPress: () => void;
};

export const AddButton = (props: Props) => {
  const {iconSize, iconColor, onPress} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      <Icon name="plus" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    top: '88%',
    right: 10,
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
  },
});
