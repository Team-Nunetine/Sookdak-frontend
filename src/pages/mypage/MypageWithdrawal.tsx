import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export default function MypageWithdrawal() {
    return(
        <SafeAreaView style={styles.container}>
            <View >
                <Text style={styles.title}>
                    회원님의 모든 정보가 삭제됩니다. 정말 탈퇴를 원하신다면 버튼을 눌러주세요.
                    </Text>
                <ButtonContainer>
                    <Button title='탈퇴' color={'white'} onPress={() => {}} />
                </ButtonContainer>
                </View>
        </SafeAreaView>
    );
};

const ButtonContainer = styled.TouchableOpacity`
    background-color: #003087;
    border-radius: 15px;
    padding: 11px 10px;
    margin: 90px 15px;
    justify-content: center;
`;

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    title: {
        fontSize: 21,
        textAlign: 'center',
        marginVertical: 10,
    }
})