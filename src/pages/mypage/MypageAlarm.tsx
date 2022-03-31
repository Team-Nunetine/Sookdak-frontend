import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MypageAlarm() {
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
            <View style={styles.bigView}>
                <View style={styles.titleView}>
                    <Text style={styles.bigText}>댓글 알림</Text>
                    <Text style={styles.smallText}>내가 쓴 글에 댓글이 달리면 알림이 와요.</Text>
                    </View>
                    <Switch
                        style={styles.switch}
                        trackColor={{ false: "#767577", true: '#003087'}}
                        thumbColor={isEnabled1 ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
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
                        trackColor={{ false: "#767577", true: '#003087' }}
                        thumbColor={isEnabled2 ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
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
                        trackColor={{ false: "#767577", true: '#003087'}}
                        thumbColor={isEnabled3 ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
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
                        trackColor={{ false: "#767577", true: '#003087' }}
                        thumbColor={isEnabled4 ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
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
        fontSize: 25,
        paddingBottom: 10,
    },
    smallText: {
        fontSize: 17,
    },
    switch: {
        flexDirection: 'row-reverse',
    },
});