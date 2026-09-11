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
  UserIcon,
} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import GradientButton from '../../../components/gradientButton';

const ProcessingScreen = () => {
  const navigation = useNavigation();
  const orderData = [
    // {
    //   id: '1',
    //   image: images.trending_one,
    //   title: 'Designer Traditional Dress',
    //   size: 'S',
    //   color: 'Sky Blue',
    //   qty: 1,
    //   deliveryDate: 'Monday , 19 Dec. 2024',
    // },
    // {
    //   id: '2',
    //   image: images.trending_two,
    //   title: 'Designer Traditional Dress',
    //   size: 'XXL',
    //   color: 'Purple',
    //   qty: 1,
    //   deliveryDate: 'Tuesday , 20 Dec. 2024',
    // },
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
          marginBottom: hp(15),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: hp(14),
          }}>
          {/* Green Dot */}
          <View
            style={{
              width: wp(6),
              height: wp(6),
              backgroundColor: '#2B9909',
              borderRadius: wp(3),
              marginTop: hp(6),
              marginRight: 8,
            }}
          />

          {/* Delivery Text */}
          <Text
            style={{
              color: '#2B9909',
              fontSize: fontSize(12),
              lineHeight: hp(16),
              fontFamily: fontFamily.poppins500,
            }}>
            Expected Delivery On :
            <Text
              style={{
                color: colors.pureBlack,
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(12),
              }}>
              {' '}
              {item.deliveryDate}
            </Text>
          </Text>
        </View>
        <View
          style={{
            width: '97%',
            height: 1,
            marginTop: hp(12),
            marginBottom: hp(18),
            backgroundColor: '#E8E8E8',
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            //  backgroundColor: 'pink'
          }}>
          <Image
            source={item.image}
            style={{width: wp(73), height: hp(88)}}
            borderRadius={8}
          />

          <View style={{marginHorizontal: wp(23)}}>
            <Text
              style={{
                fontSize: fontSize(16),
                fontFamily: fontFamily.poppins600,
                color: colors.pureBlack,
              }}>
              {item.title}
            </Text>

            <View style={{marginTop: isIOS ? hp(15) : hp(7)}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    width: 40,
                    color: '#64748B',
                    fontSize: fontSize(12),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  Size
                </Text>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(12),
                    fontFamily: fontFamily.poppins600,
                  }}>
                  {' '}
                  :{' '}
                </Text>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(12),
                    fontFamily: fontFamily.poppins600,
                  }}>
                  {' '}
                  {item.size}{' '}
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    width: 40,
                    color: '#64748B',
                    fontSize: fontSize(12),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  Color
                </Text>
                <Text
                  style={{
                    color: colors.pureBlack,
                    lineHeight: hp(13),
                    lineHeight: hp(18),
                    fontSize: fontSize(12),
                    fontFamily: fontFamily.poppins600,
                  }}>
                  {' '}
                  :{' '}
                </Text>
                <Text
                  style={{
                    color: colors.pureBlack,
                    lineHeight: hp(18),
                    fontSize: fontSize(12),
                    fontFamily: fontFamily.poppins600,
                  }}>
                  {' '}
                  {item.color}{' '}
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    width: 40,
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

          <View
            style={{
              alignSelf: 'center',
              marginLeft: wp(70),
            }}>
            {/* <NavigationArrowIcon stroke="black" /> */}
          </View>
        </View>

        <View
          style={{
            // width: '100%',
            height: 1,
            marginTop: hp(19),
            backgroundColor: '#E8E8E8',
            marginHorizontal: -13, // 🔥 important
          }}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('OrderDetails')}
          style={{marginTop: hp(10), marginBottom: hp(10)}}>
          <Text
            style={{
              textAlign: 'center',
              color: colors.pureBlack,
              fontSize: fontSize(11),
              fontFamily: fontFamily.poppins500,
            }}>
            Track Order
          </Text>
        </TouchableOpacity>
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
