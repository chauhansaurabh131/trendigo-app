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
import {
  fontFamily,
  fontSize,
  hp,
  isIOS,
  Touchable,
  wp,
} from '../../../utils/helpers';
import {
  BlueBagIcon,
  EmptyBag,
  images,
  NavigationArrowIcon,
  PackingProgress,
  TrackIcon,
  UserIcon,
} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import GradientButton from '../../../components/gradientButton';

const ProcessingScreen = () => {
  const navigation = useNavigation();

  const shippingMessages = [
    'Free Express Shipping',
    'Dispatch in ~18 hours',
    'Ships Within 24 Hours',
    'Fast Delivery Available',
    'Priority Shipping',
    'Express Dispatch',
    'Free Delivery',
    'Estimated Dispatch Today',
    'Same Day Dispatch',
    'Quick Shipping Available',
  ];
  const orderData = [
    {
      id: '1',
      image: images.trending_one,
      title: 'Designer Traditional Dress',
      size: 'S',
      color: 'Sky Blue',
      qty: 1,
      deliveryDate: 'Monday , 19 Dec. 2024',
      shippingText: 'Free Express Shipping',
    },
    {
      id: '2',
      image: images.trending_two,
      title: 'Designer Traditional Dress',
      size: 'XXL',
      color: 'Purple',
      qty: 1,
      deliveryDate: 'Tuesday , 20 Dec. 2024',
      shippingText: 'Dispatch in ~18 hours',
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
          paddingHorizontal: wp(13),
          marginBottom: hp(20),
          paddingVertical: hp(20),
        }}>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'flex-start',
            justifyContent: 'space-between',
            // marginTop: hp(17),
          }}>
          {/* Delivery Text */}

          <PackingProgress />

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
            width: '97%',
            height: hp(1),
            marginTop: hp(12),
            marginBottom: hp(16),
            backgroundColor: '#F1F5F9',
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            //  backgroundColor: 'pink'
          }}>
          <Image
            source={item.image}
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
                  marginTop: hp(4),
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
                justifyContent: 'space-between',
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
            // width: '100%',
            height: hp(1),
            marginTop: hp(19),
            backgroundColor: '#F1F5F9E5',
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: hp(16),
          }}>
          <Text
            style={{
              // textAlign: 'center',
              color: '#64748B',
              fontSize: fontSize(11),
              fontFamily: fontFamily.poppins500,
            }}>
            Expected Delivery:
          </Text>

          <Text
            style={{
              // textAlign: 'center',
              color: '#4C0FC4',
              fontSize: fontSize(10),
              fontFamily: fontFamily.poppins700,
            }}>
            Mon, 19 Dec 2024
          </Text>
        </View>

        <View style={{marginTop: hp(18)}}>
          <GradientButton
            icon={<TrackIcon />}
            title={'Track Order'}
            textStyle={{
              fontSize: fontSize(12),
              fontFamily: fontFamily.poppins700,
            }}
            buttonStyle={{height: hp(40)}}
            onPress={() => navigation.navigate('OrderDetails')}
          />
        </View>

        <View
          style={{
            // width: '100%',
            height: hp(1),
            marginTop: hp(16),
            backgroundColor: '#F1F5F9E5',
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp(14),
          }}>
          <Text
            style={{
              // width: 40,
              color:
                item.shippingText === 'Free Express Shipping'
                  ? '#059669'
                  : '#5B13EC',
              fontSize: fontSize(11),
              fontFamily: fontFamily.poppins500,
            }}>
            {item.shippingText}
          </Text>

          <Text
            style={{
              color: '#5B13EC',
              fontSize: fontSize(11),
              fontFamily: fontFamily.poppins700,
            }}>
            Download Receipt
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <View style={{marginHorizontal: 18, flex: 1}}>
        <FlatList
          data={orderData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
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

export default ProcessingScreen;
