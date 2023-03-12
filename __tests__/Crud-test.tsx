import 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('CRUD operations', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });
  it('Should create inventory when inventory is null', async () => {
    const email = 'test@123.com';
    const value = [
      {
        name: 'water',
        desc: 'eva',
        total: '12',
        price: '20',
        email,
      },
    ];
    const key = 'inventory';
    await AsyncStorage.setItem(key, JSON.stringify(value as any));

    const asyncInventory = await AsyncStorage.getItem(key);
    expect(asyncInventory).toEqual(JSON.stringify(value as any));
  });

  it('Should append inventory item when inventory is greater than one', async () => {
    const email = 'test@123.com';
    const value = [
      {
        name: 'water',
        desc: 'eva',
        total: '12',
        price: '20',
        email,
      },
    ];
    const key = 'inventory';
    await AsyncStorage.setItem(key, JSON.stringify(value as any));

    const asyncInventory = await AsyncStorage.getItem(key);

    // There is an item in the inventory
    const value2 = [
      {
        tea: 'tea',
        desc: 'top tea',
        total: '20',
        price: '5',
        email: 'test2@gmail.com',
      },
    ];
    if (JSON.parse(asyncInventory as any).length > 0) {
      let inventory = JSON.parse(asyncInventory as any);
      inventory.push(value2);
      inventory = JSON.stringify(inventory);
      await AsyncStorage.setItem('inventory', inventory);
      const newInventory = await AsyncStorage.getItem('inventory');

      expect(inventory).toEqual(newInventory);
    }
  });

  it('Should edit inventory by name', async () => {
    const email = 'test@123.com';
    const name = 'tea';
    const value = [
      {
        name: 'water',
        desc: 'eva',
        total: '12',
        price: '20',
        email,
      },
      {
        name: 'tea',
        desc: 'top tea',
        total: '20',
        price: '50',
        email,
      },
    ];
    const newValue = {
      name: 'choco',
      desc: 'coco tea',
      total: '20',
      price: '50',
      email,
    };
    const key = 'inventory';
    await AsyncStorage.setItem(key, JSON.stringify(value as any));

    const asyncInventory = await AsyncStorage.getItem(key);

    const toEditAsyncStorage = JSON.parse(asyncInventory as any);
    const index = toEditAsyncStorage.findIndex(
      (item: {
        name: string;
        desc: string;
        total: string;
        price: string;
        email: string;
      }) => item.name === name,
    );
    const editedInventory = toEditAsyncStorage.splice(index, 1, newValue);

    await AsyncStorage.setItem(key, JSON.stringify(editedInventory));
    const newInventory = await AsyncStorage.getItem(key);

    expect(JSON.stringify(editedInventory)).toEqual(newInventory);
  });

  it('Should delete inventory by name', async () => {
    const email = 'test@123.com';
    const name = 'tea';
    const value = [
      {
        name: 'water',
        desc: 'eva',
        total: '12',
        price: '20',
        email,
      },
      {
        name: 'tea',
        desc: 'top tea',
        total: '20',
        price: '50',
        email,
      },
    ];

    const key = 'inventory';
    await AsyncStorage.setItem(key, JSON.stringify(value as any));

    const asyncInventory = await AsyncStorage.getItem(key);

    const toEditAsyncStorage = JSON.parse(asyncInventory as any);
    const index = toEditAsyncStorage.findIndex(
      (item: {
        name: string;
        desc: string;
        total: string;
        price: string;
        email: string;
      }) => item.name === name,
    );
    const editedInventory = toEditAsyncStorage.splice(index, 1); //In this case no no replacing the spliced inventory

    await AsyncStorage.setItem(key, JSON.stringify(editedInventory));
    const newInventory = await AsyncStorage.getItem(key);

    expect(JSON.stringify(editedInventory)).toEqual(newInventory);
  });
});
