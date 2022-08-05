import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Octicons from 'react-native-vector-icons/Octicons';
import { launchImageLibrary } from 'react-native-image-picker';

export default function MypageAuth({navigation}) {
    const [photo, setPhoto] = useState<any[]>([]);
    
    const handleChoosePhoto = () => {
        launchImageLibrary({ selectionLimit: 1, mediaType: 'photo' }, (response) => {
            if(response.assets) {
                setPhoto(response.assets)
            }
        })
    }

    const authCheck = () => {
        if(photo.length == 0) 
            return Alert.alert('인증', '사진을 업로드 해주세요.')
        return navigation.goBack()
    }

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
            </TouchableOpacity>
            <Text style={styles.topText}>숙명인 인증</Text>
            <View>
                <Text style={styles.title}>
                    안전한 커뮤니티 이용을 위해 숙명인 인증을 실시하고 있습니다. 헤이영 또는 포털에서 학사정보를 캡쳐해 등록해주세요. 인증은 최대 일주일이 걸릴 수 있으며 인증이 완료되기 전까지 커뮤니티 사용이 제한됩니다.
                </Text>
                <ScrollView horizontal={true}
                 showsHorizontalScrollIndicator={false}
                 contentContainerStyle={{
                    marginLeft: 70,
                    marginVertical: 15,
                 }}>
                    {photo.map((v, i) => <Image key={i} 
                        source={{ uri: v.uri }}
                        style={{ width: 250, height: 300 }}/>)}
                </ScrollView>
                <Button title="Load Images" onPress={handleChoosePhoto}/>
                <ButtonContainer>
                    <Button title='완료' color={'white'} onPress={authCheck}/>
                </ButtonContainer>
                </View>
        </SafeAreaView>
    );
};

const ButtonContainer = styled.TouchableOpacity`
    background-color: #003087;
    border-radius: 15px;
    padding: 11px 10px;
    margin: 20px 15px;
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
        marginVertical: 14,
        marginHorizontal: 25
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