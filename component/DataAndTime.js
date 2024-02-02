import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

const DataAndTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [amPm, setAmPm] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // پاک کردن interval در هنگام حذف کامپوننت
  }, []); // وابستگی به یک آرایه خالی به این معنی است که این useEffect تنها در اجرای اولیه اجرا می‌شود.

  useEffect(() => {
    const formatNumber = (number) => (number < 10 ? `0${number}` : number);

    const date = `${currentDateTime.getFullYear()}/${formatNumber(currentDateTime.getMonth() + 1)}/${formatNumber(currentDateTime.getDate())}`;
    const time = `${formatNumber(currentDateTime.getHours())}:${formatNumber(currentDateTime.getMinutes())}:${formatNumber(currentDateTime.getSeconds())}`;

    setFormattedDate(date);
    setFormattedTime(time);

    const amPmValue = currentDateTime.getHours() >= 12 ? 'pm' : 'am';
    setAmPm(amPmValue);
  }, [currentDateTime]);

  return (
    <View>
      <Text style={styles.dateTimeText}>{formattedDate}  {formattedTime} {amPm}</Text>
    </View>
  );
};

export default DataAndTime;

const styles = StyleSheet.create({
  dateTimeText: {
    color: 'black',
    fontSize: 16,
    margin: 5,
  },
});
