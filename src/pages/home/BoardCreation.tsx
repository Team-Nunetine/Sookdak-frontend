import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import { useRootContext } from '../../RootProvider'
import { useHomeContext } from './HomeProvider'

export default function BoardCreation({ navigation }) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const rootContext = useRootContext()
    const homeContext = useHomeContext()

    const onPressComplete = () => {
        if (name == '') {
            Alert.alert('게시판명을 작성해주세요')
            return
        }
        Alert.alert('확인', '게시판을 생성하겠습니까?', [
            { text: '취소' },
            {
                text: '확인',
                onPress: () => {
                    rootContext.api.post('/api/boards',
                        {
                            name: name,
                            description: description
                        }
                    ).then((res) => {
                        rootContext.api.post('/api/stars/' + res.data.data.boardId)
                            .then((res) => {
                                rootContext.api.get('/api/stars')
                                    .then((res) => {
                                        homeContext.setBoards(res.data.data.stars)
                                        navigation.pop(2)
                                    })
                                    .catch((err) => console.log(err.response.data))
                            })
                            .catch((err) => console.log(err))
                    }).catch((err) => {
                        console.log(err.message)
                        Alert.alert('이미 존재하는 게시판입니다')
                    })
                }
            }
        ])
    }

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
        </TouchableOpacity>
        <Text style={styles.topText}>새 게시판 생성</Text>
        <TextInput style={styles.textInput} placeholder='게시판명을 입력해주세요'
            value={name} onChangeText={setName} maxLength={19} />
        <TextInput style={styles.textInput} placeholder='게시판 설명을 입력해주세요'
            value={description} onChangeText={setDescription} maxLength={254} />
        <TouchableOpacity style={styles.button} onPress={onPressComplete}>
            <Text style={styles.buttonText}>완료</Text>
        </TouchableOpacity>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    topText: {
        fontSize: 18,
        color: '#003087',
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 20
    },
    backIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#B0B0B0',
        marginHorizontal: 20,
        paddingHorizontal: 15,
        marginTop: 15,
        paddingVertical: 10
    },
    button: {
        backgroundColor: '#003087',
        marginTop: 25,
        marginHorizontal: 20,
        borderRadius: 20,
        paddingVertical: 12,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff'
    }
})