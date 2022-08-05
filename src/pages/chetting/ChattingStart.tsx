import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useRootContext } from "../../RootProvider";

export default function ChattingStart({ route, navigation }) {
    
    const rootContext = useRootContext()

    useFocusEffect(() => {
        //navigation.getParent().getParent().setOptions({ tabBarStyle: { display: 'none' } })
        navigation.getParent().setOptions({ swipeEnabled: false })
    })
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const roomNavigate = ({title, desc}) => {
        rootContext.api.post('http://3.36.250.198:8080/api/chat/save', {
            name: title,
            info: desc
        }).then((res) => {
            console.log("성공")
            console.log(res.data.data.roomId)
        }).catch((err) => {
            console.log(err)
        })

        if(title.length == 0) 
            return Alert.alert('채팅방 이름을 입력해주세요.')
        else {
            if(desc.length == 0) 
                return Alert.alert('채팅방 소개를 입력해주세요.')
            return navigation.navigate('ChattingRoom', {roomName: title})
        }
    }

    return <SafeAreaView style={styles.topContainer}>
        <TouchableOpacity
            onPress={() => {navigation.goBack()}}>
                <Ionicons name="close-outline" size={30} color='#fff' />
        </TouchableOpacity>
        <Text style={styles.topText}>새로운 대화를 시작해보세요.</Text>
        <View style={styles.container}>
            <Text style={styles.roomName}>채팅방 이름</Text>
            <TextInput 
             style={styles.textInput}
             onChangeText={(title) => setTitle(title)}
            />
            <Text style={styles.text}>0/30</Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.roomName}>채팅방 소개</Text>
            <TextInput 
             style={styles.textInput}
             onChangeText={(desc) => setDesc(desc)}
             />
             <Text style={styles.text}>0/30</Text>
        </View>
        <View style={styles.button}>
        <Button
         title="개설" 
         color={'black'}
         onPress={() => roomNavigate({title, desc})}></Button>
         </View>
    </SafeAreaView>
};

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        backgroundColor: '#455B83',
        paddingHorizontal: 10,
    },
    topText: {
        fontSize: 25,
        paddingTop: 50,
        paddingBottom: 20,
        paddingLeft: 20,
        color: '#fff'
    },
    container: {
        flexDirection: 'column',
        paddingBottom: 20,
        paddingTop: 25,
        paddingHorizontal: 30
    },
    textInput: {
        width: 330,
        height: 45,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1.5,
        borderRadius: 15, 
        fontSize: 16,
        color: '#fff'
    },
    text: {
        textAlign: 'right',
        color: 'white',
        marginTop: 5,
        fontSize: 13,
    },
    roomName: {
        fontSize: 20,
        color: '#fff'
    },
    button: {
        width: 330,
        height: 45,
        backgroundColor: '#fff',
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 50,
        borderWidth: 1,
        borderRadius: 13,
    }
});