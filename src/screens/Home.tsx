import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import handleLogout from '../helper/logout';
import {HomeScreenProps} from '../navigation/types';
import AppContext from '../context/AppContext';
import AddIcon from '../assets/svgs/add.svg';
import {Table, Row, Rows} from 'react-native-table-component';
import {InventoryType} from '../helper/types';

const Home: FC<HomeScreenProps> = ({navigation}) => {
  const {setUser, inventory, user} = useContext(AppContext);
  const [data, setData] = useState<InventoryType[]>([]);
  const dataHead = ['Name', 'Desc', 'Total', 'Price'];
  const [tableData, setTableData] = useState<[string[]] | []>([]);

  const logout = async () => {
    const res = await handleLogout();
    if (res) {
      setUser(null);
    } else {
      console.log('Something went wrong');
    }
  };
  const goToAddScreen = () => navigation.navigate('AddInventory');
  useEffect(() => {
    console.log({inventory});
    if (inventory && inventory.length > 0 && user?.email) {
      const filter = inventory.filter(item => item.email === user.email);

      const res = filter.map(item => {
        const arr = [];
        arr.push(item.name);
        arr.push(item.desc);
        arr.push(item.total.toString());
        arr.push(item.price.toString());

        return arr;
      });
      const result = res;
      console.log({result: [...result]});
      // @ts-ignore
      setTableData(result);
    }
  }, [inventory]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>
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
        {data && (
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row
              data={dataHead}
              style={styles.tableHead}
              textStyle={styles.tableText}
            />
            <Rows data={tableData} textStyle={styles.tableText} />
          </Table>
        )}
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
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 40,
  },
  tableHead: {height: 40, backgroundColor: '#f1f8ff'},
  tableText: {margin: 6},
});
