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
import RenderHTML from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import {
  BackIcon,
  BagIcon,
  CancelIcon,
  GradientFullFillLike,
  GradientLikeIcon,
  images,
  SearchFilterIcon,
  SellerShopIcon,
  SendEquiry,
  SendEquiry1,
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
import {
  getWishlistRequest,
  removeWishlistRequest,
  wishlistRequest,
} from '../../redux/actions/wishlistActions';
import {productDetailsRequest} from '../../redux/actions/productDetailsAction';
import {getUserReviewsRequest} from '../../redux/actions/reviewActions';
import {getStoreRequest} from '../../redux/actions/storeActions';
import {ToastAndroid} from 'react-native';
import {addRecentlyViewedRequest} from '../../redux/actions/recentlyViewedActions';
import {
  GET_CART_FAILURE,
  GET_CART_REQUEST,
} from '../../redux/actions/cartActions';
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
  const {width} = useWindowDimensions();
  const route = useRoute();

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  console.log('Auth Token in ProductDetailsScreen:', token);
  // const ratingsRef = useRef(null);

  const scrollRef = useRef(null); // Ref for ScrollView
  const reviewsRef = useRef(null); // Ref for Reviews section
  // ✅ FIRST define product

  const [showAdded, setShowAdded] = useState(false);
  const {loading, cartData, error, success} = useSelector(
    state => state.addToCard,
  );
  const cartCount = cartData?.productDetailList?.length || 0;
  console.log('CART COUNT =>', cartCount);
  useEffect(() => {
    if (token) {
      console.log('🔥 CALLING CART API FROM PRODUCT DETAILS');

      dispatch({
        type: GET_CART_REQUEST,
        token: token,
      });
    }
  }, [token]);
  // REVIEW
  const userReviews = useSelector(state => state.review.userReviews);
  console.log('USER REVIEWS FROM REDUX 👉', userReviews);
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

  // USERID
  const user = useSelector(state => state.auth.user);
  const userId = user?.id || user?._id;

  // PRODUCT
  const product = route.params?.product;
  // console.log('FULL PRODUCT ', product);
  // console.log('PRODUCT ID ', product?.id);
  // console.log('PRODUCT _ID ', product?._id);
  const productId = product?.id || product?._id;
  console.log('FINAL PRODUCT ID ', productId);
  // ✅ safety check
  if (!product) {
    console.log('❌ Product not received from navigation');
    return null;
  }
  // useEffect(() => {
  //   console.log(' FULL PRODUCT:', product);
  //   console.log(' RESULTS:', product?.results);
  //   console.log(' REVIEWS:', product?.results?.reviews);
  //   console.log(' REVIEWS COUNT:', product?.results?.reviews?.length);
  // }, [product]);

  // GET USER REVIEWS
  useEffect(() => {
    if (productId) {
      console.log('FETCHING REVIEWS FOR PRODUCT ---------', productId);
      dispatch(getUserReviewsRequest(productId));
    }
  }, [productId]);

  // GET STORE DATA OF PRODUCT
  const {storeData} = useSelector(state => state.sellerStore);
  const seller = storeData;
  const storeId = product?.storeId;
  console.log('STORE ID =>', storeId);
  useEffect(() => {
    console.log('UPDATED STORE DATA =>', storeData);
  }, [storeData]);

  useEffect(() => {
    console.log(storeId, 'storeid......');
    console.log('Fetching store for ID:', storeId);
    dispatch(getStoreRequest(storeId));
  }, [storeId]);

  //shop image
  const shopImage = storeData?.profileImage;

  const scrollToReviews = () => {
    reviewsRef.current?.measureLayout(scrollRef.current, (x, y) => {
      scrollRef.current.scrollTo({y: y, animated: true});
    });
  };
  // const [selectedSize, setSelectedSize] = useState('S'); // Default selection
  const [pincode, setPincode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [justAdded, setJustAdded] = useState([]);
  const sellerId = product?.storeId?.id;
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState('');
  // wishlist state

  const [localWishlist, setLocalWishlist] = useState([]);
  const {wishlistData} = useSelector(state => state.wishlist);
  useEffect(() => {
    if (Array.isArray(wishlistData)) {
      setLocalWishlist(wishlistData);
    }
  }, [wishlistData]);

  const isInWishlist = productId => {
    return localWishlist.some(
      w => (w.productId?.id || w.productId?._id) === productId,
    );
  };

  const getWishlistItem = productId =>
    localWishlist.find(
      w => (w.productId?.id || w.productId?._id) === productId,
    );
  // PINCODE
  const handlePincodeChange = text => {
    // Allow only digits and limit input to 6 characters
    if (/^\d{0,6}$/.test(text)) {
      setPincode(text);
    }
  };

  // Address List ID add in the Add to card

  const addressList = useSelector(state => state.addresses?.list || []);
  const deliveryAddressId = addressList[0]?.id;

  console.log('ADDRESS LIST ', addressList);
  console.log('DELIVERY ID ', deliveryAddressId);
  // Add to Card Function
  const handleAddToCart = () => {
    if (!token) {
      navigation.navigate('StartingScreen', {
        redirectTo: 'BagStack',
      });
      return;
    }

    // if (!selectedVariant) {
    //   alert('Please select size and color');
    //   return;
    // }

    const payload = {
      productDetailList: [
        {
          productId: productId,
          variants: selectedVariant?._id || selectedVariant?.id,
          quantity: 1,
        },
      ],
      deliveryAddress: deliveryAddressId,
    };

    console.log('ADD TO CART PAYLOAD ', payload);
    console.log('Selected Variants ID', selectedVariant);

    dispatch({
      type: 'ADD_TO_CART_REQUEST',
      payload: payload,
      token: token,
    });

    // ✅ UI CONTROL HERE (BEST)
    setShowAdded(true);

    setTimeout(() => {
      setShowAdded(false);
    }, 2000);
    // ToastAndroid.show('Add to Bag', ToastAndroid.SHORT);
  };

  // Product Varitans
  const findVariant = (product, color, size) => {
    if (!product?.variants) return null;
    console.log('ALL PRODUCT VARIANTS:', product.variants);
    return (
      product.variants.find(v => {
        const colorMatch = v.variants.some(
          x =>
            x.key === 'color' &&
            x.value?.trim().toLowerCase() === color?.trim().toLowerCase(),
        );

        const sizeMatch = v.variants.some(
          x =>
            x.key === 'size' &&
            x.value?.trim().toLowerCase() === size?.trim().toLowerCase(),
        );
        console.log('CHECKING VARIANT:', v);
        console.log('COLOR MATCH:', colorMatch);
        console.log('SIZE MATCH:', sizeMatch);
        return colorMatch && sizeMatch;
      }) || null
    );
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
    console.log('PRODUCT 👉', product);
    console.log('VARIANT 👉', selectedVariant);
    console.log('IMAGES 👉', selectedVariant?.images);
  }, [selectedVariant]);

  // only variants size show
  const getAvailableSizes = (product, selectedColor) => {
    if (!product?.variants) return [];

    const sizes = product.variants
      .filter(v =>
        v.variants.some(
          x =>
            x.key === 'color' &&
            x.value?.toLowerCase() === selectedColor?.toLowerCase(),
        ),
      )
      .map(v => v.variants.find(x => x.key === 'size')?.value);

    return [...new Set(sizes)];
  };

  const availableSizes = getAvailableSizes(product, selectedColor);
  useEffect(() => {
    if (productId) {
      console.log('DISPATCHING PRODUCT DETAILS 👉', productId);
      dispatch(productDetailsRequest(productId));
    }
  }, [productId]);

  // Get Wishlist
  useEffect(() => {
    dispatch(getWishlistRequest()); //  ADD THIS
    console.log('Fetching  Get wishlist data for user ...');
  }, []);

  // Add Recently View
  useEffect(() => {
    if (productId) {
      // dispatch(addRecentlyViewedRequest(productId));
      dispatch(addRecentlyViewedRequest({productId}));
      console.log('ADD REVENTLY VIEW PRODUCT ID====>', productId);
    }
  }, [productId]);
  const onWishlistPress = product => {
    if (!token) {
      navigation.navigate('StartingScreen');
      return;
    }

    const productId = product.id || product._id;

    const alreadyExists = isInWishlist(productId);

    if (alreadyExists) {
      // 🔍 find item
      const wishlistItem = getWishlistItem(productId);

      if (!wishlistItem?.id) {
        ToastAndroid.show('Remove failed', ToastAndroid.SHORT);
        return;
      }

      // ✅ UI instant remove
      setLocalWishlist(prev =>
        prev.filter(w => (w.productId?.id || w.productId?._id) !== productId),
      );

      // 🚀 API
      dispatch(removeWishlistRequest(wishlistItem.id));

      ToastAndroid.show('Removed from Wishlist', ToastAndroid.SHORT);
    } else {
      // ✅ UI instant add
      setLocalWishlist(prev => [...prev, {productId: {id: productId}}]);

      // 🚀 API
      dispatch(wishlistRequest(productId));

      ToastAndroid.show('Saved to Wishlist', ToastAndroid.SHORT);
    }
  };

  //Helper Function (Initials name show)
  const getInitials = name => {
    if (!name || typeof name !== 'string') return 'NN';

    const words = name.trim().split(' ').filter(Boolean);

    // Only one word (e.g., "Dax")
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }

    // Multiple words (e.g., "Riya Shah")
    return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
  };

  // Get All Reviews of user
  const ReviewItem = ({item}) => {
    useEffect(() => {
      console.log('REVIEW IMAGES ', item.productImages);
      console.log('FULL ITEM ', item);
      console.log('USER DATA ', item.user);
      console.log('Review item:', item);
    }, [item]);
    return (
      <View style={{marginTop: hp(24)}}>
        {/* Review Title */}
        <Text
          style={{
            color: colors.pureBlack,
            fontSize: fontSize(14),
            lineHeight: hp(24),
            fontFamily: fontFamily.poppins700,
            marginHorizontal: 17,
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
            marginHorizontal: 17,
          }}>
          {item?.description ||
            item?.review ||
            item?.comment ||
            item?.reviewText ||
            'No description yet.'}
        </Text>
        {/* Review Images (if any) */}
        {item?.productImages && item.productImages.length > 0 ? (
          <View
            style={{
              marginTop: hp(20),
              marginHorizontal: 17,
              flexDirection: 'row',
            }}>
            {item.productImages.map((img, index) => (
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
              marginHorizontal: 17,
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
            marginHorizontal: 17,
          }}>
          {/* User info */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {item?.user?.profilePic ? (
              <Image
                source={{uri: item.user.profilePic}}
                style={{width: hp(34), height: hp(34), borderRadius: 50}}
              />
            ) : (
              <View
                style={{
                  width: hp(34),
                  height: hp(34),
                  borderRadius: 50,
                  backgroundColor: '#F7E7FF',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: fontFamily.poppins500,
                    fontSize: fontSize(15),
                  }}>
                  {getInitials(item?.user?.name || 'No Name')}
                </Text>
              </View>
            )}
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
        <View
          style={{
            width: '100%',
            borderWidth: 0.7,
            marginTop: hp(26),
            borderColor: '#E7E7E7',
          }}
        />
      </View>
    );
  };

  // Html code
  const htmlContent = product?.productDetails
    ?.replace(/&lt;/g, '<')
    ?.replace(/&gt;/g, '>')
    ?.replace(/&amp;/g, '&')
    ?.replace(/<li>\s*<p>/g, '<li>')
    ?.replace(/<\/p>\s*<\/li>/g, '</li>')
    ?.replace(/<p><\/p>/g, '')
    ?.replace(/<\/ul>\s*<ul>/g, ''); // 🔥 gap fix// remove empty p

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
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

          <View>
            <Touchable
              style={{
                marginLeft: 10,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate('MainTabs', {
                  screen: 'BagStack',
                  params: {
                    screen: 'BagScreen',
                    params: {
                      product: product,
                    },
                  },
                })
              }>
              <BagIcon width={20} height={20} />

              {cartCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    backgroundColor: '#9333EA',
                    borderRadius: 10,
                    width: 18,
                    height: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    {cartCount ?? '0'}
                  </Text>
                </View>
              )}
            </Touchable>
          </View>
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
            // title="Add to Cart"
            title={showAdded ? 'Added to Cart' : 'Add to Cart'}
            // loading={loading}
            onPress={handleAddToCart}
            buttonStyle={{width: wp(285), height: hp(50)}}
          />

          <View style={{width: hp(50), height: hp(50)}}>
            {/* Background circular image */}
            <Image
              source={images.gradientCircleImage}
              style={{width: '100%', height: '100%'}}
            />

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
              {isInWishlist(product.id || product._id) ? (
                <GradientFullFillLike width={wp(23)} height={hp(20)} />
              ) : (
                <GradientLikeIcon width={wp(23)} height={hp(20)} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        <View
          style={
            {
              // marginTop: 10,
            }
          }>
          <ProductImageComponent
            product={route.params.product}
            // selectedVariant={handleColorChange}
            setSelectedColor={setSelectedColor}
            setSelectedVariant={setSelectedVariant} // 🔥 ADD THIS
          />
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
            numberOfLines={1}
            ellipsizeMode="tail"
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
              width: wp(161),
              height: hp(28),
              borderColor: '#D2D2D2',
              borderWidth: 1,
              borderRadius: 16,
              marginTop: hp(19),
              flexDirection: 'row',
              alignItems: 'center',
              // flexDirection: 'row',
              // alignItems: 'center',
              // borderWidth: 1,
              // borderRadius: 30,
              // paddingVertical: 4,
              // alignSelf: 'flex-start',
              // borderColor: '#D2D2D2',
              // width: hp(200),
              // height: hp(35),
              // marginTop: 19,
            }}>
            <Text
              style={{
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins400,
                color: '#8225AF',
                marginLeft: wp(10),
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
                marginLeft: wp(7),
                marginBottom: 2,
              }}
            />
            <View
              style={{
                width: 1,
                height: 18,
                backgroundColor: '#D2D2D2',
                // marginHorizontal: 8,
                marginLeft: wp(10),
              }}
            />

            <Text
              style={{
                color: colors.pureBlack,

                fontFamily: fontFamily.poppins500,
                marginLeft: wp(14),
                fontSize: fontSize(13),
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
            marginTop: hp(22),
          }}
        />

        <View
          style={{
            marginHorizontal: 17,
            marginTop: hp(25),
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
              Rs.{selectedVariant?.price ?? product?.variants[0]?.price}
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
              Rs.{selectedVariant?.mrp ?? product?.variants[0]?.mrp ?? '000'}
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
              // justifyContent: 'space-between'
              flexWrap: 'wrap',
              marginTop: hp(23),
            }}>
            {/* {sizes.map(size => ( */}
            {availableSizes.map(size => (
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
                  marginRight: 7,
                  backgroundColor:
                    selectedSize === size ? '#F7E7FF' : 'transparent',
                  borderColor: selectedSize === size ? '#000' : '#D1D1D1',
                }}>
                <Text style={{color: selectedSize === size ? '#000' : '#000'}}>
                  {/* {size} */}
                  {size?.toUpperCase()}
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
              // backgroundColor: 'pink',
            }}>
            <TextInput
              value={pincode}
              onChangeText={handlePincodeChange}
              placeholder={'Enter Pincode'}
              placeholderTextColor={'black'}
              style={{
                width: wp(228),
                // height: hp(44),
                backgroundColor: '#F4F4F4',
                borderRadius: 50,
                paddingHorizontal: hp(30),
                fontSize: fontSize(14),
                color: '#969696',
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
                // height: hp(44),
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
          <View style={{marginTop: hp(24)}}>
            <RenderHTML
              contentWidth={width}
              source={{html: htmlContent || ''}}
              tagsStyles={{
                p: {
                  color: '#6B6B6B',
                  fontSize: fontSize(14),
                  lineHeight: hp(22),
                  // marginBottom: 6, // ✅ normal spacing // 🔥 reduce space
                  marginTop: 0,
                  marginBottom: 3,
                },
                ul: {
                  paddingLeft: 15, // ✅ proper indent
                  marginBottom: 8,
                  // backgroundColor: 'pink',
                },
                strong: {
                  fontFamily: fontFamily.poppins700, // 🔥 MUST
                  color: '#000',
                  fontSize: fontSize(14),
                },
                li: {
                  color: '#6B6B6B',
                  fontSize: fontSize(14),
                  lineHeight: hp(22),
                  marginBottom: 5,
                  flexDirection: 'row', // 🔥 important
                  alignItems: 'center',
                },
              }}
              renderersProps={{
                ul: {
                  markerTextStyle: {
                    fontSize: fontSize(13),
                    lineHeight: hp(23),
                  },
                },
              }}
            />
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
                Seller :{'  '}
                <Text style={{fontFamily: fontFamily.poppins400}}>
                  {/* {storeData?.name ?? ''}
                   */}
                  {storeData?.name?.charAt(0)?.toUpperCase() +
                    storeData?.name.slice(1) || 'No Name of store'}
                </Text>
              </Text>

              <View style={{flexDirection: 'row', zIndex: 99, top: 30}}>
                {/* <LinearGradient
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
                  }}> */}
                <TouchableOpacity
                  // onPress={() => setModalVisible(true)}
                  onPress={() =>
                    // navigation.navigate('sellerProfile', {
                    //   store: storeData,
                    // })

                    navigation.navigate('MainTabs', {
                      screen: 'SearchStack',
                      params: {
                        screen: 'SellerProfile',
                        params: {store: storeData},
                      },
                    })
                  }
                  style={{
                    width: wp(95), // smaller than container
                    height: hp(40),
                    borderRadius: 50,
                    borderColor: '#CDCDCD',
                    borderWidth: 1,
                    backgroundColor: 'white', // Inner background
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  activeOpacity={0.8}>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(12),
                      lineHeight: hp(14),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    Visit Store
                  </Text>
                </TouchableOpacity>
                {/* </LinearGradient> */}

                {/* <LinearGradient
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
                  }}> */}
                <TouchableOpacity
                  style={{
                    width: wp(141), // smaller than container
                    height: hp(40),
                    borderRadius: 50,
                    borderColor: '#CDCDCD',
                    borderWidth: 1,
                    backgroundColor: 'white', // Inner background
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: hp(15),
                    flexDirection: 'row',
                  }}
                  activeOpacity={0.8}>
                  <SendEquiry1 />
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(12),
                      lineHeight: hp(14),
                      fontFamily: fontFamily.poppins400,
                      marginLeft: hp(10),
                    }}>
                    Send Enquiry
                  </Text>
                </TouchableOpacity>
                {/* </LinearGradient> */}
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: '#E7E7E7',
            marginTop: hp(55),
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

        <FlatList
          data={reviews}
          keyExtractor={item => item._id}
          renderItem={({item}) => <ReviewItem item={item} />}
          scrollEnabled={false}
        />
        {/* </View> */}

        {/* <View
          style={{
            width: '100%',
            borderWidth: 0.8,
            borderColor: '#E7E7E7',
            marginTop: hp(26),
          }}
        /> */}

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

        {/*     <Modal
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
                {storeData?.name ?? ''}
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
*/}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
