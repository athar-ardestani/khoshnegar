import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CodeInputText = ({ onCodeChange }) => {
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
  const inputRefs = Array(6).fill(0).map((_, index) => useRef(null));

  const handleInputChange = (text, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);


    const code = newInputValues.join('');
    onCodeChange(code);


    // اگر عدد وارد شده ورودی معتبر است، به TextInput بعدی فوکوس دهید
    if (/^\d$/.test(text) && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }

  };

  const handleInputClear = (index) => {
    // حذف مقدار در وضعیت
    const newInputValues = [...inputValues];
    newInputValues[index] = '';
    setInputValues(newInputValues);

    // اگر این TextInput خالی شده، به TextInput قبلی فوکوس دهید (اگر وجود داشته باشد)
    if (index > 0) {
      inputRefs[index - 1].current.focus();
    }

  };

  return (
    <View style={styles.container}>
      {inputValues.map((value, index) => (
        <TextInput
          key={index}
          ref={inputRefs[index]}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          value={value}
          onChangeText={(text) => handleInputChange(text, index)}
          onKeyPress={({ nativeEvent }) => {
            // اگر دکمه پاک کردن فشرده شده، مقدار را حذف کرده و فوکوس را به TextInput قبلی منتقل کنید
            if (nativeEvent.key === 'Backspace') {
              handleInputClear(index);
            }
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 40,
    margin: 10,
    textAlign: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export default CodeInputText;
