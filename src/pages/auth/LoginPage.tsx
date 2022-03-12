import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native'

export default function LoginPage() {
    return <SafeAreaView>
        <ScrollView>
            <Text>서비스명</Text>
            <TextInput />
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    }
})