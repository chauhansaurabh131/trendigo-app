import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {
  Adidas,
  BossIcon,
  CalvinIcon,
  LevisIcon,
  PullBearIcon,
  UniIcon,
} from '../../assets';
const ShopByBrandsComponent = () => {
  return (
    <SafeAreaView>
      <View style={{marginLeft: wp(17)}}>
        <Text
          style={{
            color: '#000',
            fontFamily: fontFamily.poppins600,
            fontSize: fontSize(18),
          }}>
          Shop by Brands
        </Text>
      </View>

      <View
        style={{
          marginHorizontal: wp(17),
          marginTop: hp(24.66),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: wp(105.58),
            height: hp(65.08),
            borderRadius: 14,
            backgroundColor: '#F8F8F8',
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
          }}>
          <PullBearIcon />
        </View>
        <View
          style={{
            width: wp(105.68),
            height: hp(65.08),
            borderRadius: 14,
            backgroundColor: '#F8F8F8',
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
          }}>
          <BossIcon />
        </View>
        <View
          style={{
            width: wp(105.68),
            height: hp(65.08),
            borderRadius: 14,
            backgroundColor: '#F8F8F8',
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
          }}>
          <UniIcon />
        </View>
      </View>
      <View
        style={{
          marginHorizontal: wp(17),
          marginTop: wp(13.02),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: wp(105.68),
            height: hp(65.08),
            borderRadius: 14,
            backgroundColor: '#F8F8F8',
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
          }}>
          <Adidas />
        </View>
        <View
          style={{
            width: wp(105.68),
            height: hp(65.08),
            borderRadius: 14,
            backgroundColor: '#F8F8F8',
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
          }}>
          <CalvinIcon />
        </View>
        <View
          style={{
            width: wp(105.68),
            height: hp(65.08),
            borderRadius: 14,
            backgroundColor: '#F8F8F8',
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
          }}>
          <LevisIcon />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ShopByBrandsComponent;
