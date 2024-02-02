import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text,TouchableOpacity, TouchableHighlight, View ,ScrollView,TextInput,ImageBackground, Divider} from "react-native";
import { SimpleLineIcons,Ionicons ,AntDesign, Feather ,Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Picker } from '@react-native-picker/picker';
import { saveAccessToken, retrieveAccessToken } from '../component/AccessTokenStorage';
import DataAndTime from '../component/DataAndTime';

const Panche = ({route}) => {


    const Navigation = useNavigation();
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [OrderName, setOrderName] = useState(route.params.PersianType);
    const [ProfileData, setProfileData] = useState(route.params.Profile);


  return (
<View style={styles.container}>
            <StatusBar hidden={true} />
            
            
            <ImageBackground source={require('../assets/Dushboard.png')} resizeMode="cover" style={styles.image}>

            {/* تاریخ و ساعت  */}
            <DataAndTime />



            {/* سربرگ اودر  */}
            <View  style={styles.HeaderButton}>

              <View style={styles.constainerBasket}>
                  <TouchableHighlight style={styles.button}>
                  <SimpleLineIcons name="basket" size={24} color="black" style={styles.basketIcon} onPress={()=>{Navigation.navigate('NewOrders')}}/>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.button}>
                  <Ionicons name="menu-outline" size={24} color="black" style={styles.MenuIcon}/>
                  </TouchableHighlight>
              </View>
            
              <View style={styles.constainerUser}>
              <TouchableOpacity style={styles.userbutton} onPress={()=>{Navigation.navigate('Profile',{Profile : ProfileData})}}>
                <Image source={require('../assets/user.png')} style={styles.userLogo}/>
                <Text style={styles.userName}>{ProfileData && ProfileData.fullname}</Text>
              </TouchableOpacity>
              </View>
                          
            </View>







            <View style={styles.constainerButtons}></View>
            <View style={styles.constainerOrderButtons}>
                <TouchableHighlight style={styles.buttonPanche} 
                onPress={()=>{Navigation.navigate('NewOrders',{ProductType:'Panche150without',PersianType:'پرده پانچی بدون دوخت عرض ۱۵۰',ProductID:8,Profile:ProfileData})}}>
                  <Text style={styles.TextPanche}>پرده پانچی بدون دوخت عرض ۱۵۰</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.buttonPanche} 
                onPress={()=>{Navigation.navigate('NewOrders',{ProductType:'Panche150with',PersianType:'پرده پانچی با دوخت عرض ۱۵۰',ProductID:9,Profile:ProfileData})}}>
                  <Text style={styles.TextPanche}>پرده پانچی با دوخت عرض ۱۵۰</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.buttonPanche} 
                onPress={()=>{Navigation.navigate('NewOrders',{ProductType:'Panche300without',PersianType:'پرده پانچی بدون دوخت عرض ۳۰۰',ProductID:10,Profile:ProfileData})}}>
                  <Text style={styles.TextPanche}>پرده پانچی بدون دوخت عرض ۳۰۰</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.buttonPanche} 
                onPress={()=>{Navigation.navigate('NewOrders',{ProductType:'Panche300with',PersianType:'پرده پانچی با دوخت عرض ۳۰۰',ProductID:11,Profile:ProfileData})}}>
                  <Text style={styles.TextPanche}>پرده پانچی با دوخت عرض ۳۰۰</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.buttonPanche} 
                onPress={()=>{Navigation.navigate('NewOrders',{ProductType:'PancheTools',PersianType:'ریل و لوازم پرده پانچی',ProductID:12,Profile:ProfileData})}}>
                  <Text style={styles.TextPanche}>ریل و لوازم پرده پانچی</Text>
                </TouchableHighlight>
            </View>

            </ImageBackground>
            

            
        </View>
  )
}

export default Panche

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
      },
  
  
      HeaderButton:{
        
        flexDirection:'row-reverse',
        justifyContent:'space-between',
        marginTop: 5,
        marginBottom: 5,
      },
      constainerBasket: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },

      basketIcon: {
        padding:10,
        backgroundColor: 'white',
        borderRadius:50,
      },
      MenuIcon:{
        padding:10,
        backgroundColor: 'white',
        borderRadius:50,
      },

      button: {
        marginLeft: 5,
        marginRight: 5,
      },
      constainerUser: {
        flexDirection:'row',
      },
      userName: {
        color: 'black',
        fontSize: 18,
        textAlignVertical:'center',
      },
      userbutton:{
        flexDirection:'row',
      },
      userLogo: {
        margin:10,
        width: 35,
        height: 35,
        resizeMode: 'contain',
      },
  
      button: {
        marginLeft: 5,
        marginRight: 5,
      },
      buttonPanche:{
        padding:5,
        borderWidth:1,
        borderColor:'#58595c',
        alignContent:'center',
        textAlign: 'center',
        borderRadius:5,
        margin:10,
      },
      TextPanche:{
        margin:10,
        alignItems:'center',
        textAlign:'center',
        color:'#58595c',
        fontSize:18,
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
        height:'81%',
        backgroundColor: "#eeaa38",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 10,
        margin:-10,
        paddingTop:25,
        
      },
      constainerOrderButtons2:{
          paddingBottom:70,
      },
      constainerViewButton:{
          flex:1,
          justifyContent:'center',
          flexDirection:'row',
          alignContent:'center',
      },
  
  
  
  
      notification: {
        backgroundColor: '#0e526b',
        borderRadius: 5,
        padding: 15,
      },
      buttonOrder: {
        backgroundColor: '#eeaa38',
        width: '45%',
        borderRadius: 10,
        borderWidth:1,
        borderColor:'silver',
        borderStyle:'dashed',
        margin:2,
      },
      TextButtonOrder: {
        fontSize: 18,
        textAlign: 'center',
        padding: 20,
      },
  
})