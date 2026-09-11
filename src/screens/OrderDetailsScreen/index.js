// export default OrderDetailsScreen;
import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import {fontFamily, fontSize, wp, hp} from '../../utils/helpers';
import {
  BlueBagIcon,
  DeliverIcon,
  EmptyBag,
  images,
  ReceiptIcon,
  TrackIcon,
} from '../../assets';
import arrow_back from '../../assets/images/arrow_back.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import delivery_icon from '../../assets/images/delivery_order.png';
import image_icon from '../../assets/images/imageProduct.png';
import GradientButton from '../../components/gradientButton';

import {useNavigation} from '@react-navigation/native';
import {colors} from '../../utils/colors';
const OrderDetailsScreen = () => {
  const navigation = useNavigation();

  const orderDetails = [
    // {
    //   id: '1',
    //   deliveryDate: 'Monday, 19 Dec. 2024',
    //   image: image_icon,
    //   title: 'Designer Traditional Dress',
    //   size: 'S',
    //   color: 'Sky Blue',
    //   qty: '01',
    //   totalPaid: 'Rs. 180.00',
    //   paidBy: 'Mastercard (**** 4242)',
    //   paidDate: '02-02-2025, 10:30:10',
    //   orderId: 'BGS08975201',
    // },
    // {
    //   id: '2',
    //   deliveryDate: 'Tuesday, 20 Dec. 2024',
    //   image: image_icon,
    //   title: 'Men Graphic Black T-Shirt',
    //   size: 'M',
    //   color: 'Black',
    //   qty: '02',
    //   totalPaid: 'Rs. 250.00',
    //   paidBy: 'UPI',
    //   paidDate: '03-02-2025, 12:20:10',
    //   orderId: 'BGS08975202',
    // },
  ];
  const renderItem = ({item}) => {
    return (
      <>
        <View
          style={{
            backgroundColor: '#FAF5FF',
            // width: '100%',
            height: hp(70),
            borderWidth: 1,
            borderColor: '#F3E8FF',
            borderRadius: 20,
            marginTop: hp(20),
            marginHorizontal: wp(19),
          }}>
          <View
            style={{
              marginTop: hp(18),
              marginHorizontal: wp(16),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <DeliverIcon />
            <View style={{marginLeft: wp(16)}}>
              <Text
                style={{
                  fontSize: fontSize(12),
                  fontFamily: fontFamily.poppins500,
                  color: '#9333EA',
                  lineHeight: hp(18),
                }}>
                Expected Delivery
              </Text>
              <Text
                style={{
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins600,
                  color: '#000',
                  lineHeight: hp(16),
                }}>
                {item.deliveryDate}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: hp(16),
          }}>
          <Image
            source={item.image}
            style={{width: wp(199), height: hp(240)}}
            resizeMode="contain"
          />
          <View style={{marginTop: hp(20)}}>
            <Text
              style={{
                color: '#000',
                fontSize: fontSize(20),
                fontFamily: fontFamily.poppins700,
              }}>
              {item.title}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: wp(18),
            // widthz: '100%',
            height: hp(342),
            backgroundColor: '#F9FAFB',
            borderWidth: 1,
            borderColor: '#F3F4F6',
            borderRadius: 16,
            marginTop: hp(20),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(20),
              marginHorizontal: wp(20),
            }}>
            <Text
              style={{
                color: '#64748B',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(16),
              }}>
              Size
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(16),
              }}>
              {item.size}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(16),
              marginHorizontal: wp(20),
            }}>
            <Text
              style={{
                color: '#64748B',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(16),
              }}>
              Color
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(16),
              }}>
              {item.color}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(16),
              marginHorizontal: wp(20),
            }}>
            <Text
              style={{
                color: '#64748B',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(16),
              }}>
              Qty
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(16),
              }}>
              {item.qty}
            </Text>
          </View>
          <View
            style={{
              borderColor: '#F3F4F6',
              borderWidth: 1,
              width: '100%',
              // marginHorizontal: wp(18),
              marginTop: hp(20),
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(16),
              marginHorizontal: wp(20),
            }}>
            <Text
              style={{
                color: '#64748B',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(16),
              }}>
              Total Paid
            </Text>
            <Text
              style={{
                color: '#7C3AED',
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(18),
              }}>
              {item.totalPaid}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(16),
              marginHorizontal: wp(20),
            }}>
            <Text
              style={{
                color: '#64748B',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(16),
              }}>
              Paid By
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(14),
              }}>
              {item.paidBy}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(16),
              marginHorizontal: wp(20),
            }}>
            <Text
              style={{
                color: '#64748B',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(16),
              }}>
              Paid Date
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(14),
              }}>
              {item.paidDate}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(16),
              marginHorizontal: wp(20),
            }}>
            <Text
              style={{
                color: '#64748B',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(16),
              }}>
              {item.orderId}
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(14),
              }}>
              BGS08975201
            </Text>
          </View>
        </View>

        <View style={{marginHorizontal: wp(18), marginTop: hp(40)}}>
          <GradientButton
            icon={<TrackIcon />}
            title={'Track Order'}
            buttonStyle={{height: hp(56)}}
            onPress={() => navigation.navigate('TrackOrder')}
          />
        </View>
        <View
          style={{
            height: hp(58),
            backgroundColor: '#F5F5F5',
            borderRadius: 30,
            marginHorizontal: wp(18),
            marginTop: hp(12), // spacing between buttons
            alignItems: 'center',
            marginBottom: hp(40),
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <ReceiptIcon style={{marginRight: wp(8)}} />
            <Text
              style={{
                color: '#334155',
                fontFamily: fontFamily.poppins600,
                fontSize: fontSize(16),
              }}>
              Download Receipt
            </Text>
          </View>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          marginTop: hp(14),
          marginHorizontal: wp(18),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={arrow_back}
            style={{
              width: hp(18),
              height: hp(18),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center'}}>
          <Text
            style={{
              fontSize: fontSize(18),
              color: '#000',
              fontFamily: fontFamily.poppins500,
            }}>
            Order Details
          </Text>
        </View>
      </View>
      <FlatList
        renderItem={renderItem}
        keyExtractor={item => item.id}
        data={orderDetails}
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
                fontSize: fontSize(13),
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
    </SafeAreaView>
  );
};
export default OrderDetailsScreen;
