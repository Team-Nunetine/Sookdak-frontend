import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';

export default function MypageAlarm({navigation}) {
    const [isEnabled1, setIsEnabled1] = useState(false);
    const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);

    const [isEnabled2, setIsEnabled2] = useState(false);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

    const [isEnabled3, setIsEnabled3] = useState(false);
    const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);
    
    const [isEnabled4, setIsEnabled4] = useState(false);
    const toggleSwitch4 = () => setIsEnabled4(previousState => !previousState);

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}
            style={styles.backIcon}>
            <Octicons name='chevron-left' size={22} color='#555' />
            </TouchableOpacity>
            <Text style={styles.topText}>푸쉬 알림 설정</Text>
            <View style={styles.bigView}>
                <View style={styles.titleView}>
                    <Text style={styles.bigText}>댓글 알림</Text>
                    <Text style={styles.smallText}>내가 쓴 글에 댓글이 달리면 알림이 와요.</Text>
                    </View>
                    <Switch
                        style={styles.switch}
                        trackColor={{ false: "#adadad", true: '#003087'}}
                        thumbColor={isEnabled1 ? "#ffffff" : "#ffffff"}
                        ios_backgroundColor="#bdbdbd"
                        onValueChange={toggleSwitch1}
                        value={isEnabled1}
                    />
            </View>
            <View style={styles.bigView}>
                <View style={styles.titleView}>
                    <Text style={styles.bigText}>대댓글 알림</Text>
                    <Text style={styles.smallText}>내가 쓴 글에 대댓글이 달리면 알림이 와요.</Text>
                    </View>
                    <Switch
                        style={styles.switch}
                        trackColor={{ false: "#adadad", true: '#003087'}}
                        thumbColor={isEnabled1 ? "#ffffff" : "#ffffff"}
                        ios_backgroundColor="#bdbdbd"
                        onValueChange={toggleSwitch2}
                        value={isEnabled2}
                    />
            </View>
            <View style={styles.bigView}>
                <View style={styles.titleView}>
                    <Text style={styles.bigText}>쪽지 알림</Text>
                    <Text style={styles.smallText}>쪽지를 받으면 알림이 와요.</Text>
                </View>
                    <Switch
                        style={styles.switch}
                        trackColor={{ false: "#adadad", true: '#003087'}}
                        thumbColor={isEnabled1 ? "#ffffff" : "#ffffff"}
                        ios_backgroundColor="#bdbdbd"
                        onValueChange={toggleSwitch3}
                        value={isEnabled3}
                    />
            </View>
            <View style={styles.bigView}>
                <View style={styles.titleView}>
                    <Text style={styles.bigText}>채팅 알림</Text>
                    <Text style={styles.smallText}>채팅방에 새 메세지가 오면 알림이 와요.</Text>
                    </View>
                    <Switch
                        style={styles.switch}
                        trackColor={{ false: "#adadad", true: '#003087'}}
                        thumbColor={isEnabled1 ? "#ffffff" : "#ffffff"}
                        ios_backgroundColor="#bdbdbd"
                        onValueChange={toggleSwitch4}
                        value={isEnabled4}
                    />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create ({
    bigView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20,
    },
    titleView: {
        flexDirection: 'column',
        padding: 20
    },
    bigText: {
        fontWeight: 'bold',
        fontSize: 17,
        paddingBottom: 10,
    },
    smallText: {
        fontSize: 13,
    },
    switch: {
        flexDirection: 'row-reverse',
    },
    backIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20
    },
    topText: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 20
    },
});