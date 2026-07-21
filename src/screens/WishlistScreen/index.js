import React, {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fontFamily, fontSize, hp} from '../../utils/helpers';
import {
  BackIcon,
  GradientFullFillLike,
  GradientLikeIcon,
  images,
  StarIcon,
} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import HomeTrendingComponent from '../../components/homeTrendingComponent';
import {
  getWishlistRequest,
  removeWishlistRequest,
} from '../../redux/actions/wishlistActions';
import {useDispatch, useSelector} from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 40) / 2;

const WishlistScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {wishlistData} = useSelector(state => state.wishlist);
  useEffect(() => {
    // dispatch(getProductRequest());
    dispatch(getWishlistRequest()); // ✅ ADD THIS
  }, []);
  console.log('WISHLIST UI ', wishlistData);

  const handleRemoveWishlist = item => {
    console.log('REMOVE CLICKED ITEM 👉', item);

    const wishlistId = item?.id; // ✅ IMPORTANT
    console.log('WISHLIST ID', wishlistId);
    if (!wishlistId) {
      console.log('wishlistId missing');
      return;
    }

    dispatch(removeWishlistRequest(wishlistId));
    ToastAndroid.show('Removed from Wishlist', ToastAndroid.SHORT);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{height: hp(57), justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 18,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 0}}
            onPress={() => {
              navigation.goBack();
            }}>
            <BackIcon />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: fontSize(18),
              color: colors.black,
              lineHeight: hp(26),
              fontFamily: fontFamily.poppins500,
            }}>
            Wishlist
          </Text>
        </View>
      </View>

      <View style={{width: '100%', borderWidth: 1, borderColor: '#F2F2F2'}} />

      <FlatList
        // data={products}
        data={wishlistData}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={({item}) => {
          // console.log(
          //   'FULL PRODUCT DATA =>',
          //   JSON.stringify(item.productId, null, 2),
          // );
          const product = item?.productId;
          const variant = product?.variants?.[0];
          // console.log('ITEM:', item);
          // console.log('PRODUCT:', item.productId);
          const image =
            variant?.images?.find(img => img.isSelectedForMainScreen)
              ?.imageUrl || variant?.images?.[0]?.imageUrl;
          console.log(image, 'image');
          return (
            <TouchableOpacity
              style={{
                width: cardWidth,
                // marginBottom: 15,
                marginHorizontal: 5,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#eee',
                backgroundColor: '#fff',
                overflow: 'hidden',
                marginTop: hp(22),
              }}
              activeOpacity={0.6}
              // onPress={() => {
              //   console.log(
              //     'PRODUCT OBJECT =>',
              //     JSON.stringify(item.productId, null, 2),
              //   );
              //   navigation.navigate('ProductDetails', {
              //     product: item.productId,
              //   });
              // }}

              onPress={() => {
                console.log('PRODUCT ID WISHLISt =>', item?.productId?.id);

                navigation.navigate('ProductDetails', {
                  productId: item?.productId?.id,
                });
              }}>
              <Image
                // source={item.image}

                source={
                  image ? {uri: image} : images.trending_one // fallback
                }
                style={{
                  width: '100%',
                  height: hp(170),
                  resizeMode: 'cover',
                  borderBottomLeftRadius: 14,
                  borderBottomRightRadius: 14,
                }}
              />

              <View style={{padding: 10}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: fontSize(10),
                    fontFamily: fontFamily.poppins400,
                    lineHeight: hp(14),
                    color: colors.black,
                  }}>
                  {product?.title}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 6,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      marginRight: 6,
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins700,
                      lineHeight: hp(16),
                      color: colors.black,
                    }}>
                    Rs. {variant?.price}
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSize(10),
                      color: '#A5A5A5',
                      textDecorationLine: 'line-through',
                      marginRight: 6,
                      fontFamily: fontFamily.poppins500,
                      lineHeight: hp(14),
                    }}>
                    MRP {variant?.mrp ?? '00'}
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSize(10),
                      color: '#2B9909',
                      fontFamily: fontFamily.poppins600,
                      lineHeight: hp(14),
                    }}>
                    {variant?.discount}% OFF
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 6,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#8225AF',
                      paddingHorizontal: 5,
                      borderRadius: 16,
                      width: hp(42),
                      height: hp(18),
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: fontSize(9),
                        fontFamily: fontFamily.poppins500,
                        marginRight: hp(5),
                      }}>
                      {product?.rating ?? '00'}
                    </Text>
                    <StarIcon style={{top: -1, width: hp(9), height: hp(8)}} />
                  </View>
                  <Text
                    style={{
                      fontSize: fontSize(10),
                      color: colors.pureBlack,
                      fontFamily: fontFamily.poppins500,
                      marginLeft: hp(12),
                    }}>
                    ({product?.rating ?? '00'})
                  </Text>

                  <TouchableOpacity
                    style={{marginLeft: 'auto'}}
                    onPress={() => handleRemoveWishlist(item)}>
                    {/*<Text style={{fontSize: 18}}>♡</Text>*/}
                    <GradientFullFillLike />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default WishlistScreen;
