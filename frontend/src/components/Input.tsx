import React from 'react';
import {View, Text, TextInput, TextInputProps, StyleSheet} from 'react-native';

type Props = {
  question: string;
} & TextInputProps;

const Input = (props: Props) => {
  return (
    <View>
      <Text style={inputStyle.text}>{props.question}</Text>
      <TextInput {...props} style={inputStyle.container} />
    </View>
  );
};

export default Input;

const inputStyle = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    width: 250,
  },
  text: {
    fontSize: 15,
    color: '#272727',
  },
});
