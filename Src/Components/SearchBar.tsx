import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';

const SearchBar = ({ onChangeText, value }) => {

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Image source={require('../Icons/search.png')} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Type to Search"
                    onChangeText={onChangeText}
                    placeholderTextColor={'gray'}
                    value={value}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        height: 80,
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        borderRadius: 15
    },
    input: {
        flex: 1,
        padding: 5,
        color: 'black',
        height: 40,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: 'black'
    }
});

export default SearchBar;