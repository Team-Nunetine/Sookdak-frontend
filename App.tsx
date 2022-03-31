import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import MainNavigator from './src/MainNavigator'
import { RootProvider } from './src/RootProvider'

export default () => <RootProvider>
    <NavigationContainer>
        <MainNavigator />
    </NavigationContainer>
</RootProvider>