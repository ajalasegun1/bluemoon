import 'react-native';
import React from 'react';
import {render, screen, act} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(() => ({})),
  };
});

test('Navigation to edit screen on inventory item click', async () => {
  const data = [
    {
      name: 'water',
      desc: 'clean',
      total: '1',
      price: '20',
    },
  ];
  let props: {navigation: any; route: any} = {
    navigation: jest.fn(),
    route: {
      params: {
        name: 'water',
      },
    },
  };

  const mockData = JSON.stringify(data);
  jest
    .spyOn(AsyncStorage, 'getItem')
    .mockReturnValueOnce(Promise.resolve(mockData));
  const {getByText} = render(
    <NavigationContainer>
      <Home {...props} />
    </NavigationContainer>,
  );
  //   Your inventory is empty
  expect(getByText('Your inventory is empty')).toBeTruthy();

  await act(async () => {
    jest.runAllTimers(); // wait for useFocusEffect to fetch data
  });

  expect(getByText(mockData)).toBeTruthy();

  screen.debug();
});
