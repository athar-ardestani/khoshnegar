import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, PanResponder } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const options = ['لغو سفارش'];

export default function SimpleMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleOptionSelect = (option) => {
        // Implement logic for option selection
        console.log('Selected option:', option);
        // Close the menu after selecting an option
        setIsMenuOpen(false);
    };




    return (
        <View>
            <TouchableOpacity onPress={toggleMenu}>
                <Entypo name="dots-three-vertical" size={24} color="black" />
            </TouchableOpacity>
            {isMenuOpen && (
                <View style={{ position: 'absolute', top: 5, left: 20, backgroundColor: 'white', borderRadius: 5, padding: 10, zIndex: 999, minWidth: 110, }}>
                    {options.map(option => (
                        <TouchableOpacity style={{ paddingVertical: 5, }} key={option} onPress={() => handleOptionSelect(option)}>
                            <Text>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}

