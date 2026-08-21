/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('BACKGROUND MESSAGE =>', remoteMessage);
});
notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('NOTIFEE BACKGROUND EVENT =>', type, detail);

  switch (type) {
    case EventType.PRESS:
      console.log('Notification pressed');
      break;

    case EventType.DISMISSED:
      console.log('Notification dismissed');
      break;
  }
});
AppRegistry.registerComponent(appName, () => App);
