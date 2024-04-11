import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Sound from 'react-native-sound'; // Import Sound library for audio handling
import BackButton from '../../components/BackButton';
import Icons from "react-native-vector-icons/AntDesign";

const backward = <Icons name="banckward" size={30} color="white" />;
const forward = <Icons name="forward" size={30} color="white" />;
const emptyLike = <Icons name="hearto" size={30} color="white" />;
const liked = <Icons name="heart" size={30} color="red" />;
const play = <Icons name="play" size={30} color="white" />;
const pause = <Icons name="pause" size={30} color="white" />;

export default function AudioPlayingScreen() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    loadAudio();
    return () => {
      if (audioRef.current !== null) {
        audioRef.current.release(); // Release the audio resource
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current !== null && isPlaying) {
        audioRef.current.getCurrentTime((seconds) => {
          setPosition(seconds * 1000); // Position in milliseconds
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const loadAudio = async () => {
    try {
      const sound = new Sound('https://res.cloudinary.com/dzd53baqf/video/upload/v1711691938/samples/O_Mahi_O_Mahi_PagalWorld.com.cm_ejbhwl.mp3', null, (error) => {
        if (error) {
          console.log('Error loading audio:', error);
          return;
        }
        setDuration(sound.getDuration() * 1000); // Duration in milliseconds
      });
      audioRef.current = sound;
    } catch (error) {
      console.log('Error loading audio:', error);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current !== null) {
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleSeekForward = () => {
    if (audioRef.current !== null) {
      const newPosition = position + 5000; // Seek forward by 5 seconds
      audioRef.current.setCurrentTime(newPosition / 1000); // Position in seconds
      setPosition(newPosition);
    }
  };

  const handleSeekBackward = () => {
    if (audioRef.current !== null) {
      const newPosition = position - 5000; // Seek backward by 5 seconds
      audioRef.current.setCurrentTime(newPosition / 1000); // Position in seconds
      setPosition(newPosition);
    }
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressBarWidth = (position / duration) * 100;

  return (
    <View style={styles.container}>
      <BackButton screen='Play Audio' to='Home' />
      <Image style={styles.image} source={{ uri: "https://res.cloudinary.com/dushmacr8/image/upload/v1707575265/kj%20images/cover_2_bgvidc.jpg" }} />
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={handleSeekBackward}>
          {backward}
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause} style={{ marginHorizontal: 10 }} >
          {isPlaying ? pause : play}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSeekForward}>
          {forward}
        </TouchableOpacity>
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progressBarWidth}%` }]} />
      </View>
      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={handleLikeToggle}>
          {isLiked ? liked : emptyLike}
        </TouchableOpacity>
      </View>
      <Text style={styles.durationText}>{formatTime(position)} / {formatTime(duration)}</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi modi, dignissimos perferendis pariatur distinctio dolor iure culpa voluptate quis labore adipisci quo dolorem maxime cupiditate rerum ratione iste exercitationem et!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginVertical: 20
  },
  progressContainer: {
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'white',
  },
  likeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  controlButton: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: "white", // Set color to white
  },
  durationText: {
    fontSize: 18,
    color: "white",
    textAlign: 'center'
  },
  descriptionContainer: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: "white",
    textAlign: 'center',
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center'
  }
});
