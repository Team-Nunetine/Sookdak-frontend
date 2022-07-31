import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useRootContext } from '../../RootProvider'

export default function MessageSend({ navigation, route }) {
    const [content, setContent] = useState('')
    const rootContext = useRootContext()
    
    
    const onPressSend = () => {
        if (content == '') {
            Alert.alert('확인', '내용을 작성해주세요')
            return
        }
        Alert.alert('전송', '쪽지를 전송하겠습니까?', [
            { text: '취소' },
            {
                text: '확인', onPress: () => {
                    rootContext.api.post(route.params.postId ? '/api/messages/post/' + route.params.postId
                        : '/api/messages/room/' + route.params.roomId, { content: content })
                        .then((res) => console.log(res.data))
                        .catch((err) => console.log(err.response.data))
                    navigation.goBack()
                }
            }
        ])
    }

    return <KeyboardAvoidingView 
     style={{ flex: 1, backgroundColor: '#fff' }}
     keyboardVerticalOffset={40}
     behavior={"padding"}>
        <Text style={styles.topText}>쪽지</Text>
        <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.closeIcon}>
            <Ionicons name='close' size={22} color='#151515' />
        </TouchableOpacity>
        <TextInput style={styles.textInput} multiline={true} value={content} onChangeText={setContent} />
        <TouchableOpacity onPress={onPressSend}>
            <Text style={styles.send}>전송</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    topText: {
        fontSize: 18,
        color: '#003087',
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 20
    },
    closeIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 20
    },
    textInput: {
        flex: 1,
        textAlignVertical: 'top',
        marginBottom: 50,
        marginHorizontal: 20
    },
    send: {
        backgroundColor: '#003087',
        color: '#fff',
        position: 'absolute',
        bottom: 30,
        right: 30,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        fontSize: 16
    }
})