import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {View} from 'react-native';
import {SmallTrulyBag} from '../../assets';
import {fontFamily, fontSize, hp} from '../../utils/helpers';
const AlertScreen = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          height: hp(57),
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'pink',
        }}>
        <Text
          style={{
            color: '#000',
            fontFamily: fontFamily.poppins500,
            fontSize: fontSize(18),
          }}>
          All Notifications
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          height: hp(1),
          backgroundColor: '#E2E2E2',
        }}
      />
    </SafeAreaView>
  );
};
export default AlertScreen;
