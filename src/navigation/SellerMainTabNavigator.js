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
  SellerHome,
} from '../assets';

// Utils
import {fontFamily, fontSize, hp, isIOS, wp} from '../utils/helpers';
import RevewsScreen from '../screens/revewsScreen';
import SellerProfileScreen from '../screens/sellerProfileScreen';
import {GET_CART_REQUEST} from '../redux/actions/cartActions';
import HomeScreen from '../AllSellerScreens/HomeScreen';
import OrderScreen from '../AllSellerScreens/OrderScreen';
import ProductScreen from '../AllSellerScreens/ProductScreen';
import MessageScreen from '../AllSellerScreens/MessageScreen';
import AlerttScreen from '../AllSellerScreens/AlertScreen';

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
      colors={['#5029F4', '#5029F4']}
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
    </Stack.Navigator>
  );
};

const OrderStackScreen = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="OrderScreen" component={OrderScreen} />
  </Stack.Navigator>
);

const ProductStackScreen = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="ProductScreen" component={ProductScreen} />
  </Stack.Navigator>
);

const MesssageStackScreen = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="MessageScreen" component={MessageScreen} />
  </Stack.Navigator>
);

const AlertsStackScreen = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="AlertsScreen" component={AlerttScreen} />
  </Stack.Navigator>
);

/* --------------------------
   MAIN TAB NAVIGATOR
--------------------------- */
const SellerMainTabNavigator = () => {
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

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

  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        const childRouteName = getFocusedRouteNameFromRoute(route) ?? '';

        // Determine if we're on the main tab screen
        const isMainScreen =
          (route.name === 'HomeStack' &&
            (childRouteName === '' || childRouteName === 'HomeScreen')) ||
          (route.name === 'OrderStack' &&
            (childRouteName === '' ||
              childRouteName === 'SearchScreen' ||
              childRouteName === 'SellerProfile')) ||
          (route.name === 'ProductStack' &&
            (childRouteName === '' || childRouteName === 'CategoryScreen')) ||
          (route.name === 'MesssageStack' &&
            (childRouteName === '' || childRouteName === 'ChatScreen')) ||
          (route.name === 'AlertsStack' &&
            (childRouteName === '' || childRouteName === 'BagScreen'));

        return {
          headerShown: false,

          tabBarStyle: {
            height:
              keyboardVisible ||
              (route.name === 'BagStack' &&
                (childRouteName === 'BagScreen' || childRouteName === ''))
                ? 0
                : isIOS
                ? hp(75)
                : hp(70),

            display:
              keyboardVisible ||
              (route.name === 'BagStack' &&
                (childRouteName === 'BagScreen' || childRouteName === ''))
                ? 'none'
                : 'flex',

            paddingTop: 5,
          },
          tabBarIcon: ({focused}) => {
            const iconSizeStyles = {
              HomeStack: {width: hp(15), height: hp(16)},
              OrderStack: {width: hp(16), height: hp(16)},
              ProductStack: {width: hp(16), height: hp(16)},
              MesssageStack: {width: hp(16), height: hp(16)},
              AlertsStack: {width: hp(13), height: hp(16)},
            };

            let IconComponent;
            switch (route.name) {
              case 'HomeStack':
                IconComponent = focused && isMainScreen ? SellerHome : HomeIcon;
                break;
              case 'OrderStack':
                IconComponent =
                  focused && isMainScreen ? ColorSearchIcon : SearchIcon;
                break;

              case 'ProductStack':
                IconComponent =
                  focused && isMainScreen ? ColorSearchIcon : SearchIcon;
                break;
              case 'MesssageStack':
                IconComponent =
                  focused && isMainScreen ? ColorChatIcon : ChatIcon;
                break;
              case 'AlertsStack':
                IconComponent =
                  focused && isMainScreen ? ColorBagIcon : BagIcon;
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
      <Tab.Screen name="OrderStack" component={OrderStackScreen} />
      <Tab.Screen name="ProductStack" component={ProductStackScreen} />
      <Tab.Screen name="MesssageStack" component={MesssageStackScreen} />
      <Tab.Screen name="AlertsStack" component={AlertsStackScreen} />
    </Tab.Navigator>
  );
};

export default SellerMainTabNavigator;
