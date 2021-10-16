import React, {useEffect, useRef, useState} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import AppNavigator from './navigation';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import {Platform} from "react-native";
import {updateNotificationToken} from './utils/requests';
import AsyncStorage from "@react-native-async-storage/async-storage";

function App() {
    useEffect(() => {
        registerForPushNotificationsAsync().then(async token => {
            if (token) {
                try {
                    const userId = await AsyncStorage.getItem('userId');
                    const res = await updateNotificationToken({
                        userId,
                        token,
                        userType: 'CUSTOMER'
                    });
                    console.log('res', res.data);
                } catch (e) {
                    console.log('Notification token update error:', e);
                }
            }
        }).catch(e => console.log('Notification registration error:', e));

        Notifications.addNotificationReceivedListener(notification => {
            console.log('New notification', notification);
        });

        Notifications.addNotificationResponseReceivedListener(response => {
            console.log('response', response);
        });
    }, []);

    return (<>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppNavigator/>
      </ApplicationProvider>
    </>);
}

async function registerForPushNotificationsAsync() {
    return new Promise(async (resolve, reject) => {
        if (!Constants.isDevice) return reject('Not a device');
        let token;
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            }).then();
        }

        return resolve(token);
    });
}

export default App;
