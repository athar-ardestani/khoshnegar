import React, { useEffect } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveAccessToken, retrieveAccessToken } from './../component/AccessTokenStorage'; 

function Intro() {
  const navigation = useNavigation();

  useEffect(() => {
    // پس از 5000 میلی‌ثانیه به صفحه دیگر منتقل شوید
    const timeoutId = setTimeout(() => {
      console.log(!!retrieveAccessToken);
      if(!!retrieveAccessToken){
        navigation.replace('Orders');
      
    }else{
      navigation.replace('Login'); // نام مربوط به مسیر SignIn در ناویگی شما
    }

    }, 5000);

    // هنگامی که کامپوننت Intro از دسترس خارج می‌شود، تایمر را پاک کنید
    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <View style={Styles.Container}>
      <StatusBar hidden={true} />
      <Image style={Styles.img} source={require('../assets/logo.png')} />
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  Text: {
    color: 'black',
    fontSize: 45,
    textAlign: 'center',
  },
  img: {
    width: 100,
    height: 100,
  },
});

export default Intro;