import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SendMessage, RecieveMessage} from '../FireBase/FireMessage';
import FireBase from '../FireBase/FireBase';
import LoadingView from '../Custom/LoadingView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../Image/Index';

const Chat = (props) => {
  const [message, setMessage] = useState('');
  const [guesUid, setGuesUid] = useState('');
  const [currentUid, setCurrentUid] = useState('');
  const [allMessage, setAllMessage] = useState([]);
  const [load, setLoad] = useState(false);
  //   console.log(props);
  useEffect(() => {
    getData();
  }, [guesUid, currentUid]);
  const getData =async ()=> {
     setGuesUid(props.route.params.guesUid);
    const value = await AsyncStorage.getItem('UID');
     setCurrentUid(value);
     getDataFire(guesUid,currentUid);
    // console.log(props.route.params.guesUid);
    console.log('value', value);
  };;
  const getDataFire = async (a,b) => {
    console.log(a);
    console.log(b);
    setLoad(true);
    try {
      await FireBase.database()

        .ref('messages')
        .child(currentUid)
        .child(guesUid)
        .on('value', (datasnapshot) => {
          let message = [];
          datasnapshot.forEach((data) => {
            message.push({
              sendBy: data.val().currentUid,
              recieveBy: data.val().guesUid,
              msg: data.val().message,
            });
          });
          console.log(message);
          setAllMessage(message);
          setLoad(false);
        });
    } catch (error) {
      setLoad(false);
      console.log('=====error', error);
    }
  };

  const getSendMessage = async () => {
    if (message) {
      // console.log(currentUid);
      // console.log(guesUid);
      SendMessage(currentUid, guesUid, message)
        .then((res) => {
          setMessage('');
        })
        .catch((error) => {
          console.log('error', error);
        });
      RecieveMessage(currentUid, guesUid, message)
        .then((res) => {
          setMessage('');
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#000',
        flex: 1,
      }}>
      {load && <LoadingView />}
      <FlatList
        inverted={false}
        style={{marginBottom: 60}}
        data={allMessage}
        keyExtractor={(item, index) => String(index)}
        renderItem={(item) => {
          // console.log('item===', item);
          return (
            <View
              style={{
                maxWidth: Dimensions.get('window').width / 2 + 10,
                alignSelf:
                  currentUid === item.item.sendBy ? 'flex-start' : 'flex-end',
              }}
              key={item.sendBy}>
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor:
                    currentUid === item.item.sendBy ? '#fff' : '#ccc',
                }}>
                <Text style={{padding: 10, fontSize: 16, fontWeight: 'bold'}}>
                  {item.item.msg}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          bottom: 0,
          height: 50,
          flexDirection: 'row',
          width: '100%',
          position: 'absolute',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <Image source={Images.ic_add} style={{height: 30, width: 30}} />
        </TouchableOpacity>
        <TextInput
          style={{
            borderRadius: 15,
            width: '70%',
            backgroundColor: 'white',
            paddingHorizontal: 10,
          }}
          placeholder="Aa..."
          onChangeText={(text) => {
            setMessage(text);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            getSendMessage();
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <Image
            source={Images.ic_right_arrow}
            style={{height: 30, width: 30}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
