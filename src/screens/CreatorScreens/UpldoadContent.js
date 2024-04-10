import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import BackButton from '../../components/BackButton';
import ChannelContentCont from '../../components/CreatorComponents.js/ChannelContentCont';
import ThemeContext from '../../contexts/ThemeProvider';

export default function UpldoadContent({ channelId }) {
  const { theme } = useContext(ThemeContext);
  const [selectedFile, setSelectedFile] = useState(null);

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
