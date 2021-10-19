import React, { useContext, useEffect, useState } from 'react';
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteContext } from '../navigation/context';
import http from '../utils/http';
import { Image } from 'react-native';
import { getDuration } from '../utils/requests';

function Map(props) {
  const [startLatLon, setStartLatLon] = useState(null);
  const [endLatLon, setEndLatLon] = useState(null);
  const [prevStartLatLon, setPrevStartLatLon] = useState({latitude: 0, longitude: 0});
  const [mapRef, setMapRef] = useState(null);

  const {setRouteDistance, setRouteDuration} = useContext(RouteContext);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (!endLatLon) fetchUserLocation().then();
        const {data} = await http.get('/api/v1/vendors/location/' + props.vendor.id);
        if (data.success) {
          setStartLatLon({
            latitude: +data.location.latitude.toFixed(4),
            longitude: +data.location.longitude.toFixed(4)
          });
        }
      } catch (e) {
        console.log(e);
      }
    }

    const timer = setInterval(() => {
      fetchLocation().then();
    }, 1000);

    return () => {
      clearInterval(timer);
      console.log('Cleared timer');
    };
  }, []);

  const fetchUserLocation = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const {userDetails: {latitude, longitude}} = JSON.parse(user);
      setEndLatLon({latitude, longitude});
    } catch (e) {
      console.log(e);
    }
  }

  const updateDuration = async () => {
    try {
      if (!(prevStartLatLon.latitude === startLatLon.latitude && prevStartLatLon.longitude === startLatLon.longitude)) {
        console.log('fetching duration');
        setPrevStartLatLon({...startLatLon});
        const {data} = await getDuration(startLatLon, endLatLon);
        console.log(data);
        setRouteDuration(data?.rows[0]?.elements[0]?.duration.text);
        setRouteDistance(data?.rows[0]?.elements[0]?.distance.text);
      }
    } catch (e) {
      console.log('Duration update error', e);
    }
  };

  useEffect(() => {
    if (!startLatLon || !endLatLon) return;
    mapRef.fitToSuppliedMarkers(["origin", 'destination'], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
    });

    updateDuration().then();
  }, [startLatLon, endLatLon]);

  return (
    <MapView
      style={tw`flex-1`}
      ref={(ref) => {
        setMapRef(ref);
      }}
      onLayout={() => mapRef.fitToSuppliedMarkers(["origin", 'destination'], {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
      })}
    >
      {startLatLon && (<Marker
        coordinate={{
          latitude: startLatLon.latitude,
          longitude: startLatLon.longitude
        }}
        title={props.vendor.name}
        identifier={'origin'}
      >
        <Image source={require('../assets/vendor.png')} style={{height: 35, width: 35}}/>
      </Marker>)}
      {endLatLon && (<Marker
        coordinate={{
          latitude: endLatLon.latitude,
          longitude: endLatLon.longitude
        }}
        title={'Home'}
        identifier={'destination'}
      >
        <Image source={require('../assets/home.png')} style={{height: 35, width: 35}}/>
      </Marker>)}
    </MapView>
  );
}

export default Map;
