import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function PostSearch({ route, navigation }) {
    const [result, setResult] = useState<any>([])
    
    useFocusEffect(() => {
        navigation.getParent().setOptions({ swipeEnabled: false })
        return () => {
            navigation.getParent().setOptions({ swipeEnabled: true })
        }
    })

    const renderItem = ({ item }) => <TouchableOpacity style={styles.contentView}
        onPress={() => {
            navigation.navigate('PostDetail', { boardName: route.params.boardName })
        }}>
        <Text style={styles.content} numberOfLines={3}>{item.content}</Text>
        <View style={styles.bottomView}>
            <View style={styles.countView}>
                <Ionicons name='heart-outline' size={12} color='#AD3E3E' />
                <Text style={[styles.count, { color: '#AD3E3E' }]}>{item.likeCount}</Text>
                <Ionicons name='chatbox-ellipses-outline' size={12} color='#003087' />
                <Text style={[styles.count, { color: '#003087' }]}>{item.commentCount}</Text>
                {item.image ?
                    <Feather name='paperclip' size={10} color='#333' />
                    : undefined}
            </View>
            <Text style={styles.time}>{item.time}</Text>
        </View>
    </TouchableOpacity>

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Ionicons name='chevron-back' size={25} color='#555' />
        </TouchableOpacity>
        <Text style={styles.topText}>{route.params.boardName}</Text>
        <View style={styles.textInputRow}>
            <TextInput style={styles.textInput} onEndEditing={() => onPressSearch(setResult)} />
            <TouchableOpacity onPress={() => onPressSearch(setResult)}>
                <Ionicons name='search' size={25} color='#555' />
            </TouchableOpacity>
        </View>
        <FlatList
            data={result}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 20 }}
        />
    </SafeAreaView>
}

function onPressSearch(setResult) {
    setResult([{
        id: '1',
        content: '게시글 내용1\n최대\n3줄까지\n보여지기',
        likeCount: 10,
        commentCount: 2,
        image: true,
        time: '01/01 14:00',
    }])
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
    contentView: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fafafa',
        borderRadius: 10,
    },
    content: {
        color: '#333',
        fontSize: 13
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        alignItems: 'center'
    },
    countView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    count: {
        fontSize: 10,
        marginLeft: 3,
        marginRight: 8,
        color: '#333'
    },
    time: {
        fontSize: 10,
        color: '#aaa'
    }
})