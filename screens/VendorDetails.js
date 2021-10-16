import React from 'react';
import tw from "tailwind-react-native-classnames";
import { Image, View } from "react-native";
import { Button, Text } from '@ui-kitten/components';

export default function VendorDetails(props) {

  return (
    <View>
      <View style={tw`h-4/5 bg-white`}>
        <Image source={{uri: props.route.params.vendor.profileImage}} style={{width: 200, height: 200}}/>
        <Text style={[{margin: 20}]} category={'h2'}>{props.route.params.vendor.name}</Text>
        <Text style={[{marginLeft: 20, marginBottom: 10}]} category={'h6'}>{props.route.params.vendor.mobile}</Text>
        <Text style={[{marginLeft: 20, marginBottom: 10}]} category={'s1'}>{props.route.params.vendor.description}</Text>
      </View>
      <View style={tw`h-1/5 bg-white`}>
        <Button appearance='outline' status={'primary'} style={[{margin: 20, marginBottom: 0, height: 60}]}
                onPress={() => props.navigation.navigate('Routes', {vendor: props.route.params.vendor})}>
          View Routes
        </Button>
      </View>
    </View>
  );
}

