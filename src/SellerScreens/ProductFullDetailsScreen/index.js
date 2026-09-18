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
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import ProductImageComponent from '../../components/productImageComponent';
import {colors} from '../../utils/colors';
import {fontFamily, fontSize, hp, Touchable, wp} from '../../utils/helpers';
import {useSelector} from 'react-redux';
import RenderHtml, {RenderHTML} from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';

import {
  BackIcon,
  BagIcon,
  CancelIcon,
  images,
  SearchFilterIcon,
  SellerShopIcon,
  ShareBlueIcon,
  StarIcon,
  StoreIcon,
  UserIcon,
} from '../../assets';
import SizeChartComponent from '../../components/sizeChartComponent';
import GradientButton from '../../components/gradientButton';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import ReviewRatingComponent from '../../components/reviewRatingComponent';
import Svg, {Path} from 'react-native-svg';
import star_icon from '../../assets/images/star_image_icon.png';
import {useDispatch} from 'react-redux';
import ProductFullImageComponets from '../../SellerComponents/ProductFullImageComponents';
import SellerReviewRatingComponent from '../../SellerComponents/SellerReviewRatingComponent';
import {getProductDetailsRequest} from '../../redux/actions/sellerProductDetailsActions';
import {GET_CUSTOMER_REVIEWS_REQUEST} from '../../redux/actions/sellerReviewAction';
import TermAndPolicy from '../../components/termAndPolicyComponent';
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

const ProductFullDetailsScreen = () => {
  const route = useRoute();
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  // const ratingsRef = useRef(null);
  const scrollRef = useRef(null); // Ref for ScrollView
  const reviewsRef = useRef(null); // Ref for Reviews section

  const scrollToReviews = () => {
    reviewsRef.current?.measureLayout(scrollRef.current, (x, y) => {
      scrollRef.current.scrollTo({y: y, animated: true});
    });
  };
  // const {product} = route.params;

  const [selectedSize, setSelectedSize] = useState(null); // Default selection
  const [pincode, setPincode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  // const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handlePincodeChange = text => {
    // Allow only digits and limit input to 6 characters
    if (/^\d{0,6}$/.test(text)) {
      setPincode(text);
    }
  };

  const handleAddToCart = () => {
    console.log('Handle Add to Cart Loaded');
  };

  const {productId} = route.params;

  const {sellerProductDetailsLoading, productDetails, error} = useSelector(
    state => state.sellerProductDetails,
  );
  console.log('PRODUCT ID IN PRODUCT FULL DETAILS =>', productId);
  // console.log('FULL PRODUCT DETAILS =>', productDetails);

  const product = productDetails?.results;
  // console.log('PRODUCT DETAILS IN PRODUCT FULL DETAILS SCREEN =>', product);
  // console.log('PRODUCT =>', JSON.stringify(product, null, 2));

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetailsRequest(productId));
    }
  }, [productId]);

  // console.log(
  //   'FIRST VARIANT =>',
  //   JSON.stringify(product?.variants?.[0], null, 2),
  // );
  //get the variants from productDetails

  const variants = product?.variants || [];
  const price = selectedVariant?.price || 0;
  // console.log('PRICE =>', price);
  const discount = selectedVariant?.discount || 0;
  // console.log('DISCOUNT =>', discount);
  const averageRating = product?.averageRating || 0;
  // console.log('AVERAGE RATING =>', averageRating);
  const totalReviews = product?.totalReviews || 0;
  // console.log('TOTAL REVIEWS =>', totalReviews);
  const sellingPrice = selectedVariant?.sellingPrice || 0;
  // console.log('SELLING PRICE =>', sellingPrice);
  // console.log('PRODUCT In details =>', JSON.stringify(product, null, 2));
  //specification
  const specifications = product?.specifications || [];
  // console.log('SPECIFICATION', specifications);

  // Set default selected color and size when product details are loaded
  useEffect(() => {
    if (variants.length > 0) {
      const firstVariant = variants[0];

      const defaultColor = firstVariant.variants.find(
        v => v.key === 'color',
      )?.value;

      const defaultSize = firstVariant.variants.find(
        v => v.key === 'size',
      )?.value;

      setSelectedColor(defaultColor);
      setSelectedSize(defaultSize);
    }
  }, [variants]);

  console.log('selectedColor =>', selectedColor);
  console.log('selectedSize =>', selectedSize);
  console.log('selectedVariant =>', selectedVariant);

  // Update selectedVariant whenever selectedColor or selectedSize changes
  useEffect(() => {
    const matchedVariant = variants.find(item => {
      const color = item.variants.find(v => v.key === 'color')?.value;
      const size = item.variants.find(v => v.key === 'size')?.value;

      return color === selectedColor && size === selectedSize;
    });

    setSelectedVariant(matchedVariant);
  }, [selectedColor, selectedSize, variants]);

  console.log('SELECTED VARIANT =>', selectedVariant);
  // Get the first variant with images
  const colorOptions = [
    ...new Set(
      variants.map(item => item.variants.find(v => v.key === 'color')?.value),
    ),
  ];

  console.log('COLORS =>', colorOptions);

  // Get the first variant with images
  const sizeOptions = [
    ...new Set(
      variants.map(item => item.variants.find(v => v.key === 'size')?.value),
    ),
  ];
  console.log('SIZES =>', sizeOptions);

  // product details may contain HTML entities, so we need to decode them before rendering
  const htmlContent = product?.productDetails
    // console.log('HTML CONTENT =>', htmlContent)
    ?.replace(/&lt;/g, '<')
    ?.replace(/&gt;/g, '>')
    ?.replace(/&amp;/g, '&')
    ?.replace(/<li>\s*<p>/g, '<li>')
    ?.replace(/<\/p>\s*<\/li>/g, '</li>')
    ?.replace(/<p><\/p>/g, '')
    ?.replace(/<\/ul>\s*<ul>/g, '');
  const {userReviews, userLoading, userError} = useSelector(
    state => state.sellerReview,
  );

  console.log('USER REVIEWS =>', JSON.stringify(userReviews, null, 2));

  useEffect(() => {
    console.log('USER REVIEWS =>', userReviews);
    console.log('IS ARRAY =>', Array.isArray(userReviews));
    console.log('LENGTH =>', userReviews?.length);
  }, [userReviews]);
  useEffect(() => {
    if (productId) {
      dispatch({
        type: GET_CUSTOMER_REVIEWS_REQUEST,
        payload: productId,
      });
    }
  }, [productId]);

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

  const visibleSpecifications = showAllSpecs
    ? specifications
    : specifications.slice(0, 6);
  const ReviewItem = ({item}) => {
    useEffect(() => {
      // console.log('REVIEW IMAGES ', item.productImages);
      // console.log('FULL ITEM ', item);
      // console.log('USER DATA ', item.user);
      // console.log('Review item:', item);
    }, [item]);
    return (
      <>
        {/* User + Rating */}
        <View
          style={{
            marginTop: hp(27),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: wp(17),
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
                  width: hp(38),
                  height: hp(38),
                  borderRadius: wp(50),
                  backgroundColor: '#EFEBFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <UserIcon width={14} height={14} />
              </View>
            )}
            <Text
              style={{
                marginLeft: wp(11),
                color: colors.pureBlack,
                fontSize: fontSize(14),
                lineHeight: hp(18),
                fontFamily: fontFamily.poppins500,
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
                top: hp(1),
              }}>
              {item?.createdAt ? new Date(item.createdAt).toDateString() : ''}
            </Text>
          </View>

          {/* Rating */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <CustomStarIcon
              width={hp(15)}
              height={hp(14)}
              fill="#8225AF"
              style={{marginRight: wp(10)}}
            /> */}
            <Text
              style={{
                fontSize: fontSize(14),
                lineHeight: hp(24),
                fontFamily: fontFamily.poppins700,
                // color: '#8225AF',
                color: '#5029F3',
                top: hp(2),
              }}>
              {item?.rating || 0}
            </Text>
            <CustomStarIcon
              width={hp(15)}
              height={hp(14)}
              fill="#5029F4"
              style={{marginLeft: wp(6)}}
            />
          </View>
        </View>
        <View style={{marginTop: hp(24)}}>
          {/* Review Title */}
          <Text
            style={{
              color: colors.pureBlack,
              fontSize: fontSize(14),
              lineHeight: hp(24),
              fontFamily: fontFamily.poppins700,
              marginHorizontal: wp(17),
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
                marginHorizontal: wp(17),
                flexDirection: 'row',
              }}>
              {item.productImages.map((img, index) => (
                <Image
                  key={index}
                  source={{uri: img}}
                  style={{
                    width: wp(60),
                    height: hp(80),
                    borderRadius: wp(14),
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
                marginHorizontal: wp(17),
              }}>
              No images added in this review
            </Text>
          )}

          {item?.replies?.length > 0 &&
            item.replies.map(reply => (
              <View
                key={reply._id}
                style={{
                  marginTop: hp(16),
                  marginHorizontal: wp(17),
                  backgroundColor: '#F7F5FF',
                  borderRadius: wp(12),
                  paddingVertical: hp(15),
                  paddingHorizontal: wp(16),
                }}>
                <Text
                  style={{
                    fontSize: fontSize(13),
                    fontFamily: fontFamily.poppins500,
                    color: '#000',
                  }}>
                  {reply?.seller?.name}
                </Text>

                <Text
                  style={{
                    marginTop: hp(6),
                    fontSize: fontSize(13),
                    lineHeight: hp(20),
                    fontFamily: fontFamily.poppins400,
                    color: '#444',
                  }}>
                  {reply?.message}
                </Text>

                <Text
                  style={{
                    marginTop: hp(10),
                    fontSize: fontSize(11),
                    fontFamily: fontFamily.poppins400,
                    color: '#999',
                  }}>
                  {new Date(reply.createdAt).toDateString()}
                </Text>
              </View>
            ))}
          <View
            style={{
              width: '100%',
              // borderWidth: 0.7,
              height: hp(1),
              marginTop: hp(26),
              backgroundColor: '#EAE7EE',
            }}
          />
        </View>
      </>
    );
  };
  //when get productDetailsLoading is true, show a loading indicator
  if (sellerProductDetailsLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={'#5029F4'} />
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          marginHorizontal: wp(17),
          height: hp(57),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Touchable
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            width: wp(50),
            height: hp(50),
            justifyContent: 'center',
          }}>
          <BackIcon />
        </Touchable>

        {/* Right Side - Search & Bag Icons */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          <Touchable
            style={{
              width: wp(50),
              height: hp(50),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SearchFilterIcon />
          </Touchable>
        </View>
      </View>

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        <View style={{marginTop: hp(10)}}>
          <ProductFullImageComponets
            product={product}
            // selectedVariant={handleColorChange}
            setSelectedColor={setSelectedColor}
            // setSelectedVariant={setSelectedVariant}
          />
        </View>

        <View style={{marginHorizontal: wp(17), marginTop: hp(46)}}>
          <Text
            style={{
              color: '#17151C',
              fontSize: fontSize(20),
              lineHeight: hp(26),
              fontFamily: fontFamily.poppins600,
            }}>
            {product?.title || 'Product Name'}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              fontSize: fontSize(14),
              // lineHeight: hp(16),
              fontFamily: fontFamily.poppins400,
              color: '#77727F',
              marginTop: hp(12),
            }}>
            {product?.description ||
              'No Description available for this product.'}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={scrollToReviews}
            // onPress={handleSubmitReview}
            style={{
              width: wp(130),
              height: hp(29),
              // borderColor: '#D2D2D2',
              backgroundColor: '#F1ECFF',
              // borderWidth: 1,
              borderRadius: wp(16),
              marginTop: hp(12),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins400,
                color: '#7147E8',
                marginLeft: wp(10),
              }}>
              {averageRating?.toFixed(1) || '00'}
            </Text>
            <CustomStarIcon
              width={hp(15)}
              height={hp(15)}
              fill="#7147E8"
              style={{marginLeft: wp(7), marginBottom: hp(2)}}
            />

            <Text
              style={{
                color: '#7147E8',
                fontFamily: fontFamily.poppins400,
                marginLeft: wp(10),
                fontSize: fontSize(12),
              }}>
              {totalReviews || '00'} Ratings
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: wp(20),
            marginTop: hp(28),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: fontSize(22),
                color: '#17151C',
                lineHeight: hp(32),
                fontFamily: fontFamily.poppins600,
              }}>
              {sellingPrice ? `Rs.${sellingPrice}` : 'N/A'}
            </Text>
            <Text
              style={{
                marginLeft: hp(8),
                color: '#77727F',
                fontSize: fontSize(12),
                lineHeight: hp(26),
                fontFamily: fontFamily.poppins400,
              }}>
              MRP{' '}
            </Text>
            <Text
              style={{
                color: '#77727F',
                textDecorationLine: 'line-through',
                fontSize: fontSize(12),
                lineHeight: hp(26),
                fontFamily: fontFamily.poppins400,
              }}>
              {price ? `Rs.${price}` : 'N/A'}
            </Text>

            <Text
              style={{
                marginLeft: hp(8),
                color: '#2B9909',
                fontSize: fontSize(12),
                lineHeight: hp(24),
                fontFamily: fontFamily.poppins400,
              }}>
              {discount ? `${discount}% Off` : 'N/A'}
            </Text>
          </View>

          <View
            style={{
              marginTop: hp(28),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.pureBlack,
                fontSize: fontSize(15),
                lineHeight: hp(20),
                fontFamily: fontFamily.poppins400,
              }}>
              Select your size
            </Text>
            <SizeChartComponent />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginTop: hp(15)}}>
            {sizeOptions.map(size => (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(size)}
                style={{
                  width: hp(52),
                  height: hp(52),
                  borderRadius: wp(50),
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: wp(20),
                  backgroundColor:
                    selectedSize === size ? '#5029F3' : '#FFFFFF',
                  borderColor:
                    selectedSize === size ? 'transparent' : '#D1D1D1',
                }}>
                <Text
                  style={{
                    color: selectedSize === size ? '#FFFFFF' : '#000',
                    fontSize: fontSize(18),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            width: '100%',
            borderWidth: hp(7),
            borderColor: '#F7F7F7',
            marginTop: hp(35),
          }}
        />

        <View style={{marginHorizontal: wp(20), marginTop: hp(28)}}>
          <Text
            style={{
              color: '#17151C',
              fontSize: fontSize(20),
              lineHeight: hp(26),
              fontFamily: fontFamily.poppins600,
            }}>
            Product Details
          </Text>

          <View style={{marginTop: hp(16)}}>
            <RenderHTML
              contentWidth={width}
              source={{html: htmlContent || ''}}
              tagsStyles={{
                p: {
                  color: '#6B6B6B',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins400,
                  lineHeight: hp(22),
                  marginTop: 0,
                  marginBottom: hp(3),
                },
                ul: {
                  paddingLeft: wp(15),
                  marginBottom: hp(8),
                },
                strong: {
                  fontFamily: fontFamily.poppins700,
                  color: '#000',
                  fontSize: fontSize(14),
                },
                li: {
                  color: '#6B6B6B',
                  fontSize: fontSize(14),
                  lineHeight: hp(22),
                  fontFamily: fontFamily.poppins400,
                  marginBottom: hp(5),
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              }}
              renderersProps={{
                ul: {
                  markerTextStyle: {
                    fontSize: fontSize(13),
                    lineHeight: hp(23),
                    fontFamily: fontFamily.poppins400,
                  },
                },
              }}
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            borderWidth: hp(7),
            borderColor: '#F7F7F7',
            marginTop: hp(44),
          }}
        />

        <Text
          style={{
            color: colors.pureBlack,
            fontSize: fontSize(17),
            lineHeight: hp(26),
            fontFamily: fontFamily.poppins700,
            marginTop: hp(31),
            marginHorizontal: wp(20),
          }}>
          Specification
        </Text>

        <View style={{marginTop: hp(25), marginHorizontal: wp(20)}}>
          {Array.from(
            {length: Math.ceil(visibleSpecifications.length / 2)},
            (_, index) => {
              const left = visibleSpecifications[index * 2];
              const right = visibleSpecifications[index * 2 + 1];

              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginTop: index === 0 ? 0 : hp(25),
                  }}>
                  {/* Left Column */}
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        color: '#6B6B6B',
                        fontSize: fontSize(12),
                        lineHeight: hp(16),
                        fontFamily: fontFamily.poppins400,
                      }}>
                      {left?.key?.replace(/_/g, ' ')}
                    </Text>

                    <Text
                      style={{
                        fontSize: fontSize(14),
                        lineHeight: hp(18),
                        fontFamily: fontFamily.poppins400,
                        color: colors.pureBlack,
                        marginTop: hp(2),
                      }}>
                      {left?.value}
                    </Text>
                  </View>

                  {/* Right Column */}
                  <View style={{width: '50%'}}>
                    {right && (
                      <>
                        <Text
                          style={{
                            color: '#6B6B6B',
                            fontSize: fontSize(12),
                            lineHeight: hp(16),
                            fontFamily: fontFamily.poppins400,
                          }}>
                          {right?.key?.replace(/_/g, ' ')}
                        </Text>

                        <Text
                          style={{
                            fontSize: fontSize(14),
                            lineHeight: hp(18),
                            fontFamily: fontFamily.poppins400,
                            color: colors.pureBlack,
                            marginTop: hp(2),
                          }}>
                          {right?.value}
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              );
            },
          )}
        </View>
        {specifications?.length > 6 && !showAllSpecs && (
          <TouchableOpacity
            onPress={() => setShowAllSpecs(true)}
            style={{marginTop: hp(25), marginHorizontal: wp(20)}}>
            <Text
              style={{
                fontSize: fontSize(14),
                lineHeight: hp(18),
                fontFamily: fontFamily.poppins400,
                color: '#5029F4',
              }}>
              See More
            </Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            width: '100%',
            borderWidth: hp(7),
            borderColor: '#F7F7F7',
            marginTop: hp(30),
          }}
        />

        <View
          style={{
            marginHorizontal: wp(20),
            marginTop: hp(22),
          }}>
          <View
            style={{
              // marginTop: hp(10),
              flexDirection: 'row',
              // alignItems: 'center',
            }}>
            <View
              style={{
                width: hp(42),
                height: hp(42),
                borderRadius: wp(50),
                backgroundColor: '#F1ECFF',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <StoreIcon />
            </View>

            <View style={{marginLeft: wp(16)}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: fontSize(14),
                    lineHeight: hp(23),
                    fontFamily: fontFamily.poppins500,
                    color: colors.pureBlack,
                    // top: 18,
                  }}>
                  Seller :{' '}
                  <Text style={{fontFamily: fontFamily.poppins500}}>
                    {product?.storeId?.name || 'N/A'}
                  </Text>
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: '#686868',
                    fontSize: fontSize(14),
                    // lineHeight: hp(16),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  Product Code :{' '}
                  <Text
                    style={{
                      color: '#686868',
                      fontSize: fontSize(14),
                      lineHeight: hp(16),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    {product?.productCode || 'N/A'}
                  </Text>
                </Text>
              </View>

              <View>
                <TermAndPolicy />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            borderWidth: hp(8),
            borderColor: '#F7F7F7',
            marginTop: hp(20),
          }}
        />

        <View
          ref={reviewsRef}
          style={{marginHorizontal: wp(20), marginTop: hp(34)}}>
          <Text
            style={{
              fontSize: fontSize(20),
              lineHeight: hp(26),
              fontFamily: fontFamily.poppins600,
              color: colors.pureBlack,
            }}>
            Reviews & Ratings
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: hp(42),
              alignItems: 'flex-start',
            }}>
            {/* Left Side */}
            <View
              style={{
                marginRight: wp(20),
                // backgroundColor: 'red',
                height: hp(48),
              }}>
              <MaskedView
                maskElement={
                  <Text
                    style={{
                      fontSize: fontSize(40),
                      fontFamily: fontFamily.poppins400,
                      color: 'black',
                    }}>
                    {averageRating?.toFixed(1) || '00'}
                  </Text>
                }>
                <LinearGradient
                  colors={['#7147E8', '#7756FF']}
                  start={{x: 0, y: 0.05}}
                  end={{x: 0.3, y: 0.6}}>
                  <Text
                    style={{
                      fontSize: fontSize(40),
                      fontFamily: fontFamily.poppins400,
                      opacity: 0,
                    }}>
                    {averageRating?.toFixed(1) || '00'}
                  </Text>
                </LinearGradient>
              </MaskedView>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: hp(5),
                }}>
                <CustomStarIcon
                  width={hp(15)}
                  height={hp(15)}
                  fill="#F4A340"
                  style={
                    {
                      // marginTop: hp(5),
                    }
                  }
                />
                <CustomStarIcon width={hp(15)} height={hp(15)} fill="#F4A340" />
                <CustomStarIcon width={hp(15)} height={hp(15)} fill="#F4A340" />
                <CustomStarIcon width={hp(15)} height={hp(15)} fill="#F4A340" />
                <CustomStarIcon width={hp(15)} height={hp(15)} fill="#F4A340" />
              </View>
              <Text
                style={{
                  color: '#77727F',
                  fontSize: fontSize(11),
                  fontFamily: fontFamily.poppins400,
                  marginTop: hp(5),
                }}>
                {totalReviews} Ratings
              </Text>
            </View>

            {/* Right Side */}
            <View style={{flex: 1}}>
              <SellerReviewRatingComponent reviewData={userReviews} />
            </View>
          </View>
        </View>

        <View
          style={{
            height: hp(1),
            backgroundColor: '#EAE7EE',
            marginTop: hp(20),
            // marginHorizontal: wp(20),
          }}
        />

        <FlatList
          // data={userReviews || []}
          data={
            showAllReviews ? userReviews || [] : (userReviews || []).slice(0, 2)
          }
          keyExtractor={item => item._id}
          renderItem={({item}) => <ReviewItem item={item} />}
          scrollEnabled={false}
        />

        {userReviews.length > 2 && !showAllReviews && (
          <TouchableOpacity
            onPress={() => setShowAllReviews(true)}
            style={{
              marginHorizontal: wp(20),
              height: hp(48),
              borderColor: '#D9CFFF',
              borderWidth: 1,
              borderRadius: wp(12),
              marginTop: hp(20),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: fontSize(14),
                fontFamily: fontFamily.poppins500,
                lineHeight: hp(24),
                // color: '#8225AF',
                color: '#7147E8',
                textAlign: 'center',
                // marginTop: hp(14),
              }}>
              Load all reviews
            </Text>
          </TouchableOpacity>
        )}

        <View style={{height: hp(30)}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductFullDetailsScreen;
