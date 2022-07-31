import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Alert, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useRootContext } from '../../RootProvider'
import { useHomeContext } from './HomeProvider'

type DataType = {
    postId: number,
    content: string,
    createdAt: string,
    likes: number,
    comments: number,
    image: boolean
}

export default function BoardPreview({ route, navigation }) {
    const [data, setData] = useState<DataType[]>([])
    const [scrap, setScrap] = useState(false)
    const rootContext = useRootContext()
    const homeContext = useHomeContext()

    let pageNumber = 0

    useFocusEffect(useCallback(() => {
        rootContext.api.get('/api/posts/latest/' + route.params.boardId + '/' + pageNumber)
            .then((res) => {
                setData(res.data.data.posts)
                setScrap(res.data.data.star)
                ++pageNumber
            })
    }, []))

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
    }, []);

    const onPressScrap = () => {
        Alert.alert(scrap ? '즐겨찾기 해제' : '즐겨찾기',
            scrap ? '게시판을 즐겨찾기 해제하겠습니까?' : '게시판을 즐겨찾기 하겠습니까?',
            [
                { text: '취소' },
                {
                    text: '확인',
                    onPress: () => {
                        rootContext.api.post('/api/stars/' + route.params.boardId)
                            .then((res) => {
                                setScrap((prev) => !prev)
                                rootContext.api.get('/api/stars')
                                    .then((res) => {
                                        homeContext.setBoards(res.data.data.stars)
                                    })
                                    .catch((err) => console.log(err.response.data))
                            })
                            .catch((err) => console.log(err))
                    }
                }
            ])
    }

    const renderItem = ({ item }: { item: DataType }) => <View style={styles.contentView}>
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
    </View>

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
        </TouchableOpacity>
        <Text style={styles.topText}>{route.params.boardName}</Text>
        <TouchableOpacity onPress={onPressScrap}
            style={styles.starIcon}>
            <AntDesign name={scrap ? 'star' : 'staro'} size={25} color='#FFBE0F' />
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
            onEndReached={() => { }}
        />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    topText: {
        fontSize: 18,
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
    starIcon: {
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
        fontSize: 16
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
        fontSize: 12,
        marginLeft: 3,
        marginRight: 8,
        color: '#333'
    },
    time: {
        fontSize: 12,
        color: '#aaa'
    }
})