import React, { useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Video from 'react-native-video';

export default function VideoPlayingScreen() {
  const videoRef = useRef(null);

  return (
    <TouchableWithoutFeedback onPress={() => videoRef.current.presentFullscreenPlayer()}>
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={{ uri: 'https://res.cloudinary.com/dzd53baqf/video/upload/v1647709082/samples/sea-turtle.mp4' }}
          style={styles.video}
          resizeMode="contain"
          repeat
          useNativeControls={true}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
