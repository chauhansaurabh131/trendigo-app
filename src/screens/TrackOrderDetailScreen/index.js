import react from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {fontFamily, hp, wp, fontSize} from '../../utils/helpers';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'react-native';
import delivery_icon from '../../assets/images/delivery_order.png';
import arrow_back from '../../assets/images/arrow_back.png';
import {images, LineIcon, WatchIcon} from '../../assets';
import {watch_Image} from '../../assets/images/watch_image_icon.png';
import packed_icon from '../../assets/images/packed_icon_image.png';
import ship_icon from '../../assets/images/ship_icon_image.png';
import delivered_icon from '../../assets/images/delivered_icon_image.png';
import {useNavigation} from '@react-navigation/native';
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
            Order Details
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#FCF7FF',
          width: '100%',
          height: hp(40),
          marginTop: hp(16),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(13),
            marginLeft: wp(36),
          }}>
          <Image
            source={delivery_icon}
            style={{width: wp(19), height: hp(13), resizeMode: 'contain'}}
          />

          <Text
            style={{
              color: '#2B9909',
              fontSize: fontSize(14),
              fontFamily: fontFamily.poppins600,
              marginLeft: wp(11),
            }}>
            Expected Delivery On :
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: fontSize(13),
              fontFamily: fontFamily.poppins400,
              marginLeft: wp(11),
            }}>
            Monday , 19 Dec. 2024
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: hp(18),
          marginHorizontal: wp(22),
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text>
          <Text
            style={{
              color: '#000',
              fontFamily: fontFamily.poppins400,
              fontSize: fontSize(8),
            }}>
            Delivery Partner{'\n'}
          </Text>

          <Text
            style={{
              color: '#000',
              fontFamily: fontFamily.poppins400, // bold / semibold
              fontSize: fontSize(10), // bigger size
            }}>
            DHL
          </Text>
        </Text>
        <View>
          <Text>
            <Text
              style={{
                color: '#000',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(8),
              }}>
              Tracking Number{'\n'}
            </Text>

            <Text
              style={{
                color: '#000',
                fontFamily: fontFamily.poppins400, // bold / semibold
                fontSize: fontSize(10), // bigger size
              }}>
              DHL100022910FS
            </Text>
          </Text>
        </View>

        <View>
          <Text>
            <Text
              style={{
                color: '#000',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(8),
              }}>
              Order ID{'\n'}
            </Text>

            <Text
              style={{
                color: '#000',
                fontFamily: fontFamily.poppins400, // bold / semibold
                fontSize: fontSize(10), // bigger size
              }}>
              BGS08975201
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#E2E2E2',
          marginTop: hp(21),
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginHorizontal: wp(30),
          marginTop: hp(19),
        }}>
        {/* ===== STEP 1 ===== */}
        <View style={{alignItems: 'center'}}>
          <View
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
          </View>

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
            borderBottomColor: '#062DFB',
            borderStyle: 'dashed',
            marginHorizontal: 9,
            marginTop: hp(17),
          }}
        />

        {/* ===== STEP 2 ===== */}
        <View style={{alignItems: 'center'}}>
          <View
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
          </View>

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
            borderBottomColor: '#062DFB',
            borderStyle: 'dashed',
            marginHorizontal: 9,
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
              borderColor: '#8225AF',
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
              }}
            />
          </View>

          <Text
            style={{
              marginTop: hp(9),
              color: '#8225AF',
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
            borderBottomColor: '#062DFB',
            borderStyle: 'dashed',
            marginHorizontal: 9,
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
              borderColor: '#888',
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
              }}
            />
          </View>
          <Text
            style={{
              marginTop: hp(9),
              color: '#000',
              fontSize: fontSize(8),
              fontFamily: fontFamily.poppins400,
            }}>
            Delivered
          </Text>
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
                backgroundColor: '#9317CF',
                zIndex: 1,
              }}
            />
            {/* Dashed Line */}
            <View
              style={{
                height: hp(90),
                borderLeftWidth: 1,
                borderLeftWidth: 1,
                borderLeftColor: '#D0D0D0',
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
                fontFamily: fontFamily.poppins500,
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
                color: '#888888',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins500,
              }}>
              Your parcel has arrived at sortation center {'\n'}[Shah Alam]
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
                backgroundColor: '#F3F3F3',
                zIndex: 1,
              }}
            />
            {/* Dashed Line */}
            <View
              style={{
                height: hp(90),
                borderLeftWidth: 1,
                borderLeftWidth: 1,
                borderLeftColor: '#D0D0D0',
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
                fontFamily: fontFamily.poppins500,
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
                color: '#888888',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins500,
              }}>
              Your parcel has arrived at sortation center {'\n'}[Shah Alam]
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
                backgroundColor: '#F3F3F3',
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
                fontFamily: fontFamily.poppins500,
              }}>
              15 Jul 10:36
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins500,
              }}>
              Packed by Seller, pending handover to the courier partner
            </Text>
            <Text
              style={{
                color: '#888888',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins500,
              }}>
              Sellers will handover the parcel within 2 working days to our
              courier partner
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default TrackOrderDetailScreen;
