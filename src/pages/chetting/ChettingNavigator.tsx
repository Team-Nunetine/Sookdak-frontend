import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ChettingMain from './ChettingMain'

export default function ChettingNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='ChettingMain' component={ChettingMain} />
    </Stack.Navigator>
}