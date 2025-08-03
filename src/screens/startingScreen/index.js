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
import {images, RightSideArrow, WhiteTrendiGo} from '../../assets';
import {fontFamily, fontSize, hp, isIOS} from '../../utils/helpers';

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
          source={images.portal_img}
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
            <WhiteTrendiGo />
          </View>
        </View>

        {/* Absolute positioning for the buttons */}
        <View
          style={{
            position: 'absolute',
            bottom: 0, // Position at the bottom of the screen
            width: '100%',
            alignItems: 'center',
            paddingBottom: 50, // Optional: Add some padding if needed
            zIndex: 99,
          }}>
          {/* First Button */}
          <Touchable
            activeOpacity={0.6}
            onPress={() => navigation.navigate('MainTabs', {screen: 'Home'})} // 👈 Navigate to Home tab
          >
            {/*<Touchable activeOpacity={0.6}>*/}
            <ImageBackground
              source={images.gradient_background_img}
              style={{
                width: hp(300),
                height: hp(53),
                justifyContent: 'center',
              }}
              resizeMode="cover">
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: fontSize(16),
                    lineHeight: hp(24),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  Explore Collection
                </Text>
                <RightSideArrow />
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
              height: hp(53),
              backgroundColor: '#000000',
              borderRadius: hp(25),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              marginTop: hp(17),
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: fontSize(16),
                fontFamily: fontFamily.poppins400,
                lineHeight: hp(24),
              }}>
              Login or Sign Up
            </Text>

            <RightSideArrow />
          </Touchable>
        </View>

        <StartingScreenBottomButtonContainer ref={demoRef} />
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
