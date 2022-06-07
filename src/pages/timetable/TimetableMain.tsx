import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Alert, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useRootContext } from '../../RootProvider'

type LectureType = {
    "lectureId": number,
    "name": string,
    "professor": string,
    "classNum": string,
    "day1": string | null,
    "day2": string | null,
    "startTime": string | null,
    "endTime": string | null,
    "place": string | null,
    "type": string,
    "credit": number,
    "studentNum": number,
    "info": string
}

const timeTableHeight = 70

export default function TimetableMain({ navigation }) {
    const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const colors = ['#FF4E00', '#8EA604', '#F5BB00', '#EC9F05', '#BF3100', '#392F5A', '#95F9E3', '#564946', '#558564']
    const [data, setData] = useState<LectureType[]>([])
    const [modalVisible, setModalVisible] = useState(false)
    const [selected, setSelected] = useState<LectureType | null>(null)

    const rootContext = useRootContext()

    const load = useCallback(() => {
        rootContext.api.get('/api/lecture')
            .then((res) => setData(res.data.data.lectures))
            .catch((err) => console.log(err.response.data))
    }, [])

    useFocusEffect(load)

    const onPressDelete = (lectureId) => {
        Alert.alert('확인', '시간표에서 삭제하시겠습니까?', [
            { text: '취소' },
            {
                text: '확인', onPress: () => {
                    rootContext.api.delete('/api/lecture/' + lectureId)
                        .then((res) => {
                            if (res.data.success == false)
                                Alert.alert('오류', res.data.message)
                            else {
                                load()
                                setModalVisible(false)
                            }
                        })
                        .catch((err) => Alert.alert('오류', err.response.data.message))
                }
            }
        ])
    }

    const Block = ({ v, i, day }: { v: LectureType, i: number, day: string | null }) => <TouchableOpacity
        onLongPress={() => onPressDelete(v.lectureId)} onPress={() => { setModalVisible(true); setSelected(v) }}
        style={{
            borderWidth: 0.5,
            borderColor: colors[i % colors.length],
            position: 'absolute',
            top: getTop(v.startTime),
            height: getHeight(v.startTime, v.endTime),
            left: getLeft(day),
            right: getRight(day),
            padding: 3,
            overflow: 'hidden',
            backgroundColor: '#fff'
        }}>
        <Text style={{
            color: colors[i % colors.length],
            fontSize: 12,
            fontWeight: '200'
        }}>{v.name}</Text>
        <Text style={{
            color: colors[i % colors.length],
            fontSize: 10,
            paddingTop: 3
        }}>{v.place}</Text>
    </TouchableOpacity>

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.topView}>
            <Text style={styles.topText}>시간표</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddSchedule')}>
                <AntDesign name='plus' size={22} color='#151515' />
            </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ flexDirection: 'row', paddingRight: 20, marginHorizontal: 5, paddingVertical: 10 }}>
            <View style={{ width: 35, paddingTop: 20, alignItems: 'center' }}>
                {hours.map((v, i) => <Text style={[{ height: timeTableHeight }, styles.hour]} key={'hoursText' + i}>{v}</Text>)}
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 5 }}>
                    {['월', '화', '수', '목', '금'].map((v, i) => <Text style={styles.text} key={'daysText' + i}>{v}</Text>)}
                </View>
                <View style={{
                    borderBottomWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderColor: '#e3e3e3'
                }}>
                    {hours.map((v, i) => <View style={{
                        flexDirection: 'row',
                        height: timeTableHeight,
                        borderColor: '#e3e3e3'
                    }} key={'hoursRow' + i}>
                        {[0, 1, 2, 3, 4].map((v, i) => <View key={'daysColumn' + i}
                            style={{
                                width: '20%',
                                borderTopWidth: 0.5,
                                borderLeftWidth: 0.5,
                                borderColor: '#e3e3e3'
                            }} />)}
                    </View>)}
                    {data.map((v, i) => { return v.day1 ? <Block v={v} i={i} day={v.day1} key={'data' + i + v.day1} /> : undefined })}
                    {data.map((v, i) => { return v.day2 ? <Block v={v} i={i} day={v.day2} key={'data' + i + v.day2} /> : undefined })}
                </View>
            </View>
        </ScrollView>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <View style={modalStyles.row}>
                        <Text style={modalStyles.text1}>과목명</Text>
                        <Text style={modalStyles.text2}>{selected?.name}</Text>
                    </View>
                    <View style={modalStyles.row}>
                        <Text style={modalStyles.text1}>담당교수</Text>
                        <Text style={modalStyles.text2}>{selected?.professor}</Text>
                    </View>
                    <View style={modalStyles.row}>
                        <Text style={modalStyles.text1}>과목번호</Text>
                        <Text style={modalStyles.text2}>{selected?.classNum}</Text>
                    </View>
                    <View style={modalStyles.row}>
                        <Text style={modalStyles.text1}>강의시간</Text>
                        <Text style={modalStyles.text2}>
                            {(selected?.day1 == null && selected?.day2 == null) ? '없음'
                                : (selected?.day1 ? selected.day1 : '')
                                + (selected?.day2 ? selected.day2 : '')
                                + (selected.startTime ? selected.startTime + '-' + selected?.endTime : '')}</Text>
                    </View>
                    <View style={modalStyles.row}>
                        <Text style={modalStyles.text1}>강의실</Text>
                        <Text style={modalStyles.text2}>{selected?.place == null ? '없음' : selected?.place}</Text>
                    </View>
                    <View style={modalStyles.row}>
                        <Text style={modalStyles.text1}>교과구분</Text>
                        <Text style={modalStyles.text2}>{selected?.type + ' ' + selected?.credit + '학점'}</Text>
                    </View>
                    <View style={modalStyles.bottomView}>
                        <TouchableOpacity onPress={() => onPressDelete(selected?.lectureId)}>
                            <Ionicons name='trash-outline' size={20} color='#D31C23' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={modalStyles.button}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </SafeAreaView >
}

function getTop(startTime: string | null) {
    if (startTime == null)
        return 0
    return (Number(startTime.slice(0, 2)) - 9) * 70 + Number(startTime.slice(3, 5)) / 60 * 70
}

function getHeight(startTime: string | null, endTime: string | null) {
    if (startTime == null || endTime == null)
        return 0
    const end = Number(endTime.slice(0, 2)) * 60 + Number(endTime.slice(3, 5))
    const start = Number(startTime.slice(0, 2)) * 60 + Number(startTime.slice(3, 5))
    return (end - start) / 60 * 70
}

function getLeft(day: string | null) {
    switch (day) {
        case '월': return '0%'
        case '화': return '20%'
        case '수': return '40%'
        case '목': return '60%'
        case '금': return '80%'
        default: return '100%'
    }
}

function getRight(day: string | null) {
    switch (day) {
        case '월': return '80%'
        case '화': return '60%'
        case '수': return '40%'
        case '목': return '20%'
        case '금': return '0%'
        default: return '0%'
    }
}

const styles = StyleSheet.create({
    topView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25
    },
    topText: {
        color: '#003087',
        fontSize: 16,
        fontWeight: 'bold'
    },
    hour: {
        color: '#455B83',
        fontSize: 11,
        fontWeight: '300'
    },
    text: {
        color: '#455B83',
        fontSize: 12,
        fontWeight: '300'
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
        alignItems: 'flex-start'
    },
    text1: {
        color: '#151515',
        fontWeight: 'bold',
        flex: 1
    },
    text2: {
        color: '#151515',
        flex: 3
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    button: {
        color: '#003087',
        fontSize: 14,
        padding: 5
    }
})