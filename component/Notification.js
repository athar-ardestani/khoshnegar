import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { retrieveAccessToken } from '../component/AccessTokenStorage';

const Notification = ({ route }) => {
    const [number, setNumber] = useState(1);

    const Navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await retrieveAccessToken();
                const apiUrl = 'http://65.109.192.77/curtain/api/notifications/';

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token.access}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setNumber(data.length);
            } catch (error) {
                console.error('نوتیفیکشن  خطا در درخواست:', error.message);
            }
        };

        // اجرای اولیه
        fetchData();

        // تنظیم interval برای به‌روزرسانی در فواصل زمانی
        const intervalId = setInterval(fetchData, 5000); // هر 5 ثانیه

        // توقف interval در هنگام از بین رفتن کامپوننت
        return () => clearInterval(intervalId);
    }, []); // برای یک‌بار اجرا

    return (
        <View>
            {number !== 0 ? (
                <View>
                    <TouchableHighlight style={styles.buttonWithNotification} onPress={() => { Navigation.navigate('Notifications') }}>
                        <AntDesign name="notification" size={40} color="white" style={styles.notification} />
                    </TouchableHighlight>
                    <Text style={styles.NumberText}>{number}</Text>
                </View>
            ) : (
                <View>
                    <TouchableHighlight style={styles.button}>
                        <AntDesign name="notification" size={40} color="white" style={styles.notification} />
                    </TouchableHighlight>
                </View>
            )}
        </View>
    );
};

export default Notification;

const styles = StyleSheet.create({
    button: {
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 2,
        borderColor: '#0e526b',
        borderRadius: 5,
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
        borderRadius: 2,
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
    },
});
