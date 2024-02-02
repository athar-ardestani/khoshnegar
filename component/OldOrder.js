import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';

const Notification = () => {
    const Navigation = useNavigation();


    return (
        <View>

            <View>
                <TouchableHighlight style={styles.button} onPress={() => { Navigation.navigate('ListOrders') }}>
                    <Octicons name="inbox" size={40} color="white" style={styles.notification} />
                </TouchableHighlight>
            </View>

        </View >
    );
}

export default Notification

const styles = StyleSheet.create({
    button: {
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 2,
        borderColor: '#0e526b',
        borderRadius: 10,
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
        top: -5,
        right: -5,
    }
})