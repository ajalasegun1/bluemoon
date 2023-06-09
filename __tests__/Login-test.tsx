/**
 * @format
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Login from '../src/screens/Login';

test('Login Screen Snapshot', () => {
  let props: any;

  const snap = renderer.create(<Login {...props} />).toJSON();
  expect(snap).toMatchSnapshot();
});
