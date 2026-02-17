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
import {useDispatch, useSelector} from 'react-redux';
import {getStoreProductsRequest} from '../../../redux/actions/storeProductActions';
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
  const {data, error, loading} = useSelector(state => state.storeProduct);

  useEffect(() => {
    dispatch(getStoreProductsRequest(storeId));
    console.log(storeId, 'StoreId===>');
    console.log('StoreId received in Topbrand:', storeId);
    console.log('API Response:', data);
  }, []);
  if (loading) {
    return <Text style={{color: '#000'}}>Loading...</Text>;
  }

  if (error) {
    return <Text style={{color: '#000'}}>{error}</Text>;
  }
  if (!loading && data?.results?.length === 0) {
    return (
      <Text style={{textAlign: 'center', marginTop: 20, color: '#000'}}>
        No Products Found
      </Text>
    );
  }
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
                console.log(
                  'FIRST IMAGE ===>',
                  item.variants?.[0]?.images?.[0],
                );
              }}>
              <Image
                // source={{uri: item.image}}
                source={{uri: item.variants?.[0]?.images?.[0]?.imageUrl}}
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
                    Rs. {item.variants?.[0]?.price}
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
                    {item.totalReviews}
                  </Text>

                  <TouchableOpacity style={{marginLeft: 'auto'}}>
                    {/*<Text style={{fontSize: 18}}>♡</Text>*/}
                    <GradientFullFillLike />
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
