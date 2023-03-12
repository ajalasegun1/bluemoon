import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {COLORS} from '../constants/theme';
type Props = {
  onPress?: () => void;
  label: string;
  primary?: boolean;
  testID?: string;
};

const CustomButton: FC<Props> = ({label, onPress, primary, testID}) => {
  const textStyle = {
    color: primary ? 'white' : 'black',
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      testID={testID}
      style={[
        {backgroundColor: primary ? COLORS.primary : COLORS.neutral},
        styles.button,
      ]}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
