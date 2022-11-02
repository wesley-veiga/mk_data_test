import React from 'react';

import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import {useDispatch} from 'react-redux';

import Button from '../../components/Button';
import Input from '../../components/Input';
import {login} from '../../reducer/loginReducer';

const Login = () => {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = React.useState({
    login: '',
    password: '',
  });

  const handleLogin = () => {
    dispatch(login());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          position: 'absolute',
          height: '40%',
          width: '100%',
          backgroundColor: '#336699',
          borderBottomRightRadius: 300,
        }}
      />
      <Text
        style={{
          fontSize: 50,
          color: '#FFF',
          top: '20%',
          left: 10,
        }}>
        Bem Vindo
      </Text>
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
          <Button
            text="login"
            variant="primary"
            onPress={() => handleLogin()}
          />
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
