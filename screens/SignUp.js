import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import tw from 'tailwind-react-native-classnames';
import {List} from "@ui-kitten/components";
import VendorListItem from '../components/VendorListItem';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Login() {
    return (
        <SafeAreaView>
            <Text style={tw`p-5 ios:pt-2 android:pt-10 bg-white text-3xl font-bold tracking-tight`}>My Vendors</Text>
            <View>
                <Text style={tw`pl-5 text-xl font-bold`}>Sign Up</Text>

            </View>
        </SafeAreaView>
    );
}
