import React, {useEffect} from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppNavigator from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {

    const data = new Array(8).fill({
        name: 'Vendor',
        image: 'https://d3iitm8eqnsqba.cloudfront.net/business/avatar.png',
        category: {
            id: 1,
            name: 'Food'
        },
        routeId: 539,
        routeName: 'Route 1',
        locationPoints: locationPoints,
        "startLatitude": 6.88798218,
        "startLongitude": 79.93178666,
        "endLatitude": 6.88834711,
        "endLongitude": 79.93078371
    }).map((vendor, index) => ({
        ...vendor,
        name: `${vendor.name} ${index + 1}`,
        id: index + 1
    }));

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

export default App;

const locationPoints = [
    {
        "locationPointId": 2925,
        "latitude": 6.88798218,
        "longitude": 79.93178666,
        "routeNo": 362
    },
    {
        "locationPointId": 2926,
        "latitude": 6.88570354,
        "longitude": 79.93113576,
        "routeNo": 362
    },
    {
        "locationPointId": 2927,
        "latitude": 6.88498363,
        "longitude": 79.92891716,
        "routeNo": 362
    },
    {
        "locationPointId": 2928,
        "latitude": 6.88548357,
        "longitude": 79.92817479,
        "routeNo": 362
    },
    {
        "locationPointId": 2929,
        "latitude": 6.88741342,
        "longitude": 79.92910779,
        "routeNo": 362
    },
    {
        "locationPointId": 2930,
        "latitude": 6.88834711,
        "longitude": 79.93078371,
        "routeNo": 362
    }
]
