import {Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const STANDARD_SCREEN_HEIGHT = 764;
export const STANDARD_SCREEN_WIDTH = 390;

export const fontSize = value => RFValue(value, STANDARD_SCREEN_HEIGHT);

export const wp = val => {
  // console.log(' === var ===> ', val);
  const valInPercentage = (val * 100) / STANDARD_SCREEN_WIDTH;
  // console.log(' === WIDTH ===> ', widthPercentageToDP(valInPercentage));
  return widthPercentageToDP(valInPercentage);
  // return val;
};

export const hp = val => {
  const valInPercentage = (val * 100) / STANDARD_SCREEN_HEIGHT;
  // console.log(' === HEIGHT ===> ', heightPercentageToDP(valInPercentage));
  // return heightPercentageToDP(valInPercentage);
  return heightPercentageToDP(valInPercentage);
  // return val;
};

export const isAndroid = Platform.OS === 'android';

export const isIOS = Platform.OS === 'ios';

export const fontFamily = {
  inter700: isAndroid ? 'inter_bold' : 'Inter Bold',
  inter600: isAndroid ? 'inter_semi_bold' : 'Inter SemiBold',
  inter500: isAndroid ? 'inter_medium' : 'Inter Medium',
  inter400: isAndroid ? 'inter_regular' : 'Inter Regular',

  poppins700: isAndroid ? 'poppins_bold' : 'Poppins Bold',
  poppins600: isAndroid ? 'poppins_semi_bold' : 'Poppins SemiBold',
  poppins500: isAndroid ? 'poppins_medium' : 'Poppins Medium',
  poppins400: isAndroid ? 'poppins_regular' : 'Poppins Regular',
  poppins900: 'Poppins-Black',

  bebesneue400: isAndroid ? 'bebasneue_regular' : 'Bebas Neue',
  nunito200: isAndroid ? 'nunito_extra_light' : 'Nunito ExtraLight',
  nunito300: isAndroid ? 'nunito_light' : 'Nunito Light',
  nunito400: isAndroid ? 'nunito_regular' : 'Nunito Regular',
  nunito500: isAndroid ? 'nunito_medium' : 'Nunito Medium',
  nunito600: isAndroid ? 'nunito_semi_bold' : 'Nunito SemiBold',
  nunito700: isAndroid ? 'nunito_bold' : 'Nunito Bold',
  montserrat: 'Montserrat', // New font entry
};

export const Touchable =
  Platform.OS === 'ios'
    ? require('react-native-gesture-handler').TouchableOpacity
    : require('react-native').TouchableOpacity;
