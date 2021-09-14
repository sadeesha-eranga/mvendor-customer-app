import * as React from 'react';
import tw from 'tailwind-react-native-classnames';
import {List} from "@ui-kitten/components";
import VendorListItem from "../components/VendorListItem";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Vendors({ navigation }) {

    const [vendors, setVendors] = useState([]);

    const loadVendors = async () => {
        try {
            const vendors = await AsyncStorage.getItem('@vendors');
            setVendors(JSON.parse(vendors || []));
        } catch (e) {
        }
    }

    useEffect(() => {
        loadVendors();
    }, []);

    const renderItem = ({item, index}) => (
        <VendorListItem from={'vendors'} navigation={navigation} vendor={item} index={index} />
    );

    return (
        <List
            style={tw`bg-white h-full`}
            data={vendors}
            renderItem={renderItem}
        />
    );
}
