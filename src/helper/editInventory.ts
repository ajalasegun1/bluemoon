import AsyncStorage from '@react-native-async-storage/async-storage';
import {InventoryType} from './types';
import {Inventory} from '../context/types';

type ReturnType = Inventory[] | null;

const editInventory = async (
  data: InventoryType,
  oldName: string,
): Promise<ReturnType | undefined> => {
  try {
    const storeInventory = await AsyncStorage.getItem('inventory');
    if (storeInventory !== null) {
      const inventory = JSON.parse(storeInventory);
      const index = inventory.findIndex(
        (item: Inventory) => item.name === oldName,
      );
      console.log({index});
      inventory.splice(index, 1, data);
      await AsyncStorage.setItem('inventory', JSON.stringify(inventory));

      return inventory;
    } else {
      console.log('It is null');
    }
  } catch (error) {
    console.log(error);
  }
};

export default editInventory;
