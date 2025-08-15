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

const WishlistScreen = () => {
  const navigation = useNavigation();
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
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={({item}) => (
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
            // onPress={() => {
            //   navigation.navigate('ProductDetails', {product: item});
            // }}
          >
            <Image
              source={item.image}
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
                  Rs. {item.price}
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
                  {item.discount}
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
                    {item.rating}
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
                  {item.reviews}
                </Text>

                <TouchableOpacity style={{marginLeft: 'auto'}}>
                  {/*<Text style={{fontSize: 18}}>♡</Text>*/}
                  <GradientFullFillLike />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default WishlistScreen;
