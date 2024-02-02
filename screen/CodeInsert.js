import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Alert } from 'react-native';
import CodeTextInput from '../component/codeTextInput';
import { useNavigation } from '@react-navigation/native';
import { saveAccessToken, retrieveAccessToken } from './../component/AccessTokenStorage';

const CodeInsert = ({ route }) => {
  const { phoneNumber } = route.params;
  const Navigation = useNavigation();
  const [code, setCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');



  const handleCodeChange = (code) => {
    setVerificationCode(code);
  };


  const sendCode = async () => {
    try {

      const apiUrl = 'http://65.109.192.77/curtain/api/login/';
      console.log(JSON.stringify({
        username: phoneNumber,
        code: verificationCode,
      }));
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: phoneNumber,
          code: verificationCode,
        }),

      });

      if (response.ok) {
        const responseData = await response.json();
        // اطلاعات موفقیت‌آمیز
        saveAccessToken(responseData);

        console.log(responseData.access);


        // در اینجا می‌توانید به صفحه بعدی منتقل شوید یا هر اقدامی که نیاز دارید انجام دهید
        Navigation.replace('Orders');
      } else {
        const errorData = await response.json();
        // اطلاعات خطا
        console.error(errorData);
        if (parsedData.non_field_errors && parsedData.non_field_errors.includes("The authorization code is expired.")) {
          Alert.alert('خطا', "کد شما غیر فعال شده لطفا دوباره تلاش کنید.");

        }
        Alert.alert('Error', `Failed to send code: ${errorData.message}`);
        Navigation.replace('Login');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'مشکلی به وجود آمده لطفا دوباره تلاش کنید!');
      Navigation.replace('Login');
    }
  };


  return (
    <View style={styles.ContainerReciveCode}>
      <Image style={styles.img} source={require('../assets/logo.png')} />
      <Text style={styles.CodeText}>کد دریافتی را وارد نمایید</Text>
      <CodeTextInput onCodeChange={handleCodeChange} />
      <Text style={styles.displayText} text={code}></Text>
      <TouchableHighlight onPress={sendCode}>
        <Text style={styles.SendButton}>ارسال</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerReciveCode: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eefffc',
  },
  displayText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  CodeText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',

  },
  img: {
    width: 70,
    height: 70,
    margin: 10,
  },
  SendButton: {
    padding: 10,
    width: 300,
    height: 40,
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    backgroundColor: '#04480f',
    borderRadius: 5,
  },
});

export default CodeInsert;
