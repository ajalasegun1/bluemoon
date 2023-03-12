import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback, useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import handleLogout from '../helper/logout';
import {HomeScreenProps} from '../navigation/types';
import AppContext from '../context/AppContext';
import AddIcon from '../assets/svgs/add.svg';
import {Inventory} from '../context/types';
import {COLORS} from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const Home: FC<HomeScreenProps> = ({navigation}) => {
  const {setUser, user} = useContext(AppContext);
  const [data, setData] = useState<Inventory[] | null>([]);

  useFocusEffect(
    useCallback(() => {
      fetchInventory();
    }, []),
  );

  const logout = async () => {
    try {
      const success = await handleLogout();
      if (success) {
        setUser(null);
        return true;
      }
      return false;
    } catch (error) {
      console.log({error});
    }
  };
  const goToAddScreen = () => navigation.navigate('AddInventory');

  const fetchInventory = useCallback(async () => {
    // From Async Storage
    const data = await AsyncStorage.getItem('inventory');
    const inventory = JSON.parse(data as any);
    if (inventory && inventory.length > 0 && user?.email) {
      const filter = inventory.filter(
        (item: Inventory) => item.email === user.email,
      );
      setData(filter);
    } else {
      setData(null);
    }
  }, []);

  const renderItem = ({item, index}: {item: Inventory; index: number}) => (
    <TouchableOpacity
      style={styles.tableRow}
      onPress={() => goToEdit(item.name)}
      key={index.toString()}
      testID="data-row">
      <View style={styles.cellStyle2}>
        <Text>{item.name}</Text>
      </View>
      <View style={styles.cellStyle2}>
        <Text>{item.desc}</Text>
      </View>
      <View style={styles.cellStyle2}>
        <Text>{item.total}</Text>
      </View>
      <View style={styles.cellStyle2}>
        <Text>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => {
    return (
      <View style={styles.empty}>
        <Text>Your inventory is empty</Text>
      </View>
    );
  };

  const TableHeader = () => {
    return (
      <View style={[styles.tableHeader, {backgroundColor: COLORS.primary}]}>
        <View style={styles.cellStyle}>
          <Text style={styles.hText}>Name</Text>
        </View>
        <View style={styles.cellStyle}>
          <Text style={styles.hText}>Desc</Text>
        </View>
        <View style={styles.cellStyle}>
          <Text style={styles.hText}>Total</Text>
        </View>
        <View style={styles.cellStyle}>
          <Text style={styles.hText}>Price</Text>
        </View>
      </View>
    );
  };

  const goToEdit = (name: string) => {
    navigation.navigate('EditInventory', {name});
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text} testID="header-text">
          Bluemoon <Text style={styles.inv}>Inventory</Text>
        </Text>
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.7}
          onPress={goToAddScreen}>
          <AddIcon width={20} height={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.tableContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          ListHeaderComponent={TableHeader}
          ListEmptyComponent={renderEmpty}
        />
      </View>

      <CustomButton label="Logout" onPress={logout} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontWeight: '900',
    fontSize: 30,
  },
  inv: {
    fontWeight: '500',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addBtn: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  tableContainer: {
    marginTop: 20,
    marginBottom: 40,
    flex: 1,
  },

  editButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  cellStyle: {
    padding: 7,
    flex: 1,
  },
  cellStyle2: {
    padding: 7,
    flex: 1,
    backgroundColor: 'white',
  },
  hText: {
    fontWeight: '700',
    color: 'white',
  },
  empty: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
});
