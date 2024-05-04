import React, { useEffect } from 'react';
import { Alert } from 'react-native';

import { StyleSheet, View, Text, Button } from 'react-native';
import ZegoUIKitPrebuiltLiveAudioRoom, {
  AUDIENCE_DEFAULT_CONFIG,
  ZegoMediaType,
} from '@zegocloud/zego-uikit-prebuilt-live-audio-room-rn';
import * as ZIM from 'zego-zim-react-native';
import KeyCenter from "./KeyCenter";

export default function AudiencePage(props) {
  const { route } = props;
  const { params } = route;
  const { liveID } = params;

  // Function to generate a random userID and userName except 1
  const generateRandomUserInfo = () => {
    let randomUserID = Math.floor(Math.random() * 100) + 2; // Generate random userID between 2 and 101
    let randomUserName = `User${randomUserID}`; // Generate random userName based on userID

    return {
      userID: randomUserID.toString(),
      userName: randomUserName
    };
  };

  const { userID, userName } = generateRandomUserInfo();

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltLiveAudioRoom
        appID={KeyCenter.appID}
        appSign={KeyCenter.appSign}
        userID={userID}
        userName={userName}
        roomID={liveID}
        config={{
          ...AUDIENCE_DEFAULT_CONFIG,
          onLeave: () => {
            props.navigation.navigate('Home');
          },
          onTurnOnYourMicrophoneRequest: (fromUser) => {},
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
