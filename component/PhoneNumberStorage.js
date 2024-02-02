import AsyncStorage from '@react-native-async-storage/async-storage';

export const savephone = async (phoneNumber) => {
  try {
    await AsyncStorage.setItem('phone', phoneNumber);
  } catch (error) {
    console.error('Error saving access token:', error);
  }
};

export const retrievePhone = async () => {
  try {
    const phoneNumber = await AsyncStorage.getItem('phone');
    return phoneNumber;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};