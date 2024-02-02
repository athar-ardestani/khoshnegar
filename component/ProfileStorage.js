import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveProfile = async (Profile) => {
    try {
        const jsonList = JSON.stringify(Profile);
        await AsyncStorage.setItem('PrfileData', jsonList);
    } catch (error) {
        console.error('Error saving transaction list:', error);
    }
};

export const retrieveProfile = async () => {
    try {
        const jsonList = await AsyncStorage.getItem('PrfileData');
        if (jsonList) {
            const PrfileData = JSON.parse(jsonList);
            return PrfileData;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error retrieving transaction list:', error);
        return [];
    }
};