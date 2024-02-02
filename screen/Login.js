import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, Text, Image, ImageBackground, StyleSheet, Alert, TouchableHighlight } from "react-native";

function Login() {
  const [phone, setPhone] = useState(null);
  const Navigation = useNavigation();
  const validateUsername = async () => {
    try {
      const apiUrl = 'http://65.109.192.77/curtain/api/validate-username/';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phone }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Alert.alert('oK', `Validation true: ${data}`);

        // اگر موفقیت‌آمیز بود، به SignUpScreen منتقل شوید
        Navigation.replace('CodeInsert', { phoneNumber: phone });
      } else {
        const errorData = await response.json();
        Alert.alert('Error', `شما ثبت نام نکرده اید لطفا ثبت نام کنید: ${errorData.message}`);
        Navigation.navigate('SignUp', { phoneNumber: phone });


      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'مشکلی بوجود آمده!');

    }
  };

  return (
    <View style={Styles.ContainerSendCode}>
      <ImageBackground source={require('../assets/background_1.png')} resizeMode="cover" style={Styles.image} >
        <Image style={Styles.img} source={require('../assets/logo.png')} />
        <Text style={Styles.CodeText}>شماره موبایل را وارد کنید</Text>
        <TextInput maxLength={11} keyboardType='numeric' placeholder="شماره موبایل را وارد کنید" value={phone} onChangeText={setPhone} style={Styles.input} />
        <TouchableHighlight
          onPress={validateUsername}
        >
          <Text style={Styles.SendCodeButton}>دریافت کد</Text>
        </TouchableHighlight>
      </ImageBackground>
    </View>
  );
};


const Styles = StyleSheet.create({

  ContainerSendCode: {
    width: '100%',
    height: '100%',

  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CodeText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    // fontFamily:'IranSX',
  },
  img: {
    width: 70,
    height: 70,
    margin: 10,
  },
  input: {
    height: 40,
    width: 300,
    borderRadius: 5,
    margin: 12,
    padding: 10,
    fontSize: 15,
    color: 'black',
    borderWidth: 1,
    borderColor: 'silver'

  },
  SendCodeButton: {
    padding: 10,

    width: 300,
    height: 40,
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    backgroundColor: '#052f47',
    borderRadius: 5,
  }
}

)

export default Login;
