import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import Account from '../screens/Account';
import {BottomNavigation, BottomNavigationTab, Icon} from "@ui-kitten/components";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Vendors from "../screens/Vendors";
import Notifications from "../screens/Notifications";

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabBar = ({navigation, state}) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Home' icon={<Icon name='home'/>}/>
        <BottomNavigationTab title='Vendors' icon={<Icon name='car'/>}/>
        <BottomNavigationTab title='Notifications' icon={<Icon name='bell'/>}/>
        <BottomNavigationTab title='Account' icon={<Icon name='person'/>}/>
    </BottomNavigation>
);

const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name='Home' component={Home}/>
        <Screen name='Vendors' component={Vendors}/>
        <Screen name='Notifications' component={Notifications}/>
        <Screen name='Account' component={Account}/>
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator/>
    </NavigationContainer>
);
