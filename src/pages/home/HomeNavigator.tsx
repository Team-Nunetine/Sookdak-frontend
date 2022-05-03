import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import BoardCreation from './BoardCreation'
import BoardPreview from './BoardPreview'
import BoardSearch from './BoardSearch'
import FavoritesEdit from './FavoritesEdit'
import HomeMain from './HomeMain'
import { HomeProvider, useHomeContext } from './HomeProvider'
import MessageDetail from './MessageDetail'
import MessageSend from './MessageSend'
import Notice from './Notice'
import PostDetail from './PostDetail'
import PostList from './PostList'
import PostSearch from './PostSearch'
import PostUpload from './PostUpload'

export default function HomeNavigator() {
    const Drawer = createDrawerNavigator()
    return <HomeProvider>
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            drawerContent={props => <CustomDrawerContent {...props} />}>
            {/* <Drawer.Screen name='HomeMain' component={HomeMain} /> */}
            {/* HomeMain을 PostStack에 넣으면 HomeMain에서 PostDetail로 바로 갈 때 생기는 문제
            (PostDetail에서 뒤로가기하면 PostList 뜨는 문제) 해결됨 */}
            <Drawer.Screen name='PostStack' component={PostStack} />
            <Drawer.Screen name='FavoritesStack' component={FavoritesStack} />
            <Drawer.Screen name='NoticeStack' component={NoticeStack} />
        </Drawer.Navigator>
    </HomeProvider>
}

function PostStack() {
    const Stack = createStackNavigator()
    return <Stack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: false }}>
        <Stack.Screen name='HomeMain' component={HomeMain} />
        <Stack.Screen name='PostList' component={PostList}
            initialParams={{ boardName: 'route?.params.boardName' }} />
        <Stack.Screen name='PostDetail' component={PostDetail} />
        <Stack.Screen name='PostUpload' component={PostUpload} />
        <Stack.Screen name='PostSearch' component={PostSearch} />
    </Stack.Navigator>
}

function FavoritesStack() {
    const Stack = createStackNavigator()
    return <Stack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: false }}>
        <Stack.Screen name='FavoritesEdit' component={FavoritesEdit} />
        <Stack.Screen name='BoardSearch' component={BoardSearch} />
        <Stack.Screen name='BoardCreation' component={BoardCreation} />
        <Stack.Screen name='BoardPreview' component={BoardPreview} />
        <Stack.Screen name='PostDetailInFavoritesStack' component={PostDetail} />
    </Stack.Navigator>
}

function NoticeStack() {
    const Stack = createStackNavigator()
    return <Stack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: false }}>
        <Stack.Screen name='Notice' component={Notice} />
        <Stack.Screen name='MessageDetail' component={MessageDetail} />
        <Stack.Screen name='MessageSend' component={MessageSend} />
    </Stack.Navigator>
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { boards, currentBoard, setCurrentBoard } = useHomeContext()
    return <DrawerContentScrollView {...props}>
        <View style={styles.topView}>
            <Text style={styles.title}>즐겨찾는 게시판</Text>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('FavoritesStack', { screen: 'FavoritesEdit' })
            }}>
                <Text style={styles.edit}>
                    <Feather name='edit' size={12} /> 편집
                </Text>
            </TouchableOpacity>
        </View>
        {boards.map((v, i) => <DrawerItem label={v.boardName} key={i}
            focused={currentBoard == i}
            activeTintColor='#003087'
            onPress={() => {
                setCurrentBoard(i)
                props.navigation.navigate('PostStack', {
                    screen: 'PostList',
                    params: { boardName: v.boardName }
                })
            }} />
        )}
    </DrawerContentScrollView>
}

const styles = StyleSheet.create({ // CustomDrawerContent에서만 사용
    topView: {
        marginBottom: 13,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    title: {
        fontSize: 14,
        color: '#003087',
        fontWeight: 'bold',
        paddingVertical: 15,
        paddingLeft: 15
    },
    edit: {
        fontSize: 12,
        paddingVertical: 15,
        paddingHorizontal: 30
    }
})