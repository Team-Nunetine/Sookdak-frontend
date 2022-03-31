import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { pink100 } from 'react-native-paper/lib/typescript/styles/colors';

export default function MypageMywriting({navigation}: {navigation:any}) {
    const [data, setDate] = useState([
        {
            contentList: [
                {
                    content: '게시글 내용1',
                    likeCount: 12,
                    commentCount: 5,
                    image: true,
                    time: '03/10 16:25'
                },
                {
                    content: '게시글 내용2',
                    likeCount: 12,
                    commentCount: 5,
                    image: false,
                    time: '03/10 16:25'
                },
                {
                    content: '게시글 내용3',
                    likeCount: 12,
                    commentCount: 5,
                    image: true,
                    time: '03/10 16:25'
                },
                {
                    content: '게시글 내용4',
                    likeCount: 12,
                    commentCount: 5,
                    image: true,
                    time: '03/10 16:25'
                }
            ]
        },
    ])
    const navi = useNavigation<any>();
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView contentContainerStyle={{ paddingBottom: 10}}>
                {data.map((v, i) => <View key={i} style={styles.contentListContainer}>
                    {v.contentList.map((content, j) => <TouchableOpacity style={styles.contentView} key={j}>
                        <Text>{content.time}</Text>
                        <Text style={styles.content}>{content.content}</Text>
                        <View style={styles.countView}>
                            <Icon name='thumb-up-outline' size={13} color='#AD3E3E' />
                            <Text style={[styles.count, { color: '#AD3E3E' }]}>{content.likeCount}</Text>
                            <Icon name='comment-processing-outline' size={13} color='#003087' />
                            <Text style={[styles.count, { color: '#003087' }]}>{content.commentCount}</Text>
                            {content.image ?
                                <Icon name='image-outline' size={13} color='#333' />
                                : undefined}
                        </View>
                    </TouchableOpacity>)}
                </View>)}

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contentListContainer: {
        marginTop: 20,
        marginHorizontal: 10,
    },
    contentView: {
        paddingBottom: 40,
        paddingHorizontal: 15
    },
    countView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7
    },
    content: {
        color: '#333',
        fontSize: 17
    },
    count: {
        fontSize: 15,
        marginLeft: 2,
        marginRight: 7,
        color: '#333'
    },
})