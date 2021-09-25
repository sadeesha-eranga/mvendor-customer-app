import React from 'react';
import {BottomNavigation, BottomNavigationTab, Icon} from "@ui-kitten/components";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import Account from '../screens/Account';
import Vendors from "../screens/Vendors";
import Notifications from "../screens/Notifications";
import Route from '../screens/Route';
import VendorDetails from "../screens/VendorDetails";

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const VendorsStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const AccountStack = createStackNavigator();

const BottomTabBar = ({navigation, state}) => (
    <BottomNavigation
        appearance={"noIndicator"}
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Home' icon={<Icon name='home'/>}/>
        <BottomNavigationTab title='Vendors' icon={<Icon name='car'/>}/>
        <BottomNavigationTab title='Notifications' icon={<Icon name='bell'/>}/>
        <BottomNavigationTab title='Account' icon={<Icon name='person'/>}/>
    </BottomNavigation>
);

const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <HomeStack.Screen name="Route" component={Route} />
    </HomeStack.Navigator>
);

const VendorsStackScreen = () => (
    <VendorsStack.Navigator>
        <VendorsStack.Screen name="Vendors" component={Vendors} />
        <VendorsStack.Screen name="VendorDetails" component={VendorDetails} />
    </VendorsStack.Navigator>
);

const NotificationStackScreen = () => (
    <NotificationsStack.Navigator>
        <NotificationsStack.Screen name="Notifications" component={Notifications} />
    </NotificationsStack.Navigator>
);

const AccountStackScreen = () => (
    <AccountStack.Navigator>
        <AccountStack.Screen name="Account" component={Account} />
    </AccountStack.Navigator>
);

export default () => (
    <NavigationContainer>
        <Tabs.Navigator tabBar={props => <BottomTabBar {...props} />}>
            <Tabs.Screen name="HomeStack" component={HomeStackScreen} options={{ headerShown: false }}/>
            <Tabs.Screen name="VendorsStack" component={VendorsStackScreen} options={{ headerShown: false }}/>
            <Tabs.Screen name="NotificationsStack" component={NotificationStackScreen} options={{ headerShown: false }}/>
            <Tabs.Screen name="AccountStack" component={AccountStackScreen} options={{ headerShown: false }}/>
        </Tabs.Navigator>
    </NavigationContainer>
);
