import React from 'react';
import {StyleSheet} from "react-native";
import {Card, ListItem, Avatar, Icon} from "@ui-kitten/components";
import {TouchableOpacity} from "react-native-gesture-handler";

const ItemImage = ({vendor}) => {
    return (<Avatar
        shape='rounded'
        size='large'
        source={{
            uri: vendor.image
        }}
    />);
};

function VendorListItem({vendor, navigation, from}) {
    return (
        <Card style={styles.card}>
            <TouchableOpacity onPress={() => {
                navigation.navigate(from === 'home'? 'Route' : 'VendorDetails', {vendor});
            }}>
                <ListItem
                    style={styles.listItem}
                    title={vendor.name}
                    description={vendor.category.name}
                    accessoryLeft={<ItemImage vendor={vendor}/>}
                    accessoryRight={<Icon name={"arrow-circle-right"}/>}
                />
            </TouchableOpacity>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        marginHorizontal: 18,
        borderStyle: "solid",
        borderColor: '#E6AD00',
        backgroundColor: 'rgba(253,205,3,0.25)'
    },
    listItem: {
        margin: -8,
        backgroundColor: 'transparent',
    }
});

export default VendorListItem;
