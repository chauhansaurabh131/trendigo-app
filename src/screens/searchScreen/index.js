import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Dimensions} from 'react-native';
import {fontFamily, fontSize, hp, Touchable} from '../../utils/helpers';
import {
  GradientColorSearchIcon,
  GradientLikeIcon,
  StarIcon,
} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../utils/colors';
import HomeAllProductCategoryComponent from '../../components/homeAllProductCategoryComponent';
import HomeTrendingComponent from '../../components/homeTrendingComponent';
import {searchProductRequest} from '../../redux/actions/searchActions';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
const SearchScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const isSearching = text.length > 0;
  const products = useSelector(state => state.search.products);
  console.log('SEARCH PRODUCTS 👉', products);

  const onSearch = value => {
    setText(value);
    dispatch(searchProductRequest(value));
  };

  const renderProduct = ({item}) => {
    console.log('RENDERING PRODUCT:', item);
    console.log('IMAGE RAW:', item?.variants?.[0]?.images);
    console.log('VARIANT IMAGES 👉', item?.variants?.[0]?.images);
    const productImage = item?.variants?.[0]?.images?.[0];
    console.log('PRODUCT IMAGE ID:', productImage);
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.6}
        onPress={() => {
          navigation.navigate('ProductDetails', {product: item});
        }}>
        {/* <Image source={item.image} style={styles.image} /> */}
        <Image source={{uri: productImage}} style={styles.image} />

        <View style={styles.content}>
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>Rs. {item.finalPrice}</Text>
            <Text style={styles.mrp}>MRP {item.variants?.[0]?.price}</Text>
            <Text style={styles.discount}>
              {item.variants?.[0]?.discount}% OFF
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingText}>{item.averageRating}</Text>
              <StarIcon style={{top: -1, width: hp(9), height: hp(8)}} />
            </View>
            <Text style={styles.reviews}>({item.reviews?.length || 0})</Text>

            <TouchableOpacity style={styles.heartButton}>
              {/*<Text style={{fontSize: 18}}>♡</Text>*/}
              <GradientLikeIcon />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          marginHorizontal: 18,
        }}>
        <View
          activeOpacity={0.6}
          style={{
            marginTop: hp(15),
            width: '100%',
            height: hp(40),
            borderRadius: 25,
            backgroundColor: '#F7F7F7',
            marginBottom: 15,
            justifyContent: 'center',

            paddingHorizontal: hp(15),
          }}>
          <Touchable
            style={{flexDirection: 'row', alignItems: 'center'}}
            activeOpacity={0.6}
            // onPress={() => navigation.navigate('SearchStack')}
          >
            <GradientColorSearchIcon width={hp(16)} height={hp(16)} />
            {/* <Text
              style={{
                marginLeft: hp(15),
                fontSize: fontSize(14),
                lineHeight: hp(20),
                fontFamily: fontFamily.poppins400,
                color: '#979797',
              }}>
              Search for Products
            </Text> */}

            <TextInput
              value={text}
              onChangeText={value => setText(value)} // ✅ स
              onSubmitEditing={() => dispatch(searchProductRequest(text))} //when user submits the search
              placeholderTextColor={'#000'}
              placeholder="Search for Products"
              style={{
                marginLeft: hp(15),
                fontSize: fontSize(14),
                lineHeight: hp(20),
                fontFamily: fontFamily.poppins400,
                color: '#979797',
                flex: 1,
              }}
            />
          </Touchable>
        </View>
      </View>

      <FlatList
        // data={[{}]} // dummy data
        data={products?.data || products}
        keyExtractor={(_, index) => index.toString()}
        // renderItem={null}
        columnWrapperStyle={{
          justifyContent: 'space-between', // ✅ THIS IS KEY
          paddingHorizontal: 10,
        }}
        numColumns={2}
        renderItem={renderProduct}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          !isSearching && (
            <>
              <Text
                style={{
                  color: colors.pureBlack,
                  fontSize: fontSize(16),
                  fontFamily: fontFamily.poppins700,
                  marginHorizontal: 17,
                  marginTop: hp(11),
                }}>
                Popular Search Categories
              </Text>

              <View style={{marginTop: hp(25)}}>
                <HomeAllProductCategoryComponent />
              </View>

              <View
                style={{
                  width: '100%',
                  borderColor: '#E7E7E7',
                  borderWidth: 0.7,
                  marginTop: hp(25),
                }}
              />

              <View style={{marginTop: hp(23)}}>
                <HomeTrendingComponent />
              </View>
            </>
          )
        }
      />
    </SafeAreaView>
  );
};
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 40) / 2;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    // paddingTop: 10,
  },
  card: {
    width: cardWidth,
    // marginBottom: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginTop: hp(15),
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

export default SearchScreen;
