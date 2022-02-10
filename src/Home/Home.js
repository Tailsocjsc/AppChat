import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Images from '../Image/Index';

const Home = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image source={Images.ic_message} style={{height: 100, width: 100}} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Nhập tên bạn vào đây"
          style={{
            borderRadius: 10,
            borderWidth: 0.5,
            width: '70%',
            paddingHorizontal: 10,
          }}
        />
        <TouchableOpacity>
              <Image
          source={Images.ic_right}
          style={{height: 40, width: 40, left: 10}}
        />
        </TouchableOpacity>
      
      </View>
    </View>
  );
};

export default Home;
