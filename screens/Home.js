import * as React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { List } from "@ui-kitten/components";
import VendorListItem from '../components/VendorListItem';
import http from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
  const [arrivingVendors, setArrivingVendors] = useState([]);
  const [recentlyJoinedVendors, setRecentlyJoinedVendors] = useState([]);

  const loadVendors = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const [resArriving, resRecent] = await Promise.all([
        http.get('/api/v1/vendors/arriving/' + userId),
        http.get('/api/v1/vendors/recent/' + userId)
      ]);
      const {vendors: arriving} = resArriving.data;
      const {vendors: recent} = resRecent.data;
      setArrivingVendors(arriving);
      setRecentlyJoinedVendors(recent);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadVendors().then();
    });
  }, []);

  const renderArriving = ({item, index}) => (
    <VendorListItem from={'arriving'} navigation={navigation} vendor={item} index={index}/>
  );

  const renderRecent = ({item, index}) => (
    <VendorListItem from={'recent'} navigation={navigation} vendor={item} index={index}/>
  );

  return (
    <SafeAreaView>
      <Text style={tw`p-5 ios:pt-2 android:pt-10 bg-white text-3xl font-bold tracking-tight`}>My Vendors</Text>
      <View style={tw`bg-white h-1/2`}>
        <Text style={tw`pl-5 text-xl font-bold`}>Recently Joined</Text>
        <List
          style={tw`bg-white h-full`}
          data={recentlyJoinedVendors}
          renderItem={renderRecent}
        />
      </View>
      <View style={tw`bg-white h-1/2 pb-5`}>
        <Text style={tw`pl-5 text-xl font-bold`}>Arriving</Text>
        {arrivingVendors.length > 0 ? <List
          style={tw`bg-white h-full`}
          data={arrivingVendors}
          renderItem={renderArriving}
        /> : <Text style={tw`pl-5 pt-5`}>No arriving vendors at the moment</Text>}
      </View>
    </SafeAreaView>
  );
}
