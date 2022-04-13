import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Text } from 'react-native-paper/lib/typescript/components/Avatar/Avatar'
import styled from 'styled-components'
import MypageMain from './MypageMain'
import MypageAuth from './MypageAuth'
import MypageLogout from './MypageLogout'
import MypageWithdrawal from './MypageWithdrawal'
import MypageMywriting from './MypageMywriting'
import MypageMycmt from './MypageMycmt'
import MypageAlarm from './MypageAlarm'
import MypageScrap from './MypageScrap'
import MypageBoard from './MypageBoard'

export default function MypageNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator >
        <Stack.Screen name='마이페이지' component={MypageMain} options={{ headerShown: false }}/>
        <Stack.Screen name='MypageLogout' component={MypageLogout} options={{ headerShown: false}}/>
        <Stack.Screen name='MypageWithdrawal' component={MypageWithdrawal} options={{ headerShown: false}}/>
        <Stack.Screen name='MypageAuth' component={MypageAuth} options={{ headerShown: false}}/>
        <Stack.Screen name='MypageMywriting' component={MypageMywriting} options={{ headerShown: false }}/>
        <Stack.Screen name='MypageMycmt' component={MypageMycmt} options={{ headerShown: false }}/>
        <Stack.Screen name='MypageAlarm' component={MypageAlarm} options={{ headerShown: false }}/>
        <Stack.Screen name='MypageScrap' component={MypageScrap} options={{ headerShown: false }}/>
        <Stack.Screen name='MypageBoard' component={MypageBoard} options={{ headerShown: false }}/>
    </Stack.Navigator>
}