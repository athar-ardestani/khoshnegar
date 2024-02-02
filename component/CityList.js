import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const CityList = ({ onChangeText, placeholder, initialSelectedCity }) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(initialSelectedCity || placeholder);

  useEffect(() => {
    // ارسال درخواست GET به آدرس موردنظر
    axios.get('http://65.109.192.77/curtain/api/cities/')
      .then(response => {
        // دریافت اطلاعات شهرها و ذخیره آن در وضعیت

        setCities(response.data);
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });
  }, []);

  const handleCityChange = (itemValue) => {
    setSelectedCity(itemValue);
    // در هر تغییر شهر، تابع onChangeText را فراخوانی کنید
    onChangeText(itemValue);
  };

  return (
    <View style={styles.container}>

      <Picker
        // selectedValue={selectedCity}
        // onValueChange={(itemValue) => setSelectedCity(itemValue)}
        selectedValue={selectedCity}
        onValueChange={handleCityChange}
        style={styles.picker}
      >
        <Picker.Item label="نام شهر" value="" />
        {cities.map(city => (
          <Picker.Item style={styles.items} key={city.city_id} label={city.nickname} value={city.nickname} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  picker: {
    height: 40,
    width: 300,
    fontSize: 15,
    color: 'black',
  },
});

export default CityList;