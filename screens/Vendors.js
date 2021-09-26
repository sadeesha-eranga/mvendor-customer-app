import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import tw from 'tailwind-react-native-classnames';
import {List, Text} from "@ui-kitten/components";
import VendorListItem from "../components/VendorListItem";
import http from '../utils/http';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../navigation/context";

export default function Vendors({ navigation }) {

    const [vendors, setVendors] = useState([]);

    const {signOut} = useContext(AuthContext);

    const fetchVendors = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const res = await http.get('/api/v1/vendors/nearby/' + userId);
            if (res.data.success) {
                setVendors(res.data.vendors)
            }
        } catch (e) {
            console.log(e);
            if (e?.response?.status === 401) {
                signOut();
            }
        }
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            fetchVendors().then();
        });
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
