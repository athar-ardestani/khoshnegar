import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, ScrollView, ImageBackground } from "react-native";
import { SimpleLineIcons, Ionicons, Feather, Octicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { saveAccessToken, retrieveAccessToken } from './../component/AccessTokenStorage'; // مسیر فایل AuthService.js
import NetInfo from '@react-native-community/netinfo';
import { saveProfile, retrieveProfile } from './../component/ProfileStorage';
import DataAndTime from '../component/DataAndTime';
import Notification from '../component/Notification';
import Messages from '../component/Messages';
import OldOrder from '../component/OldOrder';


function Orders() {
  const [isConnected, setIsConnected] = useState(true); // استیت اتصال به اینترنت

  const [ProfileData, setProfileData] = useState(null);
  const [fullname, setfullname] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const Navigation = useNavigation();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isRequestSent, setIsRequestSent] = useState(false); // وضعیت ارسال درخواست


  useEffect(() => {
    const fetchData = async () => {
      try {
        // درخواست اطلاعات با accessToken از retrieveAccessToken
        const netInfoState = await NetInfo.fetch();
        setIsConnected(netInfoState.isConnected); // تنظیم وضعیت اتصال به اینترنت

        if (!netInfoState.isConnected) {
          // اگر اتصال به اینترنت وجود نداشته باشد، عملیات بارگیری را انجام ندهید
          Navigation.replace('Login');
        }

        const token = await retrieveAccessToken();
        console.log(token.access);
        if (token.access) {
          const response = await fetch('http://65.109.192.77/curtain/api/current-user/', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token.access}`,
            },
          });
          console.log(!response.ok);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          saveProfile(data);
          setProfileData(data);
          console.log(token.access);
          const Prfile = await retrieveProfile();
          console.log('داده‌های درخواست:', Prfile);

          // انجام عملیاتی که نیاز دارید با داده‌های دریافتی
        }
        else {
          Navigation.replace('Login');
        }

      } catch (error) {
        console.error(error);
        if (error.message.includes('401')) {
          // Clear AsyncStorage
          await AsyncStorage.clear();
          Navigation.replace('Login');
        }
      } finally {
        setIsRequestSent(true); // تنظیم وضعیت ارسال به true بعد از اتمام درخواست
      }
    };

    if (!isRequestSent) {
      fetchData();
    }




    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
      // درخواست فقط زمانی ارسال می‌شود که isRequestSent برابر با false باشد
      if (!isRequestSent) {
        fetchData();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRequestSent]);



  if (!isConnected) {
    // اگر اتصال به اینترنت وجود نداشته باشد، نمایش پیام
    return (
      <View style={styles.container}>
        <Text style={styles.offlineText}>اتصال به اینترنت قطع شده است!</Text>
      </View>
    );
  }



  return (

    < View style={styles.container} >
      <ImageBackground source={require('../assets/Dushboard.png')} resizeMode="cover" style={styles.image}>
        <StatusBar hidden={true} />


        {/* تاریخ و ساعت  */}
        <DataAndTime />



        {/* سربرگ اودر  */}
        <View style={styles.HeaderButton}>

          <View style={styles.constainerBasket}>
            <TouchableHighlight style={styles.button}>
              <SimpleLineIcons name="basket" size={24} color="black" style={styles.basketIcon} />
            </TouchableHighlight>
            <TouchableHighlight style={styles.button}>
              <Ionicons name="menu-outline" size={24} color="black" style={styles.MenuIcon} />
            </TouchableHighlight>
          </View>

          <View style={styles.constainerUser}>
            <TouchableOpacity style={styles.userbutton} onPress={() => { Navigation.navigate('Profile', { Profile: ProfileData }) }}>
              <Image source={require('../assets/user.png')} style={styles.userLogo} />
              <Text style={styles.userName}>{ProfileData && ProfileData.fullname}</Text>
            </TouchableOpacity>
          </View>

        </View>







        <View style={styles.constainerButtons}>

          <OldOrder />


          <Messages />


          <Notification />
        </View>

        <ScrollView style={styles.constainerOrderButtons} >
          <ScrollView style={styles.constainerOrderButtons2} >
            <View style={styles.constainerViewButton}>
              <TouchableHighlight style={styles.buttonOrder} onPress={() => { Navigation.navigate('NewOrders', { ProductType: 'TwoMekenazm', PersianType: 'دومکانیزم', ProductID: 2, Profile: ProfileData }) }}>
                <Text style={styles.TextButtonOrder}>دو مکانیزم</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.buttonOrder} onPress={() => { Navigation.navigate('NewOrders', { ProductType: 'Zebra', PersianType: 'زبرا', ProductID: 1, Profile: ProfileData }) }}>
                <Text style={styles.TextButtonOrder}>زبرا</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.constainerViewButton}>
              <TouchableHighlight style={styles.buttonOrder} onPress={() => { Navigation.navigate('NewOrders', { ProductType: 'TwoMekenazmPrinting', PersianType: 'دومکانیزم تصویری', ProductID: 5, Profile: ProfileData }) }}>
                <Text style={styles.TextButtonOrder}>دو مکانیزم تصویری</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.buttonOrder} onPress={() => { Navigation.navigate('NewOrders', { ProductType: 'ZebraPrinting', PersianType: 'زبرا  تصویری', ProductID: 4, Profile: ProfileData }) }}>
                <Text style={styles.TextButtonOrder}>زبرا  تصویری</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.constainerViewButton} >
              <TouchableHighlight style={styles.buttonOrder} onPress={() => { Navigation.navigate('NewOrders', { ProductType: 'Shidrol', PersianType: 'شیدرول', ProductID: 3, Profile: ProfileData }) }}>
                <Text style={styles.TextButtonOrder}>شیدرول</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.buttonOrder} onPress={() => { Navigation.navigate('NewOrders', { ProductType: 'ShidrolPrinting', PersianType: 'شیدرول تصویری', ProductID: 6, Profile: ProfileData }) }}>
                <Text style={styles.TextButtonOrder}>شیدرول تصویری (چاپی)</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.constainerViewButton}>
              <TouchableHighlight style={styles.buttonOrder} onPress={() => { Navigation.navigate('NewOrders', { ProductType: 'SunlitPrinting', PersianType: 'سانلیت تصویری', ProductID: 7, Profile: ProfileData }) }}>
                <Text style={styles.TextButtonOrder}>سانلیت تصویری</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.buttonOrder} onPress={() => { Navigation.navigate('Panche', { ProductType: 'Panche', PersianType: 'پانچی', ProductID: 101, Profile: ProfileData }) }}>
                <Text style={styles.TextButtonOrder}>پرده پانچی</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.constainerViewButton}>
              <TouchableHighlight style={styles.buttonOrder} onPress={() => { Navigation.navigate('NewOrders', { ProductType: 'Poster', PersianType: 'پوستر دیواری', ProductID: 16, Profile: ProfileData }) }}>
                <Text style={styles.TextButtonOrder}>پوستر دیواری</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.buttonOrder} onPress={() => { Navigation.navigate('NewOrders', { ProductType: 'BedTools', PersianType: 'کالا خواب', ProductID: 222, Profile: ProfileData }) }}>
                <Text style={styles.TextButtonOrder}>کالای خواب</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.constainerViewButton} >
              <TouchableHighlight style={styles.buttonOrder} onPress={() => { Navigation.navigate('NewOrders', { ProductType: '25mm_simple_shutter', PersianType: 'کرکره تصویری ۲۵ میل ', ProductID: 31, Profile: ProfileData }) }} >
                <Text style={styles.TextButtonOrder}>کرکره تصویری</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.buttonOrder} onPress={() => { Navigation.navigate('NewOrders', { ProductType: '16mm_simple_shutter', PersianType: 'کرکره ساده ۱۶ میل و ۲۵ میل', ProductID: 333, Profile: ProfileData }) }}>
                <Text style={styles.TextButtonOrder}>کرکره ساده </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.constainerViewButton} onPress={() => { Navigation.navigate('NewOrders', { ProductType: 'CarpetPrinting', PersianType: 'فرش چاپی', ProductID: 35, Profile: ProfileData }) }}>
              <TouchableHighlight style={styles.buttonOrder} editable={false}>
                <Text style={styles.TextButtonOrder} >فرش چاپی</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.buttonOrder} onPress={() => { Navigation.navigate('NewOrders', { ProductType: 'Accessories', PersianType: 'اکسسواری', ProductID: 225, Profile: ProfileData }) }}>
                <Text style={styles.TextButtonOrder}>اکسسواری</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.constainerViewButton}>
              <TouchableHighlight style={styles.buttonOrder} onPress={() => { Navigation.navigate('NewOrders', { ProductType: 'print_on_fabric', PersianType: 'چاپ روی پارچه', ProductID: 34, Profile: ProfileData }) }}>
                <Text style={styles.TextButtonOrder}> چاپ روی پارچه </Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </ScrollView>


      </ImageBackground>
    </View >

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },



  HeaderButton: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    height: '25%',
  },
  constainerBasket: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  constainerUser: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 50,
  },

  basketIcon: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  MenuIcon: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  userName: {
    color: 'black',
    fontSize: 15,
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
  },
  userbutton: {
    margin: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  userLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },





  constainerButtons: {
    backgroundColor: '#052f47',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  constainerOrderButtons: {
    height: '50%',
    backgroundColor: "#f0f5fc",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
    margin: -10,
    paddingTop: 40,

  },
  constainerOrderButtons2: {
    paddingBottom: 70,
  },
  constainerViewButton: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
  },




  buttonOrder: {
    backgroundColor: '#eeaa38',
    width: '45%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'silver',
    borderStyle: 'dashed',
    margin: 2,
  },
  TextButtonOrder: {
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
  },


});
export default Orders;