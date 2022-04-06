import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type ResultItemType = {
    boardName: string,
    description: string,
    id: string
}

export default function BoardSearch({ navigation }) {
    useFocusEffect(() => {
        navigation.getParent().getParent().setOptions({ tabBarStyle: { display: 'none' } })
        navigation.getParent().setOptions({ swipeEnabled: false })
    })
    const [result, setResult] = useState<ResultItemType[]>([])
    const [value, setValue] = useState('')

    const renderItem = ({ item }: { item: ResultItemType }) => <TouchableOpacity
        style={styles.row}>
        <Text style={styles.boardName}>{item.boardName}</Text>
        <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
        </TouchableOpacity>
        <Text style={styles.topText}>게시판 검색</Text>
        <View style={styles.searchView}>
            <TextInput style={styles.textInput} onEndEditing={() => search(value, setResult)}
                value={value} onChangeText={setValue} />
            <TouchableOpacity onPress={() => search(value, setResult)}>
                <Icon name='magnify' size={20} color='#151515' />
            </TouchableOpacity>
        </View>
        <FlatList
            data={result}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 25 }} />
        <TouchableOpacity style={styles.bottomTouchable}
            onPress={() => navigation.navigate('BoardCreation')}>
            <Text style={styles.bottomText}>새 게시판 생성</Text>
        </TouchableOpacity>
    </SafeAreaView>
}

function search(boardName: string, setResult) {
    setResult([{ boardName: boardName, description: '게시판 설명', id: '1' },
    { boardName: boardName + '2', description: '게시판 설명2', id: '2' },
    { boardName: boardName + '3', description: '게시판 설명3', id: '3' },
    { boardName: boardName + '4', description: '게시판 설명4', id: '4' }])
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
    searchView: {
        backgroundColor: '#f3f3f3',
        borderRadius: 20,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        // backgroundColor: 'red',
        paddingVertical: 5
    },
    row: {
        marginHorizontal: 10,
        paddingVertical: 10
    },
    boardName: {
        color: '#151515',
        fontSize: 14
    },
    description: {
        color: '#888888',
        fontSize: 12
    },
    bottomText: {
        color: '#003087',
        fontSize: 13,
    },
    bottomTouchable: {
        borderColor: '#003087',
        borderRadius: 20,
        borderWidth: 1,
        position: 'absolute',
        bottom: 25,
        right: 25,
        paddingVertical: 7,
        paddingHorizontal: 15
    }
})