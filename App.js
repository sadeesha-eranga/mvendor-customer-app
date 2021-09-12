import React, {useEffect} from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

    const data = new Array(8).fill({
        name: 'Item',
        image: 'https://d3iitm8eqnsqba.cloudfront.net/business/avatar.png',
        category: {
            id: 1,
            name: 'Food'
        }
    });

    useEffect(() => {
        AsyncStorage.removeItem('@vendors').then(() => {
            AsyncStorage.setItem('@vendors', JSON.stringify(data)).then().catch();
        }).catch();
    }, [])

    return (<>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppNavigator/>
      </ApplicationProvider>
    </>);
};
