/**
 * @format
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import EditInventory from '../src/screens/EditInventory';
import {Alert} from 'react-native';

test('Confrimation pop up when trying to delete', () => {
  let props: {name: string; navigation: any; route: any} = {
    name: 'Water',
    navigation: 'any',
    route: {
      params: {
        name: 'water',
      },
    },
  };

  const rendered = renderer.create(<EditInventory {...props} />);
  const component = rendered.root;
  const button = component.findByProps({label: 'Delete Inventory'});
  const spyAlert = jest.spyOn(Alert, 'alert');
  button.props.onPress();
  expect(spyAlert).toBeTruthy();
});
