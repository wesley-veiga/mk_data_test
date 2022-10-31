import React from 'react';

import {Text, TouchableOpacity, StyleSheet, TextStyle} from 'react-native';

type Props = {
  text: string;
  variant: Variant;
};

type Variant = 'primary' | 'secondary' | 'destroy';

const Button = (props: Props) => {
  return (
    <TouchableOpacity style={styleContainer[props.variant]}>
      <Text style={styleText[props.variant]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styleContainer = StyleSheet.create({
  primary: {
    height: 50,
    width: 200,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  secondary: {
    height: 50,
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  destroy: {
    height: 50,
    width: 200,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

const styleText = StyleSheet.create({
  primary: {
    fontSize: 20,
    color: '#FFF',
  },
  secondary: {
    fontSize: 20,
    color: '#000',
  },
  destroy: {
    fontSize: 20,
    color: '#000',
  },
});
