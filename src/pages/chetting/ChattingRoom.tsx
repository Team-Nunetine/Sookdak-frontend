import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";


export default function ChattingRoom({route}) {
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.topText}>{route.params.roomName}</Text>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    topText: {
        fontSize: 16,
        color: '#003087',
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 20
    }
});