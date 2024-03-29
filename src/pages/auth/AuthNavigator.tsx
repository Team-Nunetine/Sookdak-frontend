import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginPage from './LoginPage'

export default function AuthNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='LoginPage' component={LoginPage} />
    </Stack.Navigator>
}