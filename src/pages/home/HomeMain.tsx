import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useHomeContext } from './HomeProvider'

export default function HomeMain() {
    const [data, setData] = useState([
        {
            title: '숙플레이스',
            contentList: [
                {
                    content: '숙플 게시글 내용1',
                    likeCount: 10,
                    commentCount: 2,
                    image: true
                },
                {
                    content: '숙플 게시글 내용2',
                    likeCount: 9,
                    commentCount: 1,
                    image: false
                },
                {
                    content: '숙플 게시글 내용3',
                    likeCount: 8,
                    commentCount: 0,
                    image: true
                }
            ]
        },
        {
            title: '소융아이티컴과',
            contentList: [
                {
                    content: '소아컴 게시글 내용1',
                    likeCount: 10,
                    commentCount: 2,
                    image: true
                },
                {
                    content: '소아컴 게시글 내용2',
                    likeCount: 9,
                    commentCount: 1,
                    image: false
                },
                {
                    content: '소아컴 게시글 내용3',
                    likeCount: 8,
                    commentCount: 0,
                    image: true
                }
            ]
        },
        {
            title: '홍보게시판',
            contentList: [
                {
                    content: '홍보 게시글 내용1',
                    likeCount: 10,
                    commentCount: 2,
                    image: true
                },
                {
                    content: '홍보 게시글 내용2',
                    likeCount: 9,
                    commentCount: 1,
                    image: false
                },
                {
                    content: '홍보 게시글 내용3',
                    likeCount: 8,
                    commentCount: 0,
                    image: true
                }
            ]
        },
    ])
    const navi = useNavigation<any>()
    const { setCurrentBoard } = useHomeContext()
    useFocusEffect(() => setCurrentBoard(-1))
    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.topView}>
            <TouchableOpacity onPress={() => { navi.dispatch(DrawerActions.openDrawer()) }}>
                <Icon name='menu' size={25} color='#555' />
            </TouchableOpacity>
            <Text style={styles.topText}>숙닥숙닥</Text>
            <TouchableOpacity>
                <Icon name='bell-outline' size={25} color='#555' />
            </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
            {data.map((v, i) => <View key={i} style={styles.contentListContainer}>
                <TouchableOpacity style={styles.titleView}
                    onPress={() => {
                        setCurrentBoard(i)
                        navi.navigate('PostStack', {
                            screen: 'PostList',
                            params: { boardName: v.title }
                        })
                    }}>
                    <Text style={styles.title}>{v.title}</Text>
                    <Icon name='chevron-right' size={23} color='#003087' />
                </TouchableOpacity>
                {v.contentList.map((content, j) => <TouchableOpacity style={styles.contentView}
                    key={i + 'i' + j}>
                    <Text style={styles.content}>{content.content}</Text>
                    <View style={styles.countView}>
                        <Icon name='thumb-up-outline' size={11} color='#AD3E3E' />
                        <Text style={[styles.count, { color: '#AD3E3E' }]}>{content.likeCount}</Text>
                        <Icon name='comment-processing-outline' size={11} color='#003087' />
                        <Text style={[styles.count, { color: '#003087' }]}>{content.commentCount}</Text>
                        {content.image ?
                            <Icon name='image-outline' size={11} color='#333' />
                            : undefined}
                    </View>
                </TouchableOpacity>)}
            </View>)}
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    topView: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topText: {
        fontSize: 16,
        color: '#003087',
        fontWeight: 'bold'
    },
    contentListContainer: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    titleView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    },
    title: {
        color: '#003087',
        fontSize: 14,
        fontWeight: 'bold'
    },
    contentView: {
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    content: {
        color: '#333',
        fontSize: 12
    },
    countView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7
    },
    count: {
        fontSize: 11,
        marginLeft: 2,
        marginRight: 7,
        color: '#333'
    }
})