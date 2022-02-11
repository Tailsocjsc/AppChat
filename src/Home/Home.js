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
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingView from '../Custom/LoadingView';
import Header from '../Custom/Header';
import ImagePicker from 'react-native-image-crop-picker';
import {UpLoadImageUser} from '../FireBase/FireUser';
const Home = (props) => {
  const [name, setName] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [load, setLoad] = useState(false);
  const [Base, setBase] = useState('');
  useEffect(() => {
    getDataFireBase();
  }, []);
  const onOpenLlib = async () => {
    setLoad(true);
    ImagePicker.openPicker({
      multiple: true,
      includeBase64: true,
    })
      .then(async (image) => {
        // console.log(image);
        console.log('============================================');
        // console.log(image[0].data);
        setLoad(false);
        const value = await AsyncStorage.getItem('UID');
        const source = `data:${image[0].mime};base64,${image[0].data}`;
        UpLoadImageUser(source, value).then(() => {});
        setBase(source);
      })
      .catch((err) => {
        setLoad(false);
      });
  };
  const getDataFireBase = async () => {
    setLoad(true);
    try {
      await FireBase.database()
        .ref('users')
        .on('value', (datasnapshot) => {
          const uuid = FireBase.auth().currentUser.uid;
          // console.log('====', uuid);
          let users = [];
          datasnapshot.forEach((child) => {
            if (child.val().uid === uuid) {
              setName(child.val().name);
              setBase(child.val().image);
            } else {
              users.push({
                userName: child.val().name,
                uuid: child.val().uid,
                image: child.val().image,
              });
            }
          });
          setAllUser(users);
          setLoad(false);
        });
    } catch (error) {
      setLoad(false);
      console.log('=====error', error);
    }
  };

  const onLogOut = async () => {
    await AsyncStorage.removeItem('UID');
    await FireBase.auth()
      .signOut()
      .then(() => {
        props.navigation.navigate('LogIn');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={{flex: 1}}>
      {load && <LoadingView />}
      <Header OnLogOut={() => onLogOut()} />
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center'}}
        onPress={() => {
          onOpenLlib();
        }}>
        <Image source={{uri: Base}} style={{height: 100, width: 100}} />
        <Text style={{fontSize: 20, fontWeight: '700'}}>{name}</Text>
      </TouchableOpacity>
      <FlatList
        data={allUser}
        keyExtractor={(item, index) => String(index)}
        renderItem={(item) => {
          // console.log('item===', item);
          return (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Chat', {guesUid: item.item.uuid});
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginHorizontal: 20,
                marginVertical: 10,
              }}
              key={item.userName}>
              <Image
                source={Images.ic_message}
                style={{height: 60, width: 60}}
              />
              <Text style={{fontSize: 16, fontWeight: '700'}}>
                {' '}
                {item.item.userName}{' '}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Home;
