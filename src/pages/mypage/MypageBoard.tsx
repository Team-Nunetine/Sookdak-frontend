import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Button, RefreshControl, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRootContext } from '../../RootProvider';
import Octicons from 'react-native-vector-icons/Octicons'

type DataType = {
    boardId: number,
    name: string,
    description: string
}

export default function MypageBoard({ route, navigation }) {

    const rootContext = useRootContext()
    const [data, setData] = useState<DataType[]>([])
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
    }, [])

    useEffect(useCallback(() => {
        rootContext.api.get('http://13.209.48.180:8080/api/user/myboard').then((res) => {
            setData(res.data.data.boards)
            console.log(res.data.data.boards.boardId)
        }).catch((err) => console.log(err.response.data))
    },[]),[])

    const onRemove = boardId => {
        Alert.alert("정말 삭제하시겠습니까?")
        useEffect(useCallback(() => {
            rootContext.api.delete('http://13.209.48.180:8080/api/board/' + route.params.boardId).then((res) => {
                setData(data.filter(res => res.boardId != boardId))
                console.log("삭제됨") 
            }).catch((err) => console.log(err.response.data))
        }, []), [])
    }

    const renderItem = ({item}: {item:DataType}) => <ScrollView contentContainerStyle={{ paddingBottom: 10}}>
    <View key={item.boardId} style={styles.contentListContainer}>
        <View style={styles.contentListColumn}>
            <Text style={styles.boardName}>{item.name}</Text>
            <Text style={styles.content}>{item.description}</Text>
        </View>
        <TouchableOpacity 
         style={styles.button} 
         onPress={() => (console.log(item.boardId))}>
        <Button title="삭제" color='#fff'></Button>
        </TouchableOpacity>
        </View>
</ScrollView>
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
            </TouchableOpacity>
            <Text style={styles.topText}>게시판 관리</Text>
            <FlatList
            data = {data}
            renderItem={renderItem}
            keyExtractor={(item) => item.boardId.toString()}
            refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={40}/>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    topText: {
        fontSize: 16,
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
    contentListColumn: {
        flexDirection: 'column',
        margin: 20,
    },
    contentListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
        marginHorizontal: 10,
    },
    boardName: {
        fontSize: 16,
        marginBottom: 5
    },
    content: {
        color: '#333',
        fontSize: 13
    },
    button: {
        backgroundColor: '#AD3E3E',
        width: 75,
        height: 35,
        borderRadius: 20,
        marginTop: 15,
        marginBottom: 20,
        alignSelf: 'center'
    }
})

