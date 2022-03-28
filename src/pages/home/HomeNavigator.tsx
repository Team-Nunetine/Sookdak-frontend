import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import HomeMain from './HomeMain'
import { HomeProvider, useHomeContext } from './HomeProvider'
import PostDetail from './PostDetail'
import PostList from './PostList'

export default function HomeNavigator() {
    const Drawer = createDrawerNavigator()
    return <HomeProvider>
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name='HomeMain' component={HomeMain} />
            <Drawer.Screen name='PostStack' component={PostStack} />
        </Drawer.Navigator>
    </HomeProvider>
}

function PostStack() {
    const Stack = createStackNavigator()
    return <Stack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: false }}>
        <Stack.Screen name='PostList' component={PostList}
            initialParams={{ boardName: 'route?.params.boardName' }} />
        <Stack.Screen name='PostDetail' component={PostDetail} />
    </Stack.Navigator>
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { boards, currentBoard, setCurrentBoard } = useHomeContext()
    return (
        <DrawerContentScrollView {...props}>
            <Text style={styles.title}>즐겨찾는 게시판</Text>
            {boards.map((v, i) => <DrawerItem label={v} key={i}
                focused={currentBoard == i}
                activeTintColor='#003087'
                onPress={() => {
                    setCurrentBoard(i)
                    props.navigation.navigate('PostStack', {
                        screen: 'PostList',
                        params: { boardName: v }
                    })
                }} />
            )}
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({ // CustomDrawerContent에서만 사용
    title: {
        fontSize: 14,
        color: '#003087',
        margin: 15,
        fontWeight: 'bold',
        marginBottom: 28
    }
})