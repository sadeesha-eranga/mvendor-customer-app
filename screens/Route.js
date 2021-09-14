import * as React from 'react';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VendorListItem from "../components/VendorListItem";
import tw from "tailwind-react-native-classnames";
import {List, Text} from "@ui-kitten/components";
import {View} from "react-native";

export default function Route({route}) {
    return (
        <View>
            <Text>Hello {JSON.stringify(route.params.vendor.name)}</Text>
        </View>
    );
}

