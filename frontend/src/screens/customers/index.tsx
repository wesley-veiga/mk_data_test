import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useFocusEffect} from '@react-navigation/native';
import {RootStackParamList} from '../routes';
import {AddButton} from '../../components/AddButton';
import {Customer} from '../../configs/types';
import Header from '../../components/Header';

type Item = {
  item: Customer;
  index: number;
};

const Customers = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const [customers, setCustomers] = React.useState({
    loading: false,
    error: false,
    customers: [],
    data: [],
    url: 'http://localhost:3333/customers/',
  });

  const getAllCustomers = () => {
    setCustomers({...customers, loading: true});
    fetch(customers.url)
      .then(res => res.json())
      .then(res => {
        setCustomers({
          ...customers,
          loading: false,
          error: false,
          customers: res,
          data: res,
        });
      })
      .catch(ex => {
        setCustomers({
          ...customers,
          loading: false,
          customers: [],
          data: [],
          error: true,
        });
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      setCustomers({...customers, customers: [], data: []});
      getAllCustomers();
    }, []),
  );

  const renderCustomers = ({item, index}: Item) => (
    <TouchableOpacity
      style={styles.renderItemContainer}
      onPress={() =>
        navigation.navigate('detailCustomer', {
          customer: item,
        })
      }>
      <Text style={styles.renderItemTitle}>{item.name}</Text>
      <Text style={styles.renderItemText}>Tipo: {item.type}</Text>
      <Text style={styles.renderItemText}>
        Status: {item.is_active ? 'Ativo' : 'Desativado'}
      </Text>
      <Text style={styles.renderItemText}>Grupo: {item.team_name}</Text>
    </TouchableOpacity>
  );

  const renderEmptyData = () => {
    if (customers.data.length == 0 && customers.loading === false) {
      return (
        <View>
          <Text>
            Hmm...{'\n'}
            {'\n'}
            Parece que não tem nenhum cliente cadastrado! {'\n'}
            {'\n'}Puxe para atualizar.
          </Text>
        </View>
      );
    } else return <React.Fragment />;
  };

  return (
    <>
      <Header
        title="Lista de Clientes"
        leftIcon="menu"
        leftAction={() => navigation.openDrawer()}
      />
      <FlatList
        style={styles.container}
        data={customers.customers}
        refreshing={customers.loading}
        onRefresh={() => getAllCustomers()}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={renderCustomers}
        ListEmptyComponent={renderEmptyData}
      />
      <View style={{height: 20}} />
      <AddButton
        iconColor="#FFF"
        iconSize={40}
        onPress={() => navigation.navigate('addCustomer')}
      />
    </>
  );
};

export default Customers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eef0f2',
  },
  renderItemContainer: {
    backgroundColor: '#e9e9e8',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  renderItemTitle: {
    fontSize: 25,
    color: '#353b3c',
    fontWeight: 'bold',
  },
  renderItemText: {
    color: '#353b3c',
  },
});
