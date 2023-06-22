import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({title, onPress, buttonStyle, textStyle}) => {
    const buttonStyles = [styles.button, buttonStyle];
    const textStyles = [styles.buttonText, textStyle];
    return(
        <TouchableOpacity style={buttonStyles} onPress={onPress}>
            <Text style={textStyles}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '90%',
        height: 40,
        backgroundColor: '#475bd8',
        marginBottom: 10,
        paddingHorizontal: 10,
        border: 'none',
        borderRadius: 5,
        marginLeft: 20,
       
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10
    }
});

export default CustomButton;