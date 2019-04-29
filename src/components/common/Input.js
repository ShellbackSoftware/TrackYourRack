import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const Input = (props) => {
    const { label, value, onChangeText, placeholder, autocorrect, secureTextEntry, cStyle } = props;
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={[containerStyle, cStyle]}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                autoCorrect={autocorrect}
                placeholder={placeholder}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        height: 20,
        width: 100,
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 3
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export { Input };
