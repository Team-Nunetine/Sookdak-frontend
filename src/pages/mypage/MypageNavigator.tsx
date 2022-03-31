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

export default function MypageNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator >
        <Stack.Screen name='마이페이지' component={MypageMain} options={{ headerShown: false }}/>
        <Stack.Screen name='MypageLogout' component={MypageLogout} options={{ headerShown: false}}/>
        <Stack.Screen name='MypageWithdrawal' component={MypageWithdrawal} options={{title: '회원 탈퇴'}}/>
        <Stack.Screen name='MypageAuth' component={MypageAuth} options={{title: '숙명인 인증'}}/>
        <Stack.Screen name='MypageMywriting' component={MypageMywriting} options={{title: '내가 쓴 글'}}/>
        <Stack.Screen name='MypageMycmt' component={MypageMycmt} options={{title: '내가 쓴 댓글'}}/>
        <Stack.Screen name='MypageAlarm' component={MypageAlarm} options={{title: '푸시 알림 설정'}}/>
    </Stack.Navigator>
}