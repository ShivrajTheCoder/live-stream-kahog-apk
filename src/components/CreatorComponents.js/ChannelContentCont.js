import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ThemeContext from '../../contexts/ThemeProvider';

export default function ChannelContentCont() {
  const [selectedSection, setSelectedSection] = useState('audio');
  const { theme } = useContext(ThemeContext);

  const handleSelectSection = (section) => {
    setSelectedSection(section);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
      <Text style={[styles.title, { color: theme === 'dark' ? 'white' : 'black' }]}>My Content</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleSelectSection('audio')}
          style={[
            styles.sectionButton,
            selectedSection === 'audio' ? styles.selectedButton : styles.unselectedButton,
          ]}
        >
          <Text style={[styles.buttonText, selectedSection === 'audio' ? styles.selectedText : styles.unselectedText]}>Audio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSelectSection('video')}
          style={[
            styles.sectionButton,
            selectedSection === 'video' ? styles.selectedButton : styles.unselectedButton,
          ]}
        >
          <Text style={[styles.buttonText, selectedSection === 'video' ? styles.selectedText : styles.unselectedText]}>Video</Text>
        </TouchableOpacity>
      </View>

      {selectedSection === 'audio' && (
        <View>
          {/* Your Audio Content Here */}
          <Text style={[styles.sectionText, { color: theme === 'dark' ? 'white' : 'black' }]}>This is the audio section</Text>
        </View>
      )}

      {selectedSection === 'video' && (
        <View>
          {/* Your Video Content Here */}
          <Text style={[styles.sectionText, { color: theme === 'dark' ? 'white' : 'black' }]}>This is the video section</Text>
        </View>
      )}

      {(selectedSection !== 'audio' && selectedSection !== 'video') && (
        <View>
          {/* Placeholder message */}
          <Text style={[styles.sectionText, { color: theme === 'dark' ? 'white' : 'black' }]}>No content available for this section</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: 'lightblue',
  },
  unselectedButton: {
    backgroundColor: 'lightgray', // Default background color for unselected button
  },
  selectedText: {
    fontWeight: 'bold',
    color: 'black', // Default text color for selected button
  },
  unselectedText: {
    color: 'black', // Default text color for unselected button
  },
  sectionText: {
    fontSize: 16,
  },
});
