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
  images,
  SearchFilterIcon,
  SellerShopIcon,
  ShareBlueIcon,
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
import ProductFullImageComponets from '../../SellerComponents/ProductFullImageComponents';
import SellerReviewRatingComponent from '../../SellerComponents/SellerReviewRatingComponent';
import {getProductDetailsRequest} from '../../redux/actions/sellerProductDetailsActions';
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
  const dispatch = useDispatch();
  // const ratingsRef = useRef(null);
  const scrollRef = useRef(null); // Ref for ScrollView
  const reviewsRef = useRef(null); // Ref for Reviews section

  const scrollToReviews = () => {
    reviewsRef.current?.measureLayout(scrollRef.current, (x, y) => {
      scrollRef.current.scrollTo({y: y, animated: true});
    });
  };
  // const {product} = route.params;

  const [selectedSize, setSelectedSize] = useState('S'); // Default selection
  const [pincode, setPincode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

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

  const product = productDetails?.data;
  console.log('PRODUCT DETAILS IN PRODUCT FULL DETAILS SCREEN =>', product);
  useEffect(() => {
    if (productId) {
      dispatch(getProductDetailsRequest(productId));
    }
  }, [productId]);

  console.log(
    'FIRST VARIANT =>',
    JSON.stringify(product?.variants?.[0], null, 2),
  );
  //get the variants from productDetails
  const variants = product?.variants || [];
  const price = product?.variants?.[0]?.price;
  console.log('PRICE =>', price);
  const discount = product?.variants?.[0]?.discount;
  console.log('DISCOUNT =>', discount);

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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Touchable
            style={{
              width: wp(50),
              height: hp(50),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SearchFilterIcon />
          </Touchable>

          <Touchable
            style={{
              marginLeft: wp(10),
              width: wp(50),
              height: hp(50),
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
            marginHorizontal: wp(17),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <GradientButton
            title="Add to Cart"
            onPress={handleAddToCart}
            buttonStyle={{width: wp(285), height: hp(50)}}
          />

          <View style={{width: hp(50), height: hp(50)}}>
            <Image
              source={images.gradientCircleImage}
              style={{width: '100%', height: '100%'}}
            />

            {/* Touchable Like Icon */}
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
              onPress={() => console.log('Like pressed')}>
              <Image
                source={images.emptyLikeImage}
                style={{width: wp(23), height: hp(20), resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        <View style={{marginTop: hp(10)}}>
          <ProductFullImageComponets />
        </View>

        <View style={{marginHorizontal: wp(17), marginTop: hp(31)}}>
          <Text
            style={{
              color: colors.black,
              fontSize: fontSize(17),
              lineHeight: hp(26),
              fontFamily: fontFamily.poppins700,
            }}>
            {product?.title || 'Product Name'}
          </Text>

          <Text
            style={{
              fontSize: fontSize(12),
              lineHeight: hp(16),
              fontFamily: fontFamily.poppins400,
              color: '#6B6B6B',
              marginTop: hp(2),
            }}>
            {product?.description ||
              'No Description available for this product.'}
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={scrollToReviews}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: wp(30),
              // paddingVertical: hp(4),
              alignSelf: 'flex-start',
              borderColor: '#D2D2D2',
              width: hp(161),
              height: hp(28),
              marginTop: 19,
            }}>
            <Text
              style={{
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins400,
                color: '#5029F4',
                marginLeft: wp(10),
              }}>
              4.2
            </Text>
            {/* <Image
              source={star_icon}
              style={{
                width: hp(15),
                height: hp(15),
                marginLeft: wp(7),
                marginBottom: 2,
              }}
            /> */}
            <CustomStarIcon
              width={hp(15)}
              height={hp(15)}
              fill="#5029F4"
              style={{marginLeft: wp(7), marginBottom: hp(2)}}
            />
            <View
              style={{
                width: 1,
                height: hp(23),
                backgroundColor: '#D2D2D2',
                // marginHorizontal: 8,
                marginLeft: wp(8),
              }}
            />

            <Text
              style={{
                color: colors.pureBlack,
                fontFamily: fontFamily.poppins500,
                marginLeft: wp(14),
                fontSize: fontSize(13),
              }}>
              122 Ratings
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            height: hp(1),
            backgroundColor: '#E7E7E7',
            marginTop: hp(26),
          }}
        />

        <View
          style={{
            marginHorizontal: wp(17),
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
              {price ? `Rs.${price}` : 'N/A'}
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
              {price ? `Rs.${price}` : 'N/A'}
            </Text>

            <Text
              style={{
                marginLeft: hp(16),
                color: '#2B9909',
                fontSize: fontSize(18),
                lineHeight: hp(24),
                fontFamily: fontFamily.poppins600,
              }}>
              {discount ? `${discount}% Off` : 'N/A'}
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
            {sizes.map(size => (
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
                  marginRight: wp(6),
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

        <View style={{marginHorizontal: wp(17), marginTop: hp(22)}}>
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
                borderRadius: wp(50),
                paddingHorizontal: hp(30),
                fontSize: fontSize(14),
                lineHeight: hp(20),
                fontFamily: fontFamily.poppins500,
                color: '#000',
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

        <View style={{marginHorizontal: wp(17), marginTop: hp(23)}}>
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
            Pink, blue & gold toned yoke design Kurta with{'\n'}Trousers with
            dupatta
          </Text>

          <View style={{marginTop: hp(16)}}>
            <View
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
            </View>
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
          </View>

          <TouchableOpacity style={{marginTop: hp(27)}}>
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
        </View>

        <View
          style={{
            width: '100%',
            height: hp(1),
            backgroundColor: '#E7E7E7',
            marginTop: hp(27),
          }}
        />

        <View
          style={{
            marginHorizontal: wp(17),
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
                width: hp(34),
                height: hp(34),
                borderRadius: wp(50),
                backgroundColor: '#F8E9FF',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SellerShopIcon />
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

                <TouchableOpacity style={{marginLeft: wp(6)}}>
                  <ShareBlueIcon />
                </TouchableOpacity>
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
              <TouchableOpacity
                style={{
                  width: wp(129),
                  height: hp(40),
                  borderWidth: 1,
                  borderColor: '#CDCDCD',
                  borderRadius: wp(25),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: hp(13),
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: fontSize(12),
                    lineHeight: hp(16),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  Term & Policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            borderWidth: 4,
            borderColor: '#F7F7F7',
            marginTop: hp(24),
          }}
        />

        <View
          ref={reviewsRef}
          style={{marginHorizontal: wp(17), marginTop: hp(46)}}>
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
                4.2
              </Text>
            }>
            <LinearGradient
              colors={['#5029F4', '#7251FF']}
              start={{x: 0, y: 0.05}}
              end={{x: 0.3, y: 0.6}}
              style={{
                width: wp(200), // Required
                height: hp(100), // Required
              }}>
              <Text
                style={{
                  fontSize: fontSize(54),
                  fontFamily: fontFamily.poppins700,
                  opacity: 0,
                }}>
                4.2
              </Text>
            </LinearGradient>
          </MaskedView>

          <View style={{top: hp(-20)}}>
            <SellerReviewRatingComponent />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: hp(1),
            backgroundColor: '#E7E7E7',
            marginTop: hp(20),
          }}
        />

        <View style={{marginHorizontal: wp(17), marginTop: hp(24)}}>
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
                  top: hp(1),
                }}>
                21 May 2024
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomStarIcon
                width={hp(15)}
                height={hp(14)}
                fill="#5029F4"
                style={{marginRight: wp(10)}}
              />
              <Text
                style={{
                  fontSize: fontSize(14),
                  lineHeight: hp(24),
                  fontFamily: fontFamily.poppins700,
                  color: '#5029F4',
                  top: hp(2),
                }}>
                4.2
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: hp(1),
            backgroundColor: '#E7E7E7',
            marginTop: hp(26),
          }}
        />

        <Touchable>
          <Text
            style={{
              fontSize: fontSize(16),
              fontFamily: fontFamily.poppins700,
              lineHeight: hp(24),
              color: '#5029F4',
              textAlign: 'center',
              marginTop: hp(14),
            }}>
            Load all reviews
          </Text>
        </Touchable>

        <View style={{height: hp(85)}} />

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

              <Image
                source={images.shopClothImage}
                style={{
                  width: hp(64),
                  height: hp(64),
                  marginTop: hp(31),
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  fontSize: fontSize(16),
                  fontFamily: fontFamily.poppins700,
                  marginTop: hp(22),
                  color: colors.pureBlack,
                  textAlign: 'center',
                }}>
                Galaxy Fashion Hub
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
                  Assured Product quality at great value and Great{'\n'}shopping
                  experience and best class services with Ruhi{'\n'}Dress
                  Materials
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

export default ProductFullDetailsScreen;
