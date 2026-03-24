import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {colors} from '../../../utils/colors';
import {fontFamily, fontSize, hp, isIOS, wp} from '../../../utils/helpers';
import {images, NavigationArrowIcon} from '../../../assets';

const CancelledScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{marginHorizontal: 18}}>
        <View
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: '#E8E8E8',
            borderRadius: 14,
            paddingHorizontal: 13,
            height: hp(192),
          }}>
          <Text
            style={{
              marginTop: hp(14),
              color: '#FF0000',
              fontSize: fontSize(12),
              lineHeight: hp(16),
              fontFamily: fontFamily.poppins500,
            }}>
            Cancelled
          </Text>

          {/* <View
            style={{
              width: '97%',
              height: 1,
              marginTop: hp(12),
              marginBottom: hp(18),
              backgroundColor: '#E8E8E8',
            }}
          /> */}

          <View
            style={{
              flexDirection: 'row',
              marginBottom: hp(20),
              marginTop: hp(28),
            }}>
            <Image
              source={images.trending_one}
              style={{width: wp(93), height: hp(112)}}
              borderRadius={8}
            />

            <View style={{marginLeft: wp(23)}}>
              <Text
                style={{
                  fontSize: fontSize(15),
                  fontFamily: fontFamily.poppins600,
                  color: colors.pureBlack,
                }}>
                Designer Traditional {'\n'}Dress
              </Text>

              <View style={{marginTop: isIOS ? hp(15) : hp(7)}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: 40,
                      color: '#64748B',
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    Size
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins600,
                    }}>
                    {' '}
                    :{' '}
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins600,
                    }}>
                    {' '}
                    S{' '}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: 40,
                      color: '#64748B',
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins400,
                      lineHeight: hp(18),
                    }}>
                    Color
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins600,
                      lineHeight: hp(18),
                    }}>
                    {' '}
                    :{' '}
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      lineHeight: hp(18),
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins600,
                    }}>
                    {' '}
                    Sky Blue{' '}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: 40,
                      color: '#64748B',
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins400,
                      lineHeight: hp(18),
                    }}>
                    Qty
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(12),
                      lineHeight: hp(18),
                      fontFamily: fontFamily.poppins600,
                    }}>
                    {' '}
                    :{' '}
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(12),
                      lineHeight: hp(18),
                      fontFamily: fontFamily.poppins600,
                    }}>
                    {' '}
                    1{' '}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                alignSelf: 'center',
                // marginLeft: wp(70),
                // marginLeft:wp(30)
                // marginRight: wp(20),
              }}>
              {/* <NavigationArrowIcon stroke="#ACACAC" /> */}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CancelledScreen;
