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
import {colors} from '../../../utils/colors';
// import {fontFamily, fontSize, hp} from '../../utils/helpers';
import {fontFamily, fontSize} from '../../../utils/helpers';
import {wp} from '../../../utils/helpers';
import {hp} from '../../../utils/helpers';

import {
  BackIcon,
  GradientFullFillLike,
  GradientLikeIcon,
  images,
  StarIcon,
} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getStoreProductsRequest} from '../../../redux/actions/storeProductActions';
import {
  getWishlistRequest,
  REMOVE_WISHLIST_REQUEST,
  WISHLIST_REQUEST,
} from '../../../redux/actions/wishlistActions';
// import HomeTrendingComponent from '../../components/homeTrendingComponent';

const products = [
  {
    id: 1,
    image: images.trending_one,
    title: 'Designer Traditional Dress1',
    price: 780,
    mrp: 1280,
    discount: '34% Off',
    rating: '4.2',
    reviews: 122,
  },
  {
    id: 2,
    image: images.trending_two,
    title: 'Designer Traditional Dress2',
    price: 780,
    mrp: 1280,
    discount: '34% Off',
    rating: '4.2',
    reviews: 122,
  },
  {
    id: 3,
    image: images.trending_three,
    title: 'Designer Traditional Dress3',
    price: 780,
    mrp: 1280,
    discount: '34% Off',
    rating: '4.2',
    reviews: 122,
  },
  {
    id: 4,
    image: images.trending_one,
    title: 'Designer Traditional Dress',
    price: 780,
    mrp: 1280,
    discount: '34% Off',
    rating: '4.2',
    reviews: 122,
  },

  // ...add more as needed
];
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 40) / 2;

const TopbrandScreen = ({storeId}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data, error} = useSelector(state => state.storeProduct);
  const [localWishlist, setLocalWishlist] = useState([]);
  const {wishlistData} = useSelector(state => state.wishlist);
  useEffect(() => {
    dispatch(getStoreProductsRequest(storeId));
    console.log(storeId, 'StoreId===>');
    console.log('StoreId received in Topbrand:', storeId);
    console.log('API Response:', data);
  }, []);

  useEffect(() => {
    if (Array.isArray(wishlistData)) {
      setLocalWishlist(wishlistData);
    }
  }, [wishlistData]);
  useEffect(() => {
    dispatch(getWishlistRequest()); // ✅ ADD THIS
  }, []);
  // console.log('Products in UI...:', products);

  const token = useSelector(state => state.auth.token);
  console.log('Auth Token in HomeTrendingComponent:', token);
  //wishlist function

  useEffect(() => {
    if (!token) {
      setLocalWishlist([]); // logout clear
    }
  }, [token]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <FlatList
        // data={products}
        data={data?.results || []}
        keyExtractor={item =>
          item._id ? item._id.toString() : Math.random().toString()
        }
        scrollEnabled={false}
        numColumns={2}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={({item}) => {
          console.log('FULL ITEM ===>', item);
          console.log('VARIANTS ===>', item.variants);

          const getMainImage = product => {
            for (let variant of product.variants || []) {
              const mainImage = variant.images?.find(
                img => img.isSelectedForMainScreen === true,
              );
              if (mainImage) return mainImage.imageUrl;
            }
            console.log(getMainImage, 'Main Image URL===>');
            return null;
          };

          // Now check if product exist in wishlist
          const safeWishlist = Array.isArray(wishlistData) ? wishlistData : [];

          // const isWishlisted = localWishlist.some(w => {
          //   const productId = w.productId?.id || w.productId?._id;
          //   return String(productId) === String(item._id);
          // });

          /// when not token always emty heart show
          const isWishlisted =
            token &&
            localWishlist.some(w => {
              const productId = w.productId?.id || w.productId?._id;
              return String(productId) === String(item._id);
            });

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
              //   navigation.navigate('ProductDetails', {product: item});
              //   console.log(
              //     'FIRST IMAGE ===>',
              //     item.variants?.[0]?.images?.[0],
              //   );
              // }}

              onPress={() => {
                console.log('Tob PRODUCT ID =>', item?._id);
                navigation.navigate('ProductDetails', {
                  productId: item?._id,
                });
              }}>
              <Image
                // source={{uri: item.image}}
                source={{uri: getMainImage(item)}}
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
                  {item.title}
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
                    Rs. {item.variants?.[0]?.sellingPrice}
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
                    MRP {item.variants?.[0]?.price}
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSize(10),
                      color: '#2B9909',
                      fontFamily: fontFamily.poppins600,
                      lineHeight: hp(14),
                    }}>
                    {/* {item.discount} */}
                    {item.variants?.[0]?.discount}% Off
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
                      {item.averageRating}
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
                    ({item.totalReviews})
                  </Text>

                  <TouchableOpacity
                    style={{marginLeft: 'auto'}}
                    onPress={() => {
                      if (!token) {
                        console.log(
                          'User not authenticated → Redirect to StartingScreen',
                        );
                        navigation.navigate('StartingScreen');
                        return;
                      }

                      console.log(' CLICK:', item._id);

                      const alreadyExists = isWishlisted;

                      console.log(' BEFORE LOCAL WISHLIST:', localWishlist);
                      console.log(' ALREADY EXISTS:', alreadyExists);

                      if (alreadyExists) {
                        // 🔍 find wishlist item
                        const wishlistItem = localWishlist.find(w => {
                          const pid = w.productId?.id || w.productId?._id;
                          return String(pid) === String(item._id);
                        });

                        console.log(' FOUND ITEM FOR REMOVE:', wishlistItem);

                        if (!wishlistItem?.id) {
                          console.log(' REMOVE FAILED: Wishlist ID not found');
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

                        // 🚀 API call
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

                        // ✅ UI instant update
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
                    {isWishlisted ? (
                      <GradientFullFillLike />
                    ) : (
                      <GradientLikeIcon />
                    )}
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

export default TopbrandScreen;
