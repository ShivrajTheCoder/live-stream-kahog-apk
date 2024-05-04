import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Button, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import BackButton from '../../components/BackButton';
import ThemeContext from '../../contexts/ThemeProvider';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import KeyCenter from '../../KeyCenter';

const StreamRequestForm = () => {
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = KeyCenter.apiUrl;
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await axios.get(`${apiUrl}/interests/getallinterests`);
        if (response.status === 200) {
          setInterests(response.data.interests);
        }

      } catch (error) {
        setError('Error fetching interests');
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchInterests();
  }, []);
  const { theme } = useContext(ThemeContext);
  const [thumbnail, setThumbnail] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [interest, setInterest] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('');

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
    },
    text: {
      color: theme === 'dark' ? '#FFFFFF' : '#000000',
    },
    input: {
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      margin: 10,
      color: theme === 'dark' ? '#FFFFFF' : '#000000',
      borderColor: theme === 'dark' ? '#FFFFFF' : '#000000',
    },
    placeholder: {
      color: theme === 'dark' ? '#FFFFFF' : '#000000',
    },
    button: {
      backgroundColor: "red",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginRight: 10,
    },
    buttonText: {
      color: theme === 'dark' ? '#FFFFFF' : '#000000',
      fontWeight: 'bold',
    },
    flatListContainer: {
      marginTop: 10,
      marginBottom: 20,
    },
    interestButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginRight: 10,
      marginBottom: 10, // Added margin bottom
      backgroundColor: theme === 'dark' ? '#333333' : '#CCCCCC', // Changed to grey background
    },
    selectedInterestButton: {
      backgroundColor: 'yellow',
    },
    interestButtonText: {
      color: theme === 'dark' || selectedInterest ? '#000000' : '#FFFFFF', // Changed to black for yellow background
      fontWeight: 'bold',
    },
  });

  const handleThumbnailPick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setThumbnail(res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        console.error(err);
      }
    }
  };

  const handleRequestStream = () => {
    console.log('Stream request submitted:', { thumbnail, topic, description, date, startTime, endTime, interest, ownerId });
  };

  const handleInterestSelect = (selectedInterest) => {
    setSelectedInterest(selectedInterest);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <BackButton screen='Audio Streaming' to='Creator' /> */}
      <TouchableOpacity onPress={handleThumbnailPick}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Choose Thumbnail</Text>
        </View>
      </TouchableOpacity>

      {thumbnail !== '' && (
        <Image source={{ uri: thumbnail }} style={{ width: 100, height: 100, alignSelf: 'center' }} />
      )}

      <TextInput
        placeholder="Topic"
        value={topic}
        onChangeText={setTopic}
        style={styles.input}
        placeholderTextColor={styles.placeholder.color}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: 100 }]}
        placeholderTextColor={styles.placeholder.color}
      />
      <TextInput
        placeholder="Date"
        value={date}
        onChangeText={setDate}
        style={styles.input}
        placeholderTextColor={styles.placeholder.color}
      />
      <TextInput
        placeholder="Start Time"
        value={startTime}
        onChangeText={setStartTime}
        style={styles.input}
        placeholderTextColor={styles.placeholder.color}
      />
      <TextInput
        placeholder="End Time"
        value={endTime}
        onChangeText={setEndTime}
        style={styles.input}
        placeholderTextColor={styles.placeholder.color}
      />
      <View style={styles.flatListContainer}>
        <FlatList
          horizontal
          data={interests}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.interestButton,
                selectedInterest === item.id ? styles.selectedInterestButton : null,
              ]}
              onPress={() => handleInterestSelect(item.id)}
            >
              <Text style={styles.interestButtonText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
      <TouchableOpacity onPress={handleRequestStream} style={styles.button}>
        <Text style={styles.buttonText}>Request Stream</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default StreamRequestForm;
