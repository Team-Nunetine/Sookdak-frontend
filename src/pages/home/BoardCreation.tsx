import { useFocusEffect } from '@react-navigation/native'
import React from 'react'
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'

export default function BoardCreation({ navigation }) {
    useFocusEffect(() => {
        navigation.getParent().getParent().setOptions({ tabBarStyle: { display: 'none' } })
        navigation.getParent().setOptions({ swipeEnabled: false })
    })

    const onPressComplete = () => {
        Alert.alert('확인', '게시판을 생성하겠습니까?', [
            { text: '취소' },
            {
                text: '확인',
                onPress: () => {
                    navigation.pop(2)
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
        <TextInput style={styles.textInput} placeholder='게시판명을 입력해주세요' />
        <TextInput style={styles.textInput} placeholder='게시판 설명을 입력해주세요' />
        <TouchableOpacity style={styles.button} onPress={onPressComplete}>
            <Text style={styles.buttonText}>완료</Text>
        </TouchableOpacity>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    topText: {
        fontSize: 16,
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