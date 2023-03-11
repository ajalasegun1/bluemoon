import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
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
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const {user, setUser} = useContext(AppContext);
  console.log({user});

  useLayoutEffect(() => {
    (async () => {
      const loggedIn = await AsyncStorage.getItem('user');
      if (loggedIn !== null) {
        setUser(JSON.parse(loggedIn));
        console.log({user: JSON.parse(loggedIn)});
        console.log('Logged in');
      } else {
        console.log('Not logged in');
        setUser(null);
        // setLoggedIn(false);
      }
    })();
  }, []);
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
