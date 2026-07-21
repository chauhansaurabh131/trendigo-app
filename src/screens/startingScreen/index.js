import React, {useRef, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ImageBackGround,
  images,
  RightSideArrow,
  TrulyBag,
  WhiteTrendiGo,
} from '../../assets';
// import {fontFamily, fontSize, hp, isIOS} from '../../utils/helpers';
// import {fontFamily, fontSize, hp, isIOS} from '../../../utils/helpers';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StartingScreenBottomButtonContainer from '../../components/startingScreenBottomButtonContainer';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Touchable =
  Platform.OS === 'ios'
    ? require('react-native-gesture-handler').TouchableOpacity
    : require('react-native').TouchableOpacity;

const StartingScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const bottomSheetRef = useRef(null);
  const verifyBottomSheetRef = useRef(null);
  const [shouldOpenVerifySheet, setShouldOpenVerifySheet] = useState(false);

  const navigation = useNavigation();

  const demoRef = useRef(null);

  const openBottomSheet = () => {
    demoRef.current?.open();
  };

  // Function to format the number with a space after every 5 digits
  const formatMobileNumber = text => {
    // Remove all non-numeric characters
    let formattedText = text.replace(/[^\d]/g, '');

    // Add a space after the 5th character
    if (formattedText.length > 5) {
      formattedText =
        formattedText.slice(0, 5) + ' ' + formattedText.slice(5, 10);
    }

    // Limit the length to 10 digits (but with space after 5th character)
    return formattedText.slice(0, 13); // Only allow a max of 13 characters (10 digits + 1 space)
  };

  const handleVerifyCode = () => {
    const rawMobileNumber = mobileNumber.replace(/\s/g, '');
    console.log('Verify Code button pressed', rawMobileNumber);

    bottomSheetRef.current.close(); // Close the first sheet
    verifyBottomSheetRef.current.open();
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <ImageBackground
          source={images.truly_bag_image}
          style={styles.imageBackground}
        />

        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <View style={{marginTop: Platform.OS === 'ios' ? 100 : 30}}>
            <TrulyBag />
          </View>
          <View style={{marginHorizontal: wp(66), marginTop: hp(38)}}>
            <Text
              style={{
                fontSize: fontSize(16),
                // lineHeight: hp(24),
                fontFamily: fontFamily.poppins400,
                textAlign: 'center',
              }}>
              <Text
                style={{
                  color: '#000000',
                }}>
                Trendy fashion, beauty, kids & more.{' '}
              </Text>
              <Text
                style={{
                  color: '#5029F4',
                }}>
                All in one place
              </Text>
            </Text>
          </View>
        </View>

        {/* Absolute positioning for the buttons */}
        <View
          style={{
            position: 'absolute',
            bottom: 0, // Position at the bottom of the screen
            width: '100%',
            alignItems: 'center',
            // paddingBottom: 50, // Optional: Add some padding if needed
            paddingBottom: 75,
            zIndex: 99,
          }}>
          {/* First Button */}
          <Touchable
            activeOpacity={0.6}
            onPress={() => navigation.navigate('MainTabs', {screen: 'Home'})} // 👈 Navigate to Home tab
          >
            {/*<Touchable activeOpacity={0.6}>*/}
            <ImageBackground
              // source={images.gradient_background_img}
              source={images.blue_gradient}
              style={{
                width: hp(300),
                height: hp(50),
                justifyContent: 'center',
              }}
              resizeMode="contain">
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  // paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    color: '#F2EEFD',
                    fontSize: fontSize(15),
                    lineHeight: hp(24),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  Explore Collection
                </Text>
                <View
                  style={{
                    position: 'absolute',
                    right: wp(19),
                  }}>
                  <RightSideArrow />
                </View>
              </View>
            </ImageBackground>
          </Touchable>

          {/* Second Button */}
          <Touchable
            activeOpacity={0.6}
            // onPress={() => bottomSheetRef.current.open()} // Open bottom sheet
            onPress={() => {
              openBottomSheet();
            }}
            style={{
              width: hp(300),
              height: hp(50),
              // backgroundColor: '#000000',
              borderWidth: 1,
              borderColor: '#5029F4',
              borderRadius: hp(25),
              flexDirection: 'row',
              // justifyContent: 'space-between',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
              marginTop: hp(13),
            }}>
            <Text
              style={{
                color: '#5029F4',
                fontSize: fontSize(15),
                fontFamily: fontFamily.poppins700,
                lineHeight: hp(24),
              }}>
              Login or Sign Up
            </Text>

            <RightSideArrow />
          </Touchable>
        </View>

        <StartingScreenBottomButtonContainer ref={demoRef} />
        <View
          style={{marginHorizontal: wp(63), position: 'absolute', bottom: 15}}>
          <Text
            style={{
              fontSize: fontSize(12),
              // lineHeight: hp(19),
              fontFamily: fontFamily.poppins400,
              textAlign: 'center',
            }}>
            <Text
              style={{
                color: '#000000',
              }}>
              By continuing, you agree to our{' '}
            </Text>
            <Text
              style={{
                color: '#5029F4',
                lineHeight: hp(20),
              }}>
              Terms of Use{' '}
            </Text>
            <Text
              style={{
                color: '#000000',
              }}>
              and{' '}
            </Text>
            <Text
              style={{
                color: '#5029F4',
              }}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: width,
    height: height,
  },
});

export default StartingScreen;
