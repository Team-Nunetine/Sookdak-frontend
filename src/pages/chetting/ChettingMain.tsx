import React, { useState} from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView, View, StyleSheet, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function ChettingMain({ route, navigation }) {
    useFocusEffect(() => {
        navigation.getParent().setOptions({ swipeEnabled: false })
    })
    const listTab = [
        {
            status: 'MY'
        }, 
        {
            status: '전체'
        }
    ]
    
    const Data = [
        {
            roomName: '시스템종합설계',
            desc: '시스템종합설계 방입니다.',                
            people: '22',
            status: 'MY'
        },
        {
            roomName: '데이터마이닝분석',
            desc: '데이터마이닝및분석 방입니다.',
            people: '25',
            status: 'MY'
        },
        {
            roomName: '융합적사고와글쓰기',
            desc: '융사글 방입니다.',
            people: '17',
            status: 'MY'
        },
        {
            roomName: '데이터사이언스개론',
            desc: '데사개 방입니다.',
            people: '16'
        },
        {
            roomName: '데이터베이스프로그래밍',
            desc: '데베프 방입니다.',
            people: '23'
        }
    ]


    const [status, setStatus] = useState('전체')
    const [Datalist, setDatalist] = useState(Data)
    
    const setStatusFilter = status => { 
        if( status !== '전체') {
            setDatalist([...Data.filter(v => v.status === status)])
        } else {
            setDatalist(Data)
        }
        setStatus(status)
    }

    const searchRoom = (input) => {
        let data = Data
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
                    <Text style={styles.desc}>{item.desc}</Text>
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
                <TouchableOpacity onPress={() => navigation.navigate('ChattingStart')}>
                    <Ionicons style={styles.icon} name='add-circle-outline' size={28} color='#555'/>
                </TouchableOpacity>
            </View>
            <View style={styles.listTab}>
                {
                    listTab.map(v => (
                        <TouchableOpacity 
                        style={[styles.btnTab, status === v.status && styles.btnTabActive]}
                        onPress={() => setStatusFilter(v.status)}>
                            <Text style={styles.textTab}>{v.status}</Text>
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
        fontSize: 10,
        color: '#aaa',
        textAlign: 'right',
    },
});