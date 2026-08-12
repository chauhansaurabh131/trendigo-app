import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAuthToken, setLoginType} from '../redux/actions/authActions';
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
import SearchResultScreen from '../screens/SearchResultsScreen';
import SendEquiryScreen from '../screens/SendEquiryScreen';
import HomeScreen from '../SellerScreens/HomeScreen.js';
import SellerMainTabNavigator from './SellerMainTabNavigation.js';
import ProductFullDetailsScreen from '../SellerScreens/ProductFullDetailsScreen/index.js';
import SellerProfileScreen from '../SellerScreens/SellerProfileScreen/index.js';
import SellerChatMessagesscreen from '../SellerScreens/SellerChatMessagescreen/index.js';
import {connectSocket} from '../socket/socket.js';
// import sellerProfileScreen from '../screens/sellerProfileScreen';
// import SellerProfileScreen from '../screens/sellerProfileScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const dispatch = useDispatch();
  const [userType, setUserType] = React.useState(null);
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = React.useState(true);
  // useEffect(() => {
  //   const initAuth = async () => {
  //     const storedToken = await AsyncStorage.getItem('authToken');

  //     if (storedToken) {
  //       dispatch(setAuthToken(storedToken));
  //     }

  //     setLoading(false);
  //   };

  //   initAuth();
  // }, []);

  useEffect(() => {
    const initAuth = async () => {
      const sessionString = await AsyncStorage.getItem('userSession');

      console.log('SESSION STRING =>', sessionString);

      if (sessionString) {
        const session = JSON.parse(sessionString);

        console.log('SESSION =>', session);

        setUserType(session?.type);

        dispatch(setAuthToken(session?.token));
      }

      setLoading(false);
    };

    initAuth();
  }, []);
  useEffect(() => {
    const loadLoginType = async () => {
      const savedType = await AsyncStorage.getItem('loginType');

      console.log('LOADED LOGIN TYPE:', savedType);

      if (savedType) {
        dispatch(setLoginType(savedType));
      }
    };

    loadLoginType();
  }, []);

  console.log('USER TYPE IN ROOT NAVI.. =>', userType);

  useEffect(() => {
    const initializeSocket = async () => {
      const token = await AsyncStorage.getItem('sellerAccessToken');
      console.log('SOCKET TOKEN =>', token);
      const socket = connectSocket(token);

      socket.on('connect', () => {
        console.log('SOCKET CONNECTED IN ROOT');
      });
    };

    initializeSocket();
  }, []);

  if (loading) return null;
  return (
    <Stack.Navigator
      initialRouteName={userType === 'seller' ? 'SellerMains' : 'MainTabs'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />

      <Stack.Screen name="SellerMains" component={SellerMainTabNavigator} />

      {/* Other screens */}

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
      <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} />
      <Stack.Screen name="SendEquiryScreen" component={SendEquiryScreen} />

      {/* Seller Screens */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      {/* <Stack.Screen name="SellerMains" component={SellerMainTabNavigator} /> */}
      <Stack.Screen
        name="ProductFullDetailsScreen"
        component={ProductFullDetailsScreen}
      />
      <Stack.Screen name="SellerProfile" component={SellerProfileScreen} />
      <Stack.Screen
        name="SellerChatMessage"
        component={SellerChatMessagesscreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
