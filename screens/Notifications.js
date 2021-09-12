import * as React from 'react';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VendorListItem from "../components/VendorListItem";
import tw from "tailwind-react-native-classnames";
import {List} from "@ui-kitten/components";

export default function Notifications() {

    const [notifications, setNotifications] = useState([]);

    const loadNotifications = async () => {
        try {
            const notifications = await AsyncStorage.getItem('@notifications');
            setNotifications(JSON.parse(notifications || []));
        } catch (e) {
        }
    }

    useEffect(() => {
        loadNotifications();
    }, []);

    const renderItem = ({item, index}) => (
        <VendorListItem vendor={item} index={index} />
    );

    return (
        <List
            style={tw`bg-white h-full`}
            data={notifications}
            renderItem={renderItem}
        />
    );
}

