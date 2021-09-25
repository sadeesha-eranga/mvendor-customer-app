import * as React from 'react';
import tw from 'tailwind-react-native-classnames';
import {List, Text} from "@ui-kitten/components";
import VendorListItem from "../components/VendorListItem";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import http from '../utils/http';

export default function Vendors({ navigation }) {

    const [vendors, setVendors] = useState([]);

    const fetchVendors = async () => {
        try {
            const res = await http.get('/api/v1/vendors/nearby/1');
            if (res.data.success) {
                setVendors(res.data.vendors)
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchVendors().then();
    }, []);

    const renderItem = ({item, index}) => (
        <VendorListItem from={'vendors'} navigation={navigation} vendor={item} index={index} />
    );

    return (<>
        {vendors.length > 0 ? <List
            style={tw`bg-white h-full`}
            data={vendors}
            renderItem={renderItem}
        /> : <Text>No vendors found!</Text>}
    </>);
}
