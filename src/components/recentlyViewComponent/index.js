// import React from 'react';
// import {SafeAreaView, Text, View} from 'react-native';
// import {fontFamily, fontSize, wp} from '../../utils/helpers';
// const RecentlyViewComponent = () => {
//   return (
//     <SafeAreaView>
// <View style={{marginLeft: wp(17)}}>
//   <Text
//     style={{
//       color: '#000',
//       fontFamily: fontFamily.poppins600,
//       fontSize: fontSize(18),
//     }}>
//     Recently Viewed
//   </Text>
// </View>
//       <View>

//       </View>
//     </SafeAreaView>
//   );
// };
// export default RecentlyViewComponent;

import React, {useEffect} from 'react';
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
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {
  BackIcon,
  GradientFullFillLike,
  GradientLikeIcon,
  images,
  StarIcon,
} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import HomeTrendingComponent from '../../components/homeTrendingComponent';
import {getRecentlyViewedRequest} from '../../redux/actions/recentlyViewedActions';
import {useDispatch, useSelector} from 'react-redux';

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
  // {
  //   id: 3,
  //   image: images.trending_three,
  //   title: 'Designer Traditional Dress3',
  //   price: 780,
  //   mrp: 1280,
  //   discount: '34% Off',
  //   rating: '4.2',
  //   reviews: 122,
  // },
  // {
  //   id: 4,
  //   image: images.trending_one,
  //   title: 'Designer Traditional Dress',
  //   price: 780,
  //   mrp: 1280,
  //   discount: '34% Off',
  //   rating: '4.2',
  //   reviews: 122,
  // },

  // ...add more as needed
];
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 40) / 2;

const RecentlyViewComponent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {data, loading} = useSelector(state => state.recentlyView);
  const user = useSelector(state => state.auth.user);
  const userId = user?.id || user?._id;
  console.log('RECENTLY VIEW COM => USER ID:', userId);
  const token = useSelector(state => state.auth.token);
  console.log('RECENTLY VIEW COM => TOKEN:', token);

  useEffect(() => {
    if (userId && token) {
      console.log('Fetching recently viewed products for user:', userId);
      dispatch(getRecentlyViewedRequest({token}));
    }
  }, [userId, token]);
  // console.log(data?.results, 'images');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
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
                  // marginBottom: 15,
                  // marginHorizontal: 5,
                  marginRight: index % 2 === 0 ? 10 : 0, // 👈 Only left card right gap
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
                  // source={item.image}
                  source={mainImage ? {uri: mainImage} : null}
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
                      {/* Rs. {item.price} */}
                      Rs. {variant?.price ?? ''}
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
                      MRP {item.mrp}
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
                        {item?.averageRating}
                      </Text>
                      <StarIcon
                        style={{top: -1, width: hp(9), height: hp(8)}}
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

                    <TouchableOpacity style={{marginLeft: 'auto'}}>
                      {/*<Text style={{fontSize: 18}}>♡</Text>*/}
                      <GradientLikeIcon />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default RecentlyViewComponent;
