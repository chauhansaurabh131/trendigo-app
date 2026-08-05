import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {
  ProfileIcon,
  SellerAlert,
  ShipIcon,
  SmallTrulyBag,
  TotalOrder,
  TotalSales,
} from '../../assets';
import {colors} from '../../utils/colors';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
const DashboardComponent = () => {
  return (
    <View>
      <View
        style={{
          marginHorizontal: wp(17),
          marginTop: hp(16),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            width: hp(107),
            // height: hp(107),
            paddingVertical: hp(16),
            borderWidth: 1,
            borderColor: '#EBEBEB',
            borderRadius: wp(10),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: hp(30),
              height: hp(30),
              borderRadius: wp(7),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F4F1FF',
            }}>
            <SellerAlert />
          </View>
          <View style={{marginTop: hp(8)}}>
            <Text
              style={{
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(16),
                color: '#000000',
                textAlign: 'center',
              }}>
              5
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(10),
                color: '#000000',
              }}>
              New Order
            </Text>
          </View>
        </TouchableOpacity>

        {/* second */}

        <TouchableOpacity
          style={{
            width: hp(107),
            // height: hp(107),
            paddingVertical: hp(16),
            borderWidth: 1,
            borderColor: '#EBEBEB',
            borderRadius: wp(10),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: hp(30),
              height: hp(30),
              borderRadius: wp(7),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFF5F1',
            }}>
            <TotalOrder />
          </View>
          <View style={{marginTop: hp(8)}}>
            <Text
              style={{
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(16),
                color: '#000000',
                textAlign: 'center',
              }}>
              120
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(10),
                color: '#000000',
              }}>
              Total Order
            </Text>
          </View>
        </TouchableOpacity>

        {/* third */}

        <TouchableOpacity
          style={{
            width: hp(107),
            // height: hp(107),
            paddingVertical: hp(16),
            borderWidth: 1,
            borderColor: '#EBEBEB',
            borderRadius: wp(10),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: hp(30),
              height: hp(30),
              borderRadius: wp(7),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F4F1FF',
            }}>
            <TotalSales />
          </View>
          <View style={{marginTop: hp(8)}}>
            <Text
              style={{
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(16),
                color: '#000000',
                textAlign: 'center',
              }}>
              12.5K
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(10),
                color: '#000000',
              }}>
              Total Sales
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* four */}
      <View
        style={{
          marginHorizontal: wp(17),
          marginTop: hp(12),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            width: hp(107),
            // height: hp(107),
            paddingVertical: hp(16),
            borderWidth: 1,
            borderColor: '#EBEBEB',
            borderRadius: wp(10),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: hp(30),
              height: hp(30),
              borderRadius: wp(7),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EBF7F1',
            }}>
            <ShipIcon />
          </View>
          <View style={{marginTop: hp(8)}}>
            <Text
              style={{
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(16),
                color: '#000000',
                textAlign: 'center',
              }}>
              9K
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(10),
                color: '#000000',
              }}>
              To Ship
            </Text>
          </View>
        </TouchableOpacity>

        {/* five */}

        <TouchableOpacity
          style={{
            width: hp(107),
            // height: hp(107),
            paddingVertical: hp(16),
            borderWidth: 1,
            borderColor: '#EBEBEB',
            borderRadius: wp(10),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: hp(30),
              height: hp(30),
              borderRadius: wp(7),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F4F1FF',
            }}>
            <TotalSales />
          </View>
          <View style={{marginTop: hp(8)}}>
            <Text
              style={{
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(16),
                color: '#000000',
                textAlign: 'center',
              }}>
              9K
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(10),
                color: '#000000',
              }}>
              New Payout
            </Text>
          </View>
        </TouchableOpacity>

        {/* six */}

        <TouchableOpacity
          style={{
            width: hp(107),
            // height: hp(107),
            paddingVertical: hp(16),
            borderWidth: 1,
            borderColor: '#EBEBEB',
            borderRadius: wp(10),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: hp(30),
              height: hp(30),
              borderRadius: wp(7),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F4F1FF',
            }}>
            <TotalSales />
          </View>
          <View style={{marginTop: hp(8)}}>
            <Text
              style={{
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(16),
                color: '#000000',
                textAlign: 'center',
              }}>
              1K
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(10),
                color: '#000000',
              }}>
              Due Payout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DashboardComponent;
