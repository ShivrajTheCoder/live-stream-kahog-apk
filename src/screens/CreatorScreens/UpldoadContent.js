import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import BackButton from '../../components/BackButton';
import ChannelContentCont from '../../components/CreatorComponents.js/ChannelContentCont';
import ThemeContext from '../../contexts/ThemeProvider';

export default function UploadContent({ channelId }) {
  const { theme } = useContext(ThemeContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio, DocumentPicker.types.video],
      });

      setSelectedFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        console.log('Error picking file:', err);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
      <BackButton screen='Upload' to='Creator' />
      <Text style={[styles.title, { color: theme === 'dark' ? 'white' : 'black' }]}>Upload Content</Text>
      <TextInput
        style={[styles.input, { color: theme === 'dark' ? 'white' : 'black' }]}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor={theme === 'dark' ? '#888' : '#999'}
      />
      <TextInput
        style={[styles.input, { color: theme === 'dark' ? 'white' : 'black' }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        placeholderTextColor={theme === 'dark' ? '#888' : '#999'}
        multiline={true}
      />
      <TouchableOpacity style={[styles.uploadButton, { backgroundColor: theme === 'dark' ? 'white' : 'black' }]} onPress={handleFilePick}>
        <Text style={[styles.buttonText, { color: theme === 'dark' ? 'black' : 'white' }]}>Select File</Text>
      </TouchableOpacity>
      {selectedFile && (
        <Text style={[styles.selectedFile, { color: theme === 'dark' ? 'white' : 'black' }]}>Selected File: {selectedFile.name}</Text>
      )}
      <ChannelContentCont />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 15,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  uploadButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  selectedFile: {
    fontSize: 16,
    color: 'black',
  },
});
