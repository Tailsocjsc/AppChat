import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FireLogIn} from '../FireBase/FireLogIn';
import {AddUser} from '../FireBase/FireUser';
import FireBase from '../FireBase/FireBase';
import LoadingView from '../Custom/LoadingView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogIn = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('123456');
  const [load, setLoad] = useState(false);
  useEffect(() => {
    SavePass();
  }, []);
  const SavePass = async () => {
    setLoad(true);
    const value = await AsyncStorage.getItem('UID');
    if (value) {
      setLoad(false);
      props.navigation.navigate('Home');
      // value previously stored
    } else {
      setLoad(false);
    }
  };

  const LogInByFire = async () => {
    setLoad(true);
    FireLogIn(email, pass)
      .then(async (res) => {
        var userUID = FireBase.auth().currentUser.uid;
        // console.log('userUID', res);
        await AsyncStorage.setItem('UID', userUID);
        setLoad(false);
        props.navigation.navigate('Home');

        // AddUser( email, '', userUID)
        //   .then(() => {
        //     console.log('Success');
        //   })
        //   .catch((error) => {
        //     console.log('error', error);
        //   });
      })
      .catch((error) => {
        setLoad(false);
        console.log('error', error);
      });
  };
  return (
    <View
      style={{
        backgroundColor: '#000',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {load && <LoadingView />}
      <TextInput
        placeholder="Enter Email"
        placeholderTextColor={'black'}
        style={{
          borderRadius: 10,
          borderWidth: 0.5,
          width: '70%',
          paddingHorizontal: 10,
          backgroundColor: 'white',
          marginVertical: 15,
        }}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        placeholder="Enter Password"
        placeholderTextColor={'black'}
        style={{
          borderRadius: 10,
          borderWidth: 0.5,
          width: '70%',
          paddingHorizontal: 10,
          backgroundColor: 'white',
        }}
        onChangeText={(text) => {
          setPass(text);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          LogInByFire();
        }}
        style={{
          backgroundColor: '#ffca02',
          borderRadius: 10,
          borderWidth: 0.5,
          width: '70%',
          paddingHorizontal: 10,
          height: 45,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <Text style={{fontSize: 18, fontWeight: '700'}}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('SignUp');
        }}
        style={{
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <Text style={{fontSize: 15, fontWeight: '700', color: 'white'}}>
          New Acount? Sigin Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogIn;
