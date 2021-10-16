import * as React from 'react';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VendorListItem from "../components/VendorListItem";
import tw from "tailwind-react-native-classnames";
import { List, Text } from "@ui-kitten/components";
import { View } from 'react-native';

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
    loadNotifications().then();
  }, []);

  const renderItem = ({item, index}) => (
    <VendorListItem vendor={item} index={index}/>
  );

  return (
    <View style={tw`bg-white h-full`}>
      {
        notifications.length > 0 ? <List
          style={tw`bg-white h-full`}
          data={notifications}
          renderItem={renderItem}
        /> : <View style={tw`items-center pt-20`}><Text>No notifications</Text></View>
      }
    </View>
  );
}

