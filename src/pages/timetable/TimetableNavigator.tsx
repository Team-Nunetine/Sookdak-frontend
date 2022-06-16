import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AddSchedule from './AddSchedule'
import TimetableMain from './TimetableMain'

export default function TimetableNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
        <Stack.Screen name='TimetableMain' component={TimetableMain} />
        <Stack.Screen name='AddSchedule' component={AddSchedule} />
    </Stack.Navigator>
}