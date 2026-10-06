import React, {useEffect} from 'react';
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
import {
  GradientColorSearchIcon,
  images,
  NavigationArrowIcon,
  NewAdd,
} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {GET_CART_REQUEST} from '../../redux/actions/cartActions';
import ShopByBrandsComponent from '../../components/shopByBrandComponenent';

const CategoryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const {loading, cartData, error} = useSelector(state => state.addToCard);
  const cartCount = cartData?.productDetailList?.length || 0;
  console.log('TAB CART COUNT =>', cartCount);

  useEffect(() => {
    if (token) {
      console.log('ALLING CART API FROM PRODUCT DETAILS');

      dispatch({
        type: GET_CART_REQUEST,
        token: token,
      });
    }
  }, [token]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: hp(11),
        }}>
        <View
          activeOpacity={0.6}
          style={{
            marginTop: hp(11),
            // width: '100%',
            flex: 1,
            height: hp(38),
            borderRadius: wp(16),
            marginHorizontal: hp(17),
            backgroundColor: '#FFFFFF',
            borderColor: '#E2E8F0CC',
            borderWidth: 1,
            marginBottom: hp(20),
            justifyContent: 'center',
            paddingHorizontal: hp(16),
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            activeOpacity={0.6}
            onPress={() => navigation.navigate('SearchStack')}>
            <GradientColorSearchIcon width={hp(12)} height={hp(12)} />
            <Text
              style={{
                marginLeft: hp(11),
                fontSize: fontSize(12),
                lineHeight: hp(20),
                fontFamily: fontFamily.poppins500,
                color: '#94A3B8',
              }}>
              Search Product, brands
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('BagScreen')}
          style={{
            width: hp(38),
            height: hp(38),
            borderRadius: wp(35),
            borderColor: '#E2E8F0CC',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            marginRight: wp(16),
          }}>
          <NewAdd />
          {cartCount > 0 && (
            <View
              style={{
                position: 'absolute',
                right: wp(-4),
                // top: wp(-12),
                bottom: wp(-6),
                backgroundColor: '#5932EA',
                borderRadius: wp(30),
                width: hp(18),
                height: hp(18),
                justifyContent: 'center',
                alignItems: 'center',
                // paddingHorizontal: wp(3),
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: fontSize(9),
                  fontFamily: fontFamily.poppins700,
                }}>
                {cartCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            // height: hp(57),
            // alignItems: 'center',
            justifyContent: 'center',
            marginLeft: wp(16),
            marginTop: hp(31),
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
              marginBottom: hp(5),
            }}>
            Explore Categories
          </Text>
        </View>

        <View
          style={
            {
              // marginHorizontal: wp(16),
              // backgroundColor: 'red',
              // marginTop: hp(16),
            }
          }>
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
            {/* <View style={{position: 'relative'}}> */}
            <Image
              source={images.cate_men}
              style={{
                width: '100%',
                height: hp(200),
                resizeMode: 'stretch',
              }}
            />
            {/* </View> */}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={{marginTop: hp(0)}}
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
                source={images.women_cate_image}
                style={{
                  width: '100%',
                  height: hp(200),
                  resizeMode: 'stretch',
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={{marginTop: hp(0)}}
            onPress={() =>
              navigation.navigate('MenCategoryScreen', {
                title: "Kids's Collection",
                image: images.kids_collection_img,
                type: 'Kids',
              })
            }>
            <View style={{position: 'relative'}}>
              <Image
                source={images.kids_image}
                style={{
                  width: '100%',
                  height: hp(200),
                  resizeMode: 'stretch',
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={{marginTop: hp(0)}}
            onPress={() =>
              navigation.navigate('MenCategoryScreen', {
                title: 'Beauty Collection',
                image: images.beauty_product_img,
                type: 'Beauty',
              })
            }>
            <View style={{position: 'relative'}}>
              <Image
                source={images.beauty_image}
                style={{
                  width: '100%',
                  height: hp(200),
                  resizeMode: 'stretch',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: hp(20)}}>
          <ShopByBrandsComponent />
        </View>
        <View style={{height: hp(50)}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;
