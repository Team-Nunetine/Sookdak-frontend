import React, {useState} from 'react'
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRootContext } from '../../RootProvider';

export default function MypageMain({navigation}: {navigation: any}) {
    const[data, setData] = useState([
        {
            title: '계정',
            contentList: [
                {
                    content: '로그아웃',
                    screen: 'MypageLogout'
                },
                {
                    content: '회원 탈퇴',
                    screen: 'MypageWithdrawal'
                },
                {
                    content: '숙명인 인증',
                    screen: 'MypageAuth'
                }
            ]
        },
        {
            title: '커뮤니티',
            contentList: [
                {
                    content: "내가 쓴 글",
                    screen: 'MypageMywriting'
                },
                {
                    content: "내가 쓴 댓글",
                    screen: 'MypageMycmt'
                },
                {
                    content: "스크랩",
                    screen: 'MypageScrap'
                },
                {
                    content: "게시판 관리",
                    screen: 'MypageBoard'
                }
            ]
        },
        {
            title: '설정',
            contentList: [
                {
                    content: '푸시 알림 설정',
                    screen: 'MypageAlarm'
                }
            ]
        },
    ]);

    const navi = useNavigation<any>()
    const rootContext = useRootContext();

    return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
        <View style={styles.titleView}>
            <Text style={styles.UserText}>{rootContext.user.username}님</Text>
            </View>
        {data.map((v, i) => <View key={i} style={styles.contentListContainer}>
            <Text style={styles.title}>{v.title}</Text>
            {v.contentList.map((content, j) => <TouchableOpacity style={styles.contentList}
                     key = {j}
                     onPress={() => {
                        console.log(content.content);
                         navi.navigate(content.screen)
                     }}>
                        <Text style={styles.content}>{content.content}</Text>
                        <Icon name='chevron-right' size={23} color='#003087' />
                     </TouchableOpacity>)}
        </View>)}
        
    </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    UserText: {
        fontSize: 25,
    },
    title: {
        color: '#003087',
        fontSize: 20,
        fontFamily: 'JalnanOTF',
        paddingBottom: 20,
        fontWeight: 'bold',
    },
    titleView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginTop: 50,
        marginLeft: 20,
    },
    contentListContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        marginLeft: 40
    },
    contentList: {
        paddingBottom: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        fontSize: 18,
    }
});