import {ScrollView, StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Vgap from '../components/Vgap';
import CustomButton from '../components/CustomButton';
import AppContext from '../context/AppContext';

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    total: yup
      .number()
      .required('Total Stock is required')
      .typeError('Total Stock must be a number'),
    price: yup
      .number()
      .required('Price is required')
      .typeError('Price must be a number'),
    desc: yup.string().min(3).required('Description is required'),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Password is required'),
  })
  .required();

const AddInventory = () => {
  const {user} = useContext(AppContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      total: '',
      price: '',
      desc: '',
      email: user?.email,
    },
  });

  const onSubmit = async (data: any) => {
    console.log({data});
    // Save to asycstorage
    // const result = await handleLogin(data);
    // if (result) {
    //   // save to context
    //   setUser(data);
    //   reset();
    // } else {
    //   console.log('Something WENT WRONG');
    // }
  };

  console.log({errors});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>Add Inventory</Text>

        <View style={styles.inputContainer}>
          <Controller
            name="name"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInput
                  placeholder="Name"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.name && (
                  <Text style={styles.error}>{errors.name.message}</Text>
                )}
              </>
            )}
          />

          <Vgap size={20} />
          <Controller
            name="total"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInput
                  placeholder="Total Stock"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
                {errors.total && (
                  <Text style={styles.error}>{errors.total.message}</Text>
                )}
              </>
            )}
          />
          <Vgap size={20} />
          <Controller
            name="price"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInput
                  placeholder="Price"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
                {errors.price && (
                  <Text style={styles.error}>{errors.price.message}</Text>
                )}
              </>
            )}
          />
          <Vgap size={20} />
          <Controller
            name="desc"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInput
                  placeholder="Description"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.desc && (
                  <Text style={styles.error}>{errors.desc.message}</Text>
                )}
              </>
            )}
          />

          <Vgap size={100} />
          <CustomButton
            label="Add to inventory"
            primary
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddInventory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 8,
  },
  inputContainer: {
    marginTop: 100,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
