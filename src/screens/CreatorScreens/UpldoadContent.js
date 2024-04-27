import React, { useContext, useState } from 'react';
import { View, Text, Button, Alert, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import KeyCenter from '../../KeyCenter';
import ThemeContext from '../../contexts/ThemeProvider';
import AuthContext from '../../contexts/AuthProvider';
import BackButton from '../../components/BackButton';
import { useNavigation } from '@react-navigation/native';

export default function UploadContent() {
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { apiUrl } = KeyCenter;
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { id, token } = user;
  const navigation = useNavigation();
  const pickThumbnail = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setSelectedThumbnail(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled picking thumbnail');
      } else {
        console.log('Error picking thumbnail:', err);
      }
    }
  };

  const pickMedia = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video, DocumentPicker.types.audio],
      });
      setSelectedMedia(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled picking media');
      } else {
        console.log('Error picking media:', err);
      }
    }
  };

  const uploadFiles = async () => {
    if (!selectedThumbnail || !selectedMedia || !title || !description) {
      Alert.alert('Fields Required', 'Please fill in all fields and select both thumbnail and media files to upload');
      return;
    }

    const formData = new FormData();
    formData.append('thumbnail', {
      uri: selectedThumbnail[0].uri,
      name: 'thumbnail.jpg',
      type: 'image/jpg',
    });
    formData.append('mediaFile', {
      uri: selectedMedia[0].uri,
      name: selectedMedia[0].name,
      type: selectedMedia[0].type,
    });
    formData.append("authorId", id);
    formData.append("name", title);
    formData.append("description", description);
    formData.append("isVideo", 1); // Assuming it's always a video
    formData.append("categoryId", 1); // Assuming categoryId is always 1

    try {
      const response = await fetch(`${apiUrl}/podcasts/uploadpodcast`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      if (response.ok) {
        Alert.alert('Upload Successful', 'Your content will be shown in the channel upon approval.', [
          { text: 'OK', onPress: () => navigation.navigate('Creator') } // Navigate to "Creator" screen
        ]);
        console.log('Files uploaded successfully');
      } else {
        console.error('Error uploading files:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  // Function to convert bytes to megabytes
  const bytesToMB = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : '#fff' }]}>
      <BackButton screen='Channel Content' to='Creator' />
      <TextInput
        style={[styles.input, styles.titleInput, { color: theme === 'dark' ? '#fff' : '#000' }]}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor={theme === 'dark' ? '#888' : '#999'}
      />
      <TextInput
        style={[styles.input, styles.descriptionInput, { color: theme === 'dark' ? '#fff' : '#000' }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        placeholderTextColor={theme === 'dark' ? '#888' : '#999'}
        multiline={true}
      />
      <TouchableOpacity onPress={pickThumbnail} style={[styles.button, { backgroundColor: theme === 'dark' ? '#fff' : '#000' }]}>
        <Text style={[styles.buttonText, { color: theme === 'dark' ? '#000' : '#fff' }]}>Choose Thumbnail</Text>
      </TouchableOpacity>
      {selectedThumbnail && selectedThumbnail.length > 0 &&
        (
          <View>
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Name: {selectedThumbnail[0].name}</Text>
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Size: {bytesToMB(selectedThumbnail[0].size)} MB</Text>
          </View>
        )
      }

      <TouchableOpacity onPress={pickMedia} style={[styles.button, { backgroundColor: theme === 'dark' ? '#fff' : '#000' }]}>
        <Text style={[styles.buttonText, { color: theme === 'dark' ? '#000' : '#fff' }]}>Choose media</Text>
      </TouchableOpacity>
      {selectedMedia && selectedMedia.length > 0 &&
        (
          <View>
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Name: {selectedMedia[0].name}</Text>
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Size: {bytesToMB(selectedMedia[0].size)} MB</Text>
          </View>
        )
      }
      <TouchableOpacity onPress={uploadFiles} style={[styles.button, { backgroundColor: theme === 'dark' ? 'red' : '#000' }]}>
        <Text style={[styles.buttonText, { color: theme === 'dark' ? '#fff' : '#000' }, { fontSize: 15, fontWeight: "bold", marginVertical: 5 }]}>Apply For Approval</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  titleInput: {
    marginBottom: 20,
  },
  descriptionInput: {
    height: 100, // Height of the textarea
    textAlignVertical: 'top', // Align text at the top
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5
  }
});
