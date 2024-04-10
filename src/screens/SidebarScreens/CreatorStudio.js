import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemeContext from '../../contexts/ThemeProvider';
import CreatorChannelContainer from '../../components/CreatorComponents.js/CreatorChannelComponents';
import CreateChannelForm from '../../components/CreatorComponents.js/CreateChannelForm';


const backIcon = <Ionicons name="arrow-back" size={24} />;

export default function CreatorStudio({ navigation }) {
    const [channelName, setChannelName] = useState('');
    const [showContentForm, setShowContentForm] = useState(false);
    const { theme } = useContext(ThemeContext);
    useEffect(() => {
        return () => {
            setShowContentForm(false);
        };
    }, []);
    const handleBack = () => {
        navigation.goBack();
    };

    const handleCreateChannel = () => {
        // Logic to create channel
        setShowContentForm(true);
    };

    const handleChooseFile = () => {
        // Logic to choose file
    };

    const handleUploadFile = () => {
        // Logic to upload file
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white',
            padding: 20,
        },
        headingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
        },
        headingText: {
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 50,
            color: theme === 'dark' ? 'white' : 'black',
        },
        formContainer: {
            marginBottom: 20,
        },
        label: {
            fontSize: 18,
            marginBottom: 10,
            color: theme === 'dark' ? 'white' : 'black',
        },
        input: {
            borderWidth: 1,
            borderColor: theme === 'dark' ? 'white' : 'black',
            borderRadius: 5,
            padding: 10,
            color: theme === 'dark' ? 'white' : 'black',
            backgroundColor: theme === 'dark' ? '#333333' : 'white',
        },
        fileButton: {
            backgroundColor: 'black',
            paddingVertical: 15,
            alignItems: 'center',
            borderRadius: 10,
            marginBottom: 20,
        },
        fileButtonText: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
        },
        uploadButton: {
            backgroundColor: 'blue',
            paddingVertical: 15,
            alignItems: 'center',
            borderRadius: 10,
        },
        uploadButtonText: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
        },
        createButton: {
            backgroundColor: 'black',
            paddingVertical: 15,
            alignItems: 'center',
            borderRadius: 10,
        },
        createButtonText: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
        },
        addChannelButton: {
            backgroundColor: 'green',
            paddingVertical: 15,
            alignItems: 'center',
            borderRadius: 10,
            marginBottom: 20,
        },
        addChannelButtonText: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
        },
    });

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <View style={styles.headingContainer}>
                <TouchableOpacity onPress={handleBack}>
                    {React.cloneElement(backIcon, { color: theme === 'dark' ? 'white' : 'black' })}
                </TouchableOpacity>
                <Text style={styles.headingText}>Creator Studio</Text>
            </View>
            <CreatorChannelContainer />
            {/* Create Channel Form */}
            {showContentForm && <CreateChannelForm />}
            {
                !showContentForm && <TouchableOpacity style={styles.addChannelButton} onPress={handleCreateChannel} >
                {/* !showContentForm && <TouchableOpacity style={styles.addChannelButton} onPress={()=>{navigation.navigate("Upload")}} > */}
                    <Text style={styles.addChannelButtonText}>Add Channel</Text>
                </TouchableOpacity>
            }
        </View>
    );
}
