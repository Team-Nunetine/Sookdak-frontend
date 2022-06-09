import { createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react'
import ChettingMain from './ChettingMain'
import ChattingRoom from './ChattingRoom'
import ChattingStart from './ChattingStart'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Switch, Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRootContext } from '../../RootProvider'

export default function ChettingNavigator({route, navigation}) {
    const Drawer = createDrawerNavigator()
    return <Drawer.Navigator initialRouteName='ChattingStack' drawerContent={props => <CustomDrawerContent route={route} navigation={navigation}/>} screenOptions={{ headerShown: false, drawerType: 'front', drawerPosition: 'right' }}>
        <Drawer.Screen name='ChattingStack' component={ChattingStack}/>
    </Drawer.Navigator>
}

function ChattingStack() {
    const Stack = createStackNavigator()
    return <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='ChettingMain' component={ChettingMain} />
        <Stack.Screen name='ChattingRoom' component={ChattingRoom} />
        <Stack.Screen name='ChattingStart' component={ChattingStart} />
    </Stack.Navigator>
}

function CustomDrawerContent({route, navigation}) {
    const [alarm, setAlarm] = useState(true)
    const rootContext = useRootContext()
    const toggleAlarm = () => setAlarm(!alarm);
    return <DrawerContentScrollView>
        <TouchableOpacity style={styles.container} onPress={() => {navigation.navigate('ChettingMain')}}>
            <Text style={styles.text}>채팅방 나가기</Text>
        </TouchableOpacity>
        <View style={styles.container}>
            <Text style={styles.text}>채팅 알림</Text>
            <Switch
                trackColor={{ false: "#adadad", true: '#003087'}}
                thumbColor={alarm ? "#ffffff" : "#ffffff"}
                ios_backgroundColor="#bdbdbd"
                onValueChange={toggleAlarm}
                value={alarm}
                />
        </View>
    </DrawerContentScrollView>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    text: {
        fontSize: 16,
    }
});
