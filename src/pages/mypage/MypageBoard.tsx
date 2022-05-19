import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Octicons from 'react-native-vector-icons/Octicons'

export default function MypageBoard({ navigation }) {
    const [data, setData] = useState([
        {
            BoardName: '숙플레이스',
            content: '맛있는 음식~~~~~'
        },
        {
            BoardName: '숙박숙박',
            content: '어디서 살지~~~~~'
        },
        {
            BoardName: '숙련된 알바',
            content: '알바~~~~~'
        },
        {
            BoardName: '자취하숙',
            content: '자취자취~~~~~'
        },
        {
            BoardName: '넷플릭숙',
            content: '넷플릭스 얘기해요'
        },
    ])

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
            </TouchableOpacity>
            <Text style={styles.topText}>게시판 관리</Text>
            <ScrollView contentContainerStyle={{ paddingBottom: 10}}>
                {data.map((v, i) => <View key={i} style={styles.contentListContainer}>
                    <View style={styles.contentListColumn}>
                        <Text style={styles.boardName}>{v.BoardName}</Text>
                        <Text style={styles.content}>{v.content}</Text>
                    </View>
                    <TouchableOpacity style={styles.button}>
                    <Button title="삭제" color='#fff'></Button>
                    </TouchableOpacity>
                    </View>)}
            </ScrollView>
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
        marginRight: 20
    },
    boardName: {
        fontSize: 20,
        marginBottom: 5
    },
    content: {
        color: '#333',
        fontSize: 15
    },
    button: {
        backgroundColor: '#AD3E3E',
        width: 80,
        height: 35,
        borderRadius: 20,
        marginTop: 15,
        marginBottom: 20,
        alignSelf: 'center'
    }
})