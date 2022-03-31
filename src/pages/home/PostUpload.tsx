import React from 'react'
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function PostUpload({ route, navigation }) {
    const onPressComplete = () => {
        Alert.alert('완료', '게시글 작성을 완료하겠습니까?',
            [
                {
                    text: '취소'
                },
                {
                    text: '확인', onPress: () => {
                        navigation.goBack()
                    }
                }
            ]
        )
    }
    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.topView}>
            <Text style={styles.topText}>{route.params.boardName}</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}
                style={styles.closeIcon}>
                <Icon name='close' size={25} color='#151515' />
            </TouchableOpacity>
        </View>
        <TextInput style={styles.textInput} multiline={true} placeholder='내용을 작성해주세요' />
        <View style={styles.bottomView}>
            <TouchableOpacity>
                <Icon name='camera-plus-outline' size={22} color='#151515' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.completeButton}
                onPress={onPressComplete}>
                <Text style={styles.completeText}>완료</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    topView: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topText: {
        fontSize: 16,
        color: '#003087',
        fontWeight: 'bold',
        alignSelf: 'center',
        width: '100%',
        textAlign: 'center'
    },
    closeIcon: {
        position: 'absolute',
        padding: 20,
        top: 0,
        right: 0
    },
    textInput: {
        // backgroundColor: 'red',
        flex: 1,
        textAlignVertical: 'top',
        margin: 20
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 30,
        alignItems: 'center',
    },
    completeButton: {
        backgroundColor: '#003087',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    completeText: {
        color: '#fff',
        fontSize: 14
    }
})