import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import MypageMain from './MypageMain'

export default function MypageNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='MypageMain' component={MypageMain} />
    </Stack.Navigator>
}