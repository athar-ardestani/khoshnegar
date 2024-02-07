import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const options = ['حذف'];

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
                <View style={{ position: 'absolute', top: 30, left: 10, backgroundColor: 'white', borderRadius: 5, padding: 10, zIndex: 100, width: 50, }}>
                    {options.map(option => (
                        <TouchableOpacity key={option} onPress={() => handleOptionSelect(option)}>
                            <Text>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}

