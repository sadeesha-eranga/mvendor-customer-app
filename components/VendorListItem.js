import React from 'react';
import {StyleSheet, Text} from "react-native";
import {Avatar, Button, Card, ListItem} from "@ui-kitten/components";
import tw from "tailwind-react-native-classnames";

const MoreDetailsButton = () => (
    <Button size='tiny' status={"info"} appearance={"ghost"}>
        More details
    </Button>
);

const ItemImage = (props) => (
    <Avatar
        style={[props.style, {tintColor: null, height: 50, width: 50}]}
        source={{
            uri: 'https://d3iitm8eqnsqba.cloudfront.net/business/avatar.png'
        }}
    />
);

function VendorListItem({ vendor }) {
    return (
        <ListItem
            style={styles.item}
            title={vendor.name}
            description={vendor.category.name}
            accessoryLeft={ItemImage}
            accessoryRight={MoreDetailsButton}
        />
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

export default VendorListItem;
