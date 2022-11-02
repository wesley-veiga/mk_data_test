import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackParamList} from '../screens/routes';

type Props = {
  title: string;
  leftAction: 'back' | 'menu';
};
const Header = (props: Props) => {
  const {title, leftAction} = props;
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const Action = () => {
    if (leftAction === 'menu') return navigation.openDrawer();

    return navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#336699'} />
      <TouchableOpacity onPress={() => Action()}>
        {leftAction === 'menu' ? (
          <Icon name="bars" size={30} color="#FFF" />
        ) : (
          <Icon name="arrow-left" size={30} color="#FFF" />
        )}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.hideMenu} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    backgroundColor: '#336699',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  title: {
    fontSize: 30,
    color: '#FFF',
  },
  hideMenu: {
    width: 30,
  },
});
