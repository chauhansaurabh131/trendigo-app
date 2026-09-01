import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {View} from 'react-native';
import {
  NewLogo,
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
import {useDispatch, useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import GradientButton from '../../components/gradientButton';
import {sellerLoginReset} from '../../redux/actions/sellerAuthActions';
const HomeScreen = () => {
  const navigation = useNavigation();
  const notificationSheetRef = useRef();
  const dispatch = useDispatch();
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
  const setupSteps = [
    'Store information',
    'Business details',
    'Bank account',
    'Shipping settings',
    'Policies',
    'Product listings',
  ];
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  useEffect(() => {
    setShowNoticeModal(true);
  }, []);
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
          <NewLogo />
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

      {/* notification sheet */}
      {/* <RBSheet
        ref={notificationSheetRef}
        height={hp(424)}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: wp(18),
            borderTopRightRadius: wp(18),
          },
        }}>
        <View style={{marginHorizontal: wp(28), marginTop: hp(26)}}>
          <View>
            <Text
              style={{
                fontSize: fontSize(16),
                fontFamily: fontFamily.poppins500,
                color: '#000000',
              }}>
              Store Management Notice
            </Text>
          </View>

          <View style={{width: wp(289), marginTop: hp(18)}}>
            <Text
              style={{
                fontSize: fontSize(13),
                color: '#000000',
              }}>
              <Text
                style={{
                  fontFamily: fontFamily.poppins400,
                }}>
                Your store profile can only be managed from the{' '}
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.poppins600,
                  lineHeight: hp(19),
                }}>
                the Trulybag Seller Web Portal.
              </Text>
            </Text>
          </View>

          <View style={{width: wp(289), marginTop: hp(18)}}>
            <Text
              style={{
                fontSize: fontSize(13),
                color: '#000000',
                fontFamily: fontFamily.poppins400,
                lineHeight: hp(19),
              }}>
              You can use the mobile app to receive and manage orders, chat with
              customers, and track your business, but to edit your:
            </Text>
          </View>

          <View style={{width: wp(289), marginTop: hp(18)}}>
            {setupSteps.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  marginBottom: hp(1),
                }}>
                <Text
                  style={{
                    fontSize: fontSize(13),
                    fontFamily: fontFamily.poppins400,
                    marginRight: wp(8),
                    color: '#000000',
                  }}>
                  •
                </Text>

                <Text
                  style={{
                    fontSize: fontSize(13),
                    color: '#000000',
                    fontFamily: fontFamily.poppins400,
                  }}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
          <View style={{marginTop: hp(23)}}>
            <GradientButton
              title={'Okay'}
              onPress={() => {
                notificationSheetRef.current?.close();

                dispatch(sellerLoginReset()); // reset sellerData
              }}
            />
          </View>
        </View>
      </RBSheet> */}

      <Modal visible={showNoticeModal} transparent={true} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: wp(340),
              backgroundColor: '#FFFFFF',
              borderRadius: wp(18),
              // paddingHorizontal: wp(28),
              // paddingTop: hp(26),
              paddingBottom: hp(24),
            }}>
            <View style={{marginHorizontal: wp(28), marginTop: hp(26)}}>
              <View>
                <Text
                  style={{
                    fontSize: fontSize(16),
                    fontFamily: fontFamily.poppins500,
                    color: '#000000',
                  }}>
                  Store Management Notice
                </Text>
              </View>

              <View style={{width: wp(289), marginTop: hp(18)}}>
                <Text
                  style={{
                    fontSize: fontSize(13),
                    color: '#000000',
                  }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.poppins400,
                    }}>
                    Your store profile can only be managed from the{' '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamily.poppins600,
                      lineHeight: hp(19),
                    }}>
                    the Trulybag Seller Web Portal.
                  </Text>
                </Text>
              </View>

              <View style={{width: wp(289), marginTop: hp(18)}}>
                <Text
                  style={{
                    fontSize: fontSize(13),
                    color: '#000000',
                    fontFamily: fontFamily.poppins400,
                    lineHeight: hp(19),
                  }}>
                  You can use the mobile app to receive and manage orders, chat
                  with customers, and track your business, but to edit your:
                </Text>
              </View>

              <View style={{width: wp(289), marginTop: hp(18)}}>
                {setupSteps.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      marginBottom: hp(1),
                    }}>
                    <Text
                      style={{
                        fontSize: fontSize(13),
                        fontFamily: fontFamily.poppins400,
                        marginRight: wp(8),
                        color: '#000000',
                      }}>
                      •
                    </Text>

                    <Text
                      style={{
                        fontSize: fontSize(13),
                        color: '#000000',
                        fontFamily: fontFamily.poppins400,
                      }}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{marginTop: hp(23)}}>
                <GradientButton
                  title={'Okay'}
                  onPress={() => {
                    // notificationSheetRef.current?.close();
                    setShowNoticeModal(false);

                    dispatch(sellerLoginReset()); // reset sellerData
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default HomeScreen;
