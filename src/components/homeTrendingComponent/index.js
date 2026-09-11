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
} from 'react-native';
import {
  images,
  icons,
  StarIcon,
  GradientLikeIcon,
  GradientFullFillLike,
  BlueSaveIcon,
  SavedFiledIcon,
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

const screenWidth = Dimensions.get('window').width;

const HomeTrendingComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [localWishlist, setLocalWishlist] = useState([]);

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
  return (
    <SafeAreaView>
      <Text
        style={{
          paddingHorizontal: wp(10),
          fontSize: fontSize(16),
          color: colors.pureBlack,
          fontFamily: fontFamily.poppins700,
          marginBottom: hp(22),
          marginLeft: hp(5),
        }}>
        Trending
      </Text>
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

          return (
            // <TouchableOpacity
            //   style={styles.card}
            //   activeOpacity={0.6}
            //   onPress={() => {
            //     navigation.navigate('ProductDetails', {product: item});
            //   }}

            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('ProductDetails', {
                  productId: item._id,
                });
              }}>
              <Image
                source={imageUrl ? {uri: imageUrl} : images.trending_one}
                style={styles.image}
              />

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
              <View style={styles.content}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.title}>
                  {item.title}
                </Text>

                <View style={styles.priceRow}>
                  <Text style={styles.price}>
                    Rs. {mainVariant?.sellingPrice || '000'}
                  </Text>
                  <Text style={styles.mrp}>
                    MRP {mainVariant?.price || '000'}
                  </Text>
                  <Text style={styles.discount}>
                    {mainVariant?.discount
                      ? `${mainVariant.discount}% Off`
                      : ''}
                  </Text>
                </View>

                <View style={styles.ratingRow}>
                  <View style={styles.ratingBox}>
                    <Text style={styles.ratingText}>
                      {item.averageRating ? item.averageRating.toFixed(1) : '0'}
                    </Text>

                    <StarIcon style={{top: -1, width: hp(9), height: hp(8)}} />
                  </View>

                  <Text style={styles.reviews}>
                    {item.totalReviews ? `(${item.totalReviews})` : '(00)'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
    padding: wp(10),
  },
  title: {
    fontSize: fontSize(10),
    fontFamily: fontFamily.poppins400,
    lineHeight: hp(14),
    color: colors.black,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(6),
    justifyContent: 'space-between',
  },
  price: {
    marginRight: wp(6),
    fontSize: fontSize(12),
    fontFamily: fontFamily.poppins700,
    lineHeight: hp(16),
    color: colors.black,
  },
  mrp: {
    fontSize: fontSize(10),
    color: '#A5A5A5',
    textDecorationLine: 'line-through',
    marginRight: wp(6),
    fontFamily: fontFamily.poppins500,
    lineHeight: hp(14),
  },
  discount: {
    fontSize: fontSize(10),
    color: '#2B9909',
    fontFamily: fontFamily.poppins600,
    lineHeight: hp(14),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(6),
  },
  ratingBox: {
    backgroundColor: '#5029F3',
    paddingHorizontal: wp(5),
    borderRadius: wp(16),
    width: hp(42),
    height: hp(18),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    fontSize: fontSize(9),
    fontFamily: fontFamily.poppins500,
    marginRight: hp(5),
  },
  reviews: {
    fontSize: fontSize(10),
    color: colors.pureBlack,
    fontFamily: fontFamily.poppins500,
    marginLeft: hp(12),
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
