import React, { useContext, useEffect, useState } from 'react';
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { GOOGLE_MAPS_APIKEY } from "@env";
import MapViewDirections from "react-native-maps-directions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteContext } from '../navigation/context';

function Map(props) {
  const [startLatLon, setStartLatLon] = useState(null);
  const [endLatLon, setEndLatLon] = useState(null);
  const [mapRef, setMapRef] = useState(null);

  const {setRouteDistance, setRouteDuration} = useContext(RouteContext);

  useEffect(() => {
    const vendor = props.vendor;
    setStartLatLon({latitude: vendor?.currentLatitude, longitude: vendor?.currentLongitude});
    AsyncStorage.getItem('user').then((user) => {
      const {userDetails: {latitude, longitude}} = JSON.parse(user);
      setEndLatLon({latitude, longitude});
    });
  }, [props.vendor]);

  useEffect(() => {
    if (!startLatLon || !endLatLon) return;
    mapRef.fitToSuppliedMarkers(["origin", 'destination'], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
    });
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
      {(mapRef && startLatLon && endLatLon) && <MapViewDirections
        lineDashPattern={[1]}
        origin={startLatLon}
        destination={endLatLon}
        waypoints={[startLatLon, endLatLon]}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={4}
        strokeColor="#E6AD00"
        optimizeWaypoints={true}
        mode={'DRIVING'}
        onStart={(params) => {
          console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
        }}
        onReady={result => {
          console.log(`Distance: ${result.distance} km`)
          console.log(`Duration: ${result.duration} min.`)
          setRouteDistance(result.distance);
          setRouteDuration(result.duration);
        }}
        onError={(errorMessage) => {
          console.log('GOT AN ERROR', errorMessage);
        }}
      />}
      {endLatLon && (<Marker
        coordinate={{
          latitude: endLatLon.latitude,
          longitude: endLatLon.longitude
        }}
        title={'Vendor Location'}
        identifier={'origin'}
      />)}
      {startLatLon && (<Marker
        coordinate={{
          latitude: startLatLon.latitude,
          longitude: startLatLon.longitude
        }}
        title={'My Location'}
        identifier={'destination'}
      />)}
    </MapView>
  );
}

export default Map;
