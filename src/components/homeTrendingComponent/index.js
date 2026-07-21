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
  // product
  const {products, loading} = useSelector(state => state.product);
  // console.log('PRODUCT IN UI  ===>', products);
  const {wishlistData} = useSelector(state => state.wishlist);

  useEffect(() => {
    if (Array.isArray(wishlistData)) {
      setLocalWishlist(wishlistData);
    }
  }, [wishlistData]);

  useEffect(() => {
    dispatch(getProductRequest());
    dispatch(getWishlistRequest()); // ✅ ADD THIS
  }, []);
  // console.log('Products in UI...:', products);

  useEffect(() => {
    if (!token) {
      setLocalWishlist([]);
    }
  }, [token]);
  return (
    <SafeAreaView>
      <Text
        style={{
          paddingHorizontal: 10,
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
        // keyExtractor={item => item.id.toString()}
        keyExtractor={item => item._id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: wp(10), // 👈 ONLY HERE spacing control
        }}
        contentContainerStyle={styles.container}
        renderItem={({item}) => {
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
          // console.log(' WISHLIST CHECK:', isWishlisted);

          // console.log('wishlistData:', wishlistData);
          // console.log('current item:', item._id);
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
              {/* <Image source={item.image} style={styles.image} /> */}
              <Image
                source={
                  imageUrl ? {uri: imageUrl} : images.trending_one // fallback image
                }
                style={styles.image}
              />

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

const cardWidth = (screenWidth - 40) / 2;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    // paddingTop: 10,
  },
  card: {
    width: cardWidth,
    marginBottom: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    overflow: 'hidden',
    // marginTop: hp(18),
  },
  image: {
    width: '100%',
    height: hp(170),
    resizeMode: 'cover',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  content: {
    padding: 10,
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
    marginTop: 6,
    justifyContent: 'space-between',
  },
  price: {
    marginRight: 6,
    fontSize: fontSize(12),
    fontFamily: fontFamily.poppins700,
    lineHeight: hp(16),
    color: colors.black,
  },
  mrp: {
    fontSize: fontSize(10),
    color: '#A5A5A5',
    textDecorationLine: 'line-through',
    marginRight: 6,
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
    marginTop: 6,
  },
  ratingBox: {
    backgroundColor: '#8225AF',
    paddingHorizontal: 5,
    borderRadius: 16,
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
    // top: 1,
  },
  reviews: {
    fontSize: fontSize(10),
    color: colors.pureBlack,
    // marginRight: 6,
    fontFamily: fontFamily.poppins500,
    marginLeft: hp(12),
  },
  heartButton: {
    marginLeft: 'auto',
  },
});

export default HomeTrendingComponent;
