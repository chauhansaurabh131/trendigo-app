// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import 'react-native-gesture-handler';

// import StartingScreen from './src/screens/startingScreen';
// import MainTabNavigator from './src/navigation/MainTabNavigator';
// import DemoCodeScreen from './src/screens/demoCodeScreen';
// import ProductDetailsScreen from './src/screens/productDetailsScreen';
// import ProfileScreen from './src/screens/profileScreen';
// import BasicInfoScreen from './src/screens/basicInfoScreen';
// import AccountScreen from './src/screens/accountScreen';
// import AddressScreen from './src/screens/addressScreen';
// import FullImage from './src/components/FullImage';
// import OrderDetailsScreen from './src/screens/OrderDetailsScreen';
// import MenCategoryScreen from './src/screens/menCategoryScreen';
// import WomenCategoryScreen from './src/screens/WomenCategoryScree';
// import store from './src/redux/store';
// import {Provider} from 'react-redux';
// import {navigationRef} from './src/navigations/NavigationService';
// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <Provider store={store}>
//       <GestureHandlerRootView style={{flex: 1}}>
//         <NavigationContainer ref={navigationRef}>
//           <Stack.Navigator screenOptions={{headerShown: false}}>
//             <Stack.Screen name="StartingScreen" component={StartingScreen} />
//             <Stack.Screen name="DemoCodeScreen" component={DemoCodeScreen} />
//             <Stack.Screen name="MainTabs" component={MainTabNavigator} />
//             <Stack.Screen
//               name="ProductDetails"
//               component={ProductDetailsScreen}
//             />
//             <Stack.Screen name="FullImage" component={FullImage} />
//             <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
//             <Stack.Screen name="Basic Info" component={BasicInfoScreen} />
//             <Stack.Screen name="Account" component={AccountScreen} />
//             <Stack.Screen name="Address" component={AddressScreen} />
//             <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
//             <Stack.Screen
//               name="MenCategoryScreen"
//               component={MenCategoryScreen}
//             />
//             <Stack.Screen
//               name="WomenCategoryScreen"
//               component={WomenCategoryScreen}
//             />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </GestureHandlerRootView>
//     </Provider>
//   );
// };

// export default App;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {navigationRef} from './src/navigations/NavigationService';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
