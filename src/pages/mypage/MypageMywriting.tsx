import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

export default function MypageMywriting({route, navigation}) {
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
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
            </TouchableOpacity>
            <Text style={styles.topText}>내가 쓴 글</Text>
            <ScrollView contentContainerStyle={{ paddingBottom: 10}}>
                {data.map((v, i) => <View key={i} style={styles.contentListContainer}>
                    {v.contentList.map((content, j) => <View style={styles.textInputRow}>
                        <TouchableOpacity style={styles.contentView} key={j} onPress={() => {}}>
                        <Text style={styles.time}>{content.time}</Text>
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
                    </TouchableOpacity>
                    </View>)}
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
    topText: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 20
    },
    contentView: {
        paddingBottom: 15,
        paddingHorizontal: 15
    },
    countView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7
    },
    backIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20
    },
    content: {
        color: '#333',
        fontSize: 13
    },
    count: {
        fontSize: 15,
        marginLeft: 2,
        marginRight: 7,
        color: '#333'
    },
    time: {
        fontSize: 10,
        color: '#aaa',
        textAlign: 'right',
        marginTop: 5
    },
    textInputRow: {
        backgroundColor: '#f5f5f5',
        marginHorizontal: 15,
        borderRadius: 15,
        marginTop: 'auto',
        marginBottom: 15
    },
})