import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemeContext from '../../contexts/ThemeProvider';
import CreatorChannelContainer from '../../components/CreatorComponents.js/CreatorChannelComponents';
import CreateChannelForm from '../../components/CreatorComponents.js/CreateChannelForm';
import AuthContext from '../../contexts/AuthProvider';
import BackButton from '../../components/BackButton';


const backIcon = <Ionicons name="arrow-back" size={24} />;

export default function CreatorStudio({ navigation }) {
    const [channelName, setChannelName] = useState('');
    const [showContentForm, setShowContentForm] = useState(false);
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(AuthContext);
    const { id, token } = user;
    console.log(user, "here is the user")
    const [flag,setFlag]=useState(false);
    useEffect(() => {
        console.log(id,"here ist hte id")
        if (!id) {
            // Navigate to the login screen or replace it with your login component
            navigation.navigate('Login');
            // return null;
        }
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
            backgroundColor: theme === 'dark' ? 'black' : 'white',
            padding: 20,
            paddingBottom:20
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
        <ScrollView style={styles.container}>
            {/* Back Button */}
            <BackButton screen='Creator Studio' to='Home' />
            <CreatorChannelContainer flag={flag}/>
            {/* Create Channel Form */}
            {showContentForm && <CreateChannelForm setFlag={setFlag} />}
            {
                !showContentForm && <TouchableOpacity style={styles.addChannelButton} onPress={handleCreateChannel} >
                    {/* !showContentForm && <TouchableOpacity style={styles.addChannelButton} onPress={()=>{navigation.navigate("Upload")}} > */}
                    <Text style={styles.addChannelButtonText}>Add Channel</Text>
                </TouchableOpacity>
            }
        </ScrollView>
    );
}
