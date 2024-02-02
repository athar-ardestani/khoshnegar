
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAccessToken = async (accessToken) => {
  try {
    const jsonList = JSON.stringify(accessToken);
    await AsyncStorage.setItem('transactionList', jsonList);
  } catch (error) {
    console.error('Error saving transaction list:', error);
  }
};

export const retrieveAccessToken = async () => {
  try {
    const jsonList = await AsyncStorage.getItem('transactionList');
    if (jsonList) {
      const transactionList = JSON.parse(jsonList);
      return transactionList;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error retrieving transaction list:', error);
    return [];
  }
};