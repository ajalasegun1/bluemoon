import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import handleLogout from '../helper/logout';
import {HomeScreenProps} from '../navigation/types';
import AppContext from '../context/AppContext';
import AddIcon from '../assets/svgs/add.svg';

const Home: FC<HomeScreenProps> = ({navigation}) => {
  const {setUser} = useContext(AppContext);
  const logout = async () => {
    const res = await handleLogout();
    if (res) {
      setUser(null);
    } else {
      console.log('Something went wrong');
    }
  };
  const goToAddScreen = () => navigation.navigate('AddInventory');
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
});
