import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import ProductImageComponent from '../../components/productImageComponent';
import {colors} from '../../utils/colors';
import {fontFamily, fontSize, hp, Touchable, wp} from '../../utils/helpers';
import {
  BackIcon,
  BagIcon,
  CancelIcon,
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
          <GradientButton
            title={'Add to Cart'}
            buttonStyle={{width: wp(285), height: hp(50)}}
          />

          <View style={{width: hp(50), height: hp(50)}}>
            {/* Background circular image */}
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 10}}>
          <ProductImageComponent />
        </View>

        <View style={{marginHorizontal: 17, marginTop: hp(31)}}>
          <Text
            style={{
              color: colors.black,
              fontSize: fontSize(17),
              lineHeight: hp(26),
              fontFamily: fontFamily.poppins700,
            }}>
            Designer Traditional Dress
          </Text>

          <Text
            style={{
              fontSize: fontSize(12),
              lineHeight: hp(16),
              fontFamily: fontFamily.poppins400,
              color: '#6B6B6B',
              marginTop: hp(2),
            }}>
            Women Floral Printed Fit & Flare Midi Class
          </Text>

          <View
            style={{
              marginTop: hp(19),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: hp(64),
                height: hp(28),
                borderRadius: 25,
                backgroundColor: '#8225AF',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
                gap: 5, // optional for spacing between text and icon
              }}>
              <Text style={{color: 'white'}}>6.2</Text>
              <StarIcon width={hp(13)} height={hp(13)} />
            </View>
            <Text
              style={{
                color: colors.pureBlack,
                fontSize: fontSize(13),
                lineHeight: hp(23),
                fontFamily: fontFamily.poppins700,
                marginLeft: hp(16),
              }}>
              122 Ratings
            </Text>
          </View>
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
              Rs.780
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
              Rs.3443
            </Text>

            <Text
              style={{
                marginLeft: hp(16),
                color: '#2B9909',
                fontSize: fontSize(18),
                lineHeight: hp(24),
                fontFamily: fontFamily.poppins600,
              }}>
              34% Off
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
                18407738
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
                  Galaxy Fashion Hub
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

        <View style={{marginHorizontal: 17, marginTop: hp(24)}}>
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
                4.2
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
            <ReviewRatingComponent />
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

        <View style={{marginHorizontal: 17, marginTop: hp(24)}}>
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
          </View>
        </View>

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

export default ProductDetailsScreen;
