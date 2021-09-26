import * as React from 'react';
import tw from "tailwind-react-native-classnames";
import {Text} from "@ui-kitten/components";
import {StyleSheet, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import MapView from "react-native-maps";
import {useEffect, useState} from "react";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SetLocation({navigation}) {

    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Lowest
            });
            AsyncStorage.setItem('location', JSON.stringify(location)).then().catch();
            setLocation(location);
        })();
    }, []);


    return (
        <View>
            <View style={tw`h-5/6`}>
                {!!location && <MapView style={tw`flex-1`} initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0012,
                    longitudeDelta: 0.0011,
                }}>
                    <MapView.Marker
                        coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude}}
                        title={"Your Location"}
                    />
                </MapView>}
            </View>
            <View style={tw`h-1/6 bg-white`}>
                <TouchableOpacity style={styles.btn}
                onPress={() => navigation.goBack()}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Set Location</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        borderRadius: 5,
    },
    btn: {
        margin: 10,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'black',
        padding: 20,
        height: 60,
    },
    locationBtn: {
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#FDCD03',
        padding: 20,
        height: 60,
    }
});

