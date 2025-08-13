import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {colors} from '../../../utils/colors';
import {
  fontFamily,
  fontSize,
  hp,
  isIOS,
  Touchable,
  wp,
} from '../../../utils/helpers';
import {images, NavigationArrowIcon} from '../../../assets';

const ProcessingScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <View style={{marginHorizontal: 18}}>
        <View
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: '#E8E8E8',
            borderRadius: 14,
            paddingHorizontal: 13,
          }}>
          <Text
            style={{
              marginTop: hp(13),
              color: '#2B9909',
              fontSize: fontSize(10),
              lineHeight: hp(16),
              fontFamily: fontFamily.poppins700,
            }}>
            Expected Delivery On :{' '}
            <Text
              style={{
                color: colors.pureBlack,
                fontFamily: fontFamily.poppins400,
              }}>
              {' '}
              Monday , 19 Dec. 2024{' '}
            </Text>
          </Text>

          <View
            style={{
              width: '97%',
              height: 1,
              marginTop: hp(12),
              marginBottom: hp(18),
              backgroundColor: '#E8E8E8',
            }}
          />

          <View style={{flexDirection: 'row'}}>
            <Image
              source={images.trending_one}
              style={{width: wp(73), height: hp(88)}}
              borderRadius={8}
            />

            <View style={{marginLeft: wp(23)}}>
              <Text
                style={{
                  fontSize: fontSize(11),
                  fontFamily: fontFamily.poppins500,
                  color: colors.pureBlack,
                }}>
                Designer Traditional Dress
              </Text>

              <View style={{marginTop: isIOS ? hp(15) : hp(7)}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: 40,
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins700,
                    }}>
                    Size
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    {' '}
                    :{' '}
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    {' '}
                    S{' '}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: 40,
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins700,
                    }}>
                    Color
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    {' '}
                    :{' '}
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    {' '}
                    Sky Blue{' '}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: 40,
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins700,
                    }}>
                    Qty
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    {' '}
                    :{' '}
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
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
                marginLeft: wp(70),
              }}>
              <NavigationArrowIcon stroke="black" />
            </View>
          </View>

          <View
            style={{
              width: '97%',
              height: 1,
              marginTop: hp(19),
              backgroundColor: '#E8E8E8',
            }}
          />

          <Touchable style={{marginTop: hp(10), marginBottom: hp(10)}}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.pureBlack,
                fontSize: fontSize(11),
                fontFamily: fontFamily.poppins500,
              }}>
              Track Order
            </Text>
          </Touchable>
        </View>

        <View
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: '#E8E8E8',
            borderRadius: 14,
            paddingHorizontal: 13,
            marginTop: hp(12),
          }}>
          <Text
            style={{
              marginTop: hp(13),
              color: '#2B9909',
              fontSize: fontSize(10),
              lineHeight: hp(16),
              fontFamily: fontFamily.poppins700,
            }}>
            Expected Delivery On :{' '}
            <Text
              style={{
                color: colors.pureBlack,
                fontFamily: fontFamily.poppins400,
              }}>
              {' '}
              Tuesday , 20 Dec. 2024{' '}
            </Text>
          </Text>

          <View
            style={{
              width: '97%',
              height: 1,
              marginTop: hp(12),
              marginBottom: hp(18),
              backgroundColor: '#E8E8E8',
            }}
          />

          <View style={{flexDirection: 'row'}}>
            <Image
              source={images.trending_two}
              style={{width: wp(73), height: hp(88)}}
              borderRadius={8}
            />

            <View style={{marginLeft: wp(23)}}>
              <Text
                style={{
                  fontSize: fontSize(11),
                  fontFamily: fontFamily.poppins500,
                  color: colors.pureBlack,
                }}>
                Designer Traditional Dress1
              </Text>

              <View style={{marginTop: isIOS ? hp(15) : hp(7)}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: 40,
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins700,
                    }}>
                    Size
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    {' '}
                    :{' '}
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    {' '}
                    XXl{' '}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: 40,
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins700,
                    }}>
                    Color
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    {' '}
                    :{' '}
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    {' '}
                    Purple{' '}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: 40,
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins700,
                    }}>
                    Qty
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    {' '}
                    :{' '}
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
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
                marginLeft: wp(70),
              }}>
              <NavigationArrowIcon stroke="black" />
            </View>
          </View>

          <View
            style={{
              width: '97%',
              height: 1,
              marginTop: hp(19),
              backgroundColor: '#E8E8E8',
            }}
          />

          <Touchable style={{marginTop: hp(10), marginBottom: hp(10)}}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.pureBlack,
                fontSize: fontSize(11),
                fontFamily: fontFamily.poppins500,
              }}>
              Track Order
            </Text>
          </Touchable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProcessingScreen;
