import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {FireSignUp} from '../FireBase/FireSignUp';
import {AddUser} from '../FireBase/FireUser';
import FireBase from '../FireBase/FireBase';

const SignUp = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const SignUpByFire = () => {
    FireSignUp(email, pass)
      .then((res) => {
        var userUID = FireBase.auth().currentUser.uid;
        console.log('userUID', res);
        AddUser(name, email, '', userUID)
          .then(() => {
            console.log('Success');
          })
          .catch((error) => {
            console.log('error', error);
          });
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
        placeholder="Enter Name"
        placeholderTextColor={'black'}
        style={{
          borderRadius: 10,
          borderWidth: 0.5,
          width: '70%',
          paddingHorizontal: 10,
          backgroundColor: 'white',
        }}
        onChangeText={(text) => {
          setName(text);
        }}
      />
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
          SignUpByFire();
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
        <Text style={{fontSize: 18, fontWeight: '700'}}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <Text style={{fontSize: 15, fontWeight: '700', color: 'white'}}>
        Already have an account ? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
