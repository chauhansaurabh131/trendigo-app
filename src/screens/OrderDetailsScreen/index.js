// import React from 'react';
// import arrow_back from '../../assets/images/arrow_back.png';
// import delivery_icon from '../../assets/images/delivery_order.png';
// import image_icon from '../../assets/images/imageProduct.png';
// import {fontFamily, wp, hp} from '../../utils/helpers';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// const OrderDetailsScreen = () => {
//   const navigation = useNavigation();

//   const handlePress = type => {
//     console.log(`${type} pressed`);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image source={arrow_back} style={styles.backIcon} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Order Details</Text>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Expected Delivery */}
//         <View style={styles.deliveryBox}>
//           <Image source={delivery_icon} style={styles.deliveryIcon} />
//           <Text style={styles.deliveryText}>
//             <Text style={styles.deliveryHighlight}>
//               Expected Delivery On :{' '}
//             </Text>
//             Monday , 19 Dec. 2024
//           </Text>
//         </View>

//         {/* Product Image */}
//         <View style={styles.imageContainer}>
//           <Image source={image_icon} style={styles.productImage} />
//           <Text style={styles.productTitle}>Designer Traditional Dress</Text>
//           <View style={styles.divider} />
//         </View>

//         {/* Product Details */}
//         <View style={styles.detailsBox}>
//           <View style={styles.row}>
//             <Text style={styles.label}>Size</Text>
//             <Text style={styles.value}>S</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Color</Text>
//             <Text style={styles.value}>Sky Blue</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Qty</Text>
//             <Text style={styles.value}>01</Text>
//           </View>
//         </View>

//         {/* Payment Details */}
//         <View style={styles.detailsBox}>
//           <View style={styles.row}>
//             <Text style={styles.label}>Total Paid</Text>
//             <Text style={styles.value}>Rs. 180.00</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Paid By</Text>
//             <Text style={styles.value}>Mastercard</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Paid Date</Text>
//             <Text style={styles.value}>02-02-2025, 10:30:10</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Order ID</Text>
//             <Text style={styles.value}>BGS08975201</Text>
//           </View>
//         </View>

//         {/* Buttons */}
//         <TouchableOpacity
//           style={[styles.button, {backgroundColor: '#FBF2FF', marginTop: 40}]}
//           onPress={() => handlePress('Track Order')}>
//           <Text
//             style={{
//               color: '#B225AF',
//               fontFamily: fontFamily.poppins500,
//               fontSize: wp(14),
//             }}>
//             Track Order
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.button,
//             {backgroundColor: '#F5F5F5', marginBottom: 20},
//           ]}
//           onPress={() => handlePress('Download Receipt')}>
//           <Text
//             style={{
//               color: '#000000',
//               fontFamily: fontFamily.poppins500,
//               fontSize: wp(14),
//             }}>
//             Download Receipt
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#fff'},

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//   },
//   backIcon: {
//     width: wp(18),
//     height: hp(18),
//     resizeMode: 'contain',
//     marginRight: 10,
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontFamily: fontFamily.poppins500,
//     fontSize: wp(18),
//     color: '#000',
//     marginRight: 30,
//   },

//   deliveryBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FCF7FF',
//     padding: 12,
//     marginBottom: 15,
//     width: '100%',
//   },
//   deliveryIcon: {
//     width: 22,
//     height: 16,
//     marginLeft: 15,
//   },
//   deliveryText: {
//     fontSize: 14,
//     color: '#000000',
//     flex: 1,
//     marginLeft: 15,
//   },
//   deliveryHighlight: {
//     fontWeight: 'bold',
//     color: '#2B9909',
//     width: '100%',
//   },

//   imageContainer: {
//     alignItems: 'center',
//     marginVertical: 15,
//   },
//   productImage: {
//     width: 100,
//     height: 130,
//     borderRadius: 12,
//     marginBottom: 10,
//   },
//   productTitle: {
//     fontSize: 14,
//     fontFamily: fontFamily.poppins500,
//     color: '#000000',
//     fontWeight: 'bold',
//   },
//   divider: {
//     borderColor: '#EBEBEB',
//     borderBottomWidth: 1,
//     width: '90%',
//     marginVertical: 12,
//     marginTop: 20,
//   },

//   detailsBox: {
//     marginHorizontal: 14,
//     marginVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EBEBEB',
//     paddingBottom: 10,
//     bottom: 30,
//     width: '90%',
//     alignSelf: 'center',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: hp(1.5),
//     marginHorizontal: 4,
//   },
//   label: {
//     fontSize: 14,
//     color: '#000000',
//     fontFamily: fontFamily.poppins400,
//   },
//   value: {
//     fontSize: 14,
//     fontFamily: fontFamily.poppins500,
//     color: '#000000',
//   },

//   button: {
//     marginHorizontal: 15,
//     marginVertical: 10,
//     paddingVertical: 12,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 50,
//     width: wp(360),
//   },
// });

// export default OrderDetailsScreen;
import React from 'react';
import {Image, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {fontFamily, fontSize, wp, hp} from '../../utils/helpers';
import {DeliverIcon, images, ReceiptIcon, TrackIcon} from '../../assets';
import arrow_back from '../../assets/images/arrow_back.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import delivery_icon from '../../assets/images/delivery_order.png';
import image_icon from '../../assets/images/imageProduct.png';
import GradientButton from '../../components/gradientButton';

import {useNavigation} from '@react-navigation/native';
const OrderDetailsScreen = () => {
  const navigation = useNavigation();
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
              width: 18,
              height: 18,
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
      <ScrollView contentContainerStyle={{paddingBottom: hp(0)}}>
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
                Monday, 19 Dec. 2024
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
            source={image_icon}
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
              Designer Traditional Dress
            </Text>
          </View>
        </View>
        {/* <View
        style={{
          borderColor: '#E8E8E8',
          borderWidth: 1,
          // width: '100%',
          marginHorizontal: wp(18),
          marginTop: hp(16),
        }}
      /> */}
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
              S
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
              Sky Blue
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
              01
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
              Rs. 180.00
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
              Mastercard (**** 4242)
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
              02-02-2025, 10:30:10
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
              Order ID
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

        {/* <TouchableOpacity
        onPress={() => navigation.navigate('TrackOrder')}
        style={{
          height: hp(50),
          backgroundColor: '#FBF2FF',
          borderRadius: 30,
          position: 'absolute',
          bottom: hp(87),
          left: wp(18),
          right: wp(18),
          alignItems: 'center', // horizontal center
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#8225AF',
            fontFamily: fontFamily.poppins500,
            fontSize: fontSize(14),
          }}>
          Track Order
        </Text>
      </TouchableOpacity> */}
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default OrderDetailsScreen;
