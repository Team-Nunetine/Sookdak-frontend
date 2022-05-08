import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { GiftedChat } from 'react-native-gifted-chat';

export default function ChattingRoom({route, navigation}) {
    const MOCK_MESSAGES = [
        {
          _id: 1,
          text: '안녕하세요!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: '익명',
            avatar: 'https://www.sookmyung.ac.kr/sites/sookmyungkr/images/sub/contents/trade_character_05.png',
          },
        },
      ];

    const [name, setName] = useState('');
    const [message, setMessage] = useState(MOCK_MESSAGES);

    const user = {
        _id: name,
        avatar: 'https://www.sookmyung.ac.kr/sites/sookmyungkr/images/sub/contents/trade_character_05.png'
    };

    const onSend = newMessages => {
        setMessage(GiftedChat.append(message, newMessages));
      };

    // const searchRoom = (input) => {
    //     let data = 
    // }

    
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