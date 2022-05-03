import React, { useCallback, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
import { useFocusEffect } from '@react-navigation/native'

export default function MessageDetail({ navigation, route }) {

    const [data, setData] = useState([
        {
            id: 0,
            content: '안녕하세요1안녕하세요1안녕하세요1안녕하세요1',
            time: '04/18 10:00',
            isMine: false
        },
        {
            id: 1,
            content: '안녕하세요2',
            time: '04/18 10:02',
            isMine: true
        }
    ])

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
        </TouchableOpacity>
        <Text style={styles.topText}>쪽지</Text>
        <TouchableOpacity onPress={() => { navigation.navigate('MessageSend') }}
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
                return <View style={[styles.row, { justifyContent: item.isMine ? 'flex-end' : 'flex-start' }]}>
                    {item.isMine ? <Text style={styles.time}>{item.time}</Text> : undefined}
                    <Text style={styles.content}>{item.content}</Text>
                    {item.isMine ? undefined : <Text style={styles.time}>{item.time}</Text>}
                </View>
            }}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ marginHorizontal: 20 }} />
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
        fontSize: 9,
    }
})