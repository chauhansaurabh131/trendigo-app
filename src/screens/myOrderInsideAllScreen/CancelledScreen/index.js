import React from 'react';
import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import {colors} from '../../../utils/colors';
import {fontFamily, fontSize, hp, isIOS, wp} from '../../../utils/helpers';
import {
  BlueBagIcon,
  EmptyBag,
  images,
  NavigationArrowIcon,
} from '../../../assets';
import GradientButton from '../../../components/gradientButton';
import {useNavigation} from '@react-navigation/native';

const CancelledScreen = () => {
  const navigation = useNavigation();
  const product = [
    // {
    //   _id: '1',
    //   title: 'Men graphic Black T-shirt',
    //   image: images.trending_one,
    //   size: 'M',
    //   color: 'Black',
    //   qty: 1,
    // },
    // {
    //   _id: '2',
    //   title: 'Men graphic Black T-shirt',
    //   image: images.trending_two,
    //   size: '32',
    //   color: 'Blue',
    //   qty: 2,
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
          height: hp(192),
        }}>
        <Text
          style={{
            marginTop: hp(14),
            color: '#FF0000',
            fontSize: fontSize(12),
            lineHeight: hp(16),
            fontFamily: fontFamily.poppins500,
          }}>
          Cancelled
        </Text>

        {/* <View
            style={{
              width: '97%',
              height: 1,
              marginTop: hp(12),
              marginBottom: hp(18),
              backgroundColor: '#E8E8E8',
            }}
          /> */}

        <View
          style={{
            flexDirection: 'row',
            marginBottom: hp(20),
            marginTop: hp(28),
          }}>
          <Image
            source={item.image}
            style={{width: wp(93), height: hp(112)}}
            borderRadius={8}
          />

          <View style={{marginLeft: wp(23)}}>
            <Text
              style={{
                fontSize: fontSize(15),
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
                    fontFamily: fontFamily.poppins400,
                    lineHeight: hp(18),
                  }}>
                  Color
                </Text>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(12),
                    fontFamily: fontFamily.poppins600,
                    lineHeight: hp(18),
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
                    fontFamily: fontFamily.poppins400,
                    lineHeight: hp(18),
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
              // marginLeft: wp(70),
              // marginLeft:wp(30)
              // marginRight: wp(20),
            }}>
            {/* <NavigationArrowIcon stroke="#ACACAC" /> */}
          </View>
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
