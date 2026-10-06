import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {Keyboard} from 'react-native';
// Screens
import HomeScreen from '../screens/homeScreen';
import SearchScreen from '../screens/searchScreen';
import CategoryScreen from '../screens/categoryScreen';
import ChatScreen from '../screens/chatScreen';
import BagScreen from '../screens/bagScreen';
import MyOrderScreen from '../screens/myOrderScreen';
import ProfileScreen from '../screens/profileScreen';
import BasicInfoScreen from '../screens/basicInfoScreen';
import WishlistScreen from '../screens/WishlistScreen';
import {useState} from 'react';
// Icons
import {
  ColorHomeIcon,
  HomeIcon,
  ColorSearchIcon,
  SearchIcon,
  ColorCategoryIcon,
  CategoryIcon,
  ColorChatIcon,
  ChatIcon,
  ColorBagIcon,
  BagIcon,
  ShoppingBag,
  ColorShoppingBag,
  ReelsIcon,
  SellerHome,
  FilledCategoryIcon,
  EmptyCategoryIcon,
  NewSearch,
} from '../assets';

// Utils
import {fontFamily, fontSize, hp, isIOS, wp} from '../utils/helpers';
import RevewsScreen from '../screens/revewsScreen';
import SellerProfileScreen from '../screens/sellerProfileScreen';
import {GET_CART_REQUEST} from '../redux/actions/cartActions';
import ViralTrendsScreen from '../screens/ViralTrendsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ✅ Gradient Text Component
const GradientText = ({text}) => (
  <MaskedView
    maskElement={
      <Text
        style={{
          fontSize: fontSize(12),
          fontFamily: fontFamily.poppins400,
          textAlign: 'center',
          color: 'black',
          lineHeight: hp(18),
        }}>
        {text}
      </Text>
    }>
    <LinearGradient
      colors={['#5029F3', '#5029F3']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1.2}}>
      <Text
        style={{
          opacity: 0,
          fontSize: fontSize(12),
          fontFamily: fontFamily.poppins400,
          textAlign: 'center',
          lineHeight: hp(18),
        }}>
        {text}
      </Text>
    </LinearGradient>
  </MaskedView>
);

/* --------------------------
   STACKS FOR EACH TAB
--------------------------- */
const HomeStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
      <Stack.Screen name="MyOrderScreen" component={MyOrderScreen} />
      <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
      <Stack.Screen name="ReviewsScreen" component={RevewsScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

const SearchStackScreen = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="SearchScreen" component={SearchScreen} />
    <Stack.Screen name="SellerProfile" component={SellerProfileScreen} />
  </Stack.Navigator>
);

const CategoryStackScreen = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
  </Stack.Navigator>
);

const ChatStackScreen = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="ViralTrendsScreen" component={ViralTrendsScreen} />
  </Stack.Navigator>
);

const BagStackScreen = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="My Order" component={MyOrderScreen} />
  </Stack.Navigator>
);

/* --------------------------
   MAIN TAB NAVIGATOR
--------------------------- */
const MainTabNavigator = () => {
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const {loading, cartData, error} = useSelector(state => state.addToCard);
  const cartCount = cartData?.productDetailList?.length || 0;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  console.log('TAB CART COUNT =>', cartCount);

  useEffect(() => {
    if (token) {
      console.log('ALLING CART API FROM PRODUCT DETAILS');

      dispatch({
        type: GET_CART_REQUEST,
        token: token,
      });
    }
  }, [token]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        const childRouteName = getFocusedRouteNameFromRoute(route) ?? '';

        // Determine if we're on the main tab screen
        const isMainScreen =
          (route.name === 'HomeStack' &&
            (childRouteName === '' || childRouteName === 'HomeScreen')) ||
          (route.name === 'SearchStack' &&
            (childRouteName === '' ||
              childRouteName === 'SearchScreen' ||
              childRouteName === 'SellerProfile')) ||
          (route.name === 'CategoryStack' &&
            (childRouteName === '' || childRouteName === 'CategoryScreen')) ||
          (route.name === 'ReelsStack' &&
            (childRouteName === '' ||
              childRouteName === 'ViralTrendsScreen')) ||
          (route.name === 'My Order' &&
            (childRouteName === '' || childRouteName === 'My Order'));

        return {
          headerShown: false,

          tabBarStyle: {
            height:
              keyboardVisible ||
              (route.name === 'My Order' &&
                (childRouteName === 'BagScreen' || childRouteName === ''))
                ? 0
                : isIOS
                ? hp(75)
                : hp(70),

            display:
              keyboardVisible ||
              (route.name === 'My Order' &&
                (childRouteName === 'My Order' || childRouteName === ''))
                ? 'none'
                : 'flex',

            paddingTop: 5,
          },
          tabBarIcon: ({focused}) => {
            const iconSizeStyles = {
              HomeStack: {width: hp(15), height: hp(16)},
              SearchStack: {width: hp(16), height: hp(16)},
              CategoryStack: {width: hp(16), height: hp(16)},
              ChatStack: {width: hp(16), height: hp(16)},
              BagStack: {width: hp(13), height: hp(16)},
            };

            let IconComponent;
            switch (route.name) {
              case 'HomeStack':
                IconComponent = focused && isMainScreen ? SellerHome : HomeIcon;
                break;
              case 'SearchStack':
                IconComponent = IconComponent = NewSearch;
                break;

              case 'CategoryStack':
                IconComponent =
                  focused && isMainScreen
                    ? FilledCategoryIcon
                    : EmptyCategoryIcon;
                break;
              // case 'ReelsStack':
              //   IconComponent = focused && isMainScreen ? ReelsIcon : ReelsIcon;
              //   break;
              case 'ReelsStack':
                IconComponent = ReelsIcon;
                break;
              case 'My Order':
                IconComponent =
                  focused && isMainScreen ? ColorShoppingBag : ShoppingBag;
                break;
              default:
                IconComponent = HomeIcon;
            }

            const sizeStyle = iconSizeStyles[route.name] || {
              width: hp(20),
              height: hp(20),
            };

            return (
              <View style={{width: sizeStyle.width, height: sizeStyle.height}}>
                <IconComponent
                  width={sizeStyle.width}
                  height={sizeStyle.height}
                  color={focused && isMainScreen ? '#5029F4' : '#73707A'}
                />
              </View>
            );
          },
          tabBarLabel: ({focused}) =>
            focused && isMainScreen ? (
              <GradientText text={route.name.replace('Stack', '')} />
            ) : (
              <View>
                <Text
                  style={{
                    fontSize: fontSize(12),
                    fontFamily: fontFamily.poppins400,
                    color: 'black',
                    textAlign: 'center',
                    lineHeight: hp(18),
                  }}>
                  {route.name.replace('Stack', '')}
                </Text>
              </View>
            ),
        };
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault(); // prevent default tab behavior
            navigation.navigate('HomeStack', {screen: 'HomeScreen'}); // always go to HomeScreen
          },
        })}
      />
      <Tab.Screen name="SearchStack" component={SearchStackScreen} />
      <Tab.Screen name="CategoryStack" component={CategoryStackScreen} />
      <Tab.Screen name="ReelsStack" component={ViralTrendsScreen} />
      <Tab.Screen name="My Order" component={MyOrderScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
