import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';

import StartingScreen from './src/screens/startingScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import DemoCodeScreen from './src/screens/demoCodeScreen';
import ProductDetailsScreen from './src/screens/productDetailsScreen';

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
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
