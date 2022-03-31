import { useFocusEffect } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import { useHomeContext } from './HomeProvider'

export default function FavoritesEdit({ navigation }) {
    useFocusEffect(() => {
        navigation.getParent().getParent().setOptions({ tabBarStyle: { display: 'none' } })
        navigation.getParent().setOptions({ swipeEnabled: false })
        return () => {
            navigation.getParent().getParent().setOptions({ tabBarStyle: { display: 'flex' } })
            navigation.getParent().setOptions({ swipeEnabled: true })
        }
    })
    const homeContext = useHomeContext()
    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
        </TouchableOpacity>
        <Text style={styles.topText}>즐겨찾기 편집</Text>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    topText: {
        fontSize: 16,
        color: '#003087',
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 20
    },
    backIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20
    },
})