import React, { useCallback, useEffect, useState} from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView, View, StyleSheet, Text, Dimensions, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useRootContext } from '../../RootProvider';

type DataType = {
    roomId: number,
    name: string,
    info: string,
    users: number,
    status: boolean
}

export default function ChettingMain({ navigation }) {
    
    const rootContext = useRootContext()
    const [data, setData] = useState<DataType[]>([])
    const [refreshing, setRefreshing] = useState(false)
    
    const onRefresh = useCallback(() => {}, [])

    const listTab = [
        {
            status: true,
            name: 'MY'
        }, 
        {
            status: false,
            name: '전체'
        }
    ]

    const [status, setStatus] = useState(false)
    const [Datalist, setDatalist] = useState(data)

    const setStatusFilter = status => { 
        if( status !== false) {
            console.log(status)
            setDatalist([...data.filter(v => v.status === status)])
            console.log(Datalist)
        } else {
            setDatalist(data)
        }
        setStatus(status)
    }

    const searchRoom = (input) => {
        let Data = data
        let searchData = Data.filter((item) => {
            return item.name.includes(input)
        });
        setDatalist(searchData)
    }

    useEffect(useCallback(() => {
        rootContext.api.get('http://3.36.250.198:8080/api/chat/chatroom').then((res) => {
            setData(res.data.data.chatRooms)
        }).catch((err) => {
            console.log(err.response.data)
        })
    }, []), [])

    const renderItem = ({item}: {item:DataType}) => {
        return(     
            <TouchableOpacity 
             onPress={() => {
                 console.log('채팅방')
                 navigation.navigate('ChattingRoom', { 
                     roomName: item.name})}}>
                <View key={item.roomId} style={styles.itemContainer}>
                    <Text style={styles.roomName}>{item.name}</Text>
                    <Text style={styles.desc}>{item.info}</Text>
                    <Text style={styles.people}>{item.users}</Text>
                </View>
            </TouchableOpacity>
            )
        }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.iconContainer}>
                <View/>
                <Title style={styles.title}>대화</Title>
                <TouchableOpacity onPress={() => navigation.navigate('ChattingStart')}>
                    <Ionicons style={styles.icon} name='add-circle-outline' size={28} color='#555'/>
                </TouchableOpacity>
            </View>
            <View style={styles.listTab}>
                {
                    listTab.map(v => (
                        <TouchableOpacity 
                        style={[styles.btnTab, status === v.status && styles.btnTabActive]}
                        onPress={() => {setStatusFilter(v.status)}}>
                            <Text style={styles.textTab}>{v.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <View style={styles.textInputRow}>
                <TextInput
                 style={styles.textInput}
                 placeholder='채팅방 검색'
                 onChangeText={(input) => {
                    searchRoom(input)
                }}/>
                <TouchableOpacity>
                    <Ionicons name='search' size={25} color='#555' />
                </TouchableOpacity>
            </View>

            <FlatList
             data = {Datalist}
             renderItem={renderItem}
             keyExtractor={(item) => item.roomId.toString()}
             refreshControl={<RefreshControl
             refreshing={refreshing}
             progressViewOffset={40}/>}
            />

    </SafeAreaView>
     
    )}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    listTab: {
        padding: 5,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btnTab: {
        width: Dimensions.get('window').width / 2.0,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#fff',
        padding: 10,
        justifyContent: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 20,
        color: '#003087',
        alignSelf: 'center'
    },
    icon: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20
    },
    textInputRow: {
        backgroundColor: '#f5f5f5',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    textInput: {
        flex: 1,
        paddingVertical: 7
    },
    textTab: {
        fontSize: 16
    },
    btnTabActive: {
        borderBottomColor: '#003087'
    },
    itemContainer: {
        backgroundColor: '#f5f5f5',
        marginHorizontal: 15,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 20,
        padding: 15
    },
    roomName: {
        fontWeight: 'bold',
        color: '#003087',
        fontSize: 17,
    },
    desc: {
        fontSize: 15,
        marginTop: 8
    },
    people: {
        fontSize: 13,
        color: '#aaa',
        textAlign: 'right',
    },
});