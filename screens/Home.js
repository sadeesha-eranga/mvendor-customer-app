import * as React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { List } from "@ui-kitten/components";
import VendorListItem from '../components/VendorListItem';
import http from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
  const [arrivingNowVendors, setArrivingNowVendors] = useState([]);
  const [arrivingTodayVendors, serArrivingTodayVendors] = useState([]);

  const loadVendors = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const [resNow, resToday] = await Promise.all([
        http.get('/api/v1/vendors/arriving/' + userId),
        http.get('/api/v1/vendors/today/' + userId)
      ]);
      const {vendors: now} = resNow.data;
      const {vendors: today} = resToday.data;
      const nowIds = now.map(v => v.id);
      const todayVendors = today.filter(vendor => !(nowIds.includes(vendor.id)));
      setArrivingNowVendors(now);
      serArrivingTodayVendors(todayVendors);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadVendors().then();
    });
  }, []);

  const renderArrivingNow = ({item, index}) => (
    <VendorListItem from={'arriving'} navigation={navigation} vendor={item} index={index}/>
  );

  const renderArrivingToday = ({item, index}) => (
    <VendorListItem from={'recent'} navigation={navigation} vendor={item} index={index}/>
  );

  return (
    <SafeAreaView>
      <Text style={tw`p-5 ios:pt-2 android:pt-10 bg-white text-3xl font-bold tracking-tight`}>My Vendors</Text>
      <View>
        <View style={[tw`bg-white`, {height: '50%'}]}>
          <Text style={tw`pl-5 text-xl font-bold`}>Arriving Today</Text>
          {arrivingTodayVendors.length > 0 ? <List
            style={tw`bg-white h-full`}
            data={arrivingTodayVendors}
            renderItem={renderArrivingToday}
          /> : <Text style={tw`pl-5 pt-5`}>No subscribed vendors are arriving today.</Text>}
        </View>
        <View style={[tw`bg-white pb-5`, {height: '45%'}]}>
          <Text style={tw`pl-5 text-xl font-bold`}>Arriving Now</Text>
          {arrivingNowVendors.length > 0 ? <List
            style={tw`bg-white h-full`}
            data={arrivingNowVendors}
            renderItem={renderArrivingNow}
          /> : <Text style={tw`pl-5 pt-5`}>There are no arriving vendors at the moment.</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
}
