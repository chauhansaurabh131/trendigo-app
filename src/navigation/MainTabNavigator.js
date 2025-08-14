import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

// Screens
import HomeScreen from '../screens/homeScreen';
import SearchScreen from '../screens/searchScreen';
import CategoryScreen from '../screens/categoryScreen';
import ChatScreen from '../screens/chatScreen';
import BagScreen from '../screens/bagScreen';
import MyOrderScreen from '../screens/myOrderScreen';

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
import {fontFamily, fontSize, hp, isIOS} from '../utils/helpers';
import ProfileScreen from '../screens/profileScreen';
import BasicInfoScreen from '../screens/basicInfoScreen';

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
      {/* ✅ MyOrderScreen inside HomeStack so tab bar stays visible */}
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      {/*<Stack.Screen name="BasicInfoScreen" component={BasicInfoScreen} />*/}
      <Stack.Screen name="MyOrderScreen" component={MyOrderScreen} />
    </Stack.Navigator>
  );
};

const SearchStackScreen = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="SearchScreen" component={SearchScreen} />
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
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        // Get the nested route name inside the current tab
        const childRouteName = getFocusedRouteNameFromRoute(route) ?? '';

        // Determine if we're on the main tab screen
        const isMainScreen =
          (route.name === 'HomeStack' &&
            (childRouteName === '' || childRouteName === 'HomeScreen')) ||
          (route.name === 'SearchStack' &&
            (childRouteName === '' || childRouteName === 'SearchScreen')) ||
          (route.name === 'CategoryStack' &&
            (childRouteName === '' || childRouteName === 'CategoryScreen')) ||
          (route.name === 'ChatStack' &&
            (childRouteName === '' || childRouteName === 'ChatScreen')) ||
          (route.name === 'BagStack' &&
            (childRouteName === '' || childRouteName === 'BagScreen'));

        return {
          headerShown: false,
          tabBarStyle: {height: isIOS ? hp(75) : hp(70), paddingTop: 5},
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
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="SearchStack" component={SearchStackScreen} />
      <Tab.Screen name="CategoryStack" component={CategoryStackScreen} />
      <Tab.Screen name="ChatStack" component={ChatStackScreen} />
      <Tab.Screen name="BagStack" component={BagStackScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
