import React, { useCallback, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { useFocusEffect } from '@react-navigation/native'

export default function Notice({ navigation, route }) {
    
    useFocusEffect(() => {
        navigation.getParent().getParent().setOptions({ tabBarStyle: { display: 'none' } })
        navigation.getParent().setOptions({ swipeEnabled: false })
    })
    
    const [tab1Data, setTab1Data] = useState([
        {
            id: '0',
            content: '댓글 내용\n최대 3줄까지\n보여지기\n...',
            time: '2022/04/28 15:31'
        },
        {
            id: '1',
            content: '댓글 내용\n최대 3줄까지\n보여지기\n...',
            time: '2022/04/28 15:31'
        },
        {
            id: '2',
            content: '댓글 내용\n최대 3줄까지\n보여지기\n...',
            time: '2022/04/28 15:31'
        },
        {
            id: '3',
            content: '댓글 내용\n최대 3줄까지\n보여지기\n...',
            time: '2022/04/28 15:31'
        },
        {
            id: '4',
            content: '댓글 내용\n최대 3줄까지\n보여지기\n...',
            time: '2022/04/28 15:31'
        },
        {
            id: '5',
            content: '댓글 내용\n최대 3줄까지\n보여지기\n...',
            time: '2022/04/28 15:31'
        },
        {
            id: '6',
            content: '댓글 내용\n최대 3줄까지\n보여지기\n...',
            time: '2022/04/28 15:31'
        },
        {
            id: '7',
            content: '댓글 내용\n최대 3줄까지\n보여지기\n...',
            time: '2022/04/28 15:31'
        }
    ])
    const [tab2Data, setTab2Data] = useState([
        {
            id: '0',
            content: '쪽지 내용\n최대 3줄까지\n보여지기\n...',
            time: '2022/04/28 15:31'
        },
        {
            id: '1',
            content: '쪽지 내용\n최대 3줄까지\n보여지기\n...',
            time: '2022/04/28 15:31'
        }
    ])

    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
        { key: 'first', title: '댓글' },
        { key: 'second', title: '쪽지' },
    ])

    const FirstRoute = () => <FlatList
        data={tab1Data}
        renderItem={({ item }) => <TouchableOpacity style={styles.touchableOpacity}
            onPress={() => navigation.navigate('PostDetail', { boardName: item.id })}>
            <Text numberOfLines={3} style={styles.content}>{item.content}</Text>
            <Text style={styles.time}>{item.time}</Text>
        </TouchableOpacity>}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginHorizontal: '3%', paddingBottom: 20 }}
        refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={60}
        />}
    />

    const SecondRoute = () => <FlatList
        data={tab2Data}
        renderItem={({ item }) => <TouchableOpacity style={styles.touchableOpacity}
            onPress={() => navigation.navigate('MessageDetail', { id: item.id })}>
            <Text numberOfLines={3} style={styles.content}>{item.content}</Text>
            <Text style={styles.time}>{item.time}</Text>
        </TouchableOpacity>}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginHorizontal: '3%', paddingBottom: 20 }}
        refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={60}
        />}
    />

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    })

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
    }, []);

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
        </TouchableOpacity>
        <Text style={styles.topText}>알림</Text>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            // initialLayout={{ width: layout.width }}
            renderTabBar={props => <TabBar {...props}
                indicatorStyle={{ backgroundColor: '#003087' }}
                style={{ backgroundColor: '#fff' }}
                activeColor='#003087'
                inactiveColor='#aaa' />}
        />
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
    touchableOpacity: {
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10
    },
    content: {
        color: '#151515',
        fontSize: 13
    },
    time: {
        color: '#AFAFAF',
        fontSize: 10,
        textAlign: 'right'
    },
})