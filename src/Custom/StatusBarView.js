import React from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';

//import bỏ vào đầu
const StatusBarView = () => {
   return (
      <View>
         <SafeAreaView style={{ backgroundColor: '#D9D9D9' }} />
         <View style={{ height: StatusBar.currentHeight, backgroundColor: '#D9D9D9'}} />
         <StatusBar
            barStyle="light-content"
            backgroundColor={'transparent'}
            hidden={false}
            translucent={true}
         />
      </View>
   );
};

export default StatusBarView;