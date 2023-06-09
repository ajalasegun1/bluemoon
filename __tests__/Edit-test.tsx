/**
 * @format
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import EditInventory from '../src/screens/EditInventory';

test('Home Screen Snapshot', () => {
  let props: {name: string; navigation: any; route: any} = {
    name: 'Water',
    navigation: 'any',
    route: {
      params: {
        name: 'water',
      },
    },
  };

  const snap = renderer.create(<EditInventory {...props} />).toJSON();
  expect(snap).toMatchSnapshot();
});
