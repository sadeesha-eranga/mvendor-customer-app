import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import tw from 'tailwind-react-native-classnames';
import {Icon, Avatar, Button, ListItem, List} from "@ui-kitten/components";

const InstallButton = (props) => (
    <Button size='tiny' status={"info"} appearance={"ghost"}>
        More details
    </Button>
);

const ItemImage = (props) => (
    <Avatar
        {...props}
        style={[props.style, { tintColor: null, height: 50, width: 50 }]}
        source={require('../assets/icon.png')}
    />
);

export default function Home({navigation}) {

    const renderItem = ({ item, index }) => (
        <ListItem
            style={styles.item}
            title='UI Kitten'
            description={<Text style={tw`m-5`}>Hello</Text>}
            accessoryLeft={ItemImage}
            accessoryRight={InstallButton}
        />
    );

    return (
        <View style={tw`bg-white h-full`}>
            <Text style={tw`p-5 text-3xl font-bold tracking-tight`}>My Vendors</Text>
            <Text style={tw`pl-5 text-xl font-bold`}>Arriving</Text>
            <List
                style={tw`bg-white h-full`}
                data={[{something: 'sasd'}]}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderStyle: "solid",
        borderColor: '#E6AD00',
        backgroundColor: 'rgba(253,205,3,0.25)'
    }
});
