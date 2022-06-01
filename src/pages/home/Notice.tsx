import React, { useCallback, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { useFocusEffect } from '@react-navigation/native'
import { useRootContext } from '../../RootProvider'

type RoomType = {
    "roomId": number,
    "recentContent": string,
    "recentDateTime": string
}

export default function Notice({ navigation, route }) {
    const [tab1Data, setTab1Data] = useState<RoomType[]>([])
    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
        { key: 'first', title: '쪽지' },
        { key: 'second', title: '댓글' },
    ])
    const rootContext = useRootContext()

    useFocusEffect(useCallback(() => {
        navigation.getParent().getParent().setOptions({ tabBarStyle: { display: 'none' } })
        navigation.getParent().setOptions({ swipeEnabled: false })
        rootContext.api.get('/api/message')
            .then((res) => setTab1Data(res.data.data.rooms))
            .catch((err) => console.log(err.response.data))
    }, []))

    const FirstRoute = () => <FlatList
        data={tab1Data}
        renderItem={({ item }) => <TouchableOpacity style={styles.touchableOpacity}
            onPress={() => navigation.navigate('MessageDetail', { roomId: item.roomId })}>
            <Text numberOfLines={3} style={styles.content}>{item.recentContent}</Text>
            <Text style={styles.time}>{item.recentDateTime}</Text>
        </TouchableOpacity>}
        keyExtractor={(item) => item.roomId.toString()}
        contentContainerStyle={{ marginHorizontal: '3%', paddingBottom: 20 }}
        refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={60}
        />}
        showsHorizontalScrollIndicator={false}
    />

    const SecondRoute = () => <Text style={{
        color: '#656565',
        textAlign: 'center',
        textAlignVertical: 'center',
        flex: 1
    }}>다음 업데이트를 기대해주세요!</Text>

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