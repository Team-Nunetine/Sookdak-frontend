import React, { useCallback, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
import { useFocusEffect } from '@react-navigation/native'
import { useRootContext } from '../../RootProvider'

type MessageType = {
    "messageId": number,
    "content": string,
    "dateTime": string,
    "sender": boolean
}

export default function MessageDetail({ navigation, route }) {
    const rootContext = useRootContext()
    const [pageIndex, setPageIndex] = useState(0)
    const [data, setData] = useState<MessageType[]>([])
    const [endReached, setEndReached] = useState(false)

    useFocusEffect(useCallback(() => {
        navigation.getParent().getParent().setOptions({ tabBarStyle: { display: 'none' } })
        navigation.getParent().setOptions({ swipeEnabled: false })
        rootContext.api.get('/api/messages/' + route.params.roomId + '/0')
            .then((res) => {
                console.log(res.data.data.messages)
                setData(res.data.data.messages)
                setPageIndex(1)
            })
            .catch((err) => console.log(err.response.data))
    }, []))

    const onEndReached = () => {
        if (endReached)
            return
        rootContext.api.get('/api/messages/' + route.params.roomId + '/' + pageIndex)
            .then((res) => {
                if (res.data.data.messages == []) {
                    setEndReached(true)
                    return
                }
                setData((prev) => {
                    let next = [...prev]
                    next.push(...res.data.data.messages)
                    return next
                })
                setPageIndex((prev) => prev + 1)
            })
    }

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginTop: 25  }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
        </TouchableOpacity>
        <Text style={styles.topText}>쪽지</Text>
        <TouchableOpacity onPress={() => { navigation.navigate('MessageSend', { roomId: route.params.roomId }) }}
            style={styles.sendIcon}>
            <Feather name='send' size={22} color='#555' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }}
            style={styles.dotsIcon}>
            <Ionicons name='ellipsis-vertical' size={22} color='#555' />
        </TouchableOpacity>
        <FlatList
            data={data}
            renderItem={({ item }) => {
                return <View style={[styles.row, { justifyContent: item.sender ? 'flex-end' : 'flex-start' }]}>
                    {item.sender ? <Text style={styles.time}>{item.dateTime}</Text> : undefined}
                    <Text style={styles.content}>{item.content}</Text>
                    {item.sender ? undefined : <Text style={styles.time}>{item.dateTime}</Text>}
                </View>
            }}
            keyExtractor={(item) => item.messageId.toString()}
            contentContainerStyle={{ marginHorizontal: 20 }}
            inverted={true}
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReached} />
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
    sendIcon: {
        position: 'absolute',
        top: 0,
        right: 40,
        padding: 20
    },
    dotsIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 20,
        flexWrap: 'wrap'
    },
    content: {
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        padding: 10,
        color: '#151515',
        maxWidth: '80%'
    },
    time: {
        marginHorizontal: 5,
        fontSize: 12,
    }
})