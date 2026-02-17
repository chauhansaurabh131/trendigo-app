// import React from 'react';
// import {
//   FlatList,
//   Image,
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import {images, icons, StarIcon, GradientLikeIcon} from '../../assets'; // Add your heart icon, star icon, etc.
// import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
// import {colors} from '../../utils/colors';
// import {useNavigation} from '@react-navigation/native';
// import {useDispatch, useSelector} from 'react-redux';
// import {useEffect} from 'react';
// import {getProductRequest} from '../../redux/actions/productActions';
// import {wishlistRequest} from '../../redux/actions/wishlistActions';
// import {getProductByReviewRequest} from '../../redux/actions/productByReviewActions';

// const screenWidth = Dimensions.get('window').width;

// // const products = [
// //   {
// //     id: 1,
// //     image: images.trending_one,
// //     title: 'Designer Traditional Dress1',
// //     price: 780,
// //     mrp: 1280,
// //     discount: '34% Off',
// //     rating: '4.2',
// //     reviews: 122,
// //   },
// //   {
// //     id: 2,
// //     image: images.trending_two,
// //     title: 'Designer Traditional Dress2',
// //     price: 780,
// //     mrp: 1280,
// //     discount: '34% Off',
// //     rating: '4.2',
// //     reviews: 122,
// //   },
// //   {
// //     id: 3,
// //     image: images.trending_three,
// //     title: 'Designer Traditional Dress3',
// //     price: 780,
// //     mrp: 1280,
// //     discount: '34% Off',
// //     rating: '4.2',
// //     reviews: 122,
// //   },
// //   {
// //     id: 4,
// //     image: images.trending_one,
// //     title: 'Designer Traditional Dress',
// //     price: 780,
// //     mrp: 1280,
// //     discount: '34% Off',
// //     rating: '4.2',
// //     reviews: 122,
// //   },
// //   {
// //     id: 5,
// //     image: images.trending_two,
// //     title: 'Designer Traditional Dress',
// //     price: 780,
// //     mrp: 1280,
// //     discount: '34% Off',
// //     rating: '4.2',
// //     reviews: 122,
// //   },
// //   {
// //     id: 6,
// //     image: images.trending_three,
// //     title: 'Designer Traditional Dress',
// //     price: 780,
// //     mrp: 1280,
// //     discount: '34% Off',
// //     rating: '4.2',
// //     reviews: 122,
// //   },
// //   // ...add more as needed
// // ];

// const HomeTrendingComponent = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   // const imageUrl = item.images?.[0]?.url;

//   // const {products, loading} = useSelector(state => state.product);
//   const {products, loading} = useSelector(state => state.productByReview);
//   //second useEffect to get all products
//   useEffect(() => {
//     dispatch(getProductByReviewRequest());
//   }, []);
//   useEffect(() => {
//     console.log('Products in UI...:', products);
//   }, [products]);
//   // useEffect(() => {
//   //   dispatch(getProductRequest());
//   // }, []);

//   if (loading) return <Text>Loading...</Text>;

//   return (
//     <SafeAreaView>
//       <Text
//         style={{
//           paddingHorizontal: 10,
//           fontSize: fontSize(16),
//           color: colors.pureBlack,
//           fontFamily: fontFamily.poppins700,
//           marginBottom: hp(25),
//           marginLeft: hp(5),
//         }}>
//         Trending
//       </Text>
//       <FlatList
//         data={products}
//         // keyExtractor={item => item.id.toString()}
//         keyExtractor={item => item.id}
//         numColumns={2}
//         columnWrapperStyle={{
//           justifyContent: 'space-between',
//           paddingHorizontal: wp(10), // 👈 ONLY HERE spacing control
//         }}
//         contentContainerStyle={styles.container}
//         renderItem={({item}) => {
//           const mainVariant =
//             item.variants?.find(v =>
//               v.images?.some(img => img.isSelectedForMainScreen),
//             ) || item.variants?.[0];
//           const mainImage = mainVariant?.images?.find(
//             img => img.isSelectedForMainScreen,
//           );
//           const imageUrl = mainImage?.imageUrl;

//           // const imageUrl = item.images?.[0]?.url;
//           console.log(
//             // 'PRODUCT ITEM HOMETRENDIGOCOMPONENT=>',
//             JSON.stringify(item, null, 2),
//           );

//           return (
//             <TouchableOpacity
//               style={styles.card}
//               activeOpacity={0.6}
//               onPress={() => {
//                 navigation.navigate('ProductDetails', {product: item});
//               }}>
//               {/* <Image source={item.image} style={styles.image} /> */}
//               <Image
//                 source={
//                   imageUrl ? {uri: imageUrl} : images.trending_one // fallback image
//                 }
//                 style={styles.image}
//               />

//               <View style={styles.content}>
//                 <Text
//                   numberOfLines={1}
//                   ellipsizeMode="tail"
//                   style={styles.title}>
//                   {item.title}
//                 </Text>

//                 <View style={styles.priceRow}>
//                   {/* <Text style={styles.price}>Rs. {item.price}</Text>
//                   <Text style={styles.mrp}>MRP {item.mrp}</Text>
//                   <Text style={styles.discount}>{item.discount}</Text> */}
//                   <Text style={styles.price}>
//                     Rs. {mainVariant?.price || 0}
//                   </Text>
//                   <Text style={styles.mrp}>MRP {mainVariant?.mrp || 0}</Text>
//                   <Text style={styles.discount}>
//                     {mainVariant?.discount
//                       ? `${mainVariant.discount}% Off`
//                       : ''}
//                   </Text>
//                 </View>

//                 <View style={styles.ratingRow}>
//                   <View style={styles.ratingBox}>
//                     {/* <Text style={styles.ratingText}>{item.rating}</Text> */}
//                     {/* <Text style={styles.ratingText}>{item.rating || '0'}</Text> */}
//                     <Text style={styles.ratingText}>
//                       {item.averageRating ? item.averageRating.toFixed(1) : '0'}
//                     </Text>

//                     <StarIcon style={{top: -1, width: hp(9), height: hp(8)}} />
//                   </View>
//                   {/* <Text style={styles.reviews}>
//                     {item.reviews ? `(${item.reviews})` : '(0)'}
//                   </Text> */}
//                   <Text style={styles.reviews}>
//                     {item.totalReviews ? `(${item.totalReviews})` : '(00)'}
//                   </Text>
//                   <TouchableOpacity
//                     style={styles.heartButton}
//                     onPress={() => {
//                       console.log('❤️ Product ID sending:', item.id);
//                       dispatch(wishlistRequest(item.id));
//                     }}>
//                     {/*<Text style={{fontSize: 18}}>♡</Text>*/}
//                     <GradientLikeIcon />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           );
//         }}
//       />
//     </SafeAreaView>
//   );
// };

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
import {wishlistRequest} from '../../redux/actions/wishlistActions';
import {getProductByReviewRequest} from '../../redux/actions/productByReviewActions';

const screenWidth = Dimensions.get('window').width;

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
//   {
//     id: 5,
//     image: images.trending_two,
//     title: 'Designer Traditional Dress',
//     price: 780,
//     mrp: 1280,
//     discount: '34% Off',
//     rating: '4.2',
//     reviews: 122,
//   },
//   {
//     id: 6,
//     image: images.trending_three,
//     title: 'Designer Traditional Dress',
//     price: 780,
//     mrp: 1280,
//     discount: '34% Off',
//     rating: '4.2',
//     reviews: 122,
//   },
//   // ...add more as needed
// ];

const HomeTrendingComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const imageUrl = item.images?.[0]?.url;
  const [justAdded, setJustAdded] = React.useState([]);
  // 🔹 Wishlist reducer taking state
  const wishlistState = useSelector(state => state.wishlist);

  // 🔹 Safety check – wishlistData always array
  // beacuse filter/map always work on array
  const wishlistData = Array.isArray(wishlistState?.wishlistData)
    ? wishlistState.wishlistData
    : [];

  const {products, loading} = useSelector(state => state.product);
  // const {products, loading} = useSelector(state => state.productByReview);
  //second useEffect to get all products

  useEffect(() => {
    dispatch(getProductRequest());
  }, []);
  console.log('Products in UI...:', products);
  // if (loading) return <Text>Loading...</Text>;
  const token = useSelector(state => state.auth.token);

  const onWishlistPress = product => {
    if (!token) {
      navigation.navigate('StartingScreen');
      return;
    }

    const productId = product.id || product._id;

    // If product already in redux wishlist → do nothing (no alert)
    if (
      wishlistData.some(
        w => (w.productId?.id || w.productId?._id) === productId,
      )
    ) {
      return;
    }

    // First time click → alert
    alert('Product saved in wishlist');

    // Mark product as just added (for gradient icon)
    setJustAdded(prev => [...prev, productId]);

    // Dispatch redux action to add wishlist
    dispatch(wishlistRequest(productId));
    console.log(' Product ID sending:', productId);
  };

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
          const mainVariant =
            item.variants?.find(v =>
              v.images?.some(img => img.isSelectedForMainScreen),
            ) || item.variants?.[0];
          const mainImage = mainVariant?.images?.find(
            img => img.isSelectedForMainScreen,
          );
          const imageUrl = mainImage?.imageUrl;
          console.log('ITEM ID in home component:', item.id, item._id);

          // const imageUrl = item.images?.[0]?.url;
          // console.log(
          //   // 'PRODUCT ITEM HOMETRENDIGOCOMPONENT=>',
          //   JSON.stringify(item, null, 2),
          // );

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('ProductDetails', {product: item});
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
                  {/* <Text style={styles.price}>Rs. {item.price}</Text>
                  <Text style={styles.mrp}>MRP {item.mrp}</Text>
                  <Text style={styles.discount}>{item.discount}</Text> */}
                  <Text style={styles.price}>
                    Rs. {mainVariant?.price || 0}
                  </Text>
                  <Text style={styles.mrp}>MRP {mainVariant?.mrp || 0}</Text>
                  <Text style={styles.discount}>
                    {mainVariant?.discount
                      ? `${mainVariant.discount}% Off`
                      : ''}
                  </Text>
                </View>

                <View style={styles.ratingRow}>
                  <View style={styles.ratingBox}>
                    {/* <Text style={styles.ratingText}>{item.rating}</Text> */}
                    {/* <Text style={styles.ratingText}>{item.rating || '0'}</Text> */}
                    <Text style={styles.ratingText}>
                      {item.averageRating ? item.averageRating.toFixed(1) : '0'}
                    </Text>

                    <StarIcon style={{top: -1, width: hp(9), height: hp(8)}} />
                  </View>
                  {/* <Text style={styles.reviews}>
                    {item.reviews ? `(${item.reviews})` : '(0)'}
                  </Text> */}
                  <Text style={styles.reviews}>
                    {item.totalReviews ? `(${item.totalReviews})` : '(00)'}
                  </Text>
                  <TouchableOpacity
                    style={styles.heartButton}
                    onPress={() => onWishlistPress(item)}>
                    {wishlistData.some(
                      w =>
                        (w.productId?.id || w.productId?._id) ===
                        (item.id || item._id),
                    ) || justAdded.includes(item.id || item._id) ? (
                      // Filled / gradient heart
                      <GradientFullFillLike />
                    ) : (
                      // Empty heart
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
