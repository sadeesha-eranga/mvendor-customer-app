import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import tw from 'tailwind-react-native-classnames';
import {List} from "@ui-kitten/components";
import VendorListItem from '../components/VendorListItem';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Home({navigation}) {
    const [vendors, setVendors] = useState([]);

    const loadVendors = async () => {
        try {
            const vendors = await AsyncStorage.getItem('@vendors');
            setVendors(JSON.parse(vendors));
        } catch (e) {
        }
    }

    useEffect(() => {
        loadVendors();
    }, []);

    const renderItem = ({item, index}) => (
        <VendorListItem navigation={navigation} vendor={item} index={index} />
    );

    return (
        <SafeAreaView>
            <Text style={tw`p-5 ios:pt-2 android:pt-10 bg-white text-3xl font-bold tracking-tight`}>My Vendors</Text>
            <View style={tw`bg-white h-2/5 pb-5`}>
                <Text style={tw`pl-5 text-xl font-bold`}>Arriving</Text>
                <List
                    style={tw`bg-white h-full`}
                    data={vendors}
                    renderItem={renderItem}
                />
            </View>
            <View style={tw`bg-white h-3/5`}>
                <Text style={tw`pl-5 text-xl font-bold`}>Recently Joined</Text>
                <List
                    style={tw`bg-white h-full`}
                    data={vendors}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
}
