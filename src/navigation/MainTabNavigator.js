import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

import HomeScreen from '../screens/homeScreen';
import SearchScreen from '../screens/searchScreen';
import CategoryScreen from '../screens/categoryScreen';
import ChatScreen from '../screens/chatScreen';
import BagScreen from '../screens/bagScreen';
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
} from '../assets'; // ✅ Make sure these are SVG components
import {fontFamily, fontSize, hp, isIOS} from '../utils/helpers';

const Tab = createBottomTabNavigator();

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

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {height: isIOS ? hp(75) : hp(70), paddingTop: 5},
        tabBarIcon: ({focused}) => {
          const iconSizeStyles = {
            Home: {width: hp(15), height: hp(16)},
            Search: {width: hp(16), height: hp(16)},
            Category: {width: hp(16), height: hp(16)},
            Chat: {width: hp(16), height: hp(16)},
            Bag: {width: hp(13), height: hp(16)},
          };

          let IconComponent;
          switch (route.name) {
            case 'Home':
              IconComponent = focused ? ColorHomeIcon : HomeIcon;
              break;
            case 'Search':
              IconComponent = focused ? ColorSearchIcon : SearchIcon;
              break;
            case 'Category':
              IconComponent = focused ? ColorCategoryIcon : CategoryIcon;
              break;
            case 'Chat':
              IconComponent = focused ? ColorChatIcon : ChatIcon;
              break;
            case 'Bag':
              IconComponent = focused ? ColorBagIcon : BagIcon;
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
          focused ? (
            <GradientText text={route.name} />
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
                {route.name}
              </Text>
            </View>
          ),
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Bag" component={BagScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
