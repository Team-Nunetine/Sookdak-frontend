import React, {useState} from 'react'
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function MypageMain({navigation}: {navigation: any}) {
    const[data, setData] = useState([
        {
            title: '계정',
            contentList: [
                {
                    content: '로그아웃'
                },
                {
                    content: '회원 탈퇴'
                },
                {
                    content: '숙명인 인증',
                }
            ]
        },
        {
            title: '커뮤니티',
            contentList: [
                {
                    content: "내가 쓴 글"
                },
                {
                    content: "내가 쓴 댓글"
                }
            ]
        },
        {
            title: '설정',
            contentList: [
                {
                    content: '다크모드'
                },
                {
                    content: '알림 설정'
                }
            ]
        },
    ]);

    const navi = useNavigation<any>()

    return (
    <SafeAreaView style={{ flex: 1, marginLeft: 20, marginTop: 100}}>
        <View style={styles.titleView}>
            <Text style={styles.UserText}>누네띠네님</Text>
        </View>
        {data.map((v, i) => <View key={i} style={styles.contentListContainer}>
            <Text style={styles.title}>{v.title}</Text>
            {v.contentList.map((content, j) => <TouchableOpacity style={styles.contentList}
                     key = {j}
                     onPress={() => {
                        console.log(j);
                        //  navi.navigate('MypageAuth', {
                        //      screen: 'MypageAuth',
                        //      params: { boardName: v.contentList}
                        //  })
                     }}>
                        <Text style={styles.content}>{content.content}
                            <Icon name='chevron-right' size={23} color='#003087' />
                            </Text>
                     </TouchableOpacity>)}
        </View>)}
        
    </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    UserText: {
        fontSize: 35
    },
    title: {
        color: '#003087',
        fontSize: 20,
        paddingBottom: 20
    },
    titleView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    },
    contentListContainer: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    contentList: {
        paddingBottom: 30,
        paddingHorizontal: 20
    },
    content: {
        fontSize: 20,
    }
});