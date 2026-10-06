import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  images,
  icons,
  StarIcon,
  GradientLikeIcon,
  GradientFullFillLike,
  BlueSaveIcon,
  SavedFiledIcon,
  Sort,
  FilterIcon,
  DropArrow,
  AddCart,
  WhiteIcon,
  NewAddIcon,
  NewAddCartIcon,
  NewRemoveCartIcon,
} from '../../assets'; // Add your heart icon, star icon, etc.
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {colors} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getProductRequest} from '../../redux/actions/productActions';
import {useState} from 'react';
import {getProductByReviewRequest} from '../../redux/actions/productByReviewActions';
import {ToastAndroid} from 'react-native';
import {
  getWishlistRequest,
  REMOVE_WISHLIST_REQUEST,
  WISHLIST_REQUEST,
} from '../../redux/actions/wishlistActions';
import HomeFilterComponent from '../HomeFilterComponent';
import {GET_CART_REQUEST} from '../../redux/actions/cartActions';

const screenWidth = Dimensions.get('window').width;

const HomeTrendingComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [localWishlist, setLocalWishlist] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const token = useSelector(state => state.auth.token);
  console.log('Auth Token in HomeTrendingComponent:', token);
  // redux store
  // const {products, loading} = useSelector(state => state.product);
  const {products, loading, page, totalPages} = useSelector(
    state => state.product,
  );
  // console.log('PRODUCT IN UI  ===>', products);
  // console.log('PRODUCT IN LOADING  ===>', loading);
  console.log('PRODUCT IN PAGE  ===>', page);
  console.log('PRODUCT IN TOTAL PAGES  ===>', totalPages);
  const {wishlistData} = useSelector(state => state.wishlist);

  useEffect(() => {
    if (Array.isArray(wishlistData)) {
      setLocalWishlist(wishlistData);
    }
  }, [wishlistData]);

  //dispatch
  useEffect(() => {
    // dispatch(getProductRequest());
    dispatch(getProductRequest({page: 1}));
    dispatch(getWishlistRequest());
  }, []);

  //token
  useEffect(() => {
    if (!token) {
      setLocalWishlist([]);
    }
  }, [token]);

  const {cartLoading, cartData, error, success} = useSelector(
    state => state.addToCard,
  );
  const cartCount = cartData?.productDetailList?.length || 0;
  console.log('HOME CART COUNT =>', cartCount);
  useEffect(() => {
    if (token) {
      console.log('CALLING CART API FROM PRODUCT DETAILS');

      dispatch({
        type: GET_CART_REQUEST,
        token: token,
      });
    }
  }, [token]);

  const EMPTY_ARRAY = [];

  const cartItems = useSelector(
    state => state.addToCard?.cartData?.productDetailList || EMPTY_ARRAY,
  );

  const addressList = useSelector(state => state.addresses?.list || []);
  const deliveryAddressId = addressList[0]?.id;

  console.log('ADDRESS LIST ', addressList);
  console.log('DELIVERY ID ', deliveryAddressId);
  // Add to Card Function
  const handleAddToCart = (item, mainVariant) => {
    if (!token) {
      navigation.navigate('StartingScreen', {
        redirectTo: 'BagStack',
      });
      return;
    }

    const payload = {
      productDetailList: [
        {
          productId: item._id,
          variants: mainVariant?._id || mainVariant?.id,
          quantity: 1,
        },
      ],
      deliveryAddress: deliveryAddressId,
    };

    console.log('ADD TO CART PAYLOAD =>', payload);

    dispatch({
      type: 'ADD_TO_CART_REQUEST',
      payload,
      token,
    });
    ToastAndroid.show('Added to Cart', ToastAndroid.SHORT);
  };

  const handleRemoveFromCart = cartItem => {
    dispatch({
      type: 'REMOVE_CART_REQUEST',
      payload: {
        cartId: cartData?.id,
        itemId: cartItem?._id,
      },
      token,
    });
    ToastAndroid.show('Removed from Cart', ToastAndroid.SHORT);
  };
  // const handleCartAction = () => {
  //   if (isAddedToCart) {
  //     handleRemoveFromCart();
  //   } else {
  //     handleAddToCart();
  //   }
  // };

  const handleCartAction = (item, mainVariant, cartItem) => {
    if (!token) {
      navigation.navigate('StartingScreen', {
        redirectTo: 'BagStack',
      });
      return;
    }

    if (cartItem) {
      handleRemoveFromCart(cartItem);
    } else {
      handleAddToCart(item, mainVariant);
    }
  };

  // useEffect(() => {
  //   if (success) {
  //     ToastAndroid.show('Cart Updated Successfully', ToastAndroid.SHORT);
  //   }

  //   if (error) {
  //     ToastAndroid.show(error, ToastAndroid.SHORT);
  //   }
  // }, [success, error]);
  return (
    <SafeAreaView>
      {/* <Text
        style={{
          paddingHorizontal: wp(10),
          fontSize: fontSize(18),
          color: colors.pureBlack,
          fontFamily: fontFamily.poppins700,
          marginBottom: hp(20),
          marginLeft: hp(5),
        }}>
        Trending
      </Text> */}

      {/* <View>
        <HomeFilterComponent />
      </View> */}

      <FlatList
        data={products}
        keyExtractor={item => item._id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: wp(10),
        }}
        onEndReached={() => {
          if (!loading && page < totalPages) {
            dispatch(
              getProductRequest({
                page: page + 1,
              }),
            );
          }
        }}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.container}
        renderItem={({item}) => {
          console.log('RENDER PRODUCT ID =>', item._id);
          // console.log('PRODUCT ITEM IN HOME TRENDIGO ', item);

          // Now check if product exist in wishlist
          const safeWishlist = Array.isArray(wishlistData) ? wishlistData : [];

          /// when not token always emty heart show
          const isWishlisted =
            token &&
            localWishlist.some(w => {
              const productId = w.productId?.id || w.productId?._id;
              return String(productId) === String(item._id);
            });
          // console.log('ITEM:', item._id);

          const mainVariant =
            item.variants?.find(v =>
              v.images?.some(img => img.isSelectedForMainScreen),
            ) || item.variants?.[0];
          const mainImage = mainVariant?.images?.find(
            img => img.isSelectedForMainScreen,
          );
          const imageUrl = mainImage?.imageUrl;

          const cartItem = cartItems.find(
            cart =>
              cart?.productId?._id === item._id ||
              cart?.productId?.id === item._id,
          );

          const isAddedToCart = !!cartItem;
          return (
            // <TouchableOpacity
            //   style={styles.card}
            //   activeOpacity={0.6}
            //   onPress={() => {
            //     navigation.navigate('ProductDetails', {product: item});
            //   }}

            <View style={styles.card} activeOpacity={0.6}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDetails', {
                    productId: item._id,
                  });
                }}>
                <Image
                  source={imageUrl ? {uri: imageUrl} : images.trending_one}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.heartButton}
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
                    //  find wishlist item
                    const wishlistItem = localWishlist.find(w => {
                      const pid = w.productId?.id || w.productId?._id;
                      return String(pid) === String(item._id);
                    });

                    console.log(' FOUND ITEM FOR REMOVE:', wishlistItem);

                    if (!wishlistItem?.id) {
                      console.log(' REMOVE FAILED: Wishlist ID not found');
                      ToastAndroid.show('Remove failed', ToastAndroid.SHORT);
                      return;
                    }

                    //  UI instant update
                    setLocalWishlist(prev =>
                      prev.filter(
                        w => (w.productId?.id || w.productId?._id) !== item._id,
                      ),
                    );

                    console.log('UI UPDATED (REMOVED)');

                    //  API call
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

                    // UI instant update
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
                    ToastAndroid.show('Added to Wishlist', ToastAndroid.SHORT);
                  }

                  console.log(' AFTER LOCAL WISHLIST:', localWishlist);
                }}>
                <View style={{alignItems: 'center'}}>
                  {isWishlisted ? (
                    <SavedFiledIcon fill={''} />
                  ) : (
                    <BlueSaveIcon />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDetails', {
                    productId: item._id,
                  });
                }}>
                <View style={styles.content}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.title}>
                    {item.title}
                  </Text>

                  <View style={styles.priceRow}>
                    <Text style={styles.price}>
                      ₹{mainVariant?.sellingPrice || '000'}
                    </Text>

                    <Text style={styles.mrp}>
                      ₹{mainVariant?.price || '000'}
                    </Text>
                    <Text style={styles.discount}>
                      {mainVariant?.discount
                        ? `${mainVariant.discount}% Off`
                        : ''}
                    </Text>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      backgroundColor: '#F1F5F9',
                      height: hp(1),
                      // width: '100%',
                      marginHorizontal: wp(10),
                      marginTop: hp(8),
                    }}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: wp(10),
                }}>
                <View style={styles.ratingRow}>
                  <View style={styles.ratingBox}>
                    <Text style={styles.ratingText}>
                      {item.averageRating
                        ? item.averageRating.toFixed(1)
                        : '0.0'}
                    </Text>

                    <WhiteIcon />
                  </View>

                  <View
                    style={{
                      width: hp(16),
                      height: hp(15),
                      // backgroundColor: 'red',
                    }}>
                    <Text style={styles.reviews}>
                      {item.totalReviews ? `${item.totalReviews}` : '00'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => handleCartAction(item, mainVariant, cartItem)}>
                  {isAddedToCart ? <NewRemoveCartIcon /> : <NewAddCartIcon />}
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const cardWidth = (screenWidth - 40) / 2;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(10),
  },
  card: {
    width: cardWidth,
    marginBottom: hp(15),
    marginHorizontal: wp(5),
    borderRadius: wp(12),
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: hp(198),
    resizeMode: 'cover',
    borderBottomLeftRadius: wp(14),
    borderBottomRightRadius: wp(14),
  },
  content: {
    marginTop: wp(4),
    paddingLeft: wp(10),
  },
  title: {
    fontSize: fontSize(10),
    fontFamily: fontFamily.poppins500,
    // lineHeight: hp(14),
    color: '#64748B',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(5),
    // justifyContent: 'space-between',
  },
  price: {
    marginRight: wp(6),
    fontSize: fontSize(14),
    fontFamily: fontFamily.poppins700,
    lineHeight: hp(16),
    color: '#0F172A',
  },
  mrp: {
    fontSize: fontSize(11),
    color: '#94A3B8',
    textDecorationLine: 'line-through',
    marginRight: wp(6),
    fontFamily: fontFamily.poppins400,
    lineHeight: hp(14),
  },
  discount: {
    fontSize: fontSize(11),
    color: '#2B9909',
    fontFamily: fontFamily.poppins700,
    lineHeight: hp(14),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(8),
    marginBottom: hp(10),
  },
  ratingBox: {
    backgroundColor: '#5029F3',
    paddingHorizontal: wp(6),
    borderRadius: wp(4),
    // width: hp(40),
    height: hp(15),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    fontSize: fontSize(10),
    fontFamily: fontFamily.poppins700,
    marginRight: hp(3),
    textAlignVertical: 'center',
    // includeFontPadding: false,
  },
  reviews: {
    fontSize: fontSize(10),
    color: '#94A3B8',
    fontFamily: fontFamily.poppins700,
    marginLeft: hp(6),
  },
  heartButton: {
    position: 'absolute',
    borderRadius: wp(25),
    right: wp(10),
    top: hp(10),
    width: hp(22),
    height: hp(22),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
});

export default HomeTrendingComponent;
