import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import StartingScreen from '../screens/startingScreen';
import MainTabNavigator from './MainTabNavigator';
import DemoCodeScreen from '../screens/demoCodeScreen';
import ProductDetailsScreen from '../screens/productDetailsScreen';
import FullImage from '../components/FullImage';
import ProfileScreen from '../screens/profileScreen';
import BasicInfoScreen from '../screens/basicInfoScreen';
import AccountScreen from '../screens/accountScreen';
import AddressScreen from '../screens/addressScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import MenCategoryScreen from '../screens/menCategoryScreen';
import WomenCategoryScreen from '../screens/WomenCategoryScree';
import TrackOrderDetailScreen from '../screens/TrackOrderDetailScreen';
import ReviewRatingComponent from '../components/reviewRatingComponent';
import ReviewandRatingsScreen from '../screens/ReviewandRatingsScreen';
import revewsScreen from '../screens/revewsScreen';
import RevewsScreen from '../screens/revewsScreen';
import sellerProfileScreen from '../screens/sellerProfileScreen';
import SellerProfileScreen from '../screens/sellerProfileScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const token = useSelector(state => state.auth.token);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* 🔥 ALWAYS HOME FIRST */}
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />

      {/* OTHER SCREENS */}
      <Stack.Screen name="StartingScreen" component={StartingScreen} />
      <Stack.Screen name="DemoCodeScreen" component={DemoCodeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="FullImage" component={FullImage} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Basic Info" component={BasicInfoScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
      <Stack.Screen name="MenCategoryScreen" component={MenCategoryScreen} />
      <Stack.Screen name="TrackOrder" component={TrackOrderDetailScreen} />
      <Stack.Screen
        name="WomenCategoryScreen"
        component={WomenCategoryScreen}
      />
      <Stack.Screen name="ReviewRating" component={ReviewandRatingsScreen} />
      <Stack.Screen name="ReviewsScreen" component={RevewsScreen} />
      <Stack.Screen name="sellerProfile" component={SellerProfileScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
