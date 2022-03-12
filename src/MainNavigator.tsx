import React from 'react'
import AuthNavigator from './pages/auth/AuthNavigator'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useRootContext } from './RootProvider'
import { ParamListBase, RouteProp } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeNavigator from './pages/home/HomeNavigator'
import ChettingNavigator from './pages/chetting/ChettingNavigator'
import TimetableNavigator from './pages/timetable/TimetableNavigator'
import MypageNavigator from './pages/mypage/MypageNavigator'

export default function MainNavigator() {
    const context = useRootContext()
    const Tab = createBottomTabNavigator()
    const scOpt = ({ route }: { route: RouteProp<ParamListBase, string> }) => {
        return {
            headerShown: false,
            tabBarIcon: ({ focused, size }: { focused: boolean, size: number }) => {
                const { name } = route
                return <Icon name={foo[name] + (focused ? '' : '-outline')}
                    size={size + (focused ? 6 : 0)}
                    color={focused ? '#003087' : '#151515'} />
            },
            tabBarActiveTintColor: '#003087',
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
        }
    }
    // if (context.user.token == null || context.user.token == '')
    //     return <AuthNavigator/>
    return <Tab.Navigator screenOptions={scOpt}>
        <Tab.Screen name='HomeNavigator' component={HomeNavigator} />
        <Tab.Screen name='TimetableNavigator' component={TimetableNavigator} />
        <Tab.Screen name='ChettingNavigator' component={ChettingNavigator} />
        <Tab.Screen name='MypageNavigator' component={MypageNavigator} />
    </Tab.Navigator>
}

interface Foo {
    [key: string]: string;
}

let foo: Foo = {
    'HomeNavigator': 'home',
    'TimetableNavigator': 'calendar-text', //cards //widgets // gift // gamepad-circle //flash
    'ChettingNavigator': 'chat-processing', //bell-ring
    'MypageNavigator': 'account'
}