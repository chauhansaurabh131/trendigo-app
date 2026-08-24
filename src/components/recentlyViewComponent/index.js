import React, {useEffect, useState} from 'react';
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
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {
  BackIcon,
  BlueSaveIcon,
  GradientFullFillLike,
  GradientLikeIcon,
  images,
  SavedFiledIcon,
  StarIcon,
} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import HomeTrendingComponent from '../../components/homeTrendingComponent';
import {getRecentlyViewedRequest} from '../../redux/actions/recentlyViewedActions';
import {useDispatch, useSelector} from 'react-redux';
import {
  getWishlistRequest,
  REMOVE_WISHLIST_REQUEST,
  removeWishlistRequest,
  WISHLIST_REQUEST,
  wishlistRequest,
} from '../../redux/actions/wishlistActions';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 40) / 2;

const RecentlyViewComponent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {data, loading} = useSelector(state => state.recentlyView);

  console.log('RECENTLY PRODUCT IN SCREEN OF DATA', data);

  const [localWishlist, setLocalWishlist] = useState([]);
  const {wishlistData} = useSelector(state => state.wishlist);

  useEffect(() => {
    if (Array.isArray(wishlistData)) {
      setLocalWishlist(wishlistData);
    }
  }, [wishlistData]);
  const hasData = data?.results && data.results.length > 0;

  useEffect(() => {
    dispatch(getRecentlyViewedRequest());
  }, []);

  const {products} = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getWishlistRequest());
  }, []);

  const token = useSelector(state => state.auth.token);
  console.log('Recently Com. Token:', token);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {hasData && (
        <>
          <View style={{marginLeft: wp(17)}}>
            <Text
              style={{
                color: '#000',
                fontFamily: fontFamily.poppins600,
                fontSize: fontSize(18),
              }}>
              Recently Viewed
            </Text>
          </View>
          <View style={{marginLeft: wp(17), marginRight: wp(17)}}>
            <FlatList
              data={data?.results || []}
              keyExtractor={item => item._id || item.id.toString()}
              numColumns={2}
              contentContainerStyle={{
                paddingHorizontal: 0,
                justifyContent: 'space-between',
              }}
              renderItem={({item, index}) => {
                // console.log('RECENTY PRODUCT OF ITEM ', item);
                // console.log('RECENT PRODUCT =>', JSON.stringify(item, null, 2));

                // Now check if product exist in wishlist
                const safeWishlist = Array.isArray(wishlistData)
                  ? wishlistData
                  : [];

                const isWishlisted = localWishlist.some(w => {
                  const productId = w.productId?.id || w.productId?._id;
                  return String(productId) === String(item._id);
                });

                console.log('Images:', item.images);
                console.log('Variants:', item.variants);

                const variant = item?.variants?.[0];
                const price = Number(variant?.price || 0);
                const mrp = Number(variant?.mrp || item?.mrp || 0);

                const discount =
                  mrp && price ? Math.round(((mrp - price) / mrp) * 100) : 0;
                const mainImage =
                  variant?.images?.find(img => img.isSelectedForMainScreen)
                    ?.imageUrl ||
                  variant?.images?.[0]?.imageUrl ||
                  '';
                return (
                  <TouchableOpacity
                    style={{
                      width: cardWidth,
                      marginRight: index % 2 === 0 ? 10 : 0,
                      borderRadius: wp(12),
                      borderWidth: 1,
                      borderColor: '#eee',
                      backgroundColor: '#fff',
                      overflow: 'hidden',
                      marginTop: hp(22),
                    }}
                    activeOpacity={0.6}
                    // onPress={() => {
                    //   navigation.navigate('ProductDetails', {product: item});
                    // }}
                    onPress={() => {
                      console.log('RECENT PRODUCT ID =>', item?._id);
                      navigation.navigate('ProductDetails', {
                        productId: item?._id,
                      });
                    }}>
                    <Image
                      // source={item.image}
                      source={mainImage ? {uri: mainImage} : null}
                      style={{
                        width: '100%',
                        height: hp(198),
                        resizeMode: 'cover',
                        borderBottomLeftRadius: wp(14),
                        borderBottomRightRadius: wp(14),
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        borderRadius: wp(25),
                        right: wp(10),
                        top: hp(10),
                        width: hp(22),
                        height: hp(22),
                        backgroundColor: '#FFFFFF',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        console.log(' CLICK:', item._id);

                        const alreadyExists = isWishlisted;

                        console.log(' BEFORE LOCAL WISHLIST:', localWishlist);
                        console.log(' ALREADY EXISTS:', alreadyExists);

                        if (alreadyExists) {
                          //  find wishlist item
                          const wishlistItem = localWishlist.find(w => {
                            const pid = w.productId?.id || w.productId?._id;
                            return String(pid) === String(item._id);
                          });

                          console.log(' FOUND ITEM FOR REMOVE:', wishlistItem);

                          if (!wishlistItem?.id) {
                            console.log(
                              ' REMOVE FAILED: Wishlist ID not found',
                            );
                            ToastAndroid.show(
                              'Remove failed',
                              ToastAndroid.SHORT,
                            );
                            return;
                          }

                          //  UI instant update
                          setLocalWishlist(prev =>
                            prev.filter(
                              w =>
                                (w.productId?.id || w.productId?._id) !==
                                item._id,
                            ),
                          );

                          console.log('UI UPDATED (REMOVED)');

                          // API call
                          dispatch({
                            type: REMOVE_WISHLIST_REQUEST,
                            payload: wishlistItem.id,
                          });

                          console.log(' REMOVE API CALLED:', wishlistItem.id);

                          // Toast
                          ToastAndroid.show(
                            'Removed from Wishlist',
                            ToastAndroid.SHORT,
                          );
                        } else {
                          console.log(' ADD FLOW START');

                          //  UI instant update
                          setLocalWishlist(prev => [
                            ...prev,
                            {productId: {id: item._id}},
                          ]);

                          console.log(' UI UPDATED (ADDED)');

                          //  API call
                          dispatch({
                            type: WISHLIST_REQUEST,
                            payload: {productId: item._id},
                          });

                          console.log(' ADD API CALLED');

                          //  Toast
                          ToastAndroid.show(
                            'Added to Wishlist',
                            ToastAndroid.SHORT,
                          );
                        }

                        console.log(' AFTER LOCAL WISHLIST:', localWishlist);
                      }}>
                      <View style={{alignItems: 'center'}}>
                        {isWishlisted ? <SavedFiledIcon /> : <BlueSaveIcon />}
                      </View>
                    </TouchableOpacity>
                    <View style={{padding: wp(10)}}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          fontSize: fontSize(10),
                          fontFamily: fontFamily.poppins400,
                          lineHeight: hp(14),
                          color: colors.black,
                        }}>
                        {item.title}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: hp(6),
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            marginRight: wp(6),
                            fontSize: fontSize(12),
                            fontFamily: fontFamily.poppins700,
                            lineHeight: hp(16),
                            color: colors.black,
                          }}>
                          {/* Rs. {item.price} */}
                          Rs. {variant?.sellingPrice ?? ''}
                        </Text>
                        <Text
                          style={{
                            fontSize: fontSize(10),
                            color: '#A5A5A5',
                            textDecorationLine: 'line-through',
                            marginRight: wp(6),
                            fontFamily: fontFamily.poppins500,
                            lineHeight: hp(14),
                          }}>
                          MRP {variant?.price ?? ''}
                        </Text>
                        <Text
                          style={{
                            fontSize: fontSize(10),
                            color: '#2B9909',
                            fontFamily: fontFamily.poppins600,
                            lineHeight: hp(14),
                          }}>
                          {/* {item.discount} */}
                          {variant?.discount ? `${variant.discount}% Off` : ''}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: wp(6),
                        }}>
                        <View
                          style={{
                            // backgroundColor: '#8225AF',
                            backgroundColor: '#5029F3',
                            paddingHorizontal: wp(5),
                            borderRadius: wp(16),
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
                            {/* {item.rating} */}
                            {item?.averageRating}
                          </Text>
                          <StarIcon
                            style={{top: hp(-1), width: hp(9), height: hp(8)}}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: fontSize(10),
                            color: colors.pureBlack,
                            fontFamily: fontFamily.poppins500,
                            marginLeft: hp(12),
                          }}>
                          {/* {item.reviews} */}
                          {`(${item?.totalReviews ?? 0})`}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default RecentlyViewComponent;
