/**
 * @format
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import AddInventory from '../src/screens/AddInventory';

test('Add Inventory Screen Snapshot', () => {
  let props: any;

  const snap = renderer.create(<AddInventory {...props} />).toJSON();
  expect(snap).toMatchSnapshot();
});
