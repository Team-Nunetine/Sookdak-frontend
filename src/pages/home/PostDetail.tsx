import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'

export default function PostDetail() {
    const navi = useNavigation<any>()
    return <SafeAreaView style={{ flex: 1 }}>
        <Text>PostDetail</Text>
    </SafeAreaView>
}