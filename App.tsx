import { NavigationContainer, StackActions } from '@react-navigation/native'
import React from 'react'
import MainNavigator from './src/MainNavigator'
import AuthNavigator from './src/pages/auth/AuthNavigator'
import MypageNavigator from './src/pages/mypage/MypageNavigator'
import { RootProvider } from './src/RootProvider'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default () => <RootProvider>
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name ="AuthNavigator" component={AuthNavigator}  options={{ headerShown: false }}/>
            <Stack.Screen name ="MypageNavigator" component={MypageNavigator}  options={{ headerShown: false }}/>
        </Stack.Navigator>
        {/* <AuthNavigator/>
        <MypageNavigator/> */}
        {/* <MainNavigator /> */}
    </NavigationContainer>
</RootProvider>