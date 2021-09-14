import * as React from 'react';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VendorListItem from "../components/VendorListItem";
import tw from "tailwind-react-native-classnames";
import {List, Text} from "@ui-kitten/components";
import {View} from "react-native";

export default function VendorDetails({route}) {
    return (
        <View>
            <Text>Details {JSON.stringify(route.params.vendor.name)}</Text>
        </View>
    );
}

