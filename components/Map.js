import React, {useEffect} from 'react';
import MapView from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import {GOOGLE_MAPS_APIKEY} from "@env";

function Map(props) {

    useEffect(() => {
        console.log({GOOGLE_MAPS_APIKEY})
    }, []);

    return (
        <MapView
            style={tw`flex-1`}
            initialRegion={{
                latitude: 6.5922443,
                longitude: 79.9578497,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        />
    );
}

export default Map;
