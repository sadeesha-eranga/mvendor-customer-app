import * as React from 'react';
import tw from "tailwind-react-native-classnames";
import {Text} from "@ui-kitten/components";
import {View} from "react-native";
import Map from "../components/Map";

export default function Route({route}) {
    return (
        <View>
            <View style={tw`h-4/5`}>
                <Map route={route}/>
            </View>
            <View style={tw`h-1/5 bg-white`}>
                <Text>Vendor {JSON.stringify(route.params.vendor.name)}</Text>
                <Text>Route ID {JSON.stringify(route.params.vendor.routeId)}</Text>
                <Text>Route Name {JSON.stringify(route.params.vendor.routeName)}</Text>
                <Text>Location Points {JSON.stringify(route.params.vendor.locationPoints)}</Text>
            </View>
        </View>
    );
}

