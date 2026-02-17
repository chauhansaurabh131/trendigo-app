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
  const product = {
    _id: '695f9b9e37424f1de0c4a436',
    title: 'Designer Traditional Dress',
    image: images.trending_one,
    size: 'S',
    color: 'Sky Blue',
    qty: 1,
    storeId: {
      id: '6960ba8237424f1de0c4a7e3',
    },
  };
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
              // source={images.trending_one}
              source={product.image}
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
                {/* Designer Traditional Dress */}
                <Text>{product.title}</Text>
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
                    {/* S{' '} */}
                    <Text>{product.size}</Text>
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
                    {/* Sky Blue{' '} */}
                    <Text>{product.color}</Text>
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
                    {/* 1{' '} */}
                    <Text>{product.quantity}</Text>
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
              marginBottom: hp(15),
            }}
          />
          <Text
            style={{
              fontSize: fontSize(10),
              lineHeight: hp(14),
              fontFamily: fontFamily.poppins400,
              color: colors.pureBlack,
            }}>
            Rate & Review to{' '}
            <Text style={{color: '#8225AF'}}> Get More Discounts</Text>
          </Text>

          <View style={{marginTop: hp(9), marginBottom: hp(13)}}>
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
              borderColor: '#8225AF',
              height: hp(40),
              marginBottom: hp(21),
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#8225AF',
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins500,
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
