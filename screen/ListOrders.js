import React, { useEffect, useState } from 'react';
import DataAndTime from '../component/DataAndTime';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, ScrollView, TextInput, ImageBackground, Divider } from "react-native";
import { saveAccessToken, retrieveAccessToken } from './../component/AccessTokenStorage'; // مسیر فایل AuthService.js
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import { saveProfile, retrieveProfile } from './../component/ProfileStorage';
import PopupMenu from 'react-native-popup-menu';
import { StatusBar } from 'expo-status-bar';
import SimpleMenu from '../component/dotsMenu';



const ListOrders = () => {
    const Navigation = useNavigation();
    const [ProfileData, setProfileData] = useState(null);
    const [fullName, setFullName] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const profile = await retrieveProfile();
            setProfileData(profile);

            if (profile) {
                setFullName(profile.fullname);
            }

            try {
                const token = await retrieveAccessToken();
                const apiUrl = 'http://65.109.192.77/curtain/api/orders/?order_by=create_date&order_type=ascending';

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token.access}`,
                    },
                    body: '',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                // اینجا می‌توانید لیست را چک کنید و کارهای مورد نیاز را انجام دهید
                console.log('لیست سفارشات:', data[0]);
                setOrders(data);


                // اگر وضعیت سفارش Open باشد، کارهای مورد نیاز را انجام دهید


            } catch (error) {
                console.error('خطا در درخواست:', error.message);
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







                </View>

                <ScrollView style={styles.scrollOrdder}>
                    <View  >
                        {orders.map((order, index) => (
                            <View style={styles.OrderContainer} >
                                <TouchableOpacity style={styles.orderItem} key={index}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <SimpleMenu style={styles.OrderSimpleMenu} />
                                        <View style={styles.OrderContent}>
                                            <Text style={styles.textbox}>با کد : {order.order_code}</Text>
                                            <Text style={styles.textbox}>به نام : {order.fullname}</Text>
                                            <Text style={styles.textbox}>نوع سفارش : {order.order_status}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>

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




    scrollOrdder: {
        height: '85%',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderTopColor: 'silver',
        borderBottomColor: 'silver',
        borderWidth: 2,
        borderBottomColor: '#ccc',
    },
    OrderSimpleMenu: {
        marginRight: 20,


    },
    OrderContent: {
        flex: 1,
    },
    orderItem: {
        flex: 1,
    },
    textbox: {
        fontSize: 16,
        marginBottom: 5,
    },

})