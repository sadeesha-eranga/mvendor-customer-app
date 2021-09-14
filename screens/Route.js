import * as React from 'react';
import tw from "tailwind-react-native-classnames";
import {Text} from "@ui-kitten/components";
import {View} from "react-native";
import Map from "../components/Map";

export default function Route({route}) {

    return (
        <View>
            <View style={tw`h-4/5`}>
                <Map/>
            </View>
            <View style={tw`h-1/5 bg-white`}>
                <Text>Route {JSON.stringify(route.params.vendor.name)}</Text>
            </View>
        </View>
    );
}

