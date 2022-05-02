import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function ChattingStart({ route, navigation }) {

    const [text, setTitle] = useState('');

    return <SafeAreaView style={styles.topContainer}>
        <TouchableOpacity
            onPress={() => {navigation.goBack()}}>
                <Ionicons name="close-outline" size={30} color='#fff' />
        </TouchableOpacity>
        <Text style={styles.topText}>새로운 대화를 시작해보세요.</Text>
        <View style={styles.container}>
            <Text style={styles.roomName}>채팅방 이름</Text>
            <TextInput style={styles.textInput}></TextInput>
        </View>
        <View style={styles.container}>
            <Text style={styles.roomName}>채팅방 소개</Text>
            <TextInput 
             style={styles.textInput}
             onChangeText={(text) => setTitle(text)}
             />
        </View>
        <Button title="개설" onPress={navigation.navigate({})}></Button>
    </SafeAreaView>
};

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        backgroundColor: '#455B83',
        paddingHorizontal: 10,
    },
    topText: {
        fontSize: 25,
        paddingTop: 50,
        paddingBottom: 20,
        paddingLeft: 20,
        color: '#fff'
    },
    container: {
        flexDirection: 'column',
        paddingBottom: 20,
        paddingTop: 25,
        paddingHorizontal: 20
    },
    textInput: {
        width: 300,
        height: 40,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15, 
        fontSize: 16,
    },
    roomName: {
        fontSize: 20,
        color: '#fff'
    },
});