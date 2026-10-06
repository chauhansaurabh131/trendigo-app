import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../utils/colors';
import {fontFamily, fontSize, hp, isIOS, wp} from '../../../utils/helpers';
import {
  BlueBagIcon,
  BuyButton,
  CancelView,
  EmptyBag,
  images,
  NavigationArrowIcon,
  ReasonIcon,
  RefundIcon,
  ReturnButton,
} from '../../../assets';
import GradientButton from '../../../components/gradientButton';
import {useNavigation} from '@react-navigation/native';

const CancelledScreen = () => {
  const navigation = useNavigation();
  const product = [
    {
      _id: '1',
      title: 'Men graphic Black T-shirt',
      image: images.trending_one,
      size: 'M',
      color: 'Black',
      qty: 1,
    },
    {
      _id: '2',
      title: 'Men graphic Black T-shirt',
      image: images.trending_two,
      size: '32',
      color: 'Blue',
      qty: 2,
    },
  ];
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: '#E8E8E8',
          borderRadius: wp(14),
          marginBottom: hp(19),
          // height: hp(192),
        }}>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'flex-start',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: hp(12),
            marginHorizontal: wp(16),
          }}>
          <CancelView />
          <Text
            style={{
              color: '#64748B',
              fontSize: fontSize(12),
              fontFamily: fontFamily.poppins400,
            }}>
            {' '}
            {item.deliveryDate}{' '}
          </Text>

          <Text
            style={{
              // width: 40,
              color: '#94A3B8',
              fontSize: fontSize(11),
              fontFamily: fontFamily.poppins500,
            }}>
            #ORD-98248
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            height: hp(1),
            marginTop: hp(13),
            backgroundColor: '#F1F5F9',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: hp(16),
            marginHorizontal: wp(16),
          }}>
          <Image
            source={item.image}
            // source={product.image}
            style={{width: hp(80), height: hp(96)}}
            borderRadius={12}
          />

          <View style={{marginLeft: wp(14)}}>
            <Text
              style={{
                fontSize: fontSize(14),
                fontFamily: fontFamily.poppins700,
                color: '#0F172A',
              }}>
              {item.title}
            </Text>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: wp(8),
                  alignItems: 'center',
                  marginTop: isIOS ? hp(15) : hp(7),
                }}>
                <Text
                  style={{
                    fontSize: fontSize(14),
                    fontFamily: fontFamily.poppins700,
                    color: '#0F172A',
                  }}>
                  $64.00
                </Text>

                <Text
                  style={{
                    fontSize: fontSize(12),
                    fontFamily: fontFamily.poppins400,
                    color: '#94A3B8',
                  }}>
                  $64.00
                </Text>

                <Text
                  style={{
                    fontSize: fontSize(11),
                    fontFamily: fontFamily.poppins700,
                    color: '#059669',
                  }}>
                  28% OFF
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                gap: wp(5),
                marginTop: isIOS ? hp(15) : hp(7),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: hp(55),
                  height: hp(23),
                  backgroundColor: '#F1F5F9',
                  borderRadius: wp(6),
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    // width: 40,
                    color: '#334155',
                    fontSize: fontSize(11),
                    fontFamily: fontFamily.poppins500,
                  }}>
                  Size
                </Text>
                <Text
                  style={{
                    color: '#0F172A',
                    fontSize: fontSize(11),
                    fontFamily: fontFamily.poppins600,
                  }}>
                  {' '}
                  :{' '}
                </Text>

                <Text
                  style={{
                    color: '#0F172A',
                    fontSize: fontSize(11),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  {' '}
                  {item.size}{' '}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: hp(76),
                  height: hp(23),
                  backgroundColor: '#F0F9FF',
                  borderRadius: wp(6),
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: hp(8),
                    height: hp(8),
                    borderRadius: wp(8),
                    backgroundColor: '#38BDF8',
                  }}
                />
                <Text
                  style={{
                    color: '#075985',
                    lineHeight: hp(18),
                    fontSize: fontSize(11),
                    fontFamily: fontFamily.poppins500,
                    marginLeft: wp(4),
                  }}>
                  {' '}
                  {item.color}{' '}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: hp(47),
                  height: hp(23),
                  backgroundColor: '#F1F5F9',
                  borderRadius: wp(6),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    // width: 40,
                    color: '#64748B',
                    fontSize: fontSize(12),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  Qty
                </Text>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(12),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins600,
                  }}>
                  {' '}
                  :{' '}
                </Text>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(12),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins600,
                  }}>
                  {' '}
                  {item.qty}{' '}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: wp(16),
            // height: hp(87),
            paddingVertical: hp(16),
            backgroundColor: '#F8FAFC',
            borderWidth: 1,
            borderColor: '#F1F5F9',
            marginTop: hp(12),
            borderRadius: wp(12),
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: wp(12),
                // marginTop: hp(16),
              }}>
              <ReasonIcon />
              <Text
                style={{
                  color: colors.pureBlack,
                  fontSize: fontSize(12),
                  fontFamily: fontFamily.poppins600,
                  marginLeft: wp(6),
                }}>
                Reason:{' '}
              </Text>
              <Text
                style={{
                  color: colors.pureBlack,
                  fontSize: fontSize(12),
                  fontFamily: fontFamily.poppins600,
                }}>
                {' '}
                Duplicate order placed
              </Text>
            </View>

            <View
              style={{
                height: hp(1),
                marginTop: hp(10),
                backgroundColor: '#E2E8F099',
                marginHorizontal: wp(16),
                borderStyle: 'dashed',
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: wp(12),
                marginTop: hp(11),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RefundIcon />
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(12),
                    fontFamily: fontFamily.poppins600,
                    marginLeft: wp(6),
                  }}>
                  Refund to Visa •••• 4029
                </Text>
              </View>

              <View
                style={{
                  width: wp(115),
                  height: hp(22),
                  borderColor: '#D1FAE5',
                  backgroundColor: '#ECFDF5',
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: wp(4),
                }}>
                <Text
                  style={{
                    color: '#059669',
                    fontSize: fontSize(12),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  $64.00 Refunded
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: wp(16),
            justifyContent: 'space-evenly',
            marginTop: hp(15),
          }}>
          <TouchableOpacity>
            <ReturnButton />
          </TouchableOpacity>

          <TouchableOpacity>
            <BuyButton />
          </TouchableOpacity>
        </View>

        <View
          style={{
            // width: '100%',
            height: hp(1),
            marginTop: hp(16),
            backgroundColor: '#F1F5F9E5',
            marginHorizontal: wp(16),
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp(14),
            marginBottom: hp(16),
            marginHorizontal: wp(16),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: hp(6),
                height: hp(6),
                borderRadius: wp(8),
                backgroundColor: '#94A3B8',
                marginRight: wp(7),
              }}
            />
            <Text
              style={{
                // width: 40,
                color: '#94A3B8',
                fontSize: fontSize(11),
                fontFamily: fontFamily.poppins500,
              }}>
              Cancellation Completed
            </Text>
          </View>
          <Text
            style={{
              color: '#5B13EC',
              fontSize: fontSize(11),
              fontFamily: fontFamily.poppins700,
            }}>
            Need Help?
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{marginHorizontal: wp(18), flex: 1}}>
        <FlatList
          renderItem={renderItem}
          keyExtractor={item => item._id}
          data={product}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <BlueBagIcon />
              <Text
                style={{
                  fontSize: fontSize(16),
                  fontFamily: fontFamily.poppins400,
                  color: colors.pureBlack,
                  marginTop: hp(20),
                }}>
                No Order Found
              </Text>
              <GradientButton
                title="Explore Collection"
                onPress={() => navigation.navigate('StartingScreen')}
                buttonStyle={{
                  marginTop: hp(15),
                  width: wp(225),
                }}
                textStyle={{fontFamily: fontFamily.poppins500}}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default CancelledScreen;
