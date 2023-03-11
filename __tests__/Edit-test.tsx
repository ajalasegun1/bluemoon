/**
 * @format
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import EditInventory from '../src/screens/EditInventory';

test('Home Screen Snapshot', () => {
  let props: any;

  const snap = renderer.create(<EditInventory {...props} />).toJSON();
  expect(snap).toMatchSnapshot();
});
