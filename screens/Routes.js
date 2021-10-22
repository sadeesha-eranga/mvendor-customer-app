import React, { useEffect, useState } from 'react';
import tw from "tailwind-react-native-classnames";
import { StyleSheet, Text, View } from "react-native";
import http from '../utils/http';
import { Button, Icon, Layout, List } from '@ui-kitten/components';
import DrawRouteMap from '../components/DrawRouteMap';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Routes(props) {

  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [disableNextButton, setDisableNextButton] = useState(false);
  const [disablePrevButton, setDisablePrevButton] = useState(false);

  const getRoutes = async () => {
    try {
      const vendorId = props.route.params.vendor.id;
      const userId = await AsyncStorage.getItem('userId');
      const {data} = await http.get(`/api/v1/routes/vendors/${vendorId}/customers/${userId}`);
      if (data.success) {
        const _routes = data.routes.map((route, index) => ({...route, index: index}));
        setRoutes(_routes);
        if (_routes.length > 0) {
          setSelectedRoute(_routes[0]);
        }

        if (_routes.length < 2) {
          setDisableNextButton(true);
          setDisablePrevButton(true);
        }
        setDisablePrevButton(true);
      } else {
        console.log('Something went wrong');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeSelectedRoute = (action) => {
    if (action === 'right') {
      if (selectedRoute.index < routes.length - 1) {
        setSelectedRoute(routes[selectedRoute.index + 1]);
      }
    } else {
      if (selectedRoute.index > 0) {
        setSelectedRoute(routes[selectedRoute.index - 1]);
      }
    }

    if (selectedRoute.index === routes.length - 2) {
      setDisableNextButton(true);
      setDisablePrevButton(false);
    } else {
      setDisableNextButton(false);
    }

    if (selectedRoute.index === 1) {
      setDisablePrevButton(true);
      setDisableNextButton(false);
    } else {
      setDisablePrevButton(false);
    }
  };

  const handleSubscription = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const {data} = await http.post('/api/v1/subscriptions', {
        routeId: selectedRoute.id,
        customerId: userId,
        status: selectedRoute.subscribed ? 'INACTIVE' : 'ACTIVE'
      });
      if (data.success) {
        alert(`${selectedRoute.subscribed ? 'Unsubscribed' : 'Subscribed'} successfully!`);
        setSelectedRoute({...selectedRoute, subscribed: !selectedRoute.subscribed});
        setRoutes(routes.map(route => {
          if (route.id === selectedRoute.id) {
            route.subscribed = !selectedRoute.subscribed;
          }
          return route;
        }));
      } else {
        alert('Something went wrong');
      }
    } catch (e) {
      console.log(e);
      alert('Something went wrong');
    }
  };

  const renderItem = ({item}) => {
    return (<View style={styles.schedule}>
      <Text style={tw`text-lg font-bold`} >{item.dayOfWeek.toUpperCase()}</Text>
      <Text style={tw`text-lg`}>{moment(item.startTime, 'HH:mm:ss')
        .format('LT').toString()} - {moment(item.endTime, 'HH:mm:ss')
        .format('LT').toString()}</Text>
    </View>);
  };

  useEffect(() => {
    getRoutes().then();
  }, []);

  return (<>{
    (routes.length > 0 && selectedRoute) ? <View>
      <View style={tw`h-4/6`}>
        {selectedRoute && <DrawRouteMap item={selectedRoute} />}
      </View>
      <View style={tw`h-2/6 bg-white`}>
        <Layout style={styles.container} level='1'>
          <Button disabled={disablePrevButton} style={[styles.button]} status={'warning'} appearance='outline'
                  onPress={() => changeSelectedRoute('left')}
                  accessoryLeft={<Icon {...props} name='arrow-circle-left'/>}/>
          <Text style={[tw`pt-4 font-bold text-lg`]}>{selectedRoute.name}</Text>
          <Button disabled={disableNextButton} style={styles.button} status={'warning'} appearance='outline'
                  onPress={() => changeSelectedRoute('right')}
                  accessoryLeft={<Icon {...props} name='arrow-circle-right'/>}/>
        </Layout>
        <Layout style={styles.schedulesContainer} level='1'>
          <List
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={tw`bg-white h-full`}
            data={selectedRoute.schedules}
            renderItem={renderItem}
          />
        </Layout>
        <Button style={styles.btn} status={selectedRoute.subscribed ? 'danger' : 'warning'}
                onPress={() => handleSubscription()}>
          {selectedRoute.subscribed ? 'UNSUBSCRIBE' : 'SUBSCRIBE'}
        </Button>
      </View>
    </View> : <View style={tw`h-full bg-white items-center pt-20`}>
      <Text>No routes found!</Text>
    </View>
  }</>);
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    margin: 10,
    marginTop: 0,
  },
  button: {
    margin: 5,
    borderRadius: 50,
    width: 45,
    height: 45,
    marginBottom: 0,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  schedule: {
    margin: 10,
    marginTop: 0,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FDCD03',
    padding: 5,
    height: 70,
  },
  schedulesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginBottom: 0,
    marginTop: -40
  },
});

