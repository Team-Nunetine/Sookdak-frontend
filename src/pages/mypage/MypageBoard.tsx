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
        rootContext.api.get('http://3.36.250.198:8080/api/user/my-board').then((res) => {
            setData(res.data.data.boards)
        }).catch((err) => console.log(err.response.data))
    },[]),[])

    const onRemove = ({ boardId, name }) => {
        Alert.alert(
            name,
            "게시판을 삭제하시겠습니까?",
        [
            {
                text: "예",
                onPress: () => {
                    rootContext.api.delete('http://3.36.250.198:8080/api/board/' + boardId).then((res) => {
                    console.log("삭제됨") 
                    setData(data.filter(res => res.boardId != boardId))}).catch((err) => console.log(err.response.data))}
            },
            {
                text: "아니오",
                onPress: () => console.log("삭제 안함"),
                style: "cancel"
            }
        ],
        {cancelable: false}
        );
    }

    const renderItem = ({item}: {item:DataType}) => <ScrollView contentContainerStyle={{ paddingBottom: 10}}>
    <View key={item.boardId} style={styles.contentListContainer}>
        <View style={styles.contentListColumn}>
            <Text style={styles.boardName}>{item.name}</Text>
            <Text style={styles.content}>{item.description}</Text>
        </View>
        <TouchableOpacity 
         style={styles.button}>
        <Button 
         title="삭제" 
         color='#fff'
         onPress={() => onRemove({boardId: item.boardId, name: item.name})}></Button>
        </TouchableOpacity>
        </View>
    </ScrollView>

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white', marginTop: 25 }}>
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
        fontSize: 18,
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
        fontSize: 18,
        marginBottom: 5
    },
    content: {
        color: '#333',
        fontSize: 15
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

