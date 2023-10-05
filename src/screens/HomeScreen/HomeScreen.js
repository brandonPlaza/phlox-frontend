import React from 'react';
import { StyleSheet, Platform, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

import {} from 'feather-icons'

// Imports the stylesheet that applies global styles for things that should remain consistent like the SafeAreaView fix
import GlobalStyleSheet from '../../components/GlobalStyleSheet';
import { COLOURS } from '../../components/colours';

export default function HomeScreen() {
    const [currLocationSearch, onChangeText] = React.useState('');

    return (
        <SafeAreaView style={GlobalStyleSheet.androidSafeAreaView}>
            {/* <TextInput
                style={styles.textInput}
                cursorColor={COLOURS.redpink}
                onChangeText={onChangeText}
                value={currLocationSearch}
            /> */}
            <TouchableOpacity
                style={styles.getRouteButton}
            >
                <Text style={styles.getRouteButtonText}>Find your destination</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    getRouteButton: {
        backgroundColor: "#E5E5E5",
        marginStart: 10,
        marginEnd: 10,

        padding: 5,

        borderRadius: 10,
    },
    getRouteButtonText:{
        fontSize:30 
    }
});