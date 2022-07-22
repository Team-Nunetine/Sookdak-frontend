import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Octicons from 'react-native-vector-icons/Octicons'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useRootContext } from '../../RootProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MypageWithdrawal({navigation}) {
    const rootContext = useRootContext();
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
            </TouchableOpacity>
            <Text style={styles.topText}>회원 탈퇴</Text>
            <View >
                <Text style={styles.title}>
                    회원님의 모든 정보가 삭제됩니다. 정말 탈퇴를 원하신다면 버튼을 눌러주세요.
                    </Text>
                <ButtonContainer>
                    <Button title='탈퇴' color={'white'} onPress={() => {
                         GoogleSignin.revokeAccess();
                         GoogleSignin.signOut();
                         console.log('user deleted');
                         rootContext.setUser({user: null})
                         //내부저장소(AsyncStorage)에서 유저 삭제 api 추가
                         AsyncStorage.clear
                    }}/>
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
        flex: 1,
        backgroundColor: 'white',
        marginTop: 25 
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        paddingTop: 50
    },
    backIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20
    },
    topText: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 20
    },
})