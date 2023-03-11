import AsyncStorage from '@react-native-async-storage/async-storage';
import {Inventory} from '../context/types';

type ReturnType = Inventory[] | null;

const deleteInventory = async (name: string): Promise<ReturnType> => {
  try {
    const storeInventory = await AsyncStorage.getItem('inventory');
    if (storeInventory !== null) {
      const inventory = JSON.parse(storeInventory);
      const index = inventory.findIndex(
        (item: Inventory) => item.name === name,
      );
      console.log({index});
      inventory.splice(index, 1);
      await AsyncStorage.setItem('inventory', JSON.stringify(inventory));
      return inventory;
    } else {
      console.log('It is null');
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default deleteInventory;
