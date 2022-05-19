import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { useHomeContext } from './HomeProvider'

export default function HomeMain({ navigation, route }) {
    
    useFocusEffect(useCallback(() => {
        navigation.getParent().getParent().setOptions({ tabBarStyle: { display: 'flex' } })
        navigation.getParent().setOptions({ swipeEnabled: true })
        setCurrentBoard(-1)
    },[]))
    
    const [data, setData] = useState([
        {
            title: '숙플레이스',
            contentList: [
                {
                    content: '숙플 게시글 내용1\n최대\n3줄까지\n보여지기',
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
    const { setCurrentBoard } = useHomeContext()
    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
            style={styles.menuIcon}>
            <Ionicons name='menu-outline' size={25} color='#555' />
        </TouchableOpacity>
        <Text style={styles.appName}>숙닥숙닥</Text>
        <TouchableOpacity onPress={() => { navigation.navigate('NoticeStack', { screen: 'Notice' }) }}
            style={styles.bellIcon}>
            <Ionicons name='notifications-outline' size={22} color='#555' />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
            {data.map((v, i) => <View key={i} style={styles.contentListContainer}>
                <TouchableOpacity style={styles.titleView}
                    onPress={() => {
                        setCurrentBoard(i)
                        navigation.navigate('PostStack', {
                            screen: 'PostList',
                            params: { boardName: v.title }
                        })
                    }}>
                    <Text style={styles.title}>{v.title}</Text>
                    <Ionicons name='chevron-forward' size={18} color='#003087' />
                </TouchableOpacity>
                {v.contentList.map((content, j) => <TouchableOpacity style={styles.contentView}
                    key={i + 'i' + j}
                    onPress={() => {
                        navigation.navigate('PostStack', {
                            screen: 'PostDetail',
                            params: { boardName: v.title }
                        })
                    }}>
                    <Text style={styles.content} numberOfLines={3}>{content.content}</Text>
                    <View style={styles.countView}>
                        <Ionicons name='heart-outline' size={12} color='#AD3E3E' />
                        <Text style={[styles.count, { color: '#AD3E3E' }]}>{content.likeCount}</Text>
                        <Ionicons name='chatbox-ellipses-outline' size={12} color='#003087' />
                        <Text style={[styles.count, { color: '#003087' }]}>{content.commentCount}</Text>
                        {content.image ?
                            <Feather name='paperclip' size={10} color='#333' />
                            : undefined}
                    </View>
                </TouchableOpacity>)}
            </View>)}
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    appName: {
        fontSize: 16,
        color: '#003087',
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 20
    },
    contentListContainer: {
        marginVertical: 10,
        marginHorizontal: 20
    },
    titleView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    title: {
        color: '#003087',
        fontSize: 14,
        fontWeight: 'bold'
    },
    contentView: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 3,
        backgroundColor: '#f9f9f9',
        borderRadius: 10
    },
    content: {
        color: '#333',
        fontSize: 12
    },
    countView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    count: {
        fontSize: 11,
        marginLeft: 3,
        marginRight: 8,
        color: '#333'
    },
    menuIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20
    },
    bellIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 20
    }
})