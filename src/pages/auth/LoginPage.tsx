import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Image, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import { useRootContext } from '../../RootProvider';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({navigation}: {navigation: any}) => {

    useEffect(() => {
        GoogleSignin.configure({
            hostedDomain: 'sookmyung.ac.kr',
            webClientId: '408906319254-4j4iba8hflj7c5otv9d9rlqmqms2e6v2.apps.googleusercontent.com',
            iosClientId: '408906319254-olb8gjmn67sj345esi10eq6j778kqi6c.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
    }, [])
    const rootContext = useRootContext();


    let accessToken;
    let refreshToken;

    const signIn = () => {
        GoogleSignin.signIn().then((googleRes) => {
            axios.post('http://3.36.250.198:8080/api/users/login', {
                email: googleRes.user.email
            })
            .then(function (res) {
                accessToken = res.data.data.accessToken;
                console.log(accessToken)
                refreshToken = res.data.data.refreshToken;
                rootContext.setUser({token: res.data.data.accessToken, username: googleRes.user.name});
                AsyncStorage.setItem('accessToken', res.data.data.accessToken)
                AsyncStorage.setItem('refreshToken', res.data.data.refreshToken)
            })
            .catch(function(error) {
                console.log(error);
            });
    })
    }

    useEffect(useCallback(() => {
        rootContext.api.get('http://3.36.250.198:8080/api/users/me').then((res) => {
            console.log(res.data.data.email)
        }).catch((err) => console.log(err.response.data))
    }, []), [])

    return(
        <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1}}
        extraHeight={20}>
            <SafeAreaView style = {{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            <Image 
             style={{height:'20%', width:'35%', resizeMode: 'cover'}}
             source={{uri:"https://www.sookmyung.ac.kr/sites/sookmyungkr/images/sub/contents/ui_symbol_01.png"}}/>
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