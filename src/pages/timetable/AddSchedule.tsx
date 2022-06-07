import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRootContext } from '../../RootProvider'
import { useCallback } from 'react'

type LectureType = {
    lectureId: number,
    name: string,
    professor: string,
    classNum: string,
    datetime: string,
    place: string,
    type: string,
    credit: number,
    studentNum: number,
    info: string
}

export default function AddSchedule({ navigation }) {
    const [value, setValue] = useState('')
    const [result, setResult] = useState<LectureType[]>([])
    const rootContext = useRootContext()
    const [modalVisible, setModalVisible] = useState(false)
    const [selected, setSelected] = useState<LectureType | null>(null)
    const [pageIndex, setPageIndex] = useState(0)

    const onEndEditing = () => {
        rootContext.api.post('/api/lecture/search/0', {
            word: value
        })
            .then((res) => {
                setResult(res.data.data.lectures)
                setPageIndex(1)
            })
            .catch((err) => console.log(err.response.data))
    }

    const onEndReached = () => {
        rootContext.api.post('/api/lecture/search/' + pageIndex, {
            word: value
        })
            .then((res) => {
                console.log('called')
                setResult((prev) => {
                    let next = [...prev]
                    next.push(...res.data.data.lectures)
                    return next
                })
                if (result.length > 0)
                    setPageIndex((prev) => prev + 1)
            })
            .catch((err) => console.log(err.response.data))
    }

    const onPressLecture = (item) => {
        setModalVisible(true)
        setSelected(item)
    }

    const onPressAdd = () => {
        rootContext.api.post('/api/lecture/' + selected?.lectureId)
            .then((res) => {
                Alert.alert(res.data.success ? '알림' : '오류', res.data.message)
                if (res.data.success)
                    setModalVisible(false)
            })
            .catch((err) => Alert.alert('오류', err.response.data.message))
    }

    const renderItem = ({ item }: { item: LectureType }) => <TouchableOpacity
        style={styles.row} onPress={() => onPressLecture(item)}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.info2}>{item.classNum}   |   {item.professor}</Text>
        {item.datetime || item.place ?
            <Text style={styles.info3}>{item.datetime} {item.place ? '(' + item.place + ')' : ''}</Text> : undefined}
    </TouchableOpacity>

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
        </TouchableOpacity>
        <Text style={styles.topText}>일정 추가</Text>
        <View style={styles.searchView}>
            <TextInput style={styles.textInput}
                onEndEditing={onEndEditing}
                value={value} onChangeText={setValue} />
            <Icon name='magnify' size={20} color='#151515' />
        </View>
        <FlatList
            data={result}
            renderItem={renderItem}
            keyExtractor={(item) => item.lectureId.toString()}
            contentContainerStyle={{ paddingHorizontal: 30 }}
            onEndReached={onEndReached} />
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <Text style={styles.name}>{selected?.name}</Text>
                    <Text style={styles.info2}>{selected?.classNum}   |   {selected?.professor}</Text>
                    {selected?.datetime || selected?.place ?
                        <Text style={styles.info3}>{selected?.datetime} {selected?.place ? '(' + selected?.place + ')' : ''}</Text> : undefined}
                    <View style={modalStyles.bottomView}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={modalStyles.cancel}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={modalStyles.button} onPress={onPressAdd}>
                            <Text style={modalStyles.buttonText}>추가</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    topText: {
        fontSize: 16,
        color: '#003087',
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 25
    },
    backIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 25
    },
    searchView: {
        backgroundColor: '#f3f3f3',
        borderRadius: 20,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        paddingVertical: 5
    },
    name: {
        color: '#151515',
        fontWeight: 'bold',
        fontSize: 16,
    },
    info2: {
        color: '#151515',
        fontSize: 13
    },
    info3: {
        color: '#aaa',
        fontSize: 13
    },
    row: {
        paddingTop: 10,
        paddingBottom: 15
    }
})

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center"
    },
    modalView: {
        margin: 25,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        elevation: 5
    },
    row: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        marginLeft: 20,
        paddingHorizontal: 10,
        paddingVertical: 7
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 15
    },
    cancel: {
        color: '#999',
        fontSize: 14,
        padding: 7,
        marginHorizontal: 10
    },
    button: {
        backgroundColor: '#003087',
        borderRadius: 15,
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 14
    }
})