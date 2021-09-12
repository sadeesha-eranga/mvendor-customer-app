import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Vendors({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vendors</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
