import { DrawerActions, useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
import { useRootContext } from '../../RootProvider'

type DataType = {
    postId: number,
    content: string,
    createdAt: string,
    likes: number,
    comments: number,
    image: boolean
}

export default function PostList({ route, navigation }) {
    const [data, setData] = useState<DataType[]>([
        //     {
        //     postId: 10,
        //     content: '로딩전',
        //     createdAt: '1010',
        //     likes: 1,
        //     comments: 1,
        //     image: true
        // }
    ])

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
    }, []);

    const rootContext = useRootContext()

    const [pageIndex, setPageIndex] = useState(0)

    useEffect(useCallback(() => {
        rootContext.api.get('/api/post/latest/' + route.params.boardId + '/' + 0)
            .then((res) => {
                console.log('useEffect')
                setData(res.data.data.posts)
                setPageIndex(1)
            })
            .catch((err) => console.log(err.response.data))
    }, []), [])

    const onEndReached = () => {
        rootContext.api.get('/api/post/latest/' + route.params.boardId + '/' + pageIndex)
            .then((res) => {
                console.log('onEndReached called')
                console.log(pageIndex)
                setData((prev) => {
                    let next = [...prev]
                    next.push(...res.data.data.posts)
                    return next
                })
                if (res.data.data.posts.length > 0)
                    setPageIndex((prev) => prev + 1)
            })
            .catch((err) => console.log(err.response.data))
    }

    const renderItem = ({ item }: { item: DataType }) => <TouchableOpacity style={styles.contentView}
        onPress={() => {
            navigation.navigate('PostDetail', { boardName: route.params.boardName })
        }}>
        <Text style={styles.content} numberOfLines={3}>{item.content}</Text>
        <View style={styles.bottomView}>
            <View style={styles.countView}>
                <Ionicons name='heart-outline' size={12} color='#AD3E3E' />
                <Text style={[styles.count, { color: '#AD3E3E' }]}>{item.likes}</Text>
                <Ionicons name='chatbox-ellipses-outline' size={12} color='#003087' />
                <Text style={[styles.count, { color: '#003087' }]}>{item.comments}</Text>
                {item.image ?
                    <Feather name='paperclip' size={10} color='#333' />
                    : undefined}
            </View>
            <Text style={styles.time}>{item.createdAt}</Text>
        </View>
    </TouchableOpacity>

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
            style={styles.menuIcon}>
            <Ionicons name='menu-outline' size={25} color='#555' />
        </TouchableOpacity>
        <Text style={styles.topText}>{route.params.boardName}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PostSearch', { boardName: route.params.boardName })}
            style={styles.pencilIcon}>
            <Ionicons name='search' size={25} color='#555' />
        </TouchableOpacity>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.postId.toString()}
            refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressViewOffset={40}
            />}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            onEndReached={onEndReached}
        />
        <TouchableOpacity style={{
            backgroundColor: '#fff',
            elevation: 5,
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: 53,
            height: 53,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center'
        }}
            onPress={() => navigation.navigate('PostUpload', {
                boardName: route.params.boardName,
                boardId: route.params.boardId
            })}>
            <Octicons name='pencil' size={20} color='#333' />
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
    menuIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20
    },
    pencilIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 20
    },
    contentView: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fafafa',
        borderRadius: 10,
    },
    content: {
        color: '#333',
        fontSize: 13
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        alignItems: 'center'
    },
    countView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    count: {
        fontSize: 10,
        marginLeft: 3,
        marginRight: 8,
        color: '#333'
    },
    time: {
        fontSize: 10,
        color: '#aaa'
    }
})