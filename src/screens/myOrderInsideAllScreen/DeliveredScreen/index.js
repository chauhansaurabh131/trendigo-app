import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../utils/colors';
import {useState} from 'react';
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
  BlueRight,
  BuyButton,
  Deliverd,
  EarnDiscount,
  EmptyBag,
  images,
  NavigationArrowIcon,
  ReelsUi,
  ReturnButton,
} from '../../../assets';
import RatingStatComponent from '../../../components/ratingStarComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import GradientButton from '../../../components/gradientButton';
import {launchImageLibrary} from 'react-native-image-picker';
DeliveredScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);

  const selectVideo = () => {
    launchImageLibrary(
      {
        mediaType: 'video',
        selectionLimit: 1,
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.assets?.length > 0) {
          const video = response.assets[0];

          navigation.navigate('VideoPreviewScreen', {
            videoUri: video.uri,
          });
        }
      },
    );
  };
  const product = [
    {
      _id: '1',
      title: 'Men graphic Black T-shirt',
      image: images.trending_one,
      size: 'M',
      color: 'Black',
      qty: 1,
      deliveryDate: '10 Dec 2024',
    },
    {
      _id: '2',
      title: 'Men graphic Black T-shirt',
      image: images.trending_two,
      size: '32',
      color: 'Blue',
      qty: 2,
      deliveryDate: '10 Dec 2024',
    },
  ];
  // const product = [
  //   // {
  //   //   _id: '695f9b9e37424f1de0c4a436',
  //   //   title: 'Designer Traditional Dress',
  //   //   image: images.trending_one,
  //   //   size: 'S',
  //   //   color: 'Sky Blue',
  //   //   qty: 1,
  //   //   storeId: {
  //   //     id: '6960ba8237424f1de0c4a7e3',
  //   //   },
  //   // },
  //   {
  //     _id: '6960f31037424f1de0c4a918',
  //     title: 'Men graphic Black T-shirt',
  //     image: images.trending_one,
  //     size: 'S',
  //     color: 'Sky Blue',
  //     qty: 1,
  //     storeId: {
  //       id: '6960ba8237424f1de0c4a7e3',
  //     },
  //   },
  // ];
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width: '100%',
          // height: hp(385),
          borderWidth: 1,
          borderColor: '#E8E8E8',
          borderRadius: wp(14),
          marginBottom: hp(19),
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
          <View
            style={{
              flexDirection: 'row',
              // alignItems: 'flex-start',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Deliverd />

            <Text
              style={{
                color: '#64748B',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins400,
                marginLeft: wp(8),
              }}>
              {' '}
              {item.deliveryDate}{' '}
            </Text>
          </View>

          <View>
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
            // width: '100%',
            height: hp(1),
            marginTop: hp(12),
            backgroundColor: '#E2E8F0',
            marginHorizontal: wp(16),
            borderStyle: 'dashed',
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: wp(16),
            marginTop: hp(21),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                fontSize: fontSize(12),
                // lineHeight: hp(14),
                fontFamily: fontFamily.poppins500,
                color: '#334155',
                marginLeft: wp(6),
              }}>
              Rate your experience
            </Text>
          </View>

          <View style={{}}>
            <Image
              source={images.earn_discount}
              style={{width: wp(98), height: hp(21), resizeMode: 'contain'}}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: hp(26),
            marginBottom: hp(20),
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            height: hp(54),
            borderWidth: 1,
            borderColor: '#F1F5F9',
            borderRadius: wp(12),
            backgroundColor: '#F8FAFCCC',
            marginHorizontal: wp(16),
          }}>
          <RatingStatComponent
            value={rating}
            onRatingChange={value => setRating(value)}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ReviewRating', {
                product: product,
                rating: rating,
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: fontSize(12),
                  fontFamily: fontFamily.poppins700,
                  color: '#6D28D9',
                  marginLeft: wp(7),
                  marginRight: wp(9),
                }}>
                Write Review
              </Text>
            </View>
            <BlueRight />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={selectVideo} style={{alignItems: 'center'}}>
          <ReelsUi />
        </TouchableOpacity>

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
          <Text
            style={{
              // width: 40,
              color: '#94A3B8',
              fontSize: fontSize(11),
              fontFamily: fontFamily.poppins500,
            }}>
            Standard Express Delivery
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

export default DeliveredScreen;
