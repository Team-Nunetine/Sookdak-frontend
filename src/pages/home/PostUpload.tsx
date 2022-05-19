import React, { useState } from 'react'
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
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
                        // axios.post('http://13.209.48.180:8080/api/post/' + route.params.boardId + '/save',
                        //     new FormData(),//createFormData(photoList, text),
                        //     {
                        //         headers: {
                        //             'Content-Type': 'multipart/form-data',
                        //             'Authorization': 'Bearer ' + rootContext.user.token
                        //         }
                        //     }
                        // )
                        fetch('http://13.209.48.180:8080/api/post/' + route.params.boardId + '/save', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': 'Bearer ' + rootContext.user.token
                            },
                            body: createFormData(photoList, text),
                        })
                            .then((response) => response.json())
                            .then((res) => {
                                console.log('성공')
                                console.log(res)
                                if (res.success == false) {
                                    Alert.alert('알림', res.message)
                                    return
                                }
                                navigation.goBack()
                            })
                            .catch((err) => console.log(err.response.data))
                    }
                }
            ]
        )
    }
    const handleChoosePhoto = () => {
        if (photoList.length > 9) {
            Alert.alert('알림', '사진은 10장까지 첨부 가능합니다.')
            return
        }
        launchImageLibrary({ selectionLimit: 1, mediaType: 'photo' }, (response) => {
            if (response.assets) {
                setPhotoList((prev) => {
                    let next = [...prev]
                    if (response.assets)
                        next.push(response.assets[0])
                    return next
                })
            }
        })
    }

    const deleteImage = (i) => {
        Alert.alert('삭제', '이 이미지를 삭제하겠습니까?', [
            {text: '취소'},
            {text: '확인', onPress: () => {
                setPhotoList((prev) => {
                    let next = [...prev]
                    next.splice(i, 1)
                    return next
                })
            }}
        ])
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
                    paddingLeft: 20,
                    paddingRight: 15,
                    marginVertical: 15
                }}>
                {photoList.map((v, i) => <TouchableOpacity key={i} onLongPress={() => deleteImage(i)}>
                    <Image
                        source={{ uri: v.uri }}
                        style={{ width: 100, height: 100, marginRight: 5 }} />
                </TouchableOpacity>)}
            </ScrollView></View>
        <View style={styles.bottomView}>
            <TouchableOpacity onPress={handleChoosePhoto}>
                <AntDesign name='addfolder' size={23} color='#151515' />
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

    data.append('content', text)
    // data.append('content', new Blob([JSON.stringify(text)], {type: "application/json"}))

    photoList.map((photo) => {
        data.append('images', {
            name: photo.fileName,
            type: photo.type,
            uri: photo.uri,
        })
    })

    // for(let [name, value] of data.entries()) {
    //     console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
    //   }

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