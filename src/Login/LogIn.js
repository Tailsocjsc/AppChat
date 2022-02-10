import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {FireLogIn} from '../FireBase/FireLogIn';
import {AddUser} from '../FireBase/FireUser';
import FireBase from '../FireBase/FireBase';

const LogIn = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const LogInByFire = () => {
    FireLogIn(email, pass)
      .then((res) => {
        var userUID = FireBase.auth().currentUser.uid;
        console.log('userUID', res);
        props.navigation.navigate('Home')

        // AddUser( email, '', userUID)
        //   .then(() => {
        //     console.log('Success');
        //   })
        //   .catch((error) => {
        //     console.log('error', error);
        //   });
      })
      .catch((error) => {
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
            props.navigation.navigate('SignUp')
        }}
        style={{
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <Text style={{fontSize: 15, fontWeight: '700', color:'white'}}>New Acount? Sigin Up</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default LogIn;
