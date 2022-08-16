import * as React from 'react';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "tailwind-react-native-classnames";
import { List, Text } from "@ui-kitten/components";
import { View } from 'react-native';
import http from '../utils/http';
import NotificationListItem from '../components/NotificationListItem';

export default function Notifications(props) {

  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const {data} = await http.get('/api/v1/notifications/customers/' + userId);
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      loadNotifications().then();
    });
  }, []);

  const renderItem = ({item, index}) => (
    <NotificationListItem item={item} navigation={props.navigation} index={index}/>
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

