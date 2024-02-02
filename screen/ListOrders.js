import React, { useEffect, useState } from 'react';
import DataAndTime from '../component/DataAndTime';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, ScrollView, TextInput, ImageBackground, Divider } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { saveProfile, retrieveProfile } from './../component/ProfileStorage';
import { StatusBar } from 'expo-status-bar';


const ListOrders = () => {
    const Navigation = useNavigation();
    const [ProfileData, setProfileData] = useState(null);
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const profile = await retrieveProfile();
            setProfileData(profile);

            if (profile) {
                setFullName(profile.fullname);
            }
        };


        fetchData();
    }, []); // برای اجرا یک‌بار در هنگام لود صفحه

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />


            <ImageBackground source={require('../assets/Dushboard.png')} resizeMode="cover" style={styles.image}>

                {/* تاریخ و ساعت  */}
                <DataAndTime />



                {/* سربرگ اودر  */}
                <View style={styles.HeaderButton}>

                    <View style={styles.constainerBasket}>
                        <TouchableHighlight style={styles.button}>
                            <AntDesign name="home" size={24} color="black" style={styles.notification} onPress={() => { Navigation.navigate('Orders') }} />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button}>
                            <Ionicons name="menu-outline" size={24} color="black" style={styles.MenuIcon} />
                        </TouchableHighlight>
                    </View>

                    <View style={styles.constainerUser}>
                        <TouchableOpacity style={styles.userbutton} onPress={() => { Navigation.navigate('Profile'), { Profile: ProfileData } }}>
                            <Image source={require('../assets/user.png')} style={styles.userLogo} />
                            <Text style={styles.userName}>{fullName}</Text>
                        </TouchableOpacity>
                    </View>



                    <View>

                    </View>







                </View>
            </ImageBackground>
        </View>
    )
}

export default ListOrders

const styles = StyleSheet.create({
    container: {
        flex: 1,

        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',

    },
    dateTimeText: {
        color: 'black',
        fontSize: 16,
        margin: 5,
    },




    HeaderButton: {

        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5,
    },
    constainerBasket: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    notification: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
    },
    MenuIcon: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
    },

    button: {
        marginLeft: 5,
        marginRight: 5,
    },
    constainerUser: {
        flexDirection: 'row',
    },
    userName: {
        color: 'black',
        fontSize: 18,
        textAlignVertical: 'center',
    },
    userbutton: {
        flexDirection: 'row',
    },
    userLogo: {
        margin: 10,
        width: 35,
        height: 35,
        resizeMode: 'contain',
    },

})