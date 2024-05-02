import React, { useContext } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import ThemeContext from '../../contexts/ThemeProvider';
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import AudioContext from '../../contexts/AudioProvider';
import { useNavigation } from '@react-navigation/native';

// New component to display audio information
const AudioInfo = ({ id, title, theme }) => {
    const naivgation=useNavigation();

    const textColor = theme === 'dark' ? 'white' : 'black';
    return (
        <TouchableOpacity onPress={()=>naivgation.navigate("AudioPlay")} style={[styles.audioInfo, { backgroundColor: theme === 'dark' ? '#333' : 'white' }]}>
            <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 16 }}>Playing :</Text>
            <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 16 }}> {title}</Text>
        </TouchableOpacity>
    );
};


export default function BottomNav({ state, navigation }) {
    const iconRoutes = {
        home: "Home",
        search: "Search",
        creator: "Creator",
        about: "AboutUs",
    };
    const { theme } = useContext(ThemeContext);
    const { audio } = useContext(AudioContext);

    const icons = [
        <Icon name="home" size={30} />,
        <Icon name="magnifying-glass" size={30} />,
        <Icon name="squared-plus" size={30} />,
        <Image
            source={{ uri: 'https://res.cloudinary.com/dushmacr8/image/upload/v1710155799/kj%20images/kahojilogo-modified_ft0kex.png' }}
            style={{ width: 30, height: 30 }}
        />,
    ];

    return (
        <View>
            {audio.id !== null && audio.title !== null &&
                    <AudioInfo id={audio.id} title={audio.title} theme={theme} />
            }
            <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white' }]}>
                {icons.map((icon, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            navigation.navigate(iconRoutes[Object.keys(iconRoutes)[index]]);
                        }}
                        style={[styles.tabButton, state.index === index && styles.tabButtonFocused]}
                    >
                        {React.isValidElement(icon) ? (
                            React.cloneElement(icon, {
                                color: theme === 'dark' ? 'white' : 'black'
                            })
                        ) : (
                            icon
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        paddingVertical: 7
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    tabButtonFocused: {
        // Add styles for focused tab if needed
    },
    audioInfo: {
        position: 'absolute',
        top: -60,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        paddingVertical: 5,
        flexDirection: "row",
        height: 55,
        marginHorizontal: 15,
        borderRadius: 10
    },
});
