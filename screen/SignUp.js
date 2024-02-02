import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableHighlight, TextInput, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import CityList from "../component/CityList";

function SignUp({ route }) {

  const Navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);
  const [selectedCity, setSelectedCity] = useState('');
  const [avatarSource, setAvatarSource] = useState(null);

  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("برای ادامه لطفا دسترسی به گالری را فعال کنید.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    
    if (!pickerResult.cancelled) {
      // اینجا می‌توانید به جای pickerResult.uri از pickerResult.assets استفاده کنید
      setAvatarSource({ uri: pickerResult.assets[0].uri });
    }
  };

  const handleSignUp = async () => {
    try {
      // ایجاد یک آرایه از آدرس‌ها
      const addresses = ["آدرس1", "آدرس2"]; // شما باید آدرس‌ها را بر اساس نیاز خودتان تولید کنید
  

      const apiUrl = 'http://65.109.192.77/curtain/api/sellers/';
      
      const formData = new FormData();
      formData.append('phone', phoneNumber);
      formData.append('fullname', fullName);
      formData.append('city', selectedCity);
      formData.append('image_url', avatarSource ? avatarSource.uri : '');
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFTOKEN': '2V91gtydjpuJvmW5z1ZcLX4ijhb2dY63FGzQuHlnMolAYF6TgHdJwZMaWepB7p15',
        },
        body: formData,
      });
      // پردازش پاسخ API
      console.log(response.status);
      if(response.status === 201)
      {
        Alert.alert('Error', ' نام انجام شد!');
        Navigation.navigate('Login');

      }
  
      // در اینجا می‌توانید به صفحه بعدی منتقل شوید یا هر اقدامی که نیاز دارید انجام دهید
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Error', 'ثبت نام انجام نشد لطفا با شماره پشتیبانی تماس بگیرید!');
    }
  };

  return (
    <View style={styles.ContainerSignUp}>
      <ImageBackground source={require('../assets/background_1.png')} resizeMode="cover" style={styles.image}>
        {avatarSource && (
          <Image style={styles.img} source={avatarSource} />
        )}
        <TouchableOpacity onPress={openImagePicker}>
          <Image style={styles.img} source={avatarSource ? { uri: avatarSource.uri } : require('../assets/user.png')} />
        </TouchableOpacity>
        <TextInput maxLength={30} placeholder="نام و نام خانوادگی" value={fullName} onChangeText={setFullName} style={styles.input} />
        <TextInput maxLength={30} placeholder={phoneNumber} style={styles.inputdeactive} editable={false} />
        <TextInput maxLength={30} placeholder="کشور ایران" style={styles.inputdeactive} editable={false} />
        <TextInput maxLength={30} placeholder="سمت فروشنده" style={styles.inputdeactive} editable={false} />
        <CityList onChangeText={setSelectedCity} />
        <TouchableHighlight onPress={handleSignUp}>
          <Text style={styles.SendButton}>ثبت نام</Text>
        </TouchableHighlight>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  ContainerSignUp: {
    width: '100%',
    height: '100%',
    top: 50,
    alignItems: 'center',
    backgroundColor: '#eefffc'
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
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
    margin: 5,
    padding: 10,
    fontSize: 15,
    color: 'black',
    borderWidth: 1,
    borderColor: 'black'
  },
  inputdeactive: {
    height: 40,
    width: 300,
    borderRadius: 5,
    margin: 5,
    padding: 10,
    fontSize: 15,
    color: 'black',
    borderWidth: 1,
    borderColor: 'silver'
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

export default SignUp;
