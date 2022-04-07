import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ChettingMain from './ChettingMain'
import ChattingRoom from './ChattingRoom'

export default function ChettingNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='ChettingMain' component={ChettingMain} />
        <Stack.Screen name='ChattingRoom' component={ChattingRoom} />
    </Stack.Navigator>
}