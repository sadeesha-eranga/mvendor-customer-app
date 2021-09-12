import React from 'react';
import {StyleSheet} from "react-native";
import {Button, Card, ListItem, Avatar} from "@ui-kitten/components";

const MoreDetailsButton = () => (
    <Button size='tiny' status={"info"} appearance={"ghost"}>
        More details
    </Button>
);

const ItemImage = (props) => {
    console.log({props})
    return (<Avatar
        shape='rounded'
        size='large'
        source={{
            uri: props.vendor.image
        }}
    />);
};

function VendorListItem({vendor}) {
    return (
        <Card style={styles.card}>
            <ListItem
                style={styles.listItem}
                title={vendor.name}
                description={vendor.category.name}
                accessoryLeft={<ItemImage vendor={vendor} />}
                accessoryRight={<MoreDetailsButton vendor={vendor} />}
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
