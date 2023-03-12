import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native';
import React, {FC, useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Vgap from '../components/Vgap';
import CustomButton from '../components/CustomButton';
import AppContext from '../context/AppContext';
import {InventoryType} from '../helper/types';
import {EditStackScreenProps} from '../navigation/types';
import checkAvailability from '../helper/checkAvailability';
import getInventoryItem from '../helper/getInventoryItem';
import editInventory from '../helper/editInventory';
import deleteInventory from '../helper/deleteInventory';

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

const EditInventory: FC<EditStackScreenProps> = ({navigation, route}) => {
  const {name} = route.params;
  const {user, setInventory, inventory} = useContext(AppContext);
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
      email: user ? user?.email : '',
    },
  });

  const onSubmit = async (data: InventoryType) => {
    try {
      const exists = checkAvailability(inventory, data.name);
      if (exists) {
        hanldleAlert();
        return;
      }

      const res = await editInventory(data, name);
      //   const res = await handleAdd(data);
      if (res) {
        setInventory(res);
        reset();
        navigation.pop();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hanldleAlert = () => {
    Alert.alert('Item already exists!');
  };

  const handleDelete = async () => {
    try {
      const res = await deleteInventory(name);
      if (res || null) {
        // Cuz the inventory can also be null
        setInventory(res);
        reset();
        navigation.pop();
      }
    } catch (error) {}
  };

  useEffect(() => {
    const item = getInventoryItem(inventory, name);
    if (item) {
      reset({
        ...item,
        total: item.total.toString(),
        price: item.price.toString(),
      });
    }
  }, [name, reset, inventory]);

  const deleteAlert = () => {
    Alert.alert(
      'Delete Inventory',
      'Are you sure you want to delete this item from your inventory?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, Delete It!',
          onPress: () => handleDelete(),
        },
      ],
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>Edit Inventory</Text>

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
            label="Edit Inventory"
            primary
            onPress={handleSubmit(onSubmit)}
          />
          <Vgap size={20} />
          <CustomButton
            label="Delete Inventory"
            onPress={deleteAlert}
            testID="delete-button"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditInventory;

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
