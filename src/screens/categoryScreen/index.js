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
          // height: hp(57),
          // alignItems: 'center',
          justifyContent: 'center',
          marginLeft: wp(16),
          marginTop: hp(42),
        }}>
        <Text
          style={{
            color: '#5029F3',
            fontSize: fontSize(12),
            fontFamily: fontFamily.poppins600,
          }}>
          SHOP BY COLLECTION
        </Text>
        <Text
          style={{
            color: '#17151D',
            fontSize: fontSize(28),
            fontFamily: fontFamily.poppins700,
            marginTop: hp(4),
          }}>
          Explore Categories
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: wp(16),
            marginTop: hp(18),
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
                source={images.men_category}
                style={{
                  width: '100%',
                  height: hp(128),
                  resizeMode: 'contain',
                  // borderRadius: wp(12),
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={{marginTop: hp(20)}}
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
                source={images.women_category}
                style={{
                  width: '100%',
                  height: hp(128),
                  resizeMode: 'contain',
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={{marginTop: hp(20)}}
            onPress={() =>
              navigation.navigate('MenCategoryScreen', {
                title: "Kids's Collection",
                image: images.kids_collection_img,
                type: 'Kids',
              })
            }>
            <View style={{position: 'relative'}}>
              <Image
                source={images.kids_category}
                style={{
                  width: '100%',
                  height: hp(128),
                  resizeMode: 'contain',
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={{marginTop: hp(20)}}
            onPress={() =>
              navigation.navigate('MenCategoryScreen', {
                title: 'Beauty Collection',
                image: images.beauty_product_img,
                type: 'Beauty',
              })
            }>
            <View style={{position: 'relative'}}>
              <Image
                source={images.beauty_category}
                style={{
                  width: '100%',
                  height: hp(128),
                  resizeMode: 'contain',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{height: hp(50)}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;
