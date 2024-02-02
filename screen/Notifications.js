import { StyleSheet, Text, View, TextInput, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { saveAccessToken, retrieveAccessToken } from '../component/AccessTokenStorage';
import { AntDesign } from '@expo/vector-icons';

const Notifications = () => {
    const Navigation = useNavigation();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // کدی که می‌خواهید یک‌بار در هنگام لود صفحه اجرا شود
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
                setMessages(data);
            } catch (error) {
                console.error('خطا در درخواست:', error.message);
            }
        };

        fetchData();
    }, []);


    const HandleGoOrder = () => {
        Navigation.goBack();
    }

    return (

        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={HandleGoOrder}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <ImageBackground source={require('../assets/Dushboard.png')} resizeMode="cover" style={styles.image}>
                {messages.map((message, index) => (
                    <View key={index} style={styles.inputContainer}>

                        <TextInput
                            value={message.message}
                            placeholder={`پیام ${index + 1}`}
                            style={styles.textInput}
                            multiline
                            numberOfLines={5}
                        />
                        <AntDesign name="notification" size={24} color="black" />
                    </View>
                ))}
            </ImageBackground>
        </View>


    )
}

export default Notifications

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        height: '100%',
    },
    container: {
        flex: 1,
        margin: 0,

        padding: 0,
        paddingTop: 45,
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        padding: 5,
        top: 5,
        left: 10,
        zIndex: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'silver',
        shadowColor: 'silver',
        shadowOffset: 1,
        shadowOpacity: 0.5,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'white',
        padding: 10,
        borderWidth: 1,
        borderColor: 'silver',
        borderStyle: 'dashed',
    },
    textInput: {
        width: '90%',
        fontSize: 15,
        textAlign: 'center',
    }
})