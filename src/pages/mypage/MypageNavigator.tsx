import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Text } from 'react-native-paper/lib/typescript/components/Avatar/Avatar'
import styled from 'styled-components'
import MypageMain from './MypageMain'
import MypageAuth from './MypageAuth'

export default function MypageNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator >
        <Stack.Screen name='MypageMain' component={MypageMain} options={{ headerShown: false }}/>
        <Stack.Screen name='MypageAuth' component={MypageAuth} options={{ headerShown: false}}/>
    </Stack.Navigator>
}