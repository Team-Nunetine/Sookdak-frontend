import React from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MypageMywriting() {
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Text>내가 쓴 글</Text>
        </SafeAreaView>
    );
};