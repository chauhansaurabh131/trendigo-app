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
import {images, icons, StarIcon, GradientLikeIcon} from '../../assets'; // Add your heart icon, star icon, etc.
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {colors} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

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
  {
    id: 5,
    image: images.trending_two,
    title: 'Designer Traditional Dress',
    price: 780,
    mrp: 1280,
    discount: '34% Off',
    rating: '4.2',
    reviews: 122,
  },
  {
    id: 6,
    image: images.trending_three,
    title: 'Designer Traditional Dress',
    price: 780,
    mrp: 1280,
    discount: '34% Off',
    rating: '4.2',
    reviews: 122,
  },
  // ...add more as needed
];

const HomeTrendingComponent = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text
        style={{
          paddingHorizontal: 10,
          fontSize: fontSize(16),
          color: colors.pureBlack,
          fontFamily: fontFamily.poppins700,
          marginBottom: hp(25),
          marginLeft: hp(5),
        }}>
        Trending
      </Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.container}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate('ProductDetails', {product: item});
            }}>
            <Image source={item.image} style={styles.image} />

            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>

              <View style={styles.priceRow}>
                <Text style={styles.price}>Rs. {item.price}</Text>
                <Text style={styles.mrp}>MRP {item.mrp}</Text>
                <Text style={styles.discount}>{item.discount}</Text>
              </View>

              <View style={styles.ratingRow}>
                <View style={styles.ratingBox}>
                  <Text style={styles.ratingText}>{item.rating}</Text>
                  <StarIcon style={{top: -1, width: hp(9), height: hp(8)}} />
                </View>
                <Text style={styles.reviews}>{item.reviews}</Text>

                <TouchableOpacity style={styles.heartButton}>
                  {/*<Text style={{fontSize: 18}}>♡</Text>*/}
                  <GradientLikeIcon />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
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
