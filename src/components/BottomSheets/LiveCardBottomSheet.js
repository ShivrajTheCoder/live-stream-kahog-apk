import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from "react-native";
import RBSheet from "@nonam4/react-native-bottom-sheet";
import Icons from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const LiveCardBottomSheet = ({ name, imageUrl, heading }) => {
    const refRBSheet = useRef(null);
    const navigation = useNavigation();
    const onJoinPress = (isHost) => {
        navigation.navigate(isHost ? 'Home' : 'AudiencePage', {
            userID: userID,
            userName: userID,
            liveID: liveID,
        })
    }
    const [userID, setUserID] = useState('');
    const [liveID, setLiveID] = useState('');
    useEffect(() => {
        setUserID(String(Math.floor(Math.random() * 100000)));
        setLiveID(String(Math.floor(Math.random() * 10000)));
    }, [])
    const openBottomSheet = () => {
        if (refRBSheet.current) {
            refRBSheet.current.open();
        }
    };
    const truncatedHeading = heading.length > 40 ? `${heading.substring(0, 40)}...` : heading;
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={openBottomSheet}>
                <View style={styles.tileCont}>
                    <View style={styles.liveInfo}>
                        <Image style={styles.image} source={{ uri: imageUrl }} />
                        <View style={styles.details}>
                            <Text style={[styles.name, styles.bold]}>{name}</Text>
                            {/* <Text style={styles.name}>{courseName}</Text> */}
                        </View>
                        {/* <TouchableOpacity style={styles.shareIcon}>
                            <Icons name="sharealt" size={24} color="white" />
                        </TouchableOpacity> */}
                    </View>
                    <Text style={styles.heading}>{truncatedHeading}</Text>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Listen Now</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    },
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                    body: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        padding: 20, // Add padding for content spacing
                    }
                }}
            >
                <View style={styles.cont} >
                    <View style={styles.infoContainer}>
                        <Text style={styles.sheetHead}>{name}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.value}>{heading}</Text>
                    </View>
                    {
                        liveID?.length !== 0 &&
                        <TouchableOpacity style={styles.joinBtn} onPress={() => { onJoinPress(false) }}>
                            <Text style={styles.joinText}>
                                JOIN NOW
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </RBSheet>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#000"
    },
    tileCont: {
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: 10,
        backgroundColor: '#0077b6',
        borderRadius: 10,
        width: 250, // Adjust the width as needed
    },
    image: {
        height: 70,
        width: 70,
        borderTopLeftRadius: 10,
    },
    liveInfo: {
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 10,
        justifyContent: 'space-between',
    },
    details: {
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    name: {
        color: "white",
        fontSize: 12,
    },
    bold: {
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#FF8C00',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    heading: {
        color: "white",
        fontSize: 15,
        fontWeight: '500',
        marginVertical: 2,
        marginHorizontal: 4,
    },
    shareIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    cont: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#f8f9fa"
    },
    sheetHead: {
        fontSize: 15,
        fontWeight: "bold"
    },
    infoContainer: {
        marginVertical: 5
    },
    joinBtn: {
        backgroundColor: "red",
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:10,
        borderRadius:5
    },
    joinText:{
        color: "white",
        fontSize:15,
        fontWeight:"bold"
    }
});

export default LiveCardBottomSheet;
