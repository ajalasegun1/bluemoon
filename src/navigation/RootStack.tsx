import React, {useContext, useLayoutEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Home from '../screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from './types';
import AppContext from '../context/AppContext';
import AddInventory from '../screens/AddInventory';
import EditInventory from '../screens/EditInventory';
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const {user, setUser, setInventory} = useContext(AppContext);

  useLayoutEffect(() => {
    (async () => {
      const loggedIn = await AsyncStorage.getItem('user');
      const inventory = await AsyncStorage.getItem('inventory');

      if (loggedIn !== null) {
        setUser(JSON.parse(loggedIn));
        setInventory(JSON.parse(inventory as any));
      } else {
        setUser(null);
      }
    })();
  }, [setUser, setInventory]);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!user ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddInventory" component={AddInventory} />
            <Stack.Screen name="EditInventory" component={EditInventory} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
