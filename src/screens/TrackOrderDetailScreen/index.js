import react from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {fontFamily, hp, wp, fontSize} from '../../utils/helpers';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'react-native';
import delivery_icon from '../../assets/images/delivery_order.png';
import arrow_back from '../../assets/images/arrow_back.png';
import {DeliverIcon, images, LineIcon, WatchIcon} from '../../assets';
import {watch_Image} from '../../assets/images/watch_image_icon.png';
import packed_icon from '../../assets/images/packed_icon_image.png';
import ship_icon from '../../assets/images/ship_icon_image.png';
import delivered_icon from '../../assets/images/delivered_icon_image.png';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
const TrackOrderDetailScreen = () => {
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
            Tracking Details
          </Text>
        </View>
      </View>
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
          marginTop: hp(26),
          marginHorizontal: wp(19),
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text>
          <Text
            style={{
              color: '#94A3B8',
              fontFamily: fontFamily.poppins500,
              fontSize: fontSize(10),
            }}>
            Delivery Partner{'\n'}
          </Text>

          <Text
            style={{
              color: '#0F172A',
              fontFamily: fontFamily.poppins600, // bold / semibold
              fontSize: fontSize(12), // bigger size
            }}>
            DHL
          </Text>
        </Text>
        <View>
          <Text>
            <Text
              style={{
                color: '#94A3B8',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(10),
              }}>
              Tracking Number{'\n'}
            </Text>

            <Text
              style={{
                color: '#0F172A',
                fontFamily: fontFamily.poppins600, // bold / semibold
                fontSize: fontSize(12), // bigger size
              }}>
              DHL100022910FS
            </Text>
          </Text>
        </View>

        <View>
          <Text>
            <Text
              style={{
                color: '#94A3B8',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(10),
              }}>
              Order ID{'\n'}
            </Text>

            <Text
              style={{
                color: '#0F172A',
                fontFamily: fontFamily.poppins600, // bold / semibold
                fontSize: fontSize(12), // bigger size
              }}>
              BGS08975201
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#F1F5F9',
          marginTop: hp(26),
          marginHorizontal: wp(19),
        }}
      />
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'center',
          marginHorizontal: wp(35),
          marginTop: hp(19),
        }}> */}
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginHorizontal: wp(24),
            marginTop: hp(45),
          }}>
          {/* ===== STEP 1 ===== */}
          <View style={{alignItems: 'center'}}>
            {/* <View
              style={{
                width: hp(34),
                height: hp(34),
                borderRadius: 30,
                backgroundColor: '#9317CF',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={images.watch_image}
                style={{
                  width: hp(13.91),
                  height: hp(13.91),
                  resizeMode: 'contain',
                }}
              />
            </View> */}
            <LinearGradient
              colors={['#8225AF', '#0F52BA']} // gradient colors
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{
                width: hp(34),
                height: hp(34),
                borderRadius: hp(34) / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={images.watch_image}
                style={{
                  width: hp(13.91),
                  height: hp(13.91),
                  resizeMode: 'contain',
                }}
              />
            </LinearGradient>

            {/* TITLE BELOW ICON */}
            <Text
              style={{
                marginTop: hp(9),
                color: '#000',
                fontSize: fontSize(8),
                fontFamily: fontFamily.poppins400,
              }}>
              Processing
            </Text>
          </View>

          {/* Dashed Line */}
          <View
            style={{
              width: 40,
              borderBottomWidth: 1,
              borderBottomColor: '#8B5CF6',
              borderStyle: 'dashed',
              marginRight: 22,
              marginTop: hp(17),
            }}
          />

          {/* ===== STEP 2 ===== */}
          <View style={{alignItems: 'center'}}>
            {/* <View
              style={{
                width: hp(34),
                height: hp(34),
                borderRadius: 30,
                backgroundColor: '#9317CF',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={images.packed_icon}
                style={{
                  width: hp(13.91),
                  height: hp(13.91),
                  resizeMode: 'contain',
                }}
              />
            </View> */}
            <LinearGradient
              colors={['#8225AF', '#0F52BA']} // gradient colors
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{
                width: hp(34),
                height: hp(34),
                borderRadius: hp(34) / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={images.packed_icon}
                style={{
                  width: hp(13.91),
                  height: hp(13.91),
                  resizeMode: 'contain',
                }}
              />
            </LinearGradient>
            <Text
              style={{
                marginTop: hp(9),
                color: '#000',
                fontSize: fontSize(8),
                fontFamily: fontFamily.poppins400,
              }}>
              Packed
            </Text>
          </View>

          {/* Dashed Line */}
          <View
            style={{
              width: 40,
              borderBottomWidth: 1,
              borderBottomColor: '#B3BAC3',
              borderStyle: 'dashed',
              marginRight: 22,
              marginTop: hp(17),
            }}
          />

          {/* ===== STEP 3 ===== */}
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: hp(34),
                height: hp(34),
                borderRadius: 30,
                borderColor: '#B3BAC3',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={images.ship_icon}
                style={{
                  width: hp(13.91),
                  height: hp(13.91),
                  resizeMode: 'contain',
                  tintColor: '#B3BAC3',
                }}
              />
            </View>

            <Text
              style={{
                marginTop: hp(9),
                color: '#B3BAC3',
                fontSize: fontSize(8),
                fontFamily: fontFamily.poppins400,
              }}>
              Shipped
            </Text>
          </View>

          {/* Dashed Line */}
          <View
            style={{
              width: 40,
              borderBottomWidth: 1,
              borderBottomColor: '#B3BAC3',
              borderStyle: 'dashed',
              marginRight: 22,
              marginTop: hp(17),
            }}
          />

          {/* ===== STEP 4 ===== */}
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: hp(34),
                height: hp(34),
                borderRadius: 30,
                borderColor: '#B3BAC3',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={images.delivered_icon}
                style={{
                  width: hp(13.91),
                  height: hp(13.91),
                  resizeMode: 'contain',
                  tintColor: '#B3BAC3',
                }}
              />
            </View>
            <Text
              style={{
                marginTop: hp(9),
                color: '#B3BAC3',
                fontSize: fontSize(8),
                fontFamily: fontFamily.poppins400,
              }}>
              Delivered
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: wp(28),
          marginTop: hp(41),
        }}>
        {/* ROW: Circle + Text */}
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          {/* Circle + Dashed Line Container */}
          <View style={{width: hp(18), alignItems: 'center'}}>
            {/* Circle */}
            <View
              style={{
                width: hp(18),
                height: hp(18),
                borderRadius: hp(9),
                backgroundColor: '#8225AF',
                zIndex: 1,
              }}
            />
            {/* Dashed Line */}
            <View
              style={{
                height: hp(90),
                borderLeftWidth: 1,
                borderLeftWidth: 1,
                borderLeftColor: '#B3BAC3',
                borderStyle: 'dashed',
                marginTop: 0,
              }}
            />
          </View>

          {/* Texts stacked vertically */}
          <View style={{marginLeft: wp(20)}}>
            <Text
              style={{
                color: '#000',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins700,
              }}>
              15 Jul 16:07
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins500,
              }}>
              Arrived at Sortation Center
            </Text>
            <Text
              style={{
                color: '#BCBCBC',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins500,
              }}>
              Your parcel has arrived at sortation center {'\n'}
              <Text
                style={{
                  color: '#000000',
                  fontSize: fontSize(12),
                  fontFamily: fontFamily.poppins500,
                }}>
                [Shah Alam]
              </Text>
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: wp(28),
          // marginTop: hp(41),
        }}>
        {/* ROW: Circle + Text */}
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          {/* Circle + Dashed Line Container */}
          <View style={{width: hp(18), alignItems: 'center'}}>
            {/* Circle */}
            <View
              style={{
                width: hp(18),
                height: hp(18),
                borderRadius: hp(9),
                backgroundColor: '#E2E8F0',
                zIndex: 1,
              }}
            />
            {/* Dashed Line */}
            <View
              style={{
                height: hp(90),
                borderLeftWidth: 1,
                borderLeftWidth: 1,
                borderLeftColor: '#B3BAC3',
                borderStyle: 'dashed',
                marginTop: 0,
              }}
            />
          </View>

          {/* Texts stacked vertically */}
          <View style={{marginLeft: wp(20)}}>
            <Text
              style={{
                color: '#000',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins700,
              }}>
              15 Jul 15:19
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins500,
              }}>
              Successful Drop Off
            </Text>
            <Text
              style={{
                color: '#BCBCBC',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins500,
              }}>
              Your parcel has arrived at sortation center {'\n'}
              <Text
                style={{
                  color: '#000000',
                  fontSize: fontSize(12),
                  fontFamily: fontFamily.poppins500,
                }}>
                seller [Shah Alam]
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: wp(28),
          // marginTop: hp(41),
        }}>
        {/* ROW: Circle + Text */}
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          {/* Circle + Dashed Line Container */}
          <View style={{width: hp(18), alignItems: 'center'}}>
            {/* Circle */}
            <View
              style={{
                width: hp(18),
                height: hp(18),
                borderRadius: hp(9),
                backgroundColor: '#E2E8F0',
                zIndex: 1,
              }}
            />
            {/* Dashed Line */}
            {/* <View
              style={{
                height: hp(90),
                borderLeftWidth: 1,
                borderLeftWidth: 1,
                borderLeftColor: '#D0D0D0',
                borderStyle: 'dashed',
                marginTop: 0,
              }}
            /> */}
          </View>

          {/* Texts stacked vertically */}
          <View style={{marginLeft: wp(20)}}>
            <Text
              style={{
                color: '#000',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins700,
              }}>
              15 Jul 10:36
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins500,
              }}>
              Packed by Seller, pending handover to the {'\n'}courier partner
            </Text>
            <Text
              style={{
                color: '#BCBCBC',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins500,
              }}>
              Sellers will handover the parcel within 2{'\n'}working days to our
              courier partner
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default TrackOrderDetailScreen;
