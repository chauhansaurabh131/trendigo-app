import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {fontFamily, fontSize, hp, wp} from '../../../utils/helpers';
import {images, TabIcon} from '../../../assets';
import {useNavigation} from '@react-navigation/native';

const DeliveredScreen = () => {
  const navigation = useNavigation();
  const data = [1, 2, 3, 4, 5];
  const renderItem = () => (
    <View
      style={{
        // width: '100%',
        marginHorizontal: wp(17),
        marginTop: hp(19),
        // height: hp(138),
        paddingVertical: hp(13),
        borderWidth: 1,
        borderColor: '#E7E7E7',
        borderRadius: wp(14),
        // flexDirection: 'row',
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: wp(16),
          // marginTop: hp(13),
          alignItems: 'flex-start',
        }}>
        <View style={{}}>
          <Image
            source={images.productImageFour}
            style={{width: wp(54), height: hp(55), borderRadius: wp(8)}}
          />
        </View>

        <View style={{paddingLeft: wp(16), flex: 1}}>
          <Text
            style={{
              fontFamily: fontFamily.poppins500,
              fontSize: fontSize(14),
              color: '#000000',
            }}>
            Neha Sharma
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(14),
                color: '#838383',
              }}>
              1 Qty{' '}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(14),
                color: '#838383',
              }}>
              • Red{' '}
            </Text>

            <Text
              style={{
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(14),
                color: '#838383',
              }}>
              • ₹1,499
            </Text>
          </View>
        </View>

        <View
          style={{
            marginLeft: 'auto',
            width: wp(77),
            height: hp(24),
            backgroundColor: '#F4FFF1',
            borderRadius: wp(7),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: fontFamily.poppins500,
              fontSize: fontSize(12),
              color: '#399A1B',
            }}>
            Delivered
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: '#E7E7E7',
          marginHorizontal: wp(16),
          marginTop: hp(15),
          // width: '100%',
        }}
      />

      <View
        style={{
          marginHorizontal: wp(16),
          marginTop: hp(11),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              fontFamily: fontFamily.poppins400,
              fontSize: fontSize(12),
              color: '#000000',
            }}>
            Order #TB10254
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.poppins400,
              fontSize: fontSize(10),
              color: '#B7B7B7',
            }}>
            14 June 2026, 10:00 AM
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('DeliverdOrderScreen')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: fontFamily.poppins400,
              fontSize: fontSize(12),
              color: '#000000',
            }}>
            View Order
          </Text>
          {/* <View style={{marginLeft: wp(16)}}> */}
          <TabIcon marginLeft={16} />
          {/* </View> */}
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        // scrollEnabled={false}
        contentContainerStyle={{paddingBottom: hp(20)}}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
export default DeliveredScreen;
