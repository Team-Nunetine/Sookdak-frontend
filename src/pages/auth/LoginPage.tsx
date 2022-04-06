import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Image, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { useRootContext } from '../../RootProvider';
import axios from 'axios';

const LoginPage = ({ navigation }: { navigation: any }) => {

    const rootContext = useRootContext()

    const signIn = () => {
        // // GoogleSignin.signOut().catch()
        // GoogleSignin.configure({
        //     hostedDomain: 'sookmyung.ac.kr',
        //     // webClientId: '408906319254-olb8gjmn67sj345esi10eq6j778kqi6c.apps.googleusercontent.com',
        //     // iosClientId: '408906319254-olb8gjmn67sj345esi10eq6j778kqi6c.apps.googleusercontent.com',
        //     // offlineAccess: true,
        //     // forceCodeForRefreshToken: true,
        // });
        // GoogleSignin.signIn().then((res) => {
        //     console.log(res)
            axios.post('http://52.78.202.206:8080/api/user/login',
                {
                    email: 'yoonyesle@sookmyung.ac.kr'
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(function (res) {
                    // refreshToken = res.data.data.refreshToken;
                    rootContext.setUser({ token: res.data.data.accessToken, userName: '유저이름' })
                    console.log(res.data.data.accessToken)
                })
                .catch(function (error) {
                    console.log(error);
                });


        //     if (res.user.email.search('@sookmyung.ac.kr') == -1) {
        //         GoogleSignin.signOut()
        //         Alert.alert('숙명 메일로 로그인해주세요')
        //     }
        // }).catch((err) => console.log(err));
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            extraHeight={20}>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{ height: '20%', width: '35%', resizeMode: 'cover' }}
                    source={{ uri: "https://www.sookmyung.ac.kr/sites/sookmyungkr/images/sub/contents/ui_symbol_01.png" }} />
                <Text style={styles.TopText}>숙명인들을 위한 공간,
                    <Text style={styles.SideText}> 숙닥숙닥</Text>
                </Text>
                <GoogleSigninButton
                    style={{ width: 250, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn} />
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}



const styles = StyleSheet.create({
    TopText: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'JalnanOTF',
        paddingTop: 60,
        paddingBottom: 80,
    },
    SideText: {
        fontSize: 20,
        color: '#003087',
        fontWeight: 'bold',
        fontFamily: 'JalnanOTF',
        paddingBottom: 100,
    }
});
export default LoginPage;