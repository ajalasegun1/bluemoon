import AsyncStorage from '@react-native-async-storage/async-storage';
import {InventoryType} from './types';
import {Inventory} from '../context/types';

type ReturnType = Inventory[] | null;

const addToInventory = async (
  data: InventoryType,
): Promise<ReturnType | undefined> => {
  try {
    const storeInventory = await AsyncStorage.getItem('inventory');
    if (storeInventory !== null) {
    } else {
      await AsyncStorage.setItem('inventory', JSON.stringify([data]));
      return [data];
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export default addToInventory;
