import React from 'react';
import {Text} from 'react-native';
import {
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  SearchFilterIcon,
  SearchIcon,
  SmallTrulyBag,
  icons,
  StarIcon,
  GradientLikeIcon,
  images,
  BlueSaveIcon,
} from '../../assets';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {colors} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {getSellerProductsRequest} from '../../redux/actions/sellerProductActions';
const ProductScreen = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const dispatch = useDispatch();

  const {sellerData, error} = useSelector(state => state.sellerAuth);

  const sellerId = sellerData?.data?.seller?.id;
  console.log('SELLER ID =>', sellerId);

  // useEffect runs after the component renders.
  // You want to call the API when the screen opens and when sellerId becomes available.
  useEffect(() => {
    if (sellerId) {
      const payload = {
        sellerId,
        page: 1,
        limit: 10,
      };

      console.log('INITIAL DISPATCH =>', payload);

      dispatch(getSellerProductsRequest(payload));
    }
  }, [sellerId]);

  const {sellerProducts, sellerLoading, page, totalPages} = useSelector(
    state => state.sellerProduct,
  );

  const loadMore = () => {
    console.log('LOAD MORE CALLED =>', currentPage, totalPages, loadingMore);

    if (loadingMore || currentPage >= totalPages) {
      console.log('LOAD MORE STOPPED');
      return;
    }

    const nextPage = currentPage + 1;

    const payload = {
      sellerId,
      page: nextPage,
      limit: 10,
    };

    console.log('LOAD MORE DISPATCH =>', payload);

    setLoadingMore(true);
    setCurrentPage(nextPage);

    dispatch(getSellerProductsRequest(payload));
  };
  // console.log('SELLER PRODUCTS =>', sellerProducts);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          // width: '100%',
          height: hp(55),
          // backgroundColor: 'pink',
          // alignItems: 'center',
          marginHorizontal: wp(17),
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontFamily: fontFamily.poppins600,
              fontSize: fontSize(15),
              color: '#000000',
            }}>
            Products
          </Text>
          <SearchFilterIcon />
        </View>
      </View>

      <View
        style={{
          width: '100%',
          height: hp(1),
          backgroundColor: '#F2F2F2',
        }}
      />

      {sellerLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#5029F4" />
        </View>
      ) : (
        <FlatList
          data={sellerProducts}
          keyExtractor={(item, index) =>
            item._id?.toString() || index.toString()
          }
          numColumns={2}
          contentContainerStyle={styles.container}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="small" color="#5029F4" />
            ) : null
          }
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: fontSize(16),
                  fontFamily: fontFamily.poppins500,
                  color: 'grey',
                }}>
                No Products Found
              </Text>
            </View>
          }
          renderItem={({item}) => {
            console.log('PRODUCT ITEM =>', item);
            const firstVariant = item?.variants?.[0];
            // console.log('FIRST VARIANT =>', firstVariant);

            const price = firstVariant?.price || 0;
            // console.log('PRICE =>', price);

            const discount = firstVariant?.discount || 0;
            // console.log('DISCOUNT =>', discount);

            const mainImage = firstVariant?.images?.find(
              image => image.isSelectedForMainScreen,
            );
            // console.log('MAIN IMAGE =>', mainImage);

            return (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.6}
                onPress={() => {
                  navigation.navigate('ProductFullDetailsScreen', {
                    productId: item.id,
                  });
                }}>
                <View style={{position: 'relative'}}>
                  <Image
                    source={{
                      uri: mainImage?.imageUrl,
                    }}
                    style={styles.image}
                  />
                  <TouchableOpacity
                    onPress={() => console.log('Save Icon Click')}
                    style={{
                      position: 'absolute',
                      borderRadius: wp(25),
                      right: wp(10),
                      top: hp(10),
                      width: hp(22),
                      height: hp(22),
                      backgroundColor: '#FFFFFF',
                      justifyContent: 'center',
                    }}>
                    <View style={{alignItems: 'center'}}>
                      <BlueSaveIcon />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.content}>
                  <Text numberOfLines={1} style={styles.title}>
                    {item.title}
                  </Text>

                  <View style={styles.priceRow}>
                    <Text style={styles.price}>Rs. {price}</Text>
                    <Text style={styles.mrp}>MRP {price}</Text>
                    <Text style={styles.discount}>{discount}% Off</Text>
                  </View>

                  <View style={styles.ratingRow}>
                    <View style={styles.ratingBox}>
                      <Text style={styles.ratingText}>
                        {item.averageRating?.toFixed(1) || '0.0'}
                      </Text>
                      <StarIcon
                        style={{top: -1, width: hp(9), height: hp(8)}}
                      />
                    </View>
                    <Text style={styles.reviews}>
                      ({item.totalReviews || '00'})
                    </Text>

                    {/* <TouchableOpacity style={styles.heartButton}>
                      <GradientLikeIcon />
                    </TouchableOpacity> */}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 40) / 2;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(10),
    marginTop: hp(17),
    flexGrow: 1,
    // paddingTop: 10,
  },
  card: {
    width: cardWidth,
    marginBottom: hp(18),
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
    backgroundColor: '#5029F4',
    paddingHorizontal: wp(5),
    // paddingVertical: 2,
    borderRadius: wp(16),
    // marginRight: 6,
    // alignItems: 'center',
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
    fontFamily: fontFamily.poppins500,
    marginLeft: hp(12),
  },
  heartButton: {
    marginLeft: 'auto',
  },
});
export default ProductScreen;
