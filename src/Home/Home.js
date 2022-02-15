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
  }, [name]);
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
    try {
      setLoad(true);
      await FireBase.database()
        .ref('users')
        .on('value', async (datasnapshot) => {
          const uuid = await AsyncStorage.getItem('UID');
          new Promise((resolve, reject) => {
            // console.log('ff');
            let users = [];
            let lastMessage = '';
            let lastDate = '';
            let lastTime = '';
            let properDate = '';
            datasnapshot.forEach((child) => {
              if (child.val().uid === uuid) {
                // console.log('ff');
                // this.setState({ loggedInUserName:, imageUrl: child.val().image })
                setName(child.val().name);
              } else {
                let newUser = {
                  userId: '',
                  userName: '',
                  userProPic: '',
                  lastMessage: '',
                  lastDate: '',
                  lastTime: '',
                  properDate: '',
                };
                new Promise((resolve, reject) => {
                  FireBase.database()
                    .ref('messages')
                    .child(uuid)
                    .child(child.val().uid)
                    .orderByKey()
                    .limitToLast(1)
                    .on('value', (dataSnapshots) => {
                      if (dataSnapshots.val()) {
                        dataSnapshots.forEach((child) => {
                          lastMessage = child.val().messege.message;
                          lastDate = child.val().messege.date;
                          lastTime = child.val().messege.time;
                          properDate =
                            child.val().messege.date +
                            ' ' +
                            child.val().messege.time;
                        });
                      } else {
                        lastMessage = '';
                        lastDate = '';
                        lastTime = '';
                        properDate = '';
                      }
                      newUser.userId = child.val().uid;
                      newUser.userName = child.val().name;
                      newUser.userProPic = child.val().image;
                      newUser.lastMessage = lastMessage;
                      newUser.lastTime = lastTime;
                      newUser.lastDate = lastDate;
                      newUser.properDate = properDate;
                      return resolve(newUser);
                    });
                }).then((newUser) => {
                  users.push({
                    userName: newUser.userName,
                    uuid: newUser.userId,
                    imageUrl: newUser.userProPic,
                    lastMessage: newUser.lastMessage,
                    lastTime: newUser.lastTime,
                    lastDate: newUser.lastDate,
                    properDate: newUser.lastDate
                      ? new Date(newUser.properDate)
                      : null,
                  });
                  // this.setState({ allUsers: });
                  setAllUser(users.sort((a, b) => b.properDate - a.properDate));
                });
                return resolve(users);
              }
            });
          }).then((users) => {
            console.log('vao đây');
            setAllUser(users.sort((a, b) => b.properDate - a.properDate));
            setLoad(false);
          });

          // this.setState({ loader: false })
        });
    } catch (error) {
      // alert(error);
      // this.setState({ loader: false })
      setLoad(false);
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
      <Header OnLogOut={() => onLogOut()} ishowMenu />
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center'}}
        onPress={() => {
          // onOpenLlib();
        }}>
        <Image source={Images.ic_message} style={{height: 100, width: 100}} />
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
                borderBottomWidth:0.5
              }}
              key={item.item.userName}>
              <Image
                source={Images.ic_message}
                style={{height: 60, width: 60}}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 16, fontWeight: '700'}}>
                  {item.item.userName}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '70%',
                  }}>
                  <Text style={{fontSize: 12, fontWeight: '500'}}>
                    {item.item.lastMessage}
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: '500'}}>
                    {item.item.lastTime}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Home;
