import React, { useEffect, useMemo, useState } from 'react';
import tw from "tailwind-react-native-classnames";
import { Avatar, Layout, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import Map from "../components/Map";
import { RouteContext } from '../navigation/context';

export default function Route(props) {

  const [route, setRoute] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const routeContext = useMemo(() => ({
    setRouteDistance: (data) => {
      setDistance(data);
    },
    setRouteDuration: (data) => {
      setDuration(data);
    }
  }), [distance, duration]);

  useEffect(() => {
    setRoute(props.route.params.vendor.route);
    setVendor(props.route.params.vendor);
  }, []);

  return (
    <RouteContext.Provider value={routeContext}>
      <View>
        {(!!route && !!vendor) ? <View>
          <View style={tw`h-4/5`}>
            <Map vendor={vendor}/>
          </View>
          <View style={tw`h-1/5 bg-white`}>
            <Text style={tw`text-xl ml-5 font-bold mt-5`}>{vendor.name}</Text>
            <Layout style={styles.schedulesContainer} level='1'>
              <View>
                <Text style={tw`ml-5 font-bold`}>{distance} away</Text>
                <Text style={tw`ml-5 font-bold mt-2`}>Arrive in {duration}</Text>
                <Text style={tw`ml-5 mt-2`}>{vendor.description}</Text>
              </View>
              <Avatar style={tw`mr-2`} shape={'round'} size='giant' source={{uri: vendor.profileImage}}/>
            </Layout>
          </View>
        </View> : <View style={tw`items-center pt-20 bg-white h-full`}><Text>No active route found..</Text></View>
        }
      </View>
    </RouteContext.Provider>
  );
}

const styles = StyleSheet.create({
  schedulesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginBottom: 0,
  },
});

