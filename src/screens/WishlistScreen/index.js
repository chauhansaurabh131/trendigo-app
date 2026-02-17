import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
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
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getWishlistRequest,
  removeWishlistRequest,
} from '../../redux/actions/wishlistActions';
import {getProductRequest} from '../../redux/actions/productActions';
// const products = [
//   {
//     id: 1,
//     image: images.trending_one,
//     title: 'Designer Traditional Dress1',
//     price: 780,
//     mrp: 1280,
//     discount: '34% Off',
//     rating: '4.2',
//     reviews: 122,
//   },
//   {
//     id: 2,
//     image: images.trending_two,
//     title: 'Designer Traditional Dress2',
//     price: 780,
//     mrp: 1280,
//     discount: '34% Off',
//     rating: '4.2',
//     reviews: 122,
//   },
//   {
//     id: 3,
//     image: images.trending_three,
//     title: 'Designer Traditional Dress3',
//     price: 780,
//     mrp: 1280,
//     discount: '34% Off',
//     rating: '4.2',
//     reviews: 122,
//   },
//   {
//     id: 4,
//     image: images.trending_one,
//     title: 'Designer Traditional Dress',
//     price: 780,
//     mrp: 1280,
//     discount: '34% Off',
//     rating: '4.2',
//     reviews: 122,
//   },

//   // ...add more as needed
// ];
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 40) / 2;

const WishlistScreen = () => {
  //  Navigation hook –
  const navigation = useNavigation();

  //  Redux action dispatch
  const dispatch = useDispatch();
  // 🔹 Product reducer to get all products
  const {products} = useSelector(state => state.product);

  // 🔹 Auth reducer logged user data
  const authData = useSelector(state => state.auth);
  console.log('AUTH 👉', authData);

  // 🔹 Wishlist reducer taking state
  const wishlistState = useSelector(state => state.wishlist);

  // 🔹 Safety check – wishlistData always array
  // beacuse filter/map always work on array
  const wishlistData = Array.isArray(wishlistState?.wishlistData)
    ? wishlistState.wishlistData
    : [];

  // 🔹 Logged-in user id
  const userId = useSelector(state => state.auth?.user?.id);

  // 🔹 Current user wishlist
  // useMemo
  // wishlistData and  userId change then again calculation
  const userWishlist = React.useMemo(() => {
    return wishlistData.filter(item =>
      // backend userId
      item.userId
        ? item.userId === userId
        : // createdBy
          item.createdBy === userId,
    );
  }, [wishlistData, userId]);

  // 🔹 Wishlist item + product details merge
  // beacuse wishlist only for  productId
  const wishlistWithProducts = React.useMemo(() => {
    return userWishlist
      .map(w => {
        const product = products.find(p => p._id === w.productId?.id);

        return product ? {...product, wishlistId: w.id} : null;
      })
      .filter(Boolean);
  }, [userWishlist, products]);

  // 🔹 Wishlist for unique productId
  // duplicate product avoid
  const uniqueProductIds = [
    ...new Set(userWishlist.map(item => item.productId?._id)),
  ];

  // 🔹 Product list for only  wishlist products filter
  // this approach optional
  const finalProducts = products.filter(product =>
    uniqueProductIds.includes(product.id),
  );
  console.log('Wishlist product id 👉', userWishlist[0]?.productId?.id);
  console.log('Product list _id 👉', products[0]?._id);

  useEffect(() => {
    dispatch(getWishlistRequest()); // wishlist productId
    dispatch(getProductRequest()); // all products
  }, [dispatch]);

  useEffect(() => {
    console.log('Wishlist 👉', wishlistData.length);
    console.log('User Wishlist 👉', userWishlist.length);
    // console.log('Final 👉', finalProducts.length);
  }, [wishlistData, userWishlist, finalProducts]);

  const getSafeImageSource = product => {
    const variant =
      product?.variants?.find(
        v =>
          Array.isArray(v.images) &&
          v.images.some(img => img.isSelectedForMainScreen && img.imageUrl),
      ) || product?.variants?.[0];

    const image =
      variant?.images?.find(
        img => img.isSelectedForMainScreen && img.imageUrl,
      ) || variant?.images?.[0];

    if (image?.imageUrl) {
      return {uri: image.imageUrl};
    }

    return images.trending_one;
  };

  // console.log('Final 👉', finalProducts.length);

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
        // data={wishlistWithProducts}
        // data={finalProducts}
        // data={products}
        // keyExtractor={item => item.id.toString()}
        data={wishlistWithProducts}
        keyExtractor={item => item.wishlistId}
        numColumns={2}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={({item}) => {
          const product = item; // ✅ CORRECT
          const variant = product?.variants?.[0];
          return (
            <TouchableOpacity
              style={{
                width: cardWidth,
                marginBottom: 15,
                marginHorizontal: 5,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#eee',
                backgroundColor: '#fff',
                overflow: 'hidden',
                marginTop: hp(22),
              }}
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('ProductDetails', {product: item});
              }}>
              <Image
                // source={{uri: variant?.images?.[0]?.imageUrl}}
                source={getSafeImageSource(product)}
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
                  {item?.title ?? ''}
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
                    Rs.
                    {/* {item.price}
                     */}
                    {variant?.price ?? ''}
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
                    MRP
                    {/* {item.mrp} */}
                    {variant?.mrp ?? '00'}
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSize(10),
                      color: '#2B9909',
                      fontFamily: fontFamily.poppins600,
                      lineHeight: hp(14),
                    }}>
                    {/* {item.discount} */}
                    {variant?.discount ?? ''}%off
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
                      {/* {item.rating} */}
                      {item.averageRating ? item.averageRating.toFixed(1) : '0'}
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
                    {/* {item.reviews} */}
                    {item.totalReviews ? `(${item.totalReviews})` : '(00)'}
                  </Text>

                  <TouchableOpacity style={{marginLeft: 'auto'}}>
                    {/*<Text style={{fontSize: 18}}>♡</Text>*/}
                    <GradientFullFillLike
                      onPress={() => {
                        console.log('Remove Wishlist Clicked');
                        console.log(
                          '🆔 Wishlist ID (item.id):',
                          item.wishlistId,
                        );
                        dispatch(removeWishlistRequest(item.wishlistId));
                      }}
                    />
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
