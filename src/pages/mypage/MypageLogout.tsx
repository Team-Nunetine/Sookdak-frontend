import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Octicons from 'react-native-vector-icons/Octicons'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function MypageLogout({navigation}) {
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
            </TouchableOpacity>
            <Text style={styles.topText}>로그아웃</Text>
            <View >
                <Text style={styles.title}>
                    정말 로그아웃하시겠습니까?
                    </Text>
                <ButtonContainer>
                    <Button 
                     title='로그아웃' 
                     color={'white'} 
                     onPress={() => {
                        GoogleSignin.revokeAccess();
                        GoogleSignin.signOut();
                        console.log('user deleted');}} />
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
        backgroundColor: 'white'
    },
    title: {
        fontSize: 21,
        textAlign: 'center',
        marginVertical: 20,
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
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 20
    },
})