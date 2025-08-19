import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';

import StartingScreen from './src/screens/startingScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import DemoCodeScreen from './src/screens/demoCodeScreen';
import ProductDetailsScreen from './src/screens/productDetailsScreen';
import ProfileScreen from './src/screens/profileScreen';
import BasicInfoScreen from './src/screens/basicInfoScreen';
import AccountScreen from './src/screens/accountScreen';
import AddressScreen from './src/screens/addressScreen';
import FullImage from './src/components/FullImage';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="StartingScreen" component={StartingScreen} />
          <Stack.Screen name="DemoCodeScreen" component={DemoCodeScreen} />
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
          />
          <Stack.Screen name="FullImage" component={FullImage} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="Basic Info" component={BasicInfoScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Address" component={AddressScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
