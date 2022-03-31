import React from 'react';
import { StyleSheet, View, Button, Text, ScrollView, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import CameraRoll from '@react-native-community/cameraroll';

export default function MypageAuth() {
    
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>
                    안전한 커뮤니티 이용을 위해 숙명인 인증을 실시하고 있습니다. 헤이영 또는 포털에서 학사정보를 캡쳐해 등록해주세요. 인증은 최대 일주일이 걸릴 수 있으며 인증이 완료되기 전까지 커뮤니티 사용이 제한됩니다.
                </Text>
                <View>
                    <Button title="Load Images" onPress={() => {}}></Button>
                </View>
                <ButtonContainer>
                    <Button title='완료' color={'white'} onPress={() => {}}/>
                </ButtonContainer>
                </View>
        </SafeAreaView>
    );
};
// const getPhotos = () => {
//     try {
//         const {edges} = CameraRoll.getPhotos({
//             first: 10,
//         });
//         console.log('getPhoto Success', edges);
//     } catch (error) {
//         console.log('getPhoto Fail', error);
//     }
// }

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
        marginHorizontal: 20,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 14,
    }
})