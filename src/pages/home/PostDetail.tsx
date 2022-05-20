import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { useRootContext } from '../../RootProvider'
import LottieView from 'lottie-react-native'
import { launchImageLibrary } from 'react-native-image-picker'

type PostDataType = {
    content: string,
    createdAt: string,
    likes: number,
    scraps: number,
    comments: number,
    images: string[],
    writer: boolean,
    // isLiked: boolean // -> 아직 API 수정 중
}

type CommentType = {
    commentOrder: number,
    commentId: number,
    parent: number,
    content: string,
    imageURL: string,
    likes: number,
    createdAt: string,
    reply: CommentType[]
}

type CommentsDataType = CommentType[]

export default function PostDetail({ route, navigation }) {
    const [loading, setLoading] = useState(true)

    const [postData, setPostData] = useState<PostDataType>({
        content: '게시글 내용',
        images: [],
        likes: 10,
        comments: 2,
        scraps: 1,
        // isLiked: true,
        // isScrapped: true,
        createdAt: '2022/03/28 14:33',
        writer: false,
        // isLiked: false
    })

    const [commentsData, setCommentsData] = useState<CommentsDataType>([])

    const rootContext = useRootContext()

    const load = (callBack) => {
        rootContext.api.get('/api/post/' + route.params.postId)
            .then((res) => {
                setPostData(res.data.data.post)
                rootContext.api.get('/api/comment/' + route.params.postId)
                    .then((res) => {
                        setCommentsData(res.data.data.comments)
                        setLoading(false)
                        if (callBack)
                            callBack()
                    })
                    .catch((err) => console.log(err.response.data))
            })
            .catch((err) => console.log(err.response.data))
    }

    useFocusEffect(useCallback(() => {
        navigation.getParent().setOptions({ swipeEnabled: false })
        load(null)
        return () => {
            navigation.getParent().setOptions({ swipeEnabled: true })
        }
    }, []))

    const [text, setText] = useState('')
    const [photo, setPhoto] = useState<any>(null)

    const handleChoosePhoto = () => {
        launchImageLibrary({ selectionLimit: 1, mediaType: 'photo' }, (response) => {
            if (response.assets) {
                setPhoto(response.assets[0])
            }
        })
    }

    const deleteImage = () => {
        Alert.alert('삭제', '이 이미지를 삭제하겠습니까?', [
            { text: '취소' },
            {
                text: '확인', onPress: () => {
                    setPhoto(null)
                }
            }
        ])
    }

    const scrollViewRef = useRef<any>()

    const [uploadLoading, setUploadLoading] = useState(false)

    const upload = () => {
        setUploadLoading(true)
        fetch('http://13.209.48.180:8080/api/comment/' + route.params.postId + '/' + 0 + '/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + rootContext.user.token
            },
            body: createFormData(text, photo),
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                if (res.success == false) {
                    Alert.alert('알림', res.message)
                    setUploadLoading(false)
                    return
                }
                load(() => {
                    scrollViewRef.current.scrollToEnd()
                    setText('')
                    setPhoto(null)
                    setUploadLoading(false)
                })
            })
            .catch((err) => console.log(err))
    }

    if (loading)
        return <LottieView
            source={require('../../../assets/lottie/loading.json')}
            loop
            autoPlay />

    const Comment = ({ v }: { v: CommentType }) => <>
        <View style={commentStyles.view}>
            <View style={commentStyles.nameView}>
                <Text style={commentStyles.name}>익명{v.commentOrder}</Text>
                <Ionicons name='ellipsis-vertical' size={16} color='#555' />
            </View>
            <Text style={commentStyles.content}>{v.content}</Text>
            {v.imageURL ? <Image source={{ uri: v.imageURL }}
                style={{ width: '100%', height: 250, marginVertical: 10, borderRadius: 10 }}
                resizeMode='cover' /> : undefined}
            <View style={commentStyles.bottomView}>
                <TouchableOpacity style={commentStyles.countView}
                    onPress={() => { }}>
                    <Ionicons name='heart-outline' size={15} color='#AD3E3E' />
                    <Text style={[commentStyles.count, { color: '#AD3E3E' }]}>{v.likes}</Text>
                </TouchableOpacity>
                <Text style={commentStyles.time}>{v.createdAt}</Text>
            </View>
        </View>
        {v.reply.map((v, i) => <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 25
        }}
            key={i}>
            <Feather name='corner-down-right' size={12} color='#aaa' />
            <View style={[commentStyles.view, { flex: 1 }]}>
                <View style={commentStyles.nameView}>
                    <Text style={commentStyles.name}>익명{v.commentOrder}</Text>
                    <Ionicons name='ellipsis-vertical' size={16} color='#555' />
                </View>
                <Text style={commentStyles.content}>{v.content}</Text>
                <View style={commentStyles.bottomView}>
                    <TouchableOpacity style={commentStyles.countView}>
                        <Ionicons name='heart-outline' size={15} color='#AD3E3E' />
                        <Text style={[commentStyles.count, { color: '#AD3E3E' }]}>{v.likes}</Text>
                    </TouchableOpacity>
                    <Text style={commentStyles.time}>{v.createdAt}</Text>
                </View>
            </View>
        </View>)}
    </>

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
        </TouchableOpacity>
        <Text style={styles.topText}>{route.params.boardName}</Text>
        <TouchableOpacity onPress={() => { }}
            style={styles.dotsIcon}>
            <Ionicons name='ellipsis-vertical' size={22} color='#555' />
        </TouchableOpacity>
        <ScrollView ref={scrollViewRef}>
            <View style={styles.contentView}>
                <Text style={styles.content}>{postData.content}</Text>
                {postData.images.map((v, i) => <Image source={{ uri: v }}
                    style={{ width: '100%', height: 250, marginVertical: 10, borderRadius: 10 }}
                    resizeMode='cover' />)}
                <Text style={styles.time}>{postData.createdAt}</Text>
                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.like}
                        onPress={() => {
                            rootContext.api.post('/api/post/' + route.params.postId + '/like')
                                .then((res) => {
                                    console.log(res.data)
                                    rootContext.api('/api/post/' + route.params.postId)
                                        .then((res) => {
                                            setPostData(res.data.data.post)
                                        })
                                        .catch((err) => console.log(err))
                                })
                                .catch((err) => console.log(err))
                        }}>
                        <Ionicons name={false ? 'heart' : 'heart-outline'} size={24} color='#AD3E3E' />
                    </TouchableOpacity>
                    <Text style={styles.count}>
                        공감 {postData.likes}개    댓글 {postData.comments}개    스크랩 {postData.scraps}개
                    </Text>
                </View>
            </View>
            {commentsData.map((v, i) => <Comment v={v} key={i} />)}
        </ScrollView>
        <View style={styles.textInputRow}>
            <TouchableOpacity onPress={handleChoosePhoto}>
                <Ionicons name='camera-outline' size={22} color='#151515' />
            </TouchableOpacity>
            {photo ? <TouchableOpacity onPress={deleteImage} onLongPress={deleteImage}>
                <Image source={{ uri: photo.uri }}
                    style={{ width: 65, height: 65, marginLeft: 10, marginVertical: 5, borderRadius: 5 }} />
            </TouchableOpacity> : undefined}
            <TextInput style={styles.textInput} multiline={true} value={text} onChangeText={setText} />
            <TouchableOpacity onPress={upload}>
                {uploadLoading ? <View style={{width: 25, height: 25}}><LottieView
                    source={require('../../../assets/lottie/loading2.json')}
                    loop
                    autoPlay /></View> :
                    <Ionicons name='send-outline' size={22} color='#151515' />}
            </TouchableOpacity>
        </View>
    </SafeAreaView>
}

const createFormData = (text, photo) => {
    let data = new FormData()
    data.append('content', text)
    if (photo)
        data.append('image', {
            name: photo.fileName,
            type: photo.type,
            uri: photo.uri,
        })
    return data
}

const styles = StyleSheet.create({
    topText: {
        fontSize: 16,
        color: '#003087',
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 20
    },
    contentView: {
        padding: 25,
        paddingTop: 15,
    },
    content: {
        fontSize: 13,
        color: '#151515',
        marginBottom: 5
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    like: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
    },
    count: {
        fontSize: 11,
        color: '#333'
    },
    time: {
        fontSize: 10,
        color: '#aaa',
        textAlign: 'right',
        marginTop: 5
    },
    textInputRow: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        marginHorizontal: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginTop: 'auto',
        marginBottom: 15
    },
    textInput: {
        flex: 1,
        padding: 10,
        fontSize: 15,
        maxHeight: 110
    },
    backIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20
    },
    dotsIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 20
    }
})

const commentStyles = StyleSheet.create({
    view: {
        marginHorizontal: 15,
        paddingHorizontal: 15,
        marginBottom: 15,
        paddingVertical: 15,
        backgroundColor: '#fafafa',
        borderRadius: 10
    },
    nameView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2
    },
    name: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#151515'
    },
    content: {
        fontSize: 12,
        color: '#151515',
        marginBottom: 7
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8
    },
    countView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    count: {
        fontSize: 11,
        marginLeft: 3,
        color: '#333'
    },
    time: {
        fontSize: 10,
        color: '#aaa'
    },
})