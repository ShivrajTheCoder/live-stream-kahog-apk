import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import ZegoUIKitPrebuiltLiveAudioRoom, { HOST_DEFAULT_CONFIG } from '@zegocloud/zego-uikit-prebuilt-live-audio-room-rn'
import KeyCenter from './KeyCenter';

export default function HostPage(props) {
  const { route } = props;
  const { params } = route;
  const { userID, userName, liveID } = params;

  return (
    <View style={styles.container}>
       <ZegoUIKitPrebuiltLiveAudioRoom
                appID={KeyCenter.appID}
                appSign={KeyCenter.appSign}
                userID={String(userID)} // userID can be something like a phone number or the user id on your own user system. 
                userName={"Admin"}
                roomID={liveID} // roomID can be any unique string. 
                config={{
                  ...HOST_DEFAULT_CONFIG,
                    onLeave: () => { props.navigation.navigate('Home') },
                }}
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  avView: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
  },
  ctrlBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 50,
    width: '100%',
    height: 50,
    zIndex: 2,
  },
  ctrlBtn: {
    flex: 1,
    width: 48,
    height: 48,
    marginLeft: 37 / 2,
    position: 'absolute',
  },
});
