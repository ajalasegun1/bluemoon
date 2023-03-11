import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Holder: undefined;
  AuthStack: undefined;
  AddInventory: undefined;
  EditInventory: {name: string};
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

export type HolderScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Holder'
>;
export type AuthStackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AuthStack'
>;

export type AddStackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AddInventory'
>;
export type EditStackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditInventory'
>;
