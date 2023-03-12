/**
 * @format
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

import Home from '../src/screens/Home';

test('Home Screen Snapshot', async () => {
  let props: any;
  //   const tree = renderer.create(<Home {...props} />).toJSON();
  //   expect(tree).toMatchSnapshot();

  const tree = render(
    <NavigationContainer>
      <Home {...props} />
    </NavigationContainer>,
  ).toJSON();
  //   screen.debug();
  expect(tree).toMatchSnapshot();
});
