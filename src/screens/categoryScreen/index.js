import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fontFamily, fontSize, hp, Touchable, wp} from '../../utils/helpers';
import {images, NavigationArrowIcon} from '../../assets';
import {useNavigation} from '@react-navigation/native';

const CategoryScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          height: hp(57),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: colors.pureBlack,
            fontSize: fontSize(16),
            lineHeight: hp(24),
            fontFamily: fontFamily.poppins400,
          }}>
          Explore Categories
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: wp(18),
            marginTop: hp(17),
          }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('MenCategoryScreen', {
                title: "Men's Collection",
                // type: 'men',
                type: 'Men',
                image: images.men_collection_img,
              })
            }>
            <View style={{position: 'relative'}}>
              <Image
                source={images.men_collection_img}
                style={{
                  width: '100%',
                  height: hp(146),
                  resizeMode: 'contain',
                  borderRadius: wp(12),
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  left: wp(36),
                  right: wp(36),
                  top: hp(60),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: fontSize(22),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  Men
                </Text>

                <View
                  style={{
                    width: hp(34),
                    height: hp(34),
                    borderRadius: hp(34) / 2,
                    backgroundColor: '#FFFFFF99',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <NavigationArrowIcon stroke="black" />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={{marginTop: hp(17)}}
            onPress={() =>
              navigation.navigate('MenCategoryScreen', {
                title: "Women's Collection",
                image: images.women_collection_img,
                // type: 'women',
                type: 'Women',
              })
            }>
            <View style={{position: 'relative'}}>
              <Image
                source={images.women_collection_img}
                style={{
                  width: '100%',
                  height: hp(146),
                  resizeMode: 'contain',
                  borderRadius: wp(12),
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  left: wp(36),
                  right: wp(36),
                  top: hp(60),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(22),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  Women
                </Text>

                <View
                  style={{
                    width: hp(34),
                    height: hp(34),
                    borderRadius: hp(34) / 2,
                    backgroundColor: '#FFFFFF99',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <NavigationArrowIcon stroke="black" />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={{marginTop: hp(17)}}
            onPress={() =>
              navigation.navigate('MenCategoryScreen', {
                title: "Kids's Collection",
                image: images.kids_collection_img,
                type: 'Kids',
              })
            }>
            <View style={{position: 'relative'}}>
              <Image
                source={images.kids_collection_img}
                style={{
                  width: '100%',
                  height: hp(146),
                  resizeMode: 'contain',
                  borderRadius: wp(12),
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  left: wp(36),
                  right: wp(36),
                  top: hp(60),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(22),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  Kids
                </Text>

                <View
                  style={{
                    width: hp(34),
                    height: hp(34),
                    borderRadius: hp(34) / 2,
                    backgroundColor: '#FFFFFF99',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <NavigationArrowIcon stroke="black" />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={{marginTop: hp(17)}}
            onPress={() =>
              navigation.navigate('MenCategoryScreen', {
                title: 'Beauty Collection',
                image: images.beauty_product_img,
                type: 'Beauty',
              })
            }>
            <View style={{position: 'relative'}}>
              <Image
                source={images.beauty_product_img}
                style={{
                  width: '100%',
                  height: hp(146),
                  resizeMode: 'contain',
                  borderRadius: wp(12),
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  left: wp(36),
                  right: wp(36),
                  top: hp(60),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(22),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  Beauty
                </Text>

                <View
                  style={{
                    width: hp(34),
                    height: hp(34),
                    borderRadius: hp(34) / 2,
                    backgroundColor: '#FFFFFF99',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <NavigationArrowIcon stroke="black" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{height: hp(50)}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;
