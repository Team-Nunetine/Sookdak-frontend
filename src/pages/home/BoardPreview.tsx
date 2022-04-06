import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Alert, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function PostList({ route, navigation }) {
    useFocusEffect(() => {
        navigation.getParent().getParent().setOptions({ tabBarStyle: { display: 'none' } })
        navigation.getParent().setOptions({ swipeEnabled: false })
    })

    const [data, setData] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => ({
        id: v.toString(),
        content: v % 3 ? '게시글 내용' + v : '게시글 내용' + v + '\n최대\n3줄까지\n보여지기',
        likeCount: 10,
        commentCount: 2,
        image: v % 3 ? true : false,
        time: '01/01 14:00',
    })))

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
    }, []);

    const [scrap, setScrap] = useState(false)

    const onPressScrap = () => {
        Alert.alert(scrap ? '즐겨찾기 해제' : '즐겨찾기',
            scrap ? '게시판을 즐겨찾기 해제하겠습니까?' : '게시판을 즐겨찾기 하겠습니까?',
            [
                { text: '취소' },
                {
                    text: '확인',
                    onPress: () => {
                        setScrap((prev) => !prev)
                    }
                }
            ])
    }

    const renderItem = ({ item }) => <View style={styles.contentView}>
        <Text style={styles.content} numberOfLines={3}>{item.content}</Text>
        <View style={styles.bottomView}>
            <View style={styles.countView}>
                <Ionicons name='heart-outline' size={12} color='#AD3E3E' />
                <Text style={[styles.count, { color: '#AD3E3E' }]}>{item.likeCount}</Text>
                <Ionicons name='chatbox-ellipses-outline' size={12} color='#003087' />
                <Text style={[styles.count, { color: '#003087' }]}>{item.commentCount}</Text>
                {item.image ?
                    <Feather name='paperclip' size={10} color='#333' />
                    : undefined}
            </View>
            <Text style={styles.time}>{item.time}</Text>
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
            keyExtractor={(item) => item.id}
            refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressViewOffset={40}
            />}
            contentContainerStyle={{ paddingHorizontal: 20 }}
        />
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