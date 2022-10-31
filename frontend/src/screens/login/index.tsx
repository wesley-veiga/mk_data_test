import React from 'react';

import {View, StyleSheet, SafeAreaView} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Login = () => {
  const [loginData, setLoginData] = React.useState({
    login: '',
    password: '',
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          question="Usuário"
          value={loginData.login}
          onChangeText={text => setLoginData({...loginData, login: text})}
          autoCapitalize="none"
          multiline={false}
          maxLength={20}
          keyboardType="default"
        />
        <Input
          question="Senha"
          value={loginData.password}
          onChangeText={text => setLoginData({...loginData, password: text})}
          autoCapitalize="none"
          secureTextEntry={true}
          multiline={false}
          maxLength={20}
          keyboardType="default"
        />
        <View style={styles.buttonContainer}>
          <Button text="login" variant="primary" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  inputContainer: {
    top: '45%',
    alignItems: 'center',
    margin: 20,
  },
  buttonContainer: {
    marginTop: 50,
  },
});
