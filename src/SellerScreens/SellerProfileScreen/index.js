import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  BackIcon,
  ProfileIcon,
  SellerProfile,
  SmallTrulyBag,
} from '../../assets';
import {colors} from '../../utils/colors';
import {fontSize, fontFamily, hp, wp} from '../../utils/helpers';
import DashboardComponent from '../../SellerComponents/DashboardComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from '../../redux/actions/sellerAuthActions';

const SellerProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loading, sellerData, error} = useSelector(state => state.sellerAuth);
  console.log('SELLER DATA =>', sellerData);

  const businessName = sellerData?.data?.seller?.businessName || '';

  const businessInitials = businessName
    .trim()
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase())
    .slice(0, 2)
    .join('');

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userSession');
      await AsyncStorage.removeItem('sellerAccessToken');
      await AsyncStorage.removeItem('sellerRefreshToken');

      dispatch(logout());
      ToastAndroid.show('Log Out Successful', ToastAndroid.SHORT);
      navigation.reset({
        index: 0,
        routes: [{name: 'StartingScreen'}],
      });

      console.log('LOGOUT SUCCESS');
    } catch (error) {
      console.log('LOGOUT ERROR =>', error);
      ToastAndroid.show("Logout Failed'", ToastAndroid.SHORT);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{height: hp(57), justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: wp(18),
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
              fontFamily: fontFamily.poppins500,
            }}>
            SellerProfile
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: hp(0)}}>
        <View
          style={{
            width: '100%',
            // height: hp(71),
            paddingVertical: hp(19),
            backgroundColor: '#F8F8F8',
          }}>
          <View
            style={{
              marginHorizontal: wp(18),

              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: wp(36),
                height: hp(36),
                backgroundColor: '#ECE7FF',
                borderRadius: wp(6),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SellerProfile />
            </View>

            <View style={{marginLeft: wp(15)}}>
              <Text
                style={{
                  fontSize: fontSize(11),
                  color: colors.black,
                  fontFamily: fontFamily.poppins400,
                }}>
                Your store profile and settings can only be{' '}
              </Text>
              <Text style={{fontSize: fontSize(11), color: colors.black}}>
                managed through the{' '}
                <Text
                  style={{
                    fontFamily: fontFamily.poppins600,
                  }}>
                  Trulybag Seller Web Portal.{' '}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: hp(100),
            width: hp(100),
            borderRadius: wp(50),
            backgroundColor: '#F7E7FF',
            alignSelf: 'center',
            marginTop: hp(23),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: fontSize(25),
              color: colors.black,
              fontFamily: fontFamily.poppins600,
            }}>
            {businessInitials || 'N/A'}
          </Text>
        </View>

        <View style={{marginTop: hp(13), alignItems: 'center'}}>
          <Text
            style={{
              fontSize: fontSize(20),
              color: colors.black,
              fontFamily: fontFamily.poppins600,
            }}>
            {sellerData?.data?.seller?.businessName || 'N/A'}
          </Text>

          <Text
            style={{
              fontSize: fontSize(10),
              color: colors.black,
              fontFamily: fontFamily.poppins400,
            }}>
            Joined on June 2024
          </Text>
        </View>

        <View style={{marginTop: hp(20)}}>
          <DashboardComponent />
        </View>

        <View
          style={{
            height: hp(1),
            backgroundColor: '#EBEBEB',
            marginHorizontal: wp(18),
            marginTop: hp(23),
          }}
        />

        <View style={{marginHorizontal: wp(18), marginTop: hp(20)}}>
          <View>
            <Text
              style={{
                fontSize: fontSize(15),
                color: colors.black,
                fontFamily: fontFamily.poppins400,
                lineHeight: hp(36),
              }}>
              About Trulybag
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: fontSize(15),
                lineHeight: hp(36),
                color: colors.black,
                fontFamily: fontFamily.poppins400,
              }}>
              Terms of Use
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: fontSize(15),
                lineHeight: hp(36),
                color: colors.black,
                fontFamily: fontFamily.poppins400,
              }}>
              Privacy Policy
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: fontSize(15),
                lineHeight: hp(36),
                color: colors.black,
                fontFamily: fontFamily.poppins400,
              }}>
              Chat with Trulybag
            </Text>
          </View>
        </View>
        <View
          style={{
            height: hp(1),
            backgroundColor: '#EBEBEB',
            marginHorizontal: wp(18),
            marginTop: hp(23),
          }}
        />

        <TouchableOpacity
          onPress={handleLogout}
          style={{alignItems: 'center', paddingVertical: hp(20)}}>
          <Text
            style={{
              fontSize: fontSize(15),
              color: colors.black,
              fontFamily: fontFamily.poppins400,
            }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SellerProfileScreen;
