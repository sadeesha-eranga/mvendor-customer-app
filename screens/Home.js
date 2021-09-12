import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';

import tw from 'tailwind-react-native-classnames';

export default function Home({ navigation }) {

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <Text style={tw`p-5 text-3xl font-bold tracking-tight`}>Home</Text>
        </SafeAreaView>
    );
}
