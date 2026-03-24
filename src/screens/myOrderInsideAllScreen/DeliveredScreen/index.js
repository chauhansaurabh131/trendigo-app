import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {colors} from '../../../utils/colors';
import {useState} from 'react';
import {
  fontFamily,
  fontSize,
  hp,
  isIOS,
  Touchable,
  wp,
} from '../../../utils/helpers';
import {images, NavigationArrowIcon} from '../../../assets';
import RatingStatComponent from '../../../components/ratingStarComponent';
import {useNavigation, useRoute} from '@react-navigation/native';

DeliveredScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const product = [
    // {
    //   _id: '695f9b9e37424f1de0c4a436',
    //   title: 'Designer Traditional Dress',
    //   image: images.trending_one,
    //   size: 'S',
    //   color: 'Sky Blue',
    //   qty: 1,
    //   storeId: {
    //     id: '6960ba8237424f1de0c4a7e3',
    //   },
    // },
    {
      _id: '6960f31037424f1de0c4a918',
      title: 'Men graphic Black T-shirt',
      image: images.trending_one,
      size: 'S',
      color: 'Sky Blue',
      qty: 1,
      storeId: {
        id: '6960ba8237424f1de0c4a7e3',
      },
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{marginHorizontal: 18}}>
        <View
          style={{
            width: '100%',
            height: hp(385),
            borderWidth: 1,
            borderColor: '#E8E8E8',
            borderRadius: 14,
            paddingHorizontal: 13,
          }}>
          <Text
            style={{
              marginTop: hp(13),
              color: '#2B9909',
              fontSize: fontSize(12),
              lineHeight: hp(16),
              fontFamily: fontFamily.poppins500,
            }}>
            Delivered On :{' '}
            <Text
              style={{
                color: '#64748B',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins400,
              }}>
              {' '}
              Monday , 19 Dec. 2024{' '}
            </Text>
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
              // backgroundColor: '#861818',
              marginTop: hp(28),
            }}>
            <Image
              source={images.trending_one}
              // source={product.image}
              style={{width: wp(93), height: hp(112)}}
              borderRadius={8}
            />

            <View style={{marginHorizontal: wp(23)}}>
              <Text
                style={{
                  fontSize: fontSize(15),
                  fontFamily: fontFamily.poppins600,
                  color: colors.pureBlack,
                }}>
                Designer Traditional{'\n'}Dress
                <Text>{/* {product.title} */}</Text>
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
                    {/* S{' '} */}
                    <Text>{product.size}</Text>
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
                    Sky Blue <Text>{product.color}</Text>
                  </Text>

                  {/* <View style={{marginLeft: wp(56)}}>
                    <NavigationArrowIcon stroke="#1F1F1F" />
                  </View> */}
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
                    {/* 1  */}
                    <Text>{product.qty}</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                alignSelf: 'center',
                marginLeft: wp(30),
              }}>
              {/* <NavigationArrowIcon stroke="#ACACAC" /> */}
            </View>
          </View>
          <View
            style={{
              // width: '97%',
              height: 1,
              marginTop: hp(29),
              backgroundColor: '#E8E8E8',
              marginBottom: hp(15),
              marginHorizontal: -13, // 🔥 important
            }}
          />
          <View
            style={{
              // alignItmes: 'center',
              alignItems: 'center',
              marginTop: hp(13),
              // justifyContent:'center'
            }}>
            <Text
              style={{
                fontSize: fontSize(14),
                // lineHeight: hp(14),
                fontFamily: fontFamily.poppins500,
                color: '#475569',
              }}>
              Rate & Review to{' '}
              <Text
                style={{
                  color: '#9333EA',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins500,
                }}>
                {' '}
                Get More Discounts
              </Text>
            </Text>
          </View>
          <View
            style={{
              marginTop: hp(15),
              marginBottom: hp(20),
              alignItems: 'center',
            }}>
            {/* <RatingStatComponent /> */}
            <RatingStatComponent
              value={rating}
              onRatingChange={value => setRating(value)}
            />
            {/* {productId && <RatingStatComponent productId={productId} />} */}
          </View>

          <Touchable
            onPress={() =>
              navigation.navigate('ReviewRating', {
                product: product,
                rating: rating,
              })
            }
            activeOpacity={0.6}
            style={{
              width: '97%',
              borderWidth: 1,
              borderColor: '#9333EA',
              height: hp(48),
              // marginBottom: hp(21),
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#9333EA',
                fontSize: fontSize(15),
                fontFamily: fontFamily.poppins600,
              }}>
              Tell us more
            </Text>
          </Touchable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeliveredScreen;
