import React from 'react';
import {View, Text, ActivityIndicator, Modal} from 'react-native';

const LoadingView = props => {
  return (
    <Modal visible={props.visible} statusBarTranslucent transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000036',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}>
          <ActivityIndicator size="large" color="#0000ff" />
        
        
      </View>
    </Modal>
  );
};

export default LoadingView;

