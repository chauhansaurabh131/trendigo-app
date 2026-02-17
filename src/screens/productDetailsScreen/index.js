import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import ProductImageComponent from '../../components/productImageComponent';
import {colors} from '../../utils/colors';
import {fontFamily, fontSize, hp, Touchable, wp} from '../../utils/helpers';
import {useSelector} from 'react-redux';
import {
  BackIcon,
  BagIcon,
  CancelIcon,
  GradientFullFillLike,
  GradientLikeIcon,
  images,
  SearchFilterIcon,
  SellerShopIcon,
  StarIcon,
} from '../../assets';
import SizeChartComponent from '../../components/sizeChartComponent';
import GradientButton from '../../components/gradientButton';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import ReviewRatingComponent from '../../components/reviewRatingComponent';
import Svg, {Path} from 'react-native-svg';
import star_icon from '../../assets/images/star_image_icon.png';
import {useDispatch} from 'react-redux';
import {wishlistRequest} from '../../redux/actions/wishlistActions';
import {productDetailsRequest} from '../../redux/actions/productDetailsAction';
import {getUserReviewsRequest} from '../../redux/actions/reviewActions';
import {getStoreRequest} from '../../redux/actions/storeActions';
export const CustomStarIcon = ({
  width = 24,
  height = 24,
  fill = '#FFD700',
  style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    style={style}>
    <Path
      d="M12 2l2.9 6.6L22 9.3l-5 5 1.2 7.2L12 18.3l-6.2 3.2L7 14.3 2 9.3l7.1-0.7L12 2z"
      fill={fill}
    />
  </Svg>
);

const ProductDetailsScreen = () => {
  const route = useRoute();
  // const ratingsRef = useRef(null);
  const scrollRef = useRef(null); // Ref for ScrollView
  const reviewsRef = useRef(null); // Ref for Reviews section
  // ✅ FIRST define product
  const userReviews = useSelector(state => state.review.userReviews);
  console.log('USER REVIEWS FROM REDUX 👉', userReviews);
  // const reviews = useSelector(
  //   state => state.product.productDetails?.reviews || [],
  // );

  const reviewData = useSelector(state => state.review.userReviews);

  const reviews = reviewData?.reviews || [];
  const averageRating = reviewData?.averageRating || 0;
  const totalReviews = reviewData?.totalReviews || 0;
  const ratingBreakdown = reviewData?.ratingBreakdown || {};
  useEffect(() => {
    console.log(' REVIEW DATA:', reviewData);
    console.log(' REVIEWS ARRAY:', reviews);
    console.log(' REVIEWS COUNT:', reviews.length);
  }, [reviewData]);

  const user = useSelector(state => state.auth.user);
  const userId = user?.id || user?._id;
  const product = route.params?.product;

  console.log('FULL PRODUCT 👉', product);
  console.log('PRODUCT ID 👉', product?.id);
  console.log('PRODUCT _ID 👉', product?._id);

  const productId = product?.id || product?._id;
  console.log('FINAL PRODUCT ID 👉', productId);
  // ✅ safety check
  if (!product) {
    console.log('❌ Product not received from navigation');
    return null;
  }

  useEffect(() => {
    if (productId) {
      console.log('FETCHING REVIEWS FOR PRODUCT ---------', productId);
      dispatch(getUserReviewsRequest(productId));
    }
  }, [productId]);
  useEffect(() => {
    console.log(' FULL PRODUCT:', product);
    console.log(' RESULTS:', product?.results);
    console.log(' REVIEWS:', product?.results?.reviews);
    console.log(' REVIEWS COUNT:', product?.results?.reviews?.length);
  }, [product]);

  const {storeData} = useSelector(state => state.sellerStore);
  const seller = storeData;
  const storeId = product?.storeId;
  useEffect(() => {
    console.log('UPDATED STORE DATA =>', storeData);
  }, [storeData]);
  useEffect(() => {
    console.log(storeId, 'storeid......');
    console.log('Fetching store for ID:', storeId);
    dispatch(getStoreRequest(storeId));
  }, [storeId]);
  useEffect(() => {
    console.log('PRODUCT NAME ', product?.title);
    console.log('STORE ID ', product?.storeId);
    console.log('CURRENT PRODUCT STORE ID ', storeId);
    console.log('Store seller name ', storeData?.name);
    console.log('Product Store Object:', product?.storeId);
    console.log('Store ID Used For API:', storeId);
    console.log('StoreData From Redux:', storeData);
  }, [product]);
  //shop image
  // const shopImage = storeData?.shopImage;
  const shopImage = storeData?.profileImage;
  const scrollToReviews = () => {
    reviewsRef.current?.measureLayout(scrollRef.current, (x, y) => {
      scrollRef.current.scrollTo({y: y, animated: true});
    });
  };
  // const {product} = route.params;

  // const [selectedSize, setSelectedSize] = useState('S'); // Default selection
  const [pincode, setPincode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // const [selectedSize, setSelectedSize] = useState(sizes[0]); // default first size
  // const [selectedVariant, setSelectedVariant] = useState(
  //   product?.variants?.[0],
  // );
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const sellerId = product?.storeId?.id;
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const wishlistState = useSelector(state => state.wishlist);

  // 🔹 Safety check – wishlistData always array
  // beacuse filter/map always work on array
  const wishlistData = Array.isArray(wishlistState?.wishlistData)
    ? wishlistState.wishlistData
    : [];
  const [justAdded, setJustAdded] = useState([]);

  const handlePincodeChange = text => {
    // Allow only digits and limit input to 6 characters
    if (/^\d{0,6}$/.test(text)) {
      setPincode(text);
    }
  };

  console.log('PRODUCT..........:', product);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  console.log('TOKEN:', token);
  console.log(token, 'token product details');
  // const product = route.params?.product;

  if (!product) {
    console.log('product not available yet');
    return null;
  }

  console.log('product available.....:', product);
  console.log('Product Code:', product.productCode);
  console.log('product Storeid name', product.storeId.name);
  // console.log('SPECIFICATIONS FROM API:', product?.specifications);
  // console.log('product Title', product.title),
  //   console.log('product description', product.description);
  // console.log('product Details...', product.productDetails);

  const handleAddToCart = () => {
    if (token) {
      navigation.navigate('MainTabs', {
        screen: 'BagStack',
      });
    } else {
      navigation.navigate('StartingScreen', {
        redirectTo: 'BagStack',
      });
    }
  };
  // console.log('PRODUCT12345:', route.params.product);
  //html covert to the stings

  const htmlString = '&lt;p>women t shirt&lt;/p&gt;';

  // Convert HTML entities
  const normalString = htmlString
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  // Remove HTML tags
  const plainText = normalString.replace(/<[^>]+>/g, '');

  // console.log(plainText); // "women t shirt"
  // decode html code convert to the strings
  const decodeHtml = html =>
    html?.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  const getBulletPoints = html => {
    if (!html) return [];

    const decoded = decodeHtml(html);

    return (
      decoded
        .match(/<li>(.*?)<\/li>/g)
        ?.map(item => item.replace(/<[^>]+>/g, '').trim()) || []
    );
  };

  //  find out the variants

  const findVariant = (product, color, size) => {
    console.log('--- FIND VARIANT CALLED ---');
    console.log('Selected Color:', color);
    console.log('Selected Size:', size);

    if (!product || !color || !size) {
      console.log('❌ Missing product / color / size');
      return null;
    }

    const result = product.variants.find((v, index) => {
      console.log(`Checking variant ${index}:`, v.variants);

      const hasColor = v.variants.some(
        x => x.key === 'color' && x.value.toLowerCase() === color.toLowerCase(),
      );

      const hasSize = v.variants.some(
        x => x.key === 'size' && x.value.toLowerCase() === size.toLowerCase(),
      );

      console.log('  color match:', hasColor);
      console.log('  size match:', hasSize);

      return hasColor && hasSize;
    });

    console.log('✅ MATCHED VARIANT:', result);
    return result || null;
  };

  const handleColorChange = color => {
    console.log('--- COLOR SELECTED ---', color);

    setSelectedColor(color);

    if (selectedSize) {
      const variant = findVariant(product, color, selectedSize);
      console.log('Variant after color select:', variant);
      setSelectedVariant(variant);
    }
  };

  const handleSizeChange = size => {
    console.log('--- SIZE SELECTED ---', size);

    setSelectedSize(size);

    if (selectedColor) {
      const variant = findVariant(product, selectedColor, size);
      console.log('Variant after size select:', variant);
      setSelectedVariant(variant);
    }
  };
  useEffect(() => {
    if (product?.variants?.length > 0) {
      const firstVariant = product.variants[0];

      const colorObj = firstVariant.variants.find(v => v.key === 'color');
      const sizeObj = firstVariant.variants.find(v => v.key === 'size');

      setSelectedColor(colorObj?.value || null);
      setSelectedSize(sizeObj?.value || null);
      setSelectedVariant(firstVariant);
    }
  }, [product]);
  useEffect(() => {
    console.log('===== FINAL STATE =====');
    console.log('Selected Color:', selectedColor);
    console.log('Selected Size:', selectedSize);
    console.log('Selected Variant:', selectedVariant);
    console.log('Price:', selectedVariant?.price);
    console.log('Discount:', selectedVariant?.discount);
  }, [selectedVariant]);

  useEffect(() => {
    if (productId) {
      console.log('DISPATCHING PRODUCT DETAILS 👉', productId);
      dispatch(productDetailsRequest(productId));
    }
  }, [productId]);
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
  const ReviewItem = ({item}) => {
    console.log('REVIEW IMAGES 👉', item.images);
    console.log('FULL ITEM 👉', item);
    console.log('USER DATA 👉', item.user);
    return (
      <View style={{marginHorizontal: 17, marginTop: hp(24)}}>
        {/* Review Title */}
        <Text
          style={{
            color: colors.pureBlack,
            fontSize: fontSize(14),
            lineHeight: hp(24),
            fontFamily: fontFamily.poppins700,
          }}>
          {item?.title || 'No title'}
        </Text>

        {/* Review Description */}
        <Text
          style={{
            color: colors.pureBlack,
            fontSize: fontSize(14),
            lineHeight: hp(24),
            fontFamily: fontFamily.poppins400,
            marginTop: hp(25),
          }}>
          {item?.description ||
            item?.review ||
            item?.comment ||
            item?.reviewText ||
            'No description yet.'}
        </Text>
        {/* Review Images (if any) */}
        {item?.images && item.images.length > 0 ? (
          // ✅ Images available → show images
          <View style={{marginTop: hp(20), flexDirection: 'row'}}>
            {item.images.map((img, index) => (
              <Image
                key={index}
                source={{uri: img}}
                style={{
                  width: wp(60),
                  height: hp(80),
                  borderRadius: 14,
                  marginRight: wp(11),
                }}
              />
            ))}
          </View>
        ) : (
          <Text
            style={{
              marginTop: hp(20),
              fontSize: fontSize(12),
              color: '#999',
              fontFamily: fontFamily.poppins400,
            }}>
            No images added in this review
          </Text>
        )}

        {/* User + Rating */}
        <View
          style={{
            marginTop: hp(27),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* User info */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{uri: item.user.profilePic}}
              style={{width: hp(34), height: hp(34), borderRadius: 50}}
            />

            <Text
              style={{
                marginLeft: wp(11),
                color: colors.pureBlack,
                fontSize: fontSize(14),
                lineHeight: hp(18),
                fontFamily: fontFamily.poppins700,
              }}>
              {item?.user?.name || 'No Name'}
            </Text>

            <Text
              style={{
                marginLeft: wp(12),
                fontSize: fontSize(10),
                lineHeight: hp(24),
                fontFamily: fontFamily.poppins400,
                color: '#C1C1C1',
                top: 1,
              }}>
              {item?.createdAt ? new Date(item.createdAt).toDateString() : ''}
            </Text>
          </View>

          {/* Rating */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomStarIcon
              width={hp(15)}
              height={hp(14)}
              fill="#8225AF"
              style={{marginRight: 10}}
            />
            <Text
              style={{
                fontSize: fontSize(14),
                lineHeight: hp(24),
                fontFamily: fontFamily.poppins700,
                color: '#8225AF',
                top: 2,
              }}>
              {item?.rating || 0}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {/*<Text>{product.title}</Text>*/}
      {/*<Image source={product.image} style={{width: 200, height: 200}} />*/}
      {/*<Text>Price: Rs. {product.price}</Text>*/}
      {/*<Text>MRP: Rs. {product.mrp}</Text>*/}
      {/*<Text>Discount: {product.discount}</Text>*/}

      <View
        style={{
          marginHorizontal: 17,
          height: hp(57),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between', // spreads left and right
        }}>
        {/* Left Side - Back Icon */}
        <Touchable
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
          }}>
          <BackIcon />
        </Touchable>

        {/* Right Side - Search & Bag Icons */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Touchable
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SearchFilterIcon />
          </Touchable>

          <Touchable
            style={{
              marginLeft: 10,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BagIcon width={20} height={20} />
          </Touchable>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          zIndex: 99,
          bottom: 0,
          height: hp(80),
          width: '100%',
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <View
          style={{
            marginHorizontal: 17,
            // marginTop: hp(52),
            flexDirection: 'row',
            justifyContent: 'space-between',

            // backgroundColor: 'red',
          }}>
          {/* <GradientButton
            title={'Add to Cart'}
            buttonStyle={{width: wp(285), height: hp(50)}}
          /> */}
          <GradientButton
            title="Add to Cart"
            onPress={handleAddToCart}
            buttonStyle={{width: wp(285), height: hp(50)}}
          />

          <View style={{width: hp(50), height: hp(50)}}>
            {/* Background circular image */}
            <Image
              source={images.gradientCircleImage}
              style={{width: '100%', height: '100%'}}
            />

            {/* Touchable Like Icon */}
            {/* <TouchableOpacity
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [
                  {translateX: -wp(23) / 2},
                  {translateY: -hp(20) / 2},
                ],
              }}
              // onPress={() => dispatch(wishlistRequest(product._id))}>
              // <Image
              //   source={images.emptyLikeImage}
              //   style={{width: wp(23), height: hp(20), resizeMode: 'contain'}}
              // />
              onPress={() => onPress(() => onWishlistPress(product))}>
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
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [
                  {translateX: -wp(23) / 2},
                  {translateY: -hp(20) / 2},
                ],
              }}
              onPress={() => onWishlistPress(product)}>
              {wishlistData.some(
                w =>
                  (w.productId?.id || w.productId?._id) ===
                  (product.id || product._id),
              ) || justAdded.includes(product.id || product._id) ? (
                <GradientFullFillLike width={wp(23)} height={hp(20)} />
              ) : (
                //   <Image
                //   source={images.emptyLikeImage}
                //   style={{width: wp(23), height: hp(20), resizeMode: 'contain'}}
                // />
                <Image
                  source={images.emptyLikeImage}
                  style={{width: wp(23), height: hp(20), resizeMode: 'contain'}}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 10}}>
          <ProductImageComponent product={route.params.product} />
        </View>

        <View style={{marginHorizontal: 17, marginTop: hp(31)}}>
          <Text
            style={{
              color: colors.black,
              fontSize: fontSize(17),
              lineHeight: hp(26),
              fontFamily: fontFamily.poppins700,
            }}>
            {/* Designer Traditional Dress */}
            {product?.title ?? ''}
          </Text>
          <Text
            style={{
              fontSize: fontSize(12),
              lineHeight: hp(16),
              fontFamily: fontFamily.poppins400,
              color: '#6B6B6B',
              marginTop: hp(2),
            }}>
            {/* Women Floral Printed Fit & Flare Midi Class */}
            {product?.description ?? ''}
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={scrollToReviews}
            // onPress={handleSubmitReview}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 30,
              paddingVertical: 4,
              alignSelf: 'flex-start',
              borderColor: '#D2D2D2',
              width: hp(200),
              height: hp(35),
              marginTop: 19,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: fontFamily.poppins400,
                color: '#8225AF',
                marginLeft: 15,
              }}>
              {/* 4.2
               */}
              {/* {product?.rating ?? '0.0'} */}

              {/* {product?.averageRating?.toFixed(1) ?? '0.0'} */}
              {averageRating ? averageRating.toFixed(1) : '0.0'}
              {/* {userReviews?.averageRating ?? 0} */}
            </Text>
            <Image
              source={star_icon}
              style={{
                width: hp(15),
                height: hp(15),
                marginLeft: 10,
                marginBottom: 2,
              }}
            />
            <View
              style={{
                width: 1,
                height: 23,
                backgroundColor: '#D2D2D2',
                marginHorizontal: 8,
                marginLeft: wp(10),
              }}
            />

            <Text
              style={{
                color: colors.pureBlack,
                fontFamily: fontFamily.poppins500,
                marginLeft: 10,
                fontSize: 16,
              }}>
              {/* 122 Ratings */}
              {/* {product?.ratingCount ?? '0.0 Ratings'} */}
              {/* {product?.totalReviews ?? 0} Ratings */}
              {totalReviews} Ratings
              {/* {userReviews?.totalReviews ?? 0} Ratings */}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            borderColor: '#E7E7E7',
            borderWidth: 0.5,
            marginTop: hp(26),
          }}
        />

        <View
          style={{
            marginHorizontal: 17,
            marginTop: hp(19),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: fontSize(24),
                color: 'black',
                lineHeight: hp(32),
                fontFamily: fontFamily.poppins700,
              }}>
              {/* Rs.780
               */}
              {/* ₹{product?.variants?.[0]?.price ?? ''}₹ */}
              {selectedVariant?.price ?? product?.variants[0]?.price}
            </Text>
            <Text
              style={{
                marginLeft: hp(14),
                color: '#A4A4A4',
                fontSize: fontSize(18),
                lineHeight: hp(26),
                fontFamily: fontFamily.poppins400,
              }}>
              MRP{' '}
            </Text>
            <Text
              style={{
                color: '#888',
                textDecorationLine: 'line-through',
                fontSize: fontSize(18),
                lineHeight: hp(26),
                fontFamily: fontFamily.poppins400,
              }}>
              {/* Rs.3443₹{product?.variants?.[0]?.mrp ?? '000'}₹ */}
              {selectedVariant?.mrp ?? product?.variants[0]?.mrp}
            </Text>

            <Text
              style={{
                marginLeft: hp(16),
                color: '#2B9909',
                fontSize: fontSize(18),
                lineHeight: hp(24),
                fontFamily: fontFamily.poppins600,
              }}>
              {/* 34% Off */}
              {/* {product?.variants?.[0]?.discount ?? ''}% Off */}
              {selectedVariant?.discount ?? product?.variants[0]?.discount}% Off
            </Text>
          </View>

          <View
            style={{
              marginTop: hp(25),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.pureBlack,
                fontSize: fontSize(14),
                lineHeight: hp(20),
                fontFamily: fontFamily.poppins400,
              }}>
              Select your size
            </Text>
            <SizeChartComponent />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(23),
            }}>
            {/* {sizes.map(size => (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(size)}
                style={{
                  width: hp(52),
                  height: hp(52),
                  borderRadius: 50,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 6,
                  backgroundColor:
                    selectedSize === size ? '#F7E7FF' : 'transparent',
                  borderColor: selectedSize === size ? '#000000' : '#D1D1D1',
                }}>
                <Text
                  style={{
                    color: selectedSize === size ? '#000000' : '#000',
                    fontSize: fontSize(18),
                    lineHeight: hp(26),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))} */}

            {sizes.map(size => (
              <TouchableOpacity
                key={size}
                onPress={() => handleSizeChange(size)}
                style={{
                  width: hp(52),
                  height: hp(52),
                  borderRadius: 50,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 6,
                  backgroundColor:
                    selectedSize === size ? '#F7E7FF' : 'transparent',
                  borderColor: selectedSize === size ? '#000' : '#D1D1D1',
                }}>
                <Text style={{color: selectedSize === size ? '#000' : '#000'}}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View
          style={{
            width: '100%',
            borderWidth: 4,
            borderColor: '#F7F7F7',
            marginTop: hp(22),
          }}
        />

        <View style={{marginHorizontal: 17, marginTop: hp(22)}}>
          <Text
            style={{
              color: colors.pureBlack,
              fontSize: fontSize(17),
              lineHeight: hp(26),
              fontFamily: fontFamily.poppins700,
            }}>
            Check Delivery Options
          </Text>

          <Text
            style={{
              fontSize: fontSize(12),
              lineHeight: hp(18),
              fontFamily: fontFamily.poppins400,
              color: '#969696',
              marginTop: hp(5),
            }}>
            Please enter PIN code to check delivery time & Pay on Delivery
            Availability
          </Text>

          <View
            style={{
              marginTop: hp(23),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TextInput
              value={pincode}
              onChangeText={handlePincodeChange}
              placeholder={'Enter Pincode'}
              placeholderTextColor={'black'}
              style={{
                width: wp(228),
                height: hp(44),
                backgroundColor: '#F4F4F4',
                borderRadius: 50,
                paddingHorizontal: hp(30),
                fontSize: fontSize(14),
                lineHeight: hp(20),
                fontFamily: fontFamily.poppins500,
              }}
              keyboardType="numeric"
              maxLength={6} // Limit to 6 digits
            />

            <GradientButton
              onPress={() => {
                console.log(' === pincode ===> ', pincode);
              }}
              title={'Check'}
              buttonStyle={{
                width: wp(99),
                height: hp(44),
                opacity: pincode.length === 6 ? 1 : 0.7,
              }}
              disabled={pincode.length !== 6} // Disable button if pincode is not exactly 6 digits
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            borderWidth: 4,
            borderColor: '#F7F7F7',
            marginTop: hp(34),
          }}
        />

        <View style={{marginHorizontal: 17, marginTop: hp(23)}}>
          <Text
            style={{
              color: colors.pureBlack,
              fontSize: fontSize(17),
              lineHeight: hp(26),
              fontFamily: fontFamily.poppins700,
            }}>
            Product Details
          </Text>

          <Text
            style={{
              marginTop: hp(24),
              color: '#6B6B6B',
              fontSize: fontSize(14),
              lineHeight: hp(18),
              fontFamily: fontFamily.poppins400,
            }}>
            {/* Pink, blue & gold toned yoke design Kurta with{'\n'}Trousers with
            dupatta */}
            {/* {product?.productDetails ?? ''} */}
            {product?.productDetails
              ?.replace(/&lt;/g, '<')
              ?.replace(/&gt;/g, '>')
              ?.replace(/&amp;/g, '&')
              ?.replace(/<[^>]+>/g, '') ?? ''}
          </Text>

          <View style={{marginTop: hp(16)}}>
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: wp(7),
              }}>
              <Text
                style={{
                  fontSize: fontSize(10),
                  color: '#6B6B6B',
                  marginRight: wp(10),
                }}>
                ●
              </Text>
              <Text style={{color: '#6B6B6B'}}>Ethnic motifs yoke design</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp(3),
                marginLeft: wp(7),
              }}>
              <Text
                style={{
                  fontSize: fontSize(10),
                  color: '#6B6B6B',
                  marginRight: wp(10),
                }}>
                ●
              </Text>
              <Text style={{color: '#6B6B6B'}}>Straight shape</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp(3),
                marginLeft: wp(7),
              }}>
              <Text
                style={{
                  fontSize: fontSize(10),
                  color: '#6B6B6B',
                  marginRight: wp(10),
                }}>
                ●
              </Text>
              <Text style={{color: '#6B6B6B'}}>Regular style</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp(3),
                marginLeft: wp(7),
              }}>
              <Text
                style={{
                  fontSize: fontSize(10),
                  color: '#6B6B6B',
                  marginRight: wp(10),
                }}>
                ●
              </Text>
              <Text style={{color: '#6B6B6B'}}>
                Round neck, three-quarter regular sleeves
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp(3),
                marginLeft: wp(7),
              }}>
              <Text
                style={{
                  fontSize: fontSize(10),
                  color: '#6B6B6B',
                  marginRight: wp(10),
                }}>
                ●
              </Text>
              <Text style={{color: '#6B6B6B'}}>Gotta patti detail</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp(3),
                marginLeft: wp(7),
              }}>
              <Text
                style={{
                  fontSize: fontSize(10),
                  color: '#6B6B6B',
                  marginRight: wp(10),
                }}>
                ●
              </Text>
              <Text style={{color: '#6B6B6B'}}>
                Calf length length with straight hem
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp(3),
                marginLeft: wp(7),
              }}>
              <Text
                style={{
                  fontSize: fontSize(10),
                  color: '#6B6B6B',
                  marginRight: wp(10),
                }}>
                ●
              </Text>
              <Text style={{color: '#6B6B6B'}}>
                Cotton blend machine weave fabric
              </Text>
            </View> */}
            {/* <View style={{marginTop: hp(16)}}> */}
            {getBulletPoints(product?.productDetails).map((point, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: hp(3),
                  marginLeft: wp(7),
                }}>
                <Text
                  style={{
                    fontSize: fontSize(10),
                    color: '#6B6B6B',
                    marginRight: wp(10),
                  }}>
                  ●
                </Text>
                <Text style={{color: '#6B6B6B'}}>{point}</Text>
              </View>
            ))}
          </View>

          <Text
            style={{
              color: colors.pureBlack,
              fontSize: fontSize(17),
              lineHeight: hp(26),
              fontFamily: fontFamily.poppins700,
              marginTop: hp(27),
            }}>
            Specification
          </Text>

          {/* <View style={{marginTop: hp(23)}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: '#6B6B6B',
                    fontSize: fontSize(12),
                    lineHeight: hp(16),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  Back
                </Text>

                <Text
                  style={{
                    fontSize: fontSize(14),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins400,
                    color: colors.pureBlack,
                    marginTop: hp(2),
                  }}>
                  Regular
                </Text>
              </View>

              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: '#6B6B6B',
                    fontSize: fontSize(12),
                    lineHeight: hp(16),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  Center front open
                </Text>

                <Text
                  style={{
                    fontSize: fontSize(14),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins400,
                    color: colors.pureBlack,
                    marginTop: hp(2),
                  }}>
                  No
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: hp(25),
              }}>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: '#6B6B6B',
                    fontSize: fontSize(12),
                    lineHeight: hp(16),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  Closure
                </Text>

                <Text
                  style={{
                    fontSize: fontSize(14),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins400,
                    color: colors.pureBlack,
                    marginTop: hp(2),
                  }}>
                  Back Closure
                </Text>
              </View>

              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: '#6B6B6B',
                    fontSize: fontSize(12),
                    lineHeight: hp(16),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  Coverage
                </Text>

                <Text
                  style={{
                    fontSize: fontSize(14),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins400,
                    color: colors.pureBlack,
                    marginTop: hp(2),
                  }}>
                  Medium Coverage
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: hp(25),
              }}>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: '#6B6B6B',
                    fontSize: fontSize(12),
                    lineHeight: hp(16),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  Fabrics
                </Text>

                <Text
                  style={{
                    fontSize: fontSize(14),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins400,
                    color: colors.pureBlack,
                    marginTop: hp(2),
                  }}>
                  Cotton, Elastane
                </Text>
              </View>

              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: '#6B6B6B',
                    fontSize: fontSize(12),
                    lineHeight: hp(16),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  Features
                </Text>

                <Text
                  style={{
                    fontSize: fontSize(14),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins400,
                    color: colors.pureBlack,
                    marginTop: hp(2),
                  }}>
                  All Day Comfort
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: hp(25),
              }}>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: '#6B6B6B',
                    fontSize: fontSize(12),
                    lineHeight: hp(16),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  Knit or Woven
                </Text>

                <Text
                  style={{
                    fontSize: fontSize(14),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins400,
                    color: colors.pureBlack,
                    marginTop: hp(2),
                  }}>
                  Knitted
                </Text>
              </View>

              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: '#6B6B6B',
                    fontSize: fontSize(12),
                    lineHeight: hp(16),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  Multipack Set
                </Text>

                <Text
                  style={{
                    fontSize: fontSize(14),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins400,
                    color: colors.pureBlack,
                    marginTop: hp(2),
                  }}>
                  Single
                </Text>
              </View>
            </View>
          </View> */}

          <View style={{marginTop: hp(23)}}>
            {product?.specifications?.map((item, index) => {
              if (index % 2 !== 0) return null;

              const left = product.specifications[index];
              const right = product.specifications[index + 1];

              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginTop: index === 0 ? 0 : hp(25),
                  }}>
                  {/* LEFT ITEM */}
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        color: '#6B6B6B',
                        fontSize: fontSize(12),
                        lineHeight: hp(16),
                        fontFamily: fontFamily.poppins400,
                      }}>
                      {left.key.replace(/_/g, ' ')}
                    </Text>

                    <Text
                      style={{
                        fontSize: fontSize(14),
                        lineHeight: hp(18),
                        fontFamily: fontFamily.poppins400,
                        color: colors.pureBlack,
                        marginTop: hp(2),
                      }}>
                      {left.value}
                    </Text>
                  </View>

                  {/* RIGHT ITEM */}
                  {right && (
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          color: '#6B6B6B',
                          fontSize: fontSize(12),
                          lineHeight: hp(16),
                          fontFamily: fontFamily.poppins400,
                        }}>
                        {right.key.replace(/_/g, ' ')}
                      </Text>

                      <Text
                        style={{
                          fontSize: fontSize(14),
                          lineHeight: hp(18),
                          fontFamily: fontFamily.poppins400,
                          color: colors.pureBlack,
                          marginTop: hp(2),
                        }}>
                        {right.value}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          <TouchableOpacity style={{marginTop: hp(27)}}>
            <Text
              style={{
                fontSize: fontSize(14),
                lineHeight: hp(18),
                fontFamily: fontFamily.poppins400,
                color: '#8225AF',
              }}>
              See More
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '100%',
            borderWidth: 0.7,
            borderColor: '#E7E7E7',
            marginTop: hp(27),
          }}
        />

        <View
          style={{
            marginHorizontal: 17,
            marginTop: hp(22),
          }}>
          <View>
            <Text
              style={{
                color: '#686868',
                fontSize: fontSize(12),
                lineHeight: hp(16),
                fontFamily: fontFamily.poppins400,
              }}>
              Product Code :{' '}
              <Text
                style={{
                  color: colors.pureBlack,
                  fontFamily: fontFamily.poppins700,
                }}>
                {/* 18407738 */}
                {product?.productCode ?? ''}
              </Text>
            </Text>
          </View>

          <View
            style={{
              marginTop: hp(10),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* Icon container */}
            <View
              style={{
                width: hp(30),
                height: hp(30),
                borderRadius: 50,
                backgroundColor: '#F8E9FF',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SellerShopIcon />
            </View>

            {/* Text container: Seller + jnc */}
            <View style={{marginLeft: wp(16)}}>
              <Text
                style={{
                  fontSize: fontSize(14),
                  lineHeight: hp(18),
                  fontFamily: fontFamily.poppins700,
                  color: colors.pureBlack,
                  top: 18,
                }}>
                Seller:{' '}
                <Text style={{fontFamily: fontFamily.poppins400}}>
                  {/* Galaxy Fashion Hub */}
                  {/* {product?.storeId?.name ?? ''} */}
                  {storeData?.name ?? ''}
                </Text>
              </Text>

              <View style={{flexDirection: 'row', zIndex: 99, top: 30}}>
                <LinearGradient
                  colors={['#0F52BA', '#8225AF']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={{
                    padding: 1, // Thickness of the gradient border
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: wp(82), // total size INCLUDING border
                    height: hp(32),
                  }}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{
                      width: wp(79), // smaller than container
                      height: hp(29),
                      borderRadius: 50,
                      backgroundColor: 'white', // Inner background
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    activeOpacity={0.8}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: fontSize(12),
                        lineHeight: hp(14),
                        fontFamily: fontFamily.poppins400,
                      }}>
                      Profile
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                  colors={['#0F52BA', '#8225AF']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={{
                    padding: 1, // Thickness of the gradient border
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: wp(125), // total size INCLUDING border
                    height: hp(32),
                    marginLeft: hp(12),
                  }}>
                  <TouchableOpacity
                    style={{
                      width: wp(122), // smaller than container
                      height: hp(29),
                      borderRadius: 50,
                      backgroundColor: 'white', // Inner background
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    activeOpacity={0.8}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: fontSize(12),
                        lineHeight: hp(14),
                        fontFamily: fontFamily.poppins400,
                      }}>
                      Send Enquiry
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            borderWidth: 4,
            borderColor: '#F7F7F7',
            marginTop: hp(45),
          }}
        />

        <View
          ref={reviewsRef}
          style={{marginHorizontal: 17, marginTop: hp(24)}}>
          <Text
            style={{
              fontSize: fontSize(17),
              lineHeight: hp(26),
              fontFamily: fontFamily.poppins700,
              color: colors.pureBlack,
            }}>
            Reviews & Ratings
          </Text>

          <MaskedView
            maskElement={
              <Text
                style={{
                  fontSize: fontSize(54),
                  fontFamily: fontFamily.poppins700,
                  color: 'black',
                }}>
                {/* 4.2 */}
                {/* {product?.averageRating?.toFixed(1) ?? '0.0'} */}
                {averageRating ? averageRating.toFixed(1) : '0.0'}
              </Text>
            }>
            <LinearGradient
              colors={['#0F52BA', '#8225AF']}
              start={{x: 0, y: 0.05}}
              end={{x: 0.3, y: 0.6}}
              style={{
                width: 200, // Required
                height: 100, // Required
              }}>
              <Text
                style={{
                  fontSize: fontSize(54),
                  fontFamily: fontFamily.poppins700,
                  opacity: 0,
                }}>
                {/* 4.2 */}
                {product?.averageRating?.toFixed(1) ?? '0.0'}
              </Text>
            </LinearGradient>
          </MaskedView>

          {/*<Text*/}
          {/*  style={{*/}
          {/*    color: colors.pureBlack,*/}
          {/*    fontSize: fontSize(14),*/}
          {/*    fontFamily: fontFamily.poppins400,*/}
          {/*    lineHeight: hp(18),*/}
          {/*    top: -15,*/}
          {/*  }}>*/}
          {/*  122 <Text style={{color: '#8F8F8F'}}>Verified Buyers</Text>*/}
          {/*</Text>*/}

          <View style={{top: -20}}>
            <ReviewRatingComponent
              ratingBreakdown={ratingBreakdown}
              totalReviews={totalReviews}
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: '#E7E7E7',
            marginTop: hp(20),
          }}
        />

        {/* <View style={{marginHorizontal: 17, marginTop: hp(24)}}>
          <Text
            style={{
              color: colors.pureBlack,
              fontSize: fontSize(14),
              lineHeight: hp(24),
              fontFamily: fontFamily.poppins700,
            }}>
            Great Product
          </Text>

          <Text
            style={{
              color: colors.pureBlack,
              fontSize: fontSize(14),
              lineHeight: hp(24),
              fontFamily: fontFamily.poppins400,
              marginTop: hp(25),
            }}>
            Great Product I love this kurta set from Libas. The fitting is nice
            too but in the top it's a little too accurate, if this shrunk in the
            wash it won't fit me. I hope it doesn't shrink. The kurta and
            Palazzo have dark grey floral print going on it.
          </Text>

          <View style={{marginTop: hp(20), flexDirection: 'row'}}>
            <Image
              source={images.productImageFive}
              style={{width: wp(60), height: hp(80), borderRadius: 14}}
            />
            <Image
              source={images.productImageFive}
              style={{
                width: wp(60),
                height: hp(80),
                borderRadius: 14,
                marginLeft: wp(11),
              }}
            />
          </View>

          <View
            style={{
              marginTop: hp(27),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={images.image_two}
                style={{width: hp(34), height: hp(34), borderRadius: 50}}
              />
              <Text
                style={{
                  marginLeft: wp(11),
                  color: colors.pureBlack,
                  fontSize: fontSize(14),
                  lineHeight: hp(18),
                  fontFamily: fontFamily.poppins700,
                }}>
                Riya Shah
              </Text>

              <Text
                style={{
                  marginLeft: wp(12),
                  fontSize: fontSize(10),
                  lineHeight: hp(24),
                  fontFamily: fontFamily.poppins400,
                  color: '#C1C1C1',
                  top: 1,
                }}>
                21 May 2024
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomStarIcon
                width={hp(15)}
                height={hp(14)}
                fill="#8225AF"
                style={{marginRight: 10}}
              />
              <Text
                style={{
                  fontSize: fontSize(14),
                  lineHeight: hp(24),
                  fontFamily: fontFamily.poppins700,
                  color: '#8225AF',
                  top: 2,
                }}>
                4.2
              </Text>
            </View>
          </View> */}
        <FlatList
          data={reviews}
          keyExtractor={item => item._id}
          renderItem={({item}) => <ReviewItem item={item} />}
          scrollEnabled={false}
        />
        {/* </View> */}

        <View
          style={{
            width: '100%',
            borderWidth: 0.8,
            borderColor: '#E7E7E7',
            marginTop: hp(26),
          }}
        />

        <Touchable>
          <Text
            style={{
              fontSize: fontSize(16),
              fontFamily: fontFamily.poppins700,
              lineHeight: hp(24),
              color: '#8225AF',
              textAlign: 'center',
              marginTop: hp(14),
            }}>
            View All Reviews
          </Text>
        </Touchable>

        <View
          style={{
            width: '100%',
            borderWidth: 0.8,
            borderColor: '#E7E7E7',
            marginTop: hp(17),
          }}
        />

        <View style={{height: hp(85)}} />

        {/*<View*/}
        {/*  style={{*/}
        {/*    marginHorizontal: 17,*/}
        {/*    marginTop: hp(52),*/}
        {/*    flexDirection: 'row',*/}
        {/*    justifyContent: 'space-between',*/}
        {/*  }}>*/}
        {/*  <GradientButton*/}
        {/*    title={'Add to Cart'}*/}
        {/*    buttonStyle={{width: wp(285), height: hp(50)}}*/}
        {/*  />*/}

        {/*  <View style={{width: hp(50), height: hp(50)}}>*/}
        {/*    /!* Background circular image *!/*/}
        {/*    <Image*/}
        {/*      source={images.gradientCircleImage}*/}
        {/*      style={{width: '100%', height: '100%'}}*/}
        {/*    />*/}

        {/*    /!* Touchable Like Icon *!/*/}
        {/*    <TouchableOpacity*/}
        {/*      style={{*/}
        {/*        position: 'absolute',*/}
        {/*        top: '50%',*/}
        {/*        left: '50%',*/}
        {/*        transform: [*/}
        {/*          {translateX: -wp(23) / 2},*/}
        {/*          {translateY: -hp(20) / 2},*/}
        {/*        ],*/}
        {/*      }}*/}
        {/*      onPress={() => console.log('Like pressed')}>*/}
        {/*      <Image*/}
        {/*        source={images.emptyLikeImage}*/}
        {/*        style={{width: wp(23), height: hp(20), resizeMode: 'contain'}}*/}
        {/*      />*/}
        {/*    </TouchableOpacity>*/}
        {/*  </View>*/}
        {/*</View>*/}

        <View style={{height: hp(30)}} />

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="none"
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.4)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                backgroundColor: 'white',
                borderRadius: 10,
                overflow: 'visible',
              }}>
              <Touchable
                onPress={() => setModalVisible(false)}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: hp(50),
                  width: hp(50),
                  zIndex: 10, // ✅ add zIndex for iOS
                  // elevation: 10, // ✅ optional for Android shadow
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CancelIcon />
              </Touchable>
              <Touchable
                onPress={() =>
                  navigation.navigate('sellerProfile', {
                    store: storeData,
                  })
                }>
                <Image
                  // source={images.shopClothImage}
                  source={shopImage ? {uri: shopImage} : images.shopClothImage}
                  style={{
                    width: hp(64),
                    height: hp(64),
                    marginTop: hp(31),
                    alignSelf: 'center',
                  }}
                />
              </Touchable>
              <Text
                style={{
                  fontSize: fontSize(16),
                  fontFamily: fontFamily.poppins700,
                  marginTop: hp(22),
                  color: colors.pureBlack,
                  textAlign: 'center',
                }}>
                {/* Galaxy Fashion Hub */}
                {storeData?.name ?? ''}
                {/* {product?.storeId?.name ?? ''} */}
              </Text>

              <View
                style={{
                  marginHorizontal: 34,
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: hp(13),
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: fontSize(10),
                    lineHeight: hp(14),
                    fontFamily: fontFamily.poppins500,
                    color: colors.pureBlack,
                  }}>
                  {/* Assured Product quality at great value and Great{'\n'}shopping
                  experience and best class services with Ruhi{'\n'}Dress
                  Materials */}
                  {storeData?.description ?? ''}
                </Text>
              </View>

              <Text
                style={{
                  marginTop: hp(18),
                  fontSize: fontSize(12),
                  lineHeight: hp(18),
                  fontFamily: fontFamily.poppins700,
                  color: colors.pureBlack,
                  textAlign: 'center',
                }}>
                Seller since :{' '}
                <Text
                  style={{
                    fontFamily: fontFamily.poppins500,
                    fontSize: fontSize(12),
                  }}>
                  2 years
                </Text>{' '}
                {'    '}
                FSSAI :{' '}
                <Text
                  style={{
                    fontFamily: fontFamily.poppins500,
                    fontSize: fontSize(12),
                  }}>
                  10021043000393
                </Text>
              </Text>

              <View
                style={{
                  backgroundColor: '#FCF7FF',
                  width: '100%',
                  marginTop: hp(34),
                  height: hp(190),
                }}>
                <View
                  style={{
                    marginHorizontal: 37,
                    marginTop: hp(25),
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        color: colors.pureBlack,
                        fontFamily: fontFamily.poppins700,
                        fontSize: fontSize(20),
                        lineHeight: hp(30),
                      }}>
                      97%
                    </Text>
                    <Text
                      style={{
                        color: colors.pureBlack,
                        fontFamily: fontFamily.poppins400,
                        fontSize: fontSize(12),
                        lineHeight: hp(18),
                      }}>
                      Positive Seller Ratings
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '50%',
                      marginLeft: wp(30),
                    }}>
                    <Text
                      style={{
                        color: colors.pureBlack,
                        fontFamily: fontFamily.poppins700,
                        fontSize: fontSize(20),
                        lineHeight: hp(30),
                      }}>
                      41%
                    </Text>
                    <Text
                      style={{
                        color: colors.pureBlack,
                        fontFamily: fontFamily.poppins400,
                        fontSize: fontSize(12),
                        lineHeight: hp(18),
                      }}>
                      Service Quality
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginHorizontal: 34,
                    marginTop: hp(29),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        color: colors.pureBlack,
                        fontFamily: fontFamily.poppins700,
                        fontSize: fontSize(20),
                        lineHeight: hp(30),
                      }}>
                      120
                    </Text>
                    <Text
                      style={{
                        color: colors.pureBlack,
                        fontFamily: fontFamily.poppins400,
                        fontSize: fontSize(12),
                        lineHeight: hp(18),
                      }}>
                      Total Listing
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '50%',
                      marginLeft: wp(30),
                    }}>
                    <Text
                      style={{
                        color: colors.pureBlack,
                        fontFamily: fontFamily.poppins700,
                        fontSize: fontSize(20),
                        lineHeight: hp(30),
                      }}>
                      4.6
                    </Text>
                    <Text
                      style={{
                        color: colors.pureBlack,
                        fontFamily: fontFamily.poppins400,
                        fontSize: fontSize(12),
                        lineHeight: hp(18),
                      }}>
                      Delivery Services
                    </Text>
                  </View>
                </View>
              </View>
              {/* Add your profile content here */}

              <Touchable
                style={{
                  width: '100%',
                  textAlign: 'center',
                  alignItems: 'center',
                  height: hp(50),
                  justifyContent: 'center',
                }}
                onPress={() => setModalVisible(false)}>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(16),
                    fontFamily: fontFamily.poppins400,
                    lineHeight: hp(24),
                  }}>
                  Send Equiry
                </Text>
              </Touchable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
