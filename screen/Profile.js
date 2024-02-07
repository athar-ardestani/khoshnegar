import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableHighlight, TextInput, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import CityList from "../component/CityList";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { saveAccessToken, retrieveAccessToken } from './../component/AccessTokenStorage';
import { saveProfile, retrieveProfile } from './../component/ProfileStorage';

import AsyncStorage from '@react-native-async-storage/async-storage';


function Profile({ route }) {


  const Navigation = useNavigation();
  const [ProfileData, setProfileData] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [avatarSource, setAvatarSource] = useState('');
  const [rolename, setrolename] = useState('');
  const [id, setid] = useState('');



  useEffect(() => {
    const fetchData = async () => {
      const profile = await retrieveProfile();
      setProfileData(profile);

      if (profile) {
        setFullName(profile.fullname);
        setPhoneNumber(profile.username);
        setSelectedCity(profile.city_nickname);
        setAvatarSource(profile.profile_image_url);
        setrolename(profile.role_name);
        setid(profile.seller_id);
      }
    };

    fetchData();
  }, []);


  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("برای ادامه لطفا دسترسی به گالری را فعال کنید.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();


    if (!pickerResult.canceled) {
      // اینجا می‌توانید به جای pickerResult.uri از pickerResult.assets استفاده کنید
      setAvatarSource({ uri: pickerResult.assets[0].uri });
    }
  };

  const handleLogout = async () => {
    try {
      const url = 'http://65.109.192.77/curtain/api/logout/';
      const token = await retrieveAccessToken(); // retrieveAccessToken متدی است که توکن را بازیابی می‌کند
      console.log(token);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Authorization': `Bearer ${token.access}`,
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': 'kAMaHzkmkT3LJ6eZPx5CXx3KrXZ8fF0tdD0rzgfpG8iD02Js5Pldq7R4hbcQN4CT'
        },
        body: JSON.stringify({
          refresh: `${token.refresh}`
        })
      });

      if (!response.status == 205) {
        throw new Error('Something went wrong', response.statusText);
      }

      // Clear AsyncStorage
      await AsyncStorage.clear();
      alert('Logout successful');
      Navigation.replace('Login');
    } catch (error) {
      alert(error);
    }
  };


  const handleProfile = async () => {
    try {

      const apiUrl = `http://65.109.192.77/curtain/api/sellers/${id}/`; // شناسه فروشنده مورد نظر را وارد کنید
      console.log(apiUrl);
      const formData = new FormData();
      formData.append('phone', phoneNumber);
      formData.append('fullname', fullName);
      formData.append('city', selectedCity);
      formData.append('image_url', avatarSource ? avatarSource.uri : '');

      console.log(avatarSource);

      const token = await retrieveAccessToken(); // retrieveAccessToken متدی است که توکن را بازیابی می‌کند

      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token.access}`,
          'Content-Type': 'multipart/form-data',
          'X-CSRFTOKEN': 'CUXM0QZeTzZ9s5AAEnTrwi9uN7bbOeEffFnBe4MomyQ0VoKol37YhkRmq4pKIFzh',
        },
        body: formData,
      });

      console.log(response.status);
      if (response.status === 201) {
        Alert.alert('Success', 'ویرایش اطلاعات با موفقیت انجام شد!');
        Navigation.replace('Orders');
        // انجام هر اقدامی که نیاز دارید برای ادامه
      } else {
        Alert.alert('Error', 'خطا در ویرایش اطلاعات!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'ویرایش اطلاعات با مشکل مواجه شد!');
    }
  };


  const HandleGoOrder = () => {
    Navigation.goBack();
  }
  return (
    <View style={styles.ContainerProfile}>
      <ImageBackground source={require('../assets/background_1.png')} resizeMode="cover" style={styles.image}>
        {/* {avatarSource && (
          <Image style={styles.img} source={avatarSource} />
        )} */}
        <TouchableOpacity style={styles.backButton} onPress={HandleGoOrder}>
          <AntDesign name="arrowright" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openImagePicker}>
          <Image style={styles.img} source={avatarSource ? { uri: avatarSource.uri } : require('../assets/user.png')} />
        </TouchableOpacity>
        <TextInput maxLength={30} placeholder="نام و نام خانوادگی" value={fullName} onChangeText={setFullName} style={styles.input} />
        <TextInput maxLength={30} placeholder={phoneNumber} style={styles.inputdeactive} editable={false} />
        <TextInput maxLength={30} placeholder="کشور ایران" style={styles.inputdeactive} editable={false} />
        <TextInput maxLength={30} placeholder={rolename === 'seller' ? 'سمت فروشنده' : (rolename === 'admin' ? 'سمت ادمین' : 'سمت نامعلوم')} style={styles.inputdeactive} editable={false} />
        {console.log(selectedCity)}<CityList onChangeText={setSelectedCity} placeholder="Select a city" initialSelectedCity={selectedCity} />
        <TouchableHighlight onPress={handleProfile}>
          <Text style={styles.SendButton}>ویرایش</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={handleLogout}>
          <Text style={styles.Button}>خروج</Text>
        </TouchableHighlight>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  ContainerProfile: {
    width: '100%',
    height: '100%',
    alignItems: 'center',

    backgroundColor: 'red'
  },
  image: {
    width: '100%',
    height: '105%',
    paddingTop: 50,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    padding: 5,
    top: 15,
    right: 10,
    zIndex: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'silver',
    shadowColor: 'silver',
    shadowOffset: 1,
    shadowOpacity: 0.5,
  },
  img: {
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 50,
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
  Button: {
    padding: 10,
    margin: 15,
    width: 300,
    height: 40,
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    backgroundColor: '#d42b29',
    borderRadius: 5,
  }
});

export default Profile;
