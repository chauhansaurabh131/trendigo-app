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
import {useNavigation} from '@react-navigation/native';

const ProcessingScreen = () => {
  const navigation = useNavigation();
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
          {/* <Text
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
          </Text> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: hp(14),
            }}>
            {/* Green Dot */}
            <View
              style={{
                width: wp(6),
                height: wp(6),
                backgroundColor: '#2B9909',
                borderRadius: wp(3),
                marginTop: hp(6),
                marginRight: 8,
              }}
            />

            {/* Delivery Text */}
            <Text
              style={{
                color: '#2B9909',
                fontSize: fontSize(12),
                lineHeight: hp(16),
                fontFamily: fontFamily.poppins500,
              }}>
              Expected Delivery On :
              <Text
                style={{
                  color: colors.pureBlack,
                  fontFamily: fontFamily.poppins400,
                  fontSize: fontSize(12),
                }}>
                {' '}
                Monday , 19 Dec. 2024
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: '97%',
              height: 1,
              marginTop: hp(12),
              marginBottom: hp(18),
              backgroundColor: '#E8E8E8',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              //  backgroundColor: 'pink'
            }}>
            <Image
              source={images.trending_one}
              style={{width: wp(73), height: hp(88)}}
              borderRadius={8}
            />

            <View style={{marginHorizontal: wp(23)}}>
              <Text
                style={{
                  fontSize: fontSize(16),
                  fontFamily: fontFamily.poppins600,
                  color: colors.pureBlack,
                }}>
                Designer Traditional Dress
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
                      lineHeight: hp(18),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    Color
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      lineHeight: hp(13),
                      lineHeight: hp(18),
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins600,
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
                      lineHeight: hp(18),
                      fontFamily: fontFamily.poppins400,
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
                marginLeft: wp(70),
              }}>
              {/* <NavigationArrowIcon stroke="black" /> */}
            </View>
          </View>

          <View
            style={{
              // width: '100%',
              height: 1,
              marginTop: hp(19),
              backgroundColor: '#E8E8E8',
              marginHorizontal: -13, // 🔥 important
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
          {/* <Text
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
          </Text> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: hp(14),
            }}>
            {/* Green Dot */}
            <View
              style={{
                width: wp(6),
                height: wp(6),
                backgroundColor: '#2B9909',
                borderRadius: wp(3),
                marginTop: hp(6),
                marginRight: 8,
              }}
            />

            {/* Delivery Text */}
            <Text
              style={{
                color: '#2B9909',
                fontSize: fontSize(12),
                lineHeight: hp(16),
                fontFamily: fontFamily.poppins500,
              }}>
              Expected Delivery On :
              <Text
                style={{
                  color: colors.pureBlack,
                  fontFamily: fontFamily.poppins400,
                  fontSize: fontSize(12),
                }}>
                {' '}
                Monday , 19 Dec. 2024
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: '97%',
              height: 1,
              marginTop: hp(12),
              marginBottom: hp(18),
              backgroundColor: '#E8E8E8',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: 'pink'
            }}>
            <Image
              source={images.trending_two}
              style={{width: wp(73), height: hp(88)}}
              borderRadius={8}
            />

            <View style={{marginLeft: wp(23)}}>
              <Text
                style={{
                  fontSize: fontSize(16),
                  fontFamily: fontFamily.poppins600,
                  color: colors.pureBlack,
                }}>
                Designer Traditional Dress
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
                    XXl{' '}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: 40,
                      color: '#64748B',
                      lineHeight: hp(18),
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    Color
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
                      lineHeight: hp(18),
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins600,
                    }}>
                    {' '}
                    Purple{' '}
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
                      fontFamily: fontFamily.poppins600,
                      lineHeight: hp(18),
                    }}>
                    {' '}
                    :{' '}
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins600,
                      lineHeight: hp(18),
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
              {/* <NavigationArrowIcon stroke="black" /> */}
            </View>
          </View>
          {/* 
          <View
            style={{
              // width: '97%',
              height: 1,
              marginTop: hp(19),
              backgroundColor: '#E8E8E8',
            }}
          /> */}
          <View
            style={{
              // width: '100%',
              height: 1,
              marginTop: hp(19),
              backgroundColor: '#E8E8E8',
              marginHorizontal: -13, // 🔥 important
            }}
          />
          <Touchable
            style={{marginTop: hp(10), marginBottom: hp(10)}}
            onPress={() => navigation.navigate('OrderDetails')}>
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
