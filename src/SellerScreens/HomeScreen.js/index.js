import React from 'react';
import {SafeAreaView, ScrollView, Text, TouchableOpacity} from 'react-native';
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
import DashboardComponent from '../../SellerComponents/DashboardComponent';
import HomeProductComponent from '../../SellerComponents/HomeProductComponent';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const HomeScreen = () => {
  const navigation = useNavigation();
  const {loading, sellerData, error} = useSelector(state => state.sellerAuth);
  console.log('SELLER DATA =>', sellerData);

  // Function to get the greeting based on the current time
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };
  // business logo/avatar circle logic
  const businessName = sellerData?.data?.seller?.businessName || '';

  const businessInitials = businessName
    .trim()
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          // width: '100%',
          height: hp(55),
          // backgroundColor: 'pink',
          justifyContent: 'center',
          marginHorizontal: wp(18),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <SmallTrulyBag />
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('SellerProfile')}>
            <ProfileIcon />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('SellerProfile')}
            style={{
              width: hp(24),
              height: hp(24),
              borderRadius: wp(25),
              backgroundColor: '#F7E7FF',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins600,
                color: colors.black,
              }}>
              {businessInitials || 'NA'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp(30)}}>
        <View style={{marginHorizontal: wp(17), marginTop: hp(13)}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(14),
                color: '#000000',
              }}>
              {getGreeting()}{' '}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(14),
                color: '#000000',
              }}>
              {sellerData?.data?.seller?.name || 'N/A'}
            </Text>
          </View>
        </View>
        <View>
          <DashboardComponent />
        </View>

        <View
          style={{
            marginHorizontal: wp(17),
            marginTop: hp(22),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: fontFamily.poppins600,
              fontSize: fontSize(18),
              color: '#000000',
            }}>
            New Order
          </Text>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#CDCDCD',
              width: wp(83),
              height: hp(28),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: wp(8),
            }}>
            <Text
              style={{
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(12),
                color: '#000000',
              }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <HomeProductComponent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
