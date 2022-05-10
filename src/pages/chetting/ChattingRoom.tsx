import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ChattingRoom({route, navigation}) {
    const list = [
        {
            idx: 0,
            title: '체팅방 나가기'
        },
        {
            idx: 1,
            title: '알림'
        }
    ]

    const MOCK_MESSAGES = [
        {
          _id: 1,
          text: '안녕하세요!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: '익명',
            avatar: 'https://i.ibb.co/kQ7JTW4/Kakao-Talk-Photo-2022-05-10-14-35-48.png'
          },
        },
      ];

    const [name, setName] = useState('');
    const [message, setMessage] = useState(MOCK_MESSAGES);

    const user = {
        _id: name,
        avatar: 'https://i.ibb.co/kQ7JTW4/Kakao-Talk-Photo-2022-05-10-14-35-48.png'
    };

    const onSend = newMessages => {
        setMessage(GiftedChat.append(message, newMessages));
      };

    // const searchRoom = (input) => {
    //     let data = 
    // }

    const renderSend = (props) => {
        return (
            <Send{...props}>
                <View>
                    <MaterialCommunityIcons 
                     name='send-circle' 
                    size={32} 
                    style={{marginBottom: 6, marginRight: 5}}
                    color='#2e64e5'/>
                </View> 
            </Send>
        )
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.topView}>
            <TouchableOpacity
            onPress={() => {navigation.goBack()}}>
                <Ionicons name="arrow-back-outline" size={30}></Ionicons>
            </TouchableOpacity>
            <Text style={styles.topText}>{route.params.roomName}</Text>
            <TouchableOpacity
            onPress={() => {}}>
                <Ionicons name="ellipsis-vertical-outline" size={30}></Ionicons>
            </TouchableOpacity>
            </View>
            <View style={styles.textInputRow}>
            <TextInput 
                style={styles.textInput} 
                placeholder='대화방 내용 검색'
                onChangeText={(input) => {
                    // searchRoom(input)
                 }} />
                <TouchableOpacity>
                    <Ionicons name='search' size={25} color='#555' />
                </TouchableOpacity>
            </View>
            <View style={{flex : 1}}>
                <GiftedChat
                messages={message}
                onSend={newMessage => onSend(newMessage)}
                user={user}
                renderUsernameOnMessage
                alwaysShowSend
                renderSend={renderSend}
                />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    topView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    topText: {
        fontSize: 16,
        color: '#003087',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInputRow: {
        backgroundColor: '#f5f5f5',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    textInput: {
        flex: 1,
        paddingVertical: 7
    },
});