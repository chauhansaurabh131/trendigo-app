import React, {useRef} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../utils/colors';
import {
  fontFamily,
  fontSize,
  hp,
  isIOS,
  Touchable,
  wp,
} from '../../utils/helpers';
import {BackIcon, images, NavigationArrowIcon} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import GradientButton from '../../components/gradientButton';
import CheckBoxComponent from '../../components/checkBoxComponent';

const BagScreen = () => {
  const navigation = useNavigation();

  const sheetRef1 = useRef(); // First bottom sheet
  const sheetRef2 = useRef(); // Second bottom sheet

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {/* Header */}
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
            My Bag
          </Text>
        </View>
      </View>

      <View style={{width: '100%', borderWidth: 1, borderColor: '#F2F2F2'}} />

      <Touchable
        style={{backgroundColor: '#FDFAFF'}}
        activeOpacity={0.5}
        onPress={() => sheetRef1.current?.open()}>
        <View style={{marginHorizontal: 14, marginTop: hp(15)}}>
          <Text
            style={{
              color: '#8225AF',
              fontSize: fontSize(10),
              lineHeight: hp(14),
              fontFamily: fontFamily.poppins400,
            }}>
            Delivery Address
          </Text>
          <View style={{marginTop: hp(9), flexDirection: 'row'}}>
            <Text
              style={{
                color: colors.pureBlack,
                fontSize: fontSize(13),
                lineHeight: hp(18),
                fontFamily: fontFamily.poppins700,
              }}>
              Rahul Gajjar{' '}
            </Text>

            <View
              style={{
                width: 2,
                height: 17,
                backgroundColor: '#E6E6E6',
                marginLeft: wp(10),
                marginRight: hp(10),
              }}
            />
            <Text
              style={{
                color: colors.pureBlack,
                fontSize: fontSize(13),
                lineHeight: hp(18),
                fontFamily: fontFamily.poppins700,
              }}>
              +91 10002 00003
            </Text>
          </View>

          <Text
            style={{
              color: colors.pureBlack,
              fontSize: fontSize(11),
              lineHeight: hp(18),
              fontFamily: fontFamily.poppins400,
              marginTop: 5,
              marginBottom: hp(20),
            }}>
            25/3 Housing Estate, Near by sector 17, Singapore 31134
          </Text>
        </View>

        <View
          style={{
            position: 'absolute',
            right: 25,
            top: 50,
          }}>
          <NavigationArrowIcon stroke="#8225AF" />
        </View>
      </Touchable>

      <View style={{marginHorizontal: 14, marginTop: hp(18)}}>
        <Text
          style={{
            color: colors.pureBlack,
            fontSize: fontSize(14),
            fontFamily: fontFamily.poppins400,
          }}>
          Selected Items
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginTop: hp(21),
          }}>
          <View style={{width: '25%'}}>
            <Image
              source={images.trending_one}
              style={{
                width: isIOS ? 75 : wp(75),
                height: isIOS ? 95 : hp(97),
                borderRadius: 8,
              }}
            />
          </View>

          <View style={{width: '75%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.pureBlack,
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins700,
                }}>
                Aswani
              </Text>
              <View
                style={{
                  height: 18,
                  backgroundColor: '#F5F5F5',
                  paddingHorizontal: 15,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: fontSize(10), color: colors.pureBlack}}>
                  Expected Delivery 10th June
                </Text>
              </View>
            </View>

            <Text
              style={{
                marginTop: hp(4),
                color: '#8A8A8A',
                fontSize: fontSize(10),
                fontFamily: fontFamily.poppins400,
              }}>
              Bandhani Printed Regular Mirror Work Kurta with Trousers & Dupatta
            </Text>

            <View
              style={{
                marginTop: hp(10),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: 40,
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins700,
                    }}>
                    Size
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    {' '}
                    :
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                      marginLeft: 5,
                    }}>
                    {' '}
                    S
                  </Text>
                </View>
                <View style={{flexDirection: 'row', top: isIOS ? -2 : -3}}>
                  <Text
                    style={{
                      width: 40,
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins700,
                    }}>
                    Color
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    {' '}
                    :
                  </Text>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                      marginLeft: 5,
                    }}>
                    {' '}
                    Sky Blue
                  </Text>
                </View>
              </View>

              <Touchable
                style={{
                  width: hp(24),
                  height: hp(24),
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: '#D3D3D3',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={images.edit_icon}
                  style={{width: hp(9), height: hp(9), resizeMode: 'contain'}}
                />
              </Touchable>

              <View
                style={{
                  width: hp(86),
                  height: hp(24),
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: '#D3D3D3',
                  // alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Touchable
                    style={{
                      // backgroundColor: 'red',
                      width: 30,
                      height: 24,
                      alignItems: 'center',
                      marginLeft: 5,
                    }}
                    onPress={() => {
                      console.log(' === - ===> ');
                    }}>
                    <Text
                      style={{
                        top: 2,
                        color: colors.pureBlack,
                        fontSize: fontSize(14),
                        fontFamily: fontFamily.poppins500,
                      }}>
                      −
                    </Text>
                  </Touchable>

                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins700,
                      top: 1,
                    }}>
                    01
                  </Text>

                  <Touchable
                    style={{
                      width: 30,
                      height: 24,
                      alignItems: 'center',
                      marginRight: 5,
                    }}
                    onPress={() => {
                      console.log(' === + ===> ');
                    }}>
                    <Text
                      style={{
                        top: 2,
                        color: colors.pureBlack,
                        fontSize: fontSize(14),
                        fontFamily: fontFamily.poppins500,
                      }}>
                      +
                    </Text>
                  </Touchable>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: hp(15),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: wp(60),
              height: hp(16),
              borderRadius: 25,
              backgroundColor: '#D1FFDC',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 'auto', // pushes this pill to the right
              marginRight: 8,
            }}>
            <Text
              style={{
                color: '#2B9909',
                fontSize: fontSize(8),
                fontFamily: fontFamily.poppins700,
                top: 1,
              }}>
              Rs. 500 Off
            </Text>
          </View>

          <Text
            style={{
              color: colors.pureBlack,
              textDecorationLine: 'line-through',
              marginRight: 8,
              fontSize: fontSize(11),
              fontFamily: fontFamily.poppins400,
            }}>
            Rs. 1280
          </Text>

          <Text
            style={{
              color: colors.pureBlack,
              fontSize: fontSize(14),
              fontFamily: fontFamily.poppins700,
            }}>
            Rs. 780
          </Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          backgroundColor: '#E6E6E6',
          height: 1,
          marginTop: hp(22),
        }}
      />

      <View style={{backgroundColor: '#FDFAFF'}}>
        <View style={{marginHorizontal: 19, marginTop: hp(16)}}>
          <Text
            style={{
              color: colors.pureBlack,
              fontSize: fontSize(12),
              fontFamily: fontFamily.poppins700,
            }}>
            Billing Details
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(16),
            }}>
            <Text
              style={{
                color: colors.pureBlack,
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins400,
              }}>
              Item Price
            </Text>
            <Text
              style={{
                color: colors.pureBlack,
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins700,
              }}>
              Rs. 900.00
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(5),
            }}>
            <Text
              style={{
                color: colors.pureBlack,
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins400,
              }}>
              Discount on MRP
            </Text>
            <Text
              style={{
                color: colors.pureBlack,
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins700,
              }}>
              Rs. 120.00
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(5),
            }}>
            <Text
              style={{
                color: colors.pureBlack,
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins400,
              }}>
              Coupon Discount
            </Text>
            <Text
              style={{
                color: colors.pureBlack,
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins700,
              }}>
              Apply
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(5),
            }}>
            <Text
              style={{
                color: colors.pureBlack,
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins400,
              }}>
              Shipping Charges
            </Text>
            <Text
              style={{
                color: '#13C962',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins700,
              }}>
              FREE
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#E7E7E7',
            marginTop: hp(13),
          }}
        />

        <View
          style={{
            marginHorizontal: 19,
            marginTop: hp(15),
            flexDirection: 'row',
            marginBottom: hp(15),
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#8225AF',
              fontSize: fontSize(13),
              fontFamily: fontFamily.poppins700,
            }}>
            Total Payable
          </Text>
          <Text
            style={{
              color: '#8225AF',
              fontSize: fontSize(13),
              fontFamily: fontFamily.poppins700,
            }}>
            Rs. 780.00
          </Text>
        </View>
      </View>

      <RBSheet
        ref={sheetRef1}
        height={hp(350)}
        openDuration={250}
        closeOnDragDown
        closeOnPressMask
        customStyles={{
          wrapper: {backgroundColor: 'rgba(0,0,0,0.35)'},
          draggableIcon: {backgroundColor: '#C4C4C4'},
          container: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }}>
        <View style={{flex: 1, backgroundColor: colors.white}}>
          <Text
            style={{
              color: colors.pureBlack,
              textAlign: 'center',
              marginTop: hp(25),
              marginBottom: hp(25),
              fontSize: fontSize(14),
              lineHeight: hp(18),
              fontFamily: fontFamily.poppins400,
            }}>
            Select or Add Delivery Address
          </Text>

          <View
            style={{width: '100%', height: 1, backgroundColor: '#E3E3E3'}}
          />

          <Touchable
            style={{backgroundColor: '#FDFAFF'}}
            activeOpacity={0.5}
            onPress={() => {
              sheetRef1.current?.close();
            }}>
            <View style={{marginHorizontal: 19, marginTop: hp(15)}}>
              <Text
                style={{
                  color: '#8225AF',
                  fontSize: fontSize(10),
                  lineHeight: hp(14),
                  fontFamily: fontFamily.poppins400,
                }}>
                Delivery Address
              </Text>

              <View style={{marginTop: hp(9), flexDirection: 'row'}}>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(13),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  Rahul Gajjar{' '}
                </Text>
                <View
                  style={{
                    width: 2,
                    height: 17,
                    backgroundColor: '#E6E6E6',
                    marginLeft: wp(10),
                    marginRight: hp(10),
                  }}
                />
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(13),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  +91 10002 00003
                </Text>
              </View>

              <Text
                style={{
                  color: colors.pureBlack,
                  fontSize: fontSize(11),
                  lineHeight: hp(18),
                  fontFamily: fontFamily.poppins400,
                  marginTop: 5,
                  marginBottom: hp(20),
                }}>
                25/3 Housing Estate, Near by sector 17, Singapore 31134
              </Text>
            </View>

            <View style={{position: 'absolute', right: 25, top: 50}}>
              <NavigationArrowIcon stroke="#8225AF" />
            </View>
          </Touchable>
        </View>

        {/* Button to add address */}
        <View style={{marginHorizontal: 18, bottom: 10}}>
          <GradientButton
            title={'Add New Address'}
            onPress={() => {
              sheetRef1.current?.close(); // Close first sheet
              setTimeout(() => {
                sheetRef2.current?.open(); // Open second sheet after a short delay
              }, 300);
            }}
          />
        </View>
      </RBSheet>

      {/* Second Bottom Sheet - Add New Address */}
      <RBSheet
        ref={sheetRef2}
        height={hp(570)}
        openDuration={250}
        closeOnDragDown
        closeOnPressMask
        customStyles={{
          wrapper: {backgroundColor: 'rgba(0,0,0,0.35)'},
          draggableIcon: {backgroundColor: '#C4C4C4'},
          container: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }}>
        <View style={{flex: 1, backgroundColor: colors.white}}>
          <Text
            style={{
              color: colors.pureBlack,
              textAlign: 'center',
              marginTop: hp(25),
              marginBottom: hp(25),
              fontSize: fontSize(14),
              lineHeight: hp(18),
              fontFamily: fontFamily.poppins400,
            }}>
            Add New Address
          </Text>

          <View
            style={{width: '100%', height: 1, backgroundColor: '#E3E3E3'}}
          />

          <View style={{marginHorizontal: 18, marginTop: hp(19)}}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#999"
              style={{
                borderWidth: 1,
                borderColor: '#EAEAEA',
                borderRadius: 8,
                paddingHorizontal: 12,
                height: hp(45),
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins400,
                color: colors.pureBlack,
              }}
            />

            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor="#999"
              keyboardType={'number-pad'}
              maxLength={10}
              style={{
                borderWidth: 1,
                borderColor: '#EAEAEA',
                borderRadius: 8,
                paddingHorizontal: 12,
                height: hp(45),
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins400,
                color: colors.pureBlack,
                marginTop: hp(13),
              }}
            />

            <View
              style={{
                marginTop: hp(23),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={images.address_icon}
                style={{
                  tintColor: '#B0B0B0',
                  width: hp(11),
                  height: hp(14),
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  marginLeft: wp(12),
                  fontSize: fontSize(12),
                  lineHeight: hp(18),
                  fontFamily: fontFamily.poppins400,
                  color: colors.pureBlack,
                }}>
                Delivery Address
              </Text>
            </View>

            <TextInput
              placeholder="Pincode"
              placeholderTextColor="#999"
              keyboardType={'number-pad'}
              maxLength={6}
              style={{
                borderWidth: 1,
                borderColor: '#EAEAEA',
                borderRadius: 8,
                paddingHorizontal: 12,
                height: hp(45),
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins400,
                color: colors.pureBlack,
                marginTop: hp(21),
              }}
            />

            <TextInput
              placeholder="Address (House No, Building, Street, Area)"
              placeholderTextColor="#999"
              style={{
                borderWidth: 1,
                borderColor: '#EAEAEA',
                borderRadius: 8,
                paddingHorizontal: 12,
                height: hp(45),
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins400,
                color: colors.pureBlack,
                marginTop: hp(15),
              }}
            />

            <TextInput
              placeholder="Locality/Town"
              placeholderTextColor="#999"
              style={{
                borderWidth: 1,
                borderColor: '#EAEAEA',
                borderRadius: 8,
                paddingHorizontal: 12,
                height: hp(45),
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins400,
                color: colors.pureBlack,
                marginTop: hp(15),
              }}
            />

            <View style={{marginTop: hp(24)}}>
              <CheckBoxComponent />
            </View>

            {/* Your Add Address form goes here */}

            <GradientButton
              title={'Save Address'}
              onPress={() => {
                sheetRef2.current?.close();
              }}
              buttonStyle={{marginTop: 20}}
            />
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default BagScreen;
