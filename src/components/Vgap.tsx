import {View} from 'react-native';
import React, {FC} from 'react';
type Props = {
  size: number;
};
const Vgap: FC<Props> = ({size}) => {
  return <View style={{height: size}} />;
};

export default Vgap;
