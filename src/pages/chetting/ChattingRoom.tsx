import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, AsyncStorage} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DrawerActions, useFocusEffect } from "@react-navigation/native";
import { useRootContext } from '../../RootProvider';

export default function ChattingRoom({route, navigation}) {
    // useFocusEffect(() => {
    //     navigation.getParent().getParent().setOptions({ tabBarStyle: { display: 'flex' } })
    //     navigation.getParent().setOptions({ swipeEnabled: false })
    // })

    const rootContext = useRootContext()
    const url = 'ws://3.36.250.198:8080/chat'
    const [Connect, setConnect] = useState(false)
    // let stompClient = Stomp.client(url)

    // const connect = () => {
    //     const socket = new SockJS('http://3.36.250.198:8080/ws-stomp')
    //     stompClient = Stomp.over(socket)
    //     stompClient.connect({}, function (frame) {
    //         setConnect(true)
    //         console.log('Connected: ' + frame)
    //         stompClient?.subscribe('/room/'+route.params.roomId, function (chatMessage) {
    //             console.log(JSON.parse(chatMessage.body))
    //             setMessage(JSON.parse(chatMessage.body))
    //         })
    //     })
    // }
    
    // connect()
    // console.log("rendering")

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

      const [message, setMessage] = useState(MOCK_MESSAGES);
    
    const [name, setName] = useState('');

    const user = {
        _id: name,
        avatar: 'https://i.ibb.co/kQ7JTW4/Kakao-Talk-Photo-2022-05-10-14-35-48.png'
    };

    const _onSend = msg => {
        setMessage(GiftedChat.append(message, msg));
      };

    // console.log(message)

    // const searchRoom = (input) => {
    //     let data = message
    //     let searchData = data.filter((item) => {
    //         return item.text.includes(input)
    //     });
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
            onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}>
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
                onSend={msg => _onSend(msg)}
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