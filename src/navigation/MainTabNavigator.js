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
} from '../assets';

// Utils
import {fontFamily, fontSize, hp, isIOS, wp} from '../utils/helpers';
import RevewsScreen from '../screens/revewsScreen';
import SellerProfileScreen from '../screens/sellerProfileScreen';
import {GET_CART_REQUEST} from '../redux/actions/cartActions';

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
      colors={['#0F52BA', '#8225AF']}
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
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
  </Stack.Navigator>
);

const BagStackScreen = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="BagScreen" component={BagScreen} />
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
          (route.name === 'ChatStack' &&
            (childRouteName === '' || childRouteName === 'ChatScreen')) ||
          (route.name === 'BagStack' &&
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
              SearchStack: {width: hp(16), height: hp(16)},
              CategoryStack: {width: hp(16), height: hp(16)},
              ChatStack: {width: hp(16), height: hp(16)},
              BagStack: {width: hp(13), height: hp(16)},
            };

            let IconComponent;
            switch (route.name) {
              case 'HomeStack':
                IconComponent =
                  focused && isMainScreen ? ColorHomeIcon : HomeIcon;
                break;
              case 'SearchStack':
                IconComponent =
                  focused && isMainScreen ? ColorSearchIcon : SearchIcon;
                break;

              case 'CategoryStack':
                IconComponent =
                  focused && isMainScreen ? ColorCategoryIcon : CategoryIcon;
                break;
              case 'ChatStack':
                IconComponent =
                  focused && isMainScreen ? ColorChatIcon : ChatIcon;
                break;
              case 'BagStack':
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

                {route.name === 'BagStack' && cartCount > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      right: wp(-13),
                      top: wp(-12),
                      backgroundColor: '#5029F3',
                      borderRadius: wp(20),
                      width: hp(18),
                      height: hp(18),
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: wp(3),
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: fontSize(10),
                        fontFamily: fontFamily.poppins400,
                      }}>
                      {cartCount}
                    </Text>
                  </View>
                )}
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
      <Tab.Screen name="ChatStack" component={ChatStackScreen} />
      <Tab.Screen name="BagStack" component={BagStackScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
