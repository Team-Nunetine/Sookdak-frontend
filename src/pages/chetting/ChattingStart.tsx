import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function ChattingStart({ route, navigation }) {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('')

    function roomNavigate({title, desc}) {
        if(title == "") 
            return Alert.alert('채팅방 이름을 입력해주세요.')
        else
            return navigation.navigate('ChattingRoom', {roomName: title})
    }

    return <SafeAreaView style={styles.topContainer}>
        <TouchableOpacity
            onPress={() => {navigation.goBack()}}>
                <Ionicons name="close-outline" size={30} color='#fff' />
        </TouchableOpacity>
        <Text style={styles.topText}>새로운 대화를 시작해보세요.</Text>
        <View style={styles.container}>
            <Text style={styles.roomName}>채팅방 이름</Text>
            <TextInput 
             style={styles.textInput}
             onChangeText={(title) => setTitle(title)}
            />
            <Text style={styles.text}>0/30</Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.roomName}>채팅방 소개</Text>
            <TextInput 
             style={styles.textInput}
             onChangeText={(desc) => setTitle(desc)}
             />
             <Text style={styles.text}>0/30</Text>
        </View>
        <View style={styles.button}>
        <Button
         title="개설" 
         color={'black'}
         onPress={() => roomNavigate({title, desc})}></Button>
         </View>
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
        paddingHorizontal: 30
    },
    textInput: {
        width: 300,
        height: 45,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1.5,
        borderRadius: 15, 
        fontSize: 16,
        color: '#fff'
    },
    text: {
        textAlign: 'right',
        color: 'white',
        marginTop: 5,
        fontSize: 13,
    },
    roomName: {
        fontSize: 20,
        color: '#fff'
    },
    button: {
        width: 300,
        height: 45,
        backgroundColor: '#fff',
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 13,
    }
});