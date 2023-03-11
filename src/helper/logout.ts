import AsyncStorage from '@react-native-async-storage/async-storage';

const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('user');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default handleLogout;
