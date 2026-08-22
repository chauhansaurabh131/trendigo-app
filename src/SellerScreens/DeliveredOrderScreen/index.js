import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fontFamily, hp, fontSize, wp} from '../../utils/helpers';
import {BackIcon, images, RightArrow} from '../../assets';
import GradientButton from '../../components/gradientButton';
import {useNavigation} from '@react-navigation/native';

const DeliveredOrderScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          width: '100%',
          height: hp(57),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: wp(50),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
          <Text
            style={{
              color: '#000',
              fontFamily: fontFamily.poppins500,
              fontSize: fontSize(18),
            }}>
            Order Details
          </Text>
        </View>

        <View style={{width: wp(50)}} />
      </View>

      <View
        style={{
          width: '100%',
          height: hp(1),
          backgroundColor: '#E2E2E2',
        }}
      />
      <ScrollView contentContainerStyle={{paddingBottom: hp(50)}}>
        <View
          style={{
            // height: hp(183),
            paddingVertical: hp(18),
            borderColor: '#E8E8E8',
            borderWidth: 1,
            marginHorizontal: wp(18),
            borderRadius: wp(14),
            marginTop: hp(17),
          }}>
          <View style={{marginHorizontal: wp(17), marginTop: hp(0)}}>
            <Text
              style={{
                color: '#000',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(13),
              }}>
              Order Information
            </Text>
          </View>

          <View
            style={{
              // width: '100%',
              marginHorizontal: wp(17),
              height: hp(1),
              marginTop: hp(15),
              backgroundColor: '#E8E8E8',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: wp(17),
              marginTop: hp(15),
            }}>
            <Text
              style={{
                color: '#9A9A9A',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(13),
              }}>
              Order ID
            </Text>

            <Text
              style={{
                color: '#9A9A9A',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(13),
              }}>
              Payment Status
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: wp(17),
              // marginTop: hp(15),
            }}>
            <Text
              style={{
                color: '#000000',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(13),
              }}>
              TB10254
            </Text>

            <Text
              style={{
                color: '#2B9909',
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(13),
              }}>
              PAID
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: wp(17),
              marginTop: hp(15),
            }}>
            <Text
              style={{
                color: '#9A9A9A',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(13),
              }}>
              Order Date
            </Text>

            <Text
              style={{
                color: '#9A9A9A',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(13),
                flex: 1,
                textAlign: 'right',
              }}>
              Order Status
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: wp(17),
              // marginTop: hp(15),
            }}>
            <Text
              style={{
                color: '#000000',
                flex: 1,
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(13),
              }}>
              24 Jul 2025, 09:38 AM
            </Text>

            <Text
              style={{
                color: '#5029F4',
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(13),
              }}>
              DELIVERED
            </Text>
          </View>
        </View>

        <View
          style={{
            // height: hp(183),
            paddingVertical: hp(18),
            borderColor: '#E8E8E8',
            borderWidth: 1,
            marginHorizontal: wp(18),
            borderRadius: wp(14),
            marginTop: hp(17),
          }}>
          <View style={{marginHorizontal: wp(17), marginTop: hp(0)}}>
            <Text
              style={{
                color: '#000',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(13),
              }}>
              Customer Information
            </Text>
          </View>

          <View
            style={{
              // width: '100%',
              marginHorizontal: wp(17),
              height: hp(1),
              marginTop: hp(15),
              backgroundColor: '#E8E8E8',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: wp(17),
              marginTop: hp(15),
            }}>
            <Text
              style={{
                color: '#9A9A9A',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(13),
              }}>
              Name
            </Text>

            <Text
              style={{
                color: '#9A9A9A',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(13),
              }}>
              Contact
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: wp(17),
              // marginTop: hp(15),
            }}>
            <Text
              style={{
                color: '#000000',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(13),
              }}>
              Rahul Sharma
            </Text>

            <Text
              style={{
                color: '#000000',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(13),
              }}>
              +91 10022 32321
            </Text>
          </View>

          <View
            style={{
              marginHorizontal: wp(17),
              marginTop: hp(18),
            }}>
            <Text
              style={{
                color: '#9A9A9A',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(13),
              }}>
              Address
            </Text>

            <Text
              style={{
                color: '#000',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(13),
                lineHeight: hp(21),
              }}>
              204, Shreeji Heights, Near ISKCON Temple, SG Highway, Ahmedabad,
              Gujarat - 380015
            </Text>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: wp(19),
            borderColor: '#E8E8E8',
            borderWidth: 1,
            paddingLeft: wp(17),
            paddingRight: wp(22),
            paddingVertical: hp(20),
            borderRadius: wp(14),
            marginBottom: hp(10),
            marginTop: hp(17),
          }}>
          <View style={{marginBottom: hp(15)}}>
            <Text
              style={{
                fontSize: fontSize(10),
                fontFamily: fontFamily.poppins500,
                color: '#399A1B',
              }}>
              Delivered : 24 July 2026, 10:30 AM
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // alignItems: 'center',
            }}>
            <Image
              source={images.pink_image}
              style={{
                width: hp(93),
                height: hp(112),
                borderRadius: hp(10),
              }}
            />

            <View
              style={{
                flex: 1,
                marginLeft: wp(18),
              }}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  fontSize: fontSize(15),
                  fontFamily: fontFamily.poppins700,
                  color: '#000000',
                }}>
                Designer Traditional Dress
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: hp(7),
                }}>
                <Text
                  style={{
                    fontSize: fontSize(14),
                    fontFamily: fontFamily.poppins400,
                    color: '#838383',
                  }}>
                  1{' '}
                </Text>
                <Text
                  style={{
                    fontSize: fontSize(14),
                    fontFamily: fontFamily.poppins400,
                    color: '#838383',
                  }}>
                  Qty{' '}
                </Text>

                <Text
                  style={{
                    fontSize: fontSize(14),
                    fontFamily: fontFamily.poppins400,
                    color: '#838383',
                  }}>
                  •{' '}
                </Text>
                <Text
                  style={{
                    fontSize: fontSize(14),
                    fontFamily: fontFamily.poppins400,
                    color: '#838383',
                  }}>
                  Red{' '}
                </Text>

                <Text
                  style={{
                    fontSize: fontSize(14),
                    fontFamily: fontFamily.poppins400,
                    color: '#838383',
                  }}>
                  •{' '}
                </Text>
                <Text
                  style={{
                    fontSize: fontSize(14),
                    fontFamily: fontFamily.poppins400,
                    color: '#838383',
                  }}>
                  S{' '}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: hp(7),
                  flexWrap: 'wrap',
                }}>
                <Text
                  style={{
                    fontSize: fontSize(16),
                    fontFamily: fontFamily.poppins700,
                    color: '#000000',
                  }}>
                  Rs.1200
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            // width: '100%',
            marginHorizontal: wp(18),
            height: hp(1),
            marginTop: hp(21),
            backgroundColor: '#F1F5F9',
          }}
        />

        <View>
          <View
            style={{
              marginHorizontal: wp(34),
              marginTop: hp(24),
            }}>
            <Text
              style={{
                color: '#0F172A',
                fontSize: fontSize(14),
                fontFamily: fontFamily.poppins700,
                letterSpacing: wp(1.4),
                textTransform: 'uppercase',
                lineHeight: fontSize(20),
              }}>
              Billing Details
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: hp(24),
              }}>
              <Text
                style={{
                  color: '#64748B',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins400,
                }}>
                Item Price
              </Text>
              <Text
                style={{
                  color: '#0F172A',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins700,
                }}>
                Rs. 900.00
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: hp(14),
              }}>
              <Text
                style={{
                  color: '#64748B',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins400,
                }}>
                Shipping Charges
              </Text>
              <Text
                style={{
                  color: '#0F172A',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins700,
                }}>
                Rs. 50
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: hp(14),
              }}>
              <Text
                style={{
                  color: '#64748B',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins400,
                }}>
                Including GST (5%)
              </Text>
              <Text
                style={{
                  color: '#000000',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins700,
                }}>
                RS. 15
              </Text>
            </View>
          </View>

          <View
            style={{
              // width: '100%',
              height: hp(1),
              backgroundColor: '#F1F5F9',
              marginTop: hp(24),
              marginHorizontal: wp(34),
            }}
          />

          <View
            style={{
              marginHorizontal: wp(34),
              // marginTop: hp(24),
              flexDirection: 'row',
              // marginBottom: hp(15),
              height: hp(53),
              justifyContent: 'space-between',
              alignItems: 'center',
              // backgroundColor: '#265d94',
            }}>
            <Text
              style={{
                // color: '#9333EA',
                color: '#5029F3',
                fontSize: fontSize(18),
                fontFamily: fontFamily.poppins700,
              }}>
              Order Total
            </Text>
            <Text
              style={{
                // color: '#9333EA',
                color: '#5029F3',
                fontSize: fontSize(18),
                fontFamily: fontFamily.poppins700,
              }}>
              Rs. 780.00
            </Text>
          </View>

          <View
            style={{
              // width: '100%',
              height: hp(1),
              backgroundColor: '#F1F5F9',
              marginHorizontal: wp(34),
            }}
          />
        </View>

        <View
          style={{
            marginHorizontal: wp(34),
            // marginTop: hp(24),
            flexDirection: 'row',
            // marginBottom: hp(15),
            height: hp(53),
            justifyContent: 'space-between',
            alignItems: 'center',
            // backgroundColor: '#265d94',
          }}>
          <Text
            style={{
              // color: '#9333EA',
              color: '#29880C',
              fontSize: fontSize(15),
              fontFamily: fontFamily.poppins700,
            }}>
            Your Earnings
          </Text>
          <Text
            style={{
              // color: '#9333EA',
              color: '#29880C',
              fontSize: fontSize(15),
              fontFamily: fontFamily.poppins700,
            }}>
            Rs. 720.00
          </Text>
        </View>

        <View
          style={{
            // width: '100%',
            height: hp(1),
            backgroundColor: '#F1F5F9',
            marginHorizontal: wp(34),
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default DeliveredOrderScreen;
