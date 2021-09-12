import React from 'react';
import {StyleSheet, Text} from "react-native";
import {Avatar, Button, Card, ListItem} from "@ui-kitten/components";

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

function VendorListItem({vendor}) {
    return (
        <Card style={styles.card}>
            <ListItem
                style={styles.listItem}
                title={vendor.name}
                description={vendor.category.name}
                accessoryLeft={ItemImage}
                accessoryRight={MoreDetailsButton}
            />
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderStyle: "solid",
        borderColor: '#E6AD00',
        backgroundColor: 'rgba(253,205,3,0.25)'
    },
    listItem: {
        margin: -15,
        backgroundColor: 'transparent',
    }
});

export default VendorListItem;
