import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fontFamily, fontSize, hp} from '../../utils/helpers';
import {
  BackIcon,
  BlueSaveIcon,
  GradientColorSearchIcon,
  GradientFullFillLike,
  GradientLikeIcon,
  images,
  SavedFiledIcon,
  SearchFilterIcon,
  SearchIcon,
  StarIcon,
} from '../../assets';
import {useNavigation, useRoute} from '@react-navigation/native';

import HomeTrendingComponent from '../../components/homeTrendingComponent';
import {useDispatch, useSelector} from 'react-redux';
import {
  getWishlistRequest,
  REMOVE_WISHLIST_REQUEST,
  WISHLIST_REQUEST,
} from '../../redux/actions/wishlistActions';
import {wp} from '../../utils/helpers';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import TopBrandComponent from '../../components/topBrandComponent';
import {ActivityIndicator} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 40) / 2;

const SearchResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [localWishlist, setLocalWishlist] = useState([]);
  const {products, loading, currentPage, totalPages} = useSelector(
    state => state.search,
  );
  console.log('SEARCH RESULT PRODUCTS =>', products);
  console.log('CURRENT PAGE =>', currentPage);
  console.log('TOTAL PAGES =>', totalPages);
  console.log('PRODUCT COUNT =>', products.length);

  // get search text
  const searchText = route?.params?.search || '';

  const token = useSelector(state => state.auth.token);
  console.log('Auth Token in HomeTrendingComponent:', token);
  //wishlist function

  useEffect(() => {
    if (!token) {
      setLocalWishlist([]);
    }
  }, [token]);

  const {wishlistData} = useSelector(state => state.wishlist);
  useEffect(() => {
    if (Array.isArray(wishlistData)) {
      setLocalWishlist(wishlistData);
    }
  }, [wishlistData]);
  useEffect(() => {
    dispatch(getWishlistRequest());
  }, []);

  const [activeTab, setActiveTab] = useState('Top Brand');
  const tabs = [
    'Top Brand',
    'Top Rated',
    'Deals',
    'Crazy Deals',
    'Trending',
    'New Arrivals',
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Top Brand':
        return <TopBrandComponent />;

      case 'Top Rated':
        return <TopBrandComponent />;

      default:
        return null;
    }
  };
  const renderProduct = ({item}) => {
    const images = item?.variants?.[0]?.images || [];

    const selectedImage = images.find(
      img => img?.isSelectedForMainScreen === true,
    );

    const productImage = selectedImage?.imageUrl || images?.[0]?.imageUrl;
    // console.log('PRODUCT IMAGE ID:', productImage);
    // Now check if product exist in wishlist
    const safeWishlist = Array.isArray(wishlistData) ? wishlistData : [];

    /// when not token always emty heart show
    const isWishlisted =
      token &&
      localWishlist.some(w => {
        const productId = w.productId?.id || w.productId?._id;
        return String(productId) === String(item._id);
      });

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.6}
        // onPress={() => {
        //   navigation.navigate('ProductDetails', {product: item});
        // }}

        onPress={() => {
          console.log('SEARCH RESULT PRODUCT ID =>', item?._id);
          navigation.navigate('ProductDetails', {
            productId: item?._id,
          });
        }}>
        {/* <Image source={item.image} style={styles.image} /> */}
        <Image source={{uri: productImage}} style={styles.image} />

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
              // find wishlist item
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
              ToastAndroid.show('Removed from Wishlist', ToastAndroid.SHORT);
            } else {
              console.log(' ADD FLOW START');

              //  UI instant update
              setLocalWishlist(prev => [...prev, {productId: {id: item._id}}]);

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
            {isWishlisted ? <SavedFiledIcon /> : <BlueSaveIcon />}
          </View>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>
              Rs. {item.variants?.[0]?.sellingPrice}
            </Text>
            <Text style={styles.mrp}>MRP {item.variants?.[0]?.price}</Text>
            <Text style={styles.discount}>
              {item.variants?.[0]?.discount}% OFF
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingText}>
                {' '}
                {item?.reviewSummary?.[0]?.averageRating || 0}
              </Text>
              <StarIcon style={{top: -1, width: hp(9), height: hp(8)}} />
            </View>
            <Text style={styles.reviews}>
              {' '}
              ({item?.reviewSummary?.[0]?.totalReviews || 0})
            </Text>

            <TouchableOpacity style={styles.heartButton}></TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <FlatList
        // data={products}
        data={products || []}
        keyExtractor={(_, index) => index.toString()}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: wp(10),
        }}
        contentContainerStyle={{
          paddingBottom: hp(60),
          flexGrow: 1,
        }}
        numColumns={2}
        renderItem={renderProduct}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (!loading && currentPage < totalPages) {
            dispatch(
              searchProductRequest({
                keyword: searchText,
                page: currentPage + 1,
                limit: 12,
              }),
            );
          }
        }}
        ListHeaderComponent={
          <>
            {/* TABS */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: wp(17),
                marginTop: hp(30),
                marginBottom: hp(10),
              }}>
              {tabs.map((tab, index) => {
                const isActive = activeTab === tab;

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setActiveTab(tab)}
                    style={{marginRight: wp(12)}}>
                    {isActive ? (
                      <LinearGradient
                        // colors={['#8225AF', '#0F52BA']}
                        colors={['#5029F3', '#7756FF']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={{
                          width: wp(94),
                          height: hp(30),
                          borderRadius: wp(24),
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontFamily: fontFamily.poppins400,
                            fontSize: fontSize(13),
                          }}>
                          {tab}
                        </Text>
                      </LinearGradient>
                    ) : (
                      <View
                        style={{
                          backgroundColor: '#F7F7F7',
                          width: wp(94),
                          height: hp(30),
                          borderRadius: wp(24),
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontFamily: fontFamily.poppins400,
                            fontSize: fontSize(13),
                          }}>
                          {tab}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {renderTabContent()}
            <View style={{height: hp(20)}} />

            {/* LOADER */}
            {loading && (
              <View
                style={{
                  height: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size="large" color="#5029F3" />
              </View>
            )}

            {/* EMPTY STATE */}
            {!loading && products?.length === 0 && (
              <View
                style={{
                  height: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: fontSize(18),
                    fontFamily: fontFamily.poppins500,
                  }}>
                  No products found
                </Text>
              </View>
            )}
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(10),
  },
  card: {
    width: cardWidth,
    marginBottom: wp(15),
    marginHorizontal: wp(5),
    borderRadius: wp(12),
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: hp(277),
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
    // backgroundColor: '#8225AF',
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

export default SearchResultScreen;
