import { useFocusEffect } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist'
import Octicons from 'react-native-vector-icons/Octicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useHomeContext } from './HomeProvider'

type ItemType = {
    boardName: string,
    id: string
}

export default function FavoritesEdit({ navigation }) {
    useFocusEffect(() => {
        navigation.getParent().getParent().setOptions({ tabBarStyle: { display: 'none' } })
        navigation.getParent().setOptions({ swipeEnabled: false })
        return () => {
            navigation.getParent().getParent().setOptions({ tabBarStyle: { display: 'flex' } })
            navigation.getParent().setOptions({ swipeEnabled: true })
        }
    })
    const homeContext = useHomeContext()

    const renderItem = ({ item, drag, isActive }: RenderItemParams<ItemType>) => <ScaleDecorator>
        <View style={styles.row}>
            <TouchableOpacity disabled={isActive}
                onLongPress={drag} style={styles.touchableOpacity}>
                <Icon name='unfold-more-horizontal' size={14} color='#151515' />
                <Text style={styles.boardName}>{item.boardName}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name='minus' size={18} color='#EC454C' style={styles.minusIcon} />
            </TouchableOpacity>
        </View>
    </ScaleDecorator>

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
        </TouchableOpacity>
        <Text style={styles.topText}>즐겨찾기 편집</Text>
        <DraggableFlatList
            data={homeContext.boards}
            renderItem={renderItem}
            onDragEnd={({ data }) => homeContext.setBoards(data)}
            keyExtractor={(item) => item.id} />
        <TouchableOpacity style={styles.bottomButton}
            onPress={() => navigation.navigate('BoardSearch')}>
            <Text style={styles.buttonText}>게시판 검색</Text>
        </TouchableOpacity>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    topText: {
        fontSize: 16,
        color: '#003087',
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 20
    },
    backIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20
    },
    row: {
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    touchableOpacity: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingLeft: 25,
        flex: 1
    },
    boardName: {
        color: '#151515',
        fontSize: 14,
        marginLeft: 15
    },
    minusIcon: {
        paddingVertical: 15,
        paddingHorizontal: 25
    },
    bottomButton: {
        backgroundColor: '#003087',
        borderRadius: 10,
        margin: 25
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        paddingVertical: 8,
        alignSelf: 'center'
    }
})