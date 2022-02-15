import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import StatusBarView from './StatusBarView';
import Images from '../Image/Index';

const Header = (props) => {
  return (
    <View>
      <StatusBarView />
      <View
        style={{
          height: Platform.OS === 'ios' ? 50 : 55,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          // flex: 3,
          // flex:1
        }}>
        {props.ishowBack && (
          <TouchableOpacity
            onPress={() => props.OnBack()}
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingHorizontal: 10,
            }}>
            <Image source={Images.ic_back} style={{height: 35, width: 35}} />
          </TouchableOpacity>
        )}

        <View
          style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
            }}>
            {props.title}
          </Text>
        </View>
        {props.ishowMenu && (
          <TouchableOpacity
            onPress={() => props.OnLogOut()}
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingHorizontal: 10,
            }}>
            <Image source={Images.ic_LogOut} style={{height: 35, width: 35}} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
