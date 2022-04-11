import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, StyleSheet, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function ChettingMain({ route, navigation }) {
    const ListTab = [
        {
            tabname: 'MY'
        },
        {
            tabname: '전체'
        }
    ]

    const data = [
        {
            roomName: '시스템종합설계',
            chat: '팀원 구해요',
            people: '22',
            status: 'MY'
        },
        {
            roomName: '데이터마이닝분석',
            chat: '안녕하세요',
            people: '25',
            status: 'MY'
        },
        {
            roomName: '융합적사고와글쓰기',
            chat: '과제 있나요',
            people: '17',
            status: 'MY'
        },
        {
            roomName: '소프트웨어융합특강',
            chat: '같이 공부 할 사람 구해요',
            people: '16',
            status: 'MY'
        },
        {
            roomName: '데이터사이언스개론',
            chat: '이번 강의 어렵네요',
            people: '16',
            status: '전체'
        },
        {
            roomName: '데이터베이스프로그래밍',
            chat: '과제가 너무 많아요',
            people: '23',
            status: '전체'
        },
    ]
    const [status, setStatus] = useState('MY')
    const [datalist, setDatalist] = useState(data)
    
    const setStatusFilter = status => { //status는 listTab.tabname
        if( status === 'MY') {
            setDatalist([...data.filter(v => v.status === status)])
        } else {
            setDatalist([...data.filter(v => v.status === status)])
        }
        setStatus(status)
    }

    const searchRoom = (input) => {
        let data = datalist
        let searchData = data.filter((item) => {
            return item.roomName.includes(input)
        });
        setDatalist(searchData)
    }

    const renderItem = ({item, index}) => {
        return(     
            <TouchableOpacity 
             onPress={() => {
                 navigation.navigate('ChattingRoom', { 
                     roomName: item.roomName})}}>
                <View key={index} style={styles.itemContainer}>
                    <Text style={styles.roomName}>{item.roomName}</Text>
                    <Text style={styles.chat}>{item.chat}</Text>
                    <Text style={styles.people}>{item.people}</Text>
                </View>
            </TouchableOpacity>
            )
        }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.iconContainer}>
                <View/>
                <Title style={styles.title}>대화</Title>
                    <TouchableOpacity
                    onPress={() => {navigation.navigate('ChattingStart')}}>
                        <Ionicons style={styles.icon}name='add-circle-outline' size={28} color='#555' />
                    </TouchableOpacity>
            </View>
            <View style={styles.listTab}>
                {
                    ListTab.map(v => (
                        <TouchableOpacity 
                        style={[styles.btnTab, status === v.tabname && styles.btnTabActive]}
                        onPress={() => setStatusFilter(v.tabname)}>
                            <Text style={styles.textTab}>{v.tabname}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <View style={styles.textInputRow}>
                <TouchableOpacity>
                    <Ionicons name='search' size={25} color='#555' />
                </TouchableOpacity>
                <TextInput
                 placeholder='채팅방 검색'
                 onChangeText={(input) => {
                     searchRoom(input)
                 }}/>
            </View>

            <FlatList
             data = {datalist}
             keyExtractor={(item) => item.toString()}
             renderItem={renderItem}
            />
    </SafeAreaView>
    
    )}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
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
    textSearch: {
        flex: 1,
        paddingVertical: 7
    },
    listTab: {
        padding: 5,
        flexDirection: 'row',
        alignSelf: 'center', 
        marginBottom: 20
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
    textInput: {
        width: '100%',
        height: '60px',
        margin: '3px 0',
        padding: '15pt 20pt',
        borderRadius: 10,
        backgroundColor: '#e3e3e3' ,
        fontSize: 20,
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
    chat: {
        fontSize: 15,
        marginTop: 8
    },
    people: {
        fontSize: 10,
        color: '#aaa',
        textAlign: 'right',
    },
});