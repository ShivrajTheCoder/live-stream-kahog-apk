import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Button, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import BackButton from '../../components/BackButton';
import ThemeContext from '../../contexts/ThemeProvider';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import KeyCenter from '../../KeyCenter';
import ApprovedLiveCard from '../../components/CreatorComponents.js/ApprovedLiveContainer';
import StreamRequestForm from './StreamRequestForm';
import ApprovedLiveContainer from '../../components/CreatorComponents.js/ApprovedLiveContainer';

const AudioStream = () => {
  const [approvedLive, setApprovedLive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lives, setLives] = useState([]);
  const apiUrl = KeyCenter.apiUrl;
  useEffect(() => {
    setError(null);
    const fetchApprovedLive = async () => {
      try {
        const response = await axios.get(`${apiUrl}/lives/getTop5LiveEvents`);
        if (response.status === 200) {
          const top5LiveEvents = response.data.top5LiveEvents;
          setLives(top5LiveEvents);
          if (top5LiveEvents.length > 0) {
            console.log(top5LiveEvents[0],"from here");
            setApprovedLive();
          }
        } else {
          console.error('Failed to fetch approved live:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching approved live:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApprovedLive();
  }, []);
  const { theme } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
      padding: 20,
    },
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton screen='Audio Streaming' to='Creator' />
      {
        loading && <View>
          <Text>Loading</Text>
        </View>
      }
      {
        !loading && approvedLive && 
        <ApprovedLiveContainer approvedLive={approvedLive} />
      }
      {
        !loading && ! approvedLive && <StreamRequestForm />
      }
      
    </ScrollView>
  );
}

export default AudioStream;
