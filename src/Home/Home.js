import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Images from '../Image/Index';
import FireBase from '../FireBase/FireBase';

const Home = () => {
  const [name, setName] = useState('');
  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    getDataFireBase();
  }, []);
  const getDataFireBase = async () => {
    try {
      await FireBase.database()
        .ref('users')
        .on("value", (datasnapshot) => {
          const uuid = FireBase.auth().currentUser.uid;
          console.log('====', uuid);
          let users = [];
          datasnapshot.forEach((child) => {
            if (child.val().uuid === uuid) {
            } else {
              users.push({
                userName: child.val().name,
                uuid: child.val().uuid,
              });
            }
          });
          setAllUser(users);
        });
    } catch (error) {
      console.log('=====error',error);
    }
  };

  const RenderItem = ({item}) => {
    return (
      <TouchableOpacity style={{flexDirection: 'row'}}>
        <Image source={Images.ic_message} style={{height: 60, width: 60}} />
        <Text> {item.name} </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={Images.ic_message} style={{height: 100, width: 100}} />
      </View>
      <FlatList
        data={allUser}
        keyExtractor={(index) => {
          index.toString();
        }}
        renderItem={(item) => {
          RenderItem(item);
        }}
      />
    </View>
  );
};

export default Home;
