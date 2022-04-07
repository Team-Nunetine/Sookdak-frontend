import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRootContext } from '../../RootProvider'
import axios from 'axios'

type ResultItemType = {
    name: string,
    description: string,
    boardId: number
}

export default function BoardSearch({ navigation }) {
    const [result, setResult] = useState<ResultItemType[]>([])
    const [allBoards, setAllBoards] = useState<ResultItemType[]>([])
    const [value, setValue] = useState('')

    const rootContext = useRootContext()

    useFocusEffect(useCallback(() => {
        navigation.getParent().getParent().setOptions({ tabBarStyle: { display: 'none' } })
        navigation.getParent().setOptions({ swipeEnabled: false })
        axios.get('http://52.78.202.206:8080/api/board', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + rootContext.user.token
            }
        }).then((res) => {
            setAllBoards(res.data.data.boards)
            setResult(res.data.data.boards)
            console.log('called')
        }).catch((err) => console.log(err))
    }, []))

    const onChange = ({ nativeEvent }) => {
        setResult(allBoards.filter(board => board.name.includes(nativeEvent.text)
            || board.description.includes(nativeEvent.text)))
    }

    const renderItem = ({ item }: { item: ResultItemType }) => <TouchableOpacity
        onPress={() => navigation.navigate('BoardPreview', { boardName: item.name })}
        style={styles.row}>
        <Text style={styles.boardName}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
        </TouchableOpacity>
        <Text style={styles.topText}>게시판 검색</Text>
        <View style={styles.searchView}>
            <TextInput style={styles.textInput}
                onChange={onChange}
                value={value} onChangeText={setValue} />
            <Icon name='magnify' size={20} color='#151515' />
        </View>
        <FlatList
            data={result}
            renderItem={renderItem}
            keyExtractor={(item) => item.boardId.toString()}
            contentContainerStyle={{ paddingHorizontal: 25 }} />
        <TouchableOpacity style={styles.bottomTouchable}
            onPress={() => navigation.navigate('BoardCreation')}>
            <Text style={styles.bottomText}>새 게시판 생성</Text>
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