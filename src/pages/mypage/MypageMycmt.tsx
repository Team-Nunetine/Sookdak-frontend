import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons'
import { useRootContext } from '../../RootProvider';
import { FlatList } from 'react-native-gesture-handler';

type DataType = {
    postId: number,
    content: string,
    createdAt: string,
    likes: number,
    comments: number,
    image: boolean
}
export default function MypageMycmt({navigation}) {

    const rootContext = useRootContext()
    const [pageIndex, setPageIndex] = useState(0)
    const [data, setData] = useState<DataType[]>([])
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
    }, []);

    useEffect(useCallback(() => {
        rootContext.api.get('http://3.36.250.198:8080/api/user/mycomment/' + 0).then((res) => {
            setData(res.data.data.posts)
            setPageIndex(1)
        }).catch((err) => {
            console.log(err.response.data)
        })
    }, []), [])

    const renderItem = ({ item }: {item : DataType }) =>  <ScrollView>
    <View key={item.postId} style={styles.contentListContainer}>
        <View style={styles.textInputRow}>
            <TouchableOpacity style={styles.contentView} onPress={() => {navigation.navigate('PostDetail', { postId: item.postId })}}>
            <Text style={styles.time}>{item.createdAt}</Text>
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.countView}>
                <Icon name='thumb-up-outline' size={13} color='#AD3E3E' />
                <Text style={[styles.count, { color: '#AD3E3E' }]}>{item.likes}</Text>
                <Icon name='comment-processing-outline' size={13} color='#003087' />
                <Text style={[styles.count, { color: '#003087' }]}>{item.comments}</Text>
                {item.image ?
                    <Icon name='image-outline' size={13} color='#333' />
                    : undefined}
            </View>
        </TouchableOpacity>
        </View>
    </View>

</ScrollView>
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
            </TouchableOpacity>
            <Text style={styles.topText}>내가 쓴 댓글</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.postId.toString()}
                refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressViewOffset={40}/>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contentListContainer: {
        marginTop: 10,
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
        fontSize: 13,
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
