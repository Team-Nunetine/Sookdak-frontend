import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeMain from './HomeMain'

export default function HomeNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='HomeMain' component={HomeMain} />
    </Stack.Navigator>
}