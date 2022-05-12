import React, { useState } from 'react'
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { launchImageLibrary } from 'react-native-image-picker'
import { useRootContext } from '../../RootProvider'
import axios from 'axios'

export default function PostUpload({ route, navigation }) {
    const [text, setText] = useState('')
    const [photoList, setPhotoList] = useState<any[]>([])
    const rootContext = useRootContext()
    const onPressComplete = () => {
        Alert.alert('완료', '게시글 작성을 완료하겠습니까?',
            [
                {
                    text: '취소'
                },
                {
                    text: '확인', onPress: () => {
                        axios({
                            url: 'http://52.78.202.206:8080/api/post/' + route.params.boardId + '/save',
                            method: 'post',
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': 'Bearer ' + rootContext.user.token
                            },
                            data: createFormData(photoList, text)
                        })
                        // .post('http://52.78.202.206:8080/api/post/' + route.params.boardId + '/save',
                        //     createFormData(photoList, text),
                        //     {
                        //         headers: {
                        //             'Content-Type': 'multipart/form-data',
                        //             Authorization: 'Bearer ' + rootContext.user.token
                        //         }
                        //     }
                        // )
                            .then((res) => {
                                console.log('성공')
                                console.log(res)
                                navigation.goBack()
                            })
                            .catch((err) => console.log(err.response.data))
                    }
                }
            ]
        )
    }
    const handleChoosePhoto = () => {
        launchImageLibrary({ selectionLimit: 5, mediaType: 'photo' }, (response) => {
            if (response.assets) {
                setPhotoList(response.assets)
            }
        })
    }

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.topView}>
            <Text style={styles.topText}>{route.params.boardName}</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}
                style={styles.closeIcon}>
                <Icon name='close' size={25} color='#151515' />
            </TouchableOpacity>
        </View>
        <TextInput style={styles.textInput} multiline={true} placeholder='내용을 작성해주세요'
            value={text} onChangeText={setText} />
        <View>
            <ScrollView horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginLeft: 20,
                    marginRight: 15,
                    marginVertical: 15
                }}>
                {photoList.map((v, i) => <Image key={i}
                    source={{ uri: v.uri }}
                    style={{ width: 100, height: 100, marginRight: 5 }} />)}
            </ScrollView></View>
        <View style={styles.bottomView}>
            <TouchableOpacity onPress={handleChoosePhoto}>
                <Icon name='camera-plus-outline' size={22} color='#151515' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.completeButton}
                onPress={onPressComplete}>
                <Text style={styles.completeText}>완료</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
}

const createFormData = (photoList, text) => {
    let data = new FormData()

    photoList.map((photo, i) => {
        data.append('images', {
            name: photo.fileName,
            type: photo.type,
            uri: photo.uri,
        })
    })

    data.append('content', text)

    return data
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
        flex: 1,
        textAlignVertical: 'top',
        margin: 20
    },
    imageView: {
        backgroundColor: 'red',
        flexDirection: 'row'
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