import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import Vgap from '../components/Vgap';
import {useForm, Controller} from 'react-hook-form';
import {LoginDataType} from './types';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginDataType) => console.log(data);

  console.log({errors});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="always"
        style={styles.scroll}>
        <Text style={styles.welcome}>Welcome</Text>
        <View style={styles.inputContainer}>
          <Controller
            name="email"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email.message}</Text>
                )}
              </>
            )}
          />

          <Vgap size={20} />
          <Controller
            name="password"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInput
                  placeholder="Password"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.password && (
                  <Text style={styles.error}>{errors.password.message}</Text>
                )}
              </>
            )}
          />

          <Vgap size={100} />
          <CustomButton
            label="Login"
            primary
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  welcome: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 8,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  inputContainer: {
    marginTop: 100,
  },
});
