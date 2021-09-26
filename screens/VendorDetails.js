import * as React from 'react';
import {Text} from "@ui-kitten/components";
import {View} from "react-native";

export default function VendorDetails({route}) {
    return (
        <View>
            <Text>Details {JSON.stringify(route.params.vendor.name)}</Text>
        </View>
    );
}

