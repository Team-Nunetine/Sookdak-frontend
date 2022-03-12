import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import TimetableMain from './TimetableMain'

export default function TimetableNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='TimetableMain' component={TimetableMain} />
    </Stack.Navigator>
}