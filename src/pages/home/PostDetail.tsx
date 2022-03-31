import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

type commentType = {
    content: string,
    likeCount: number,
    time: string,
    reply: {
        content: string,
        likeCount: number,
        time: string,
    }[]
}

export default function PostDetail({ route, navigation }) {
    useFocusEffect(() => {
        navigation.getParent().setOptions({ swipeEnabled: false })
        return () => {
            navigation.getParent().setOptions({ swipeEnabled: true })
        }
    })
    const [data, setData] = useState({
        content: '게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용',
        image: null,
        likeCount: 10,
        commentCount: 2,
        scrapCount: 1,
        isLiked: true,
        isScrapped: true,
        time: '2022/03/28 14:33',
        comment: [
            {
                content: '댓글 내용1',
                likeCount: 1,
                time: '2022/03/28 14:34',
                reply: [
                    {
                        content: '댓글1의 대댓글 내용1',
                        likeCount: 1,
                        time: '2022/03/28 14:34',
                    },
                    {
                        content: '댓글1의 대댓글 내용2',
                        likeCount: 0,
                        time: '2022/03/28 14:34',
                    }
                ]
            },
            {
                content: '댓글 내용2',
                likeCount: 0,
                time: '2022/03/28 14:35',
                reply: []
            }
        ]
    })
    const [like, setLike] = useState(data.isLiked)
    const [scrap, setScrap] = useState(data.isScrapped)

    useEffect(() => setLike(data.isLiked), [data.isLiked])
    useEffect(() => setScrap(data.isScrapped), [data.isScrapped])

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
        <ScrollView>
            <View style={styles.contentView}>
                <Text style={styles.content}>{data.content}</Text>
                {data.image == null ? undefined : <View style={{ backgroundColor: '#aaa', height: 200, borderRadius: 10 }} />}
                <Text style={styles.time}>{data.time}</Text>
                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.like}
                        onPress={() => setData((prev) => {
                            let next = JSON.parse(JSON.stringify(prev))
                            next.isLiked = !prev.isLiked
                            next.likeCount = prev.isLiked ? 9 : 10
                            return next
                        })}>
                        <Ionicons name={like ? 'heart' : 'heart-outline'} size={26} color='#AD3E3E' />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.countView}
                            onPress={() => setData((prev) => {
                                let next = JSON.parse(JSON.stringify(prev))
                                next.isScrapped = !prev.isScrapped
                                return next
                            })}>
                            <Octicons name={scrap ? 'bookmark' : 'bookmark-slash'} size={25} color='#FFD57E' />
                        </TouchableOpacity> */}
                    <Text style={styles.count}>
                        공감 {data.likeCount}개    댓글 {data.commentCount}개    스크랩 {data.scrapCount}개
                    </Text>
                </View>
            </View>
            {data.comment.map((v, i) => <Comment v={v} setData={setData} key={i} />)}
        </ScrollView>
        <View style={styles.textInputRow}>
            <TouchableOpacity>
                <Ionicons name='camera-outline' size={22} color='#151515' />
            </TouchableOpacity>
            <TextInput style={styles.textInput} multiline={true} />
            <TouchableOpacity>
                <Ionicons name='send-outline' size={22} color='#151515' />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
}

function Comment({ v, setData }: { v: commentType, setData }) {
    return <>
        <View style={commentStyles.view}>
            <Text style={commentStyles.content}>{v.content}</Text>
            <View style={commentStyles.bottomView}>
                <TouchableOpacity style={commentStyles.countView}
                    onPress={() => { }}>
                    <Ionicons name='heart-outline' size={15} color='#AD3E3E' />
                    <Text style={[commentStyles.count, { color: '#AD3E3E' }]}>{v.likeCount}</Text>
                </TouchableOpacity>
                <Text style={commentStyles.time}>{v.time}</Text>
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
                <Text style={commentStyles.content}>{v.content}</Text>
                <View style={commentStyles.bottomView}>
                    <TouchableOpacity style={commentStyles.countView}>
                        <Ionicons name='heart-outline' size={15} color='#AD3E3E' />
                        <Text style={[commentStyles.count, { color: '#AD3E3E' }]}>{v.likeCount}</Text>
                    </TouchableOpacity>
                    <Text style={commentStyles.time}>{v.time}</Text>
                </View>
            </View>
        </View>)}
    </>
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
        padding: 7,
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
        paddingHorizontal: 10,
        marginBottom: 5,
        paddingVertical: 15,
        backgroundColor: '#fafafa',
        borderRadius: 10
    },
    content: {
        fontSize: 12,
        color: '#151515'
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