import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Holder = () => {
  return <View style={styles.container} />;
};

export default Holder;

const styles = StyleSheet.create({
  container: {
    borderStartColor: 'white',
    flex: 1,
  },
});
