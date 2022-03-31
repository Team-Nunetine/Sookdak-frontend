import React from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MypageMycmt() {
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Text>내가 쓴 댓글</Text>
        </SafeAreaView>
    );
};