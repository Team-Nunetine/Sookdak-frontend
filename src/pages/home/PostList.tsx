import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function PostList({ route }) {
    const [data, setData] = useState([
        {
            id: '1',
            content: '게시글 내용1',
            likeCount: 10,
            commentCount: 2,
            image: true,
            time: '2022/01/01 14:00',
        },
        {
            id: '2',
            content: '게시글 내용2',
            likeCount: 9,
            commentCount: 1,
            image: false,
            time: '2022/01/01 14:00'
        },
        {
            id: '3',
            content: '게시글 내용3',
            likeCount: 8,
            commentCount: 0,
            image: true,
            time: '2022/01/01 14:00'
        }
    ])
    const navi = useNavigation<any>()

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
    }, []);

    const renderItem = ({ item }) => <TouchableOpacity style={styles.contentView}
        onPress={() => {
            navi.navigate('PostDetail')
        }}>
        <Text style={styles.content}>{item.content}</Text>
        <View style={styles.bottomView}>
            <View style={styles.countView}>
                <Icon name='thumb-up-outline' size={12} color='#AD3E3E' />
                <Text style={[styles.count, { color: '#AD3E3E' }]}>{item.likeCount}</Text>
                <Icon name='comment-processing-outline' size={12} color='#003087' />
                <Text style={[styles.count, { color: '#003087' }]}>{item.commentCount}</Text>
                {item.image ?
                    <Icon name='image-outline' size={12} color='#333' />
                    : undefined}
            </View>
            <Text style={styles.time}>{item.time}</Text>
        </View>
    </TouchableOpacity>

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.topView}>
            <TouchableOpacity onPress={() => { navi.dispatch(DrawerActions.openDrawer()) }}>
                <Icon name='menu' size={25} color='#555' />
            </TouchableOpacity>
            <Text style={styles.topText}>{route.params.boardName}</Text>
            <TouchableOpacity>
                <Icon name='pencil-outline' size={25} color='#555' />
            </TouchableOpacity>
        </View>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressViewOffset={40}
            />}
            contentContainerStyle={{ paddingHorizontal: 25 }}
        />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    topView: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topText: {
        fontSize: 16,
        color: '#003087',
        fontWeight: 'bold'
    },
    contentView: {
        paddingVertical: 15
    },
    content: {
        color: '#333',
        fontSize: 14
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 7
    },
    countView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    count: {
        fontSize: 11,
        marginLeft: 2,
        marginRight: 7,
        color: '#333'
    },
    time: {
        fontSize: 10,
        color: '#aaa'
    }
})