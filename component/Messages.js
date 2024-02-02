import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const Notification = () => {
    const Navigation = useNavigation();
    const [number, setNumber] = useState(0);
    return (
        <View>
            {number !== 1 ? (
                <View>

                    <TouchableHighlight style={styles.buttonWithNotification} onPress={() => { Navigation.navigate('Messages') }} >
                        <Feather name="message-square" size={40} color="white" style={styles.notification} />
                    </TouchableHighlight>
                    <Text style={styles.NumberText}>{number}</Text>
                </View>
            ) : (
                <View>
                    <TouchableHighlight style={styles.button}>
                        <Feather name="message-square" size={40} color="white" style={styles.notification} />
                    </TouchableHighlight>
                </View>
            )}
        </View>
    );
}

export default Notification

const styles = StyleSheet.create({
    button: {
        marginLeft: 5,
        marginRight: 5,
    },
    buttonWithNotification: {
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 5,
    },
    notification: {
        backgroundColor: '#0e526b',
        borderRadius: 5,
        padding: 15,
    },
    NumberText: {
        padding: 5,
        backgroundColor: 'red',
        width: 30,
        height: 30,
        borderRadius: 15,
        color: 'white',
        position: 'absolute',
        textAlign: 'center',
        top: -5,
        right: -5,
    }
})