import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import RBSheet from "@nonam4/react-native-bottom-sheet";
import moment from "moment";

const LiveSoonBottomCard = ({ name, imageUrl, heading, start_date, start_time, end_time }) => {
    const refRBSheet = useRef(null);
    const openBottomSheet = () => {
        if (refRBSheet.current) {
            refRBSheet.current.open();
        }
    };

    const truncatedHeading = heading.length > 40 ? `${heading.substring(0, 40)}...` : heading;

    // Format date and time using moment.js
    const formattedStartDate = moment(start_date).format("MMMM DD, YYYY");
    const formattedStartTime = moment(start_time, "HH:mm:ss").format("hh:mm A");
    const formattedEndTime = moment(end_time, "HH:mm:ss").format("hh:mm A");

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={openBottomSheet}>
                <View style={styles.tileCont}>
                    <View style={styles.liveInfo}>
                        <Image style={styles.image} source={{ uri: imageUrl }} />
                        <View style={styles.details}>
                            <Text style={[styles.name, styles.bold]}>{name}</Text>
                        </View>
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
                        backgroundColor: "#f8f9fa", // Set background color
                        maxHeight: 400, // Set max height for scrollability
                    }
                }}
            >
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.sheetHead}>{name}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.value}>{heading}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Start Date:</Text>
                            <Text style={styles.value}>{formattedStartDate}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Start Time:</Text>
                            <Text style={styles.value}>{formattedStartTime}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>End Time:</Text>
                            <Text style={styles.value}>{formattedEndTime}</Text>
                        </View>
                    </View>
                </ScrollView>
            </RBSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tileCont: {
        flexDirection: 'column',
        marginHorizontal: 10,
        backgroundColor: '#0077b6',
        borderRadius: 10,
        width: 250,
    },
    image: {
        height: 70,
        width: 70,
        borderTopLeftRadius: 10,
    },
    liveInfo: {
        flexDirection: 'row',
        paddingRight: 10,
        justifyContent: 'space-between',
    },
    details: {
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    name: {
        color: "#ffffff",
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
        color: "#ffffff",
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    heading: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: '500',
        marginVertical: 2,
        marginHorizontal: 4,
    },
    infoContainer: {
        marginVertical: 5
    },
    sheetHead: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#000000",
    },
    label: {
        color: "#000000",
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 2,
    },
    value: {
        color: "#000000",
        fontSize: 12,
    },
    body: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#f8f9fa"
    },
});

export default LiveSoonBottomCard;
