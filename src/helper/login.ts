import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginDataType} from '../screens/types';

const handleLogin = async (data: LoginDataType) => {
  const user = data;
  try {
    AsyncStorage.setItem('user', JSON.stringify(user));
    return true;
  } catch (error) {
    return false;
  }
};

export default handleLogin;
