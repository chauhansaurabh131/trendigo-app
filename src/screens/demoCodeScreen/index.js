import React, {useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors} from '../../utils/colors';
import {fontFamily, fontSize, hp, Touchable, wp} from '../../utils/helpers';
import {images, NavigationArrowIcon} from '../../assets';
import GradientButton from '../../components/gradientButton';
import CheckBoxComponent from '../../components/checkBoxComponent';

const DemoCodeScreen = () => {
  const sheetRef1 = useRef(); // First bottom sheet
  const sheetRef2 = useRef(); // Second bottom sheet

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* Trigger for first sheet */}
      <TouchableOpacity
        onPress={() => sheetRef1.current?.open()}
        activeOpacity={0.7}>
        <Text style={{fontSize: 16, color: '#1e1e1e'}}>Open</Text>
      </TouchableOpacity>

      {/* First Bottom Sheet - Address List */}
      <RBSheet
        ref={sheetRef1}
        height={hp(350)}
        openDuration={250}
        closeOnDragDown
        closeOnPressMask
        customStyles={{
          wrapper: {backgroundColor: 'rgba(0,0,0,0.35)'},
          draggableIcon: {backgroundColor: '#C4C4C4'},
          container: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }}>
        <View style={{flex: 1, backgroundColor: colors.white}}>
          <Text
            style={{
              color: colors.pureBlack,
              textAlign: 'center',
              marginTop: hp(25),
              marginBottom: hp(25),
              fontSize: fontSize(14),
              lineHeight: hp(18),
              fontFamily: fontFamily.poppins400,
            }}>
            Select or Add Delivery Address
          </Text>

          <View
            style={{width: '100%', height: 1, backgroundColor: '#E3E3E3'}}
          />

          <Touchable style={{backgroundColor: '#FDFAFF'}} activeOpacity={0.5}>
            <View style={{marginHorizontal: 19, marginTop: hp(15)}}>
              <Text
                style={{
                  color: '#8225AF',
                  fontSize: fontSize(10),
                  lineHeight: hp(14),
                  fontFamily: fontFamily.poppins400,
                }}>
                Delivery Address
              </Text>

              <View style={{marginTop: hp(9), flexDirection: 'row'}}>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(13),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  Rahul Gajjar{' '}
                </Text>
                <View
                  style={{
                    width: 2,
                    height: 17,
                    backgroundColor: '#E6E6E6',
                    marginLeft: wp(10),
                    marginRight: hp(10),
                  }}
                />
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(13),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  +91 10002 00003
                </Text>
              </View>

              <Text
                style={{
                  color: colors.pureBlack,
                  fontSize: fontSize(11),
                  lineHeight: hp(18),
                  fontFamily: fontFamily.poppins400,
                  marginTop: 5,
                  marginBottom: hp(20),
                }}>
                25/3 Housing Estate, Near by sector 17, Singapore 31134
              </Text>
            </View>

            <View style={{position: 'absolute', right: 25, top: 50}}>
              <NavigationArrowIcon stroke="#8225AF" />
            </View>
          </Touchable>
        </View>

        {/* Button to add address */}
        <View style={{marginHorizontal: 18, bottom: 10}}>
          <GradientButton
            title={'Add New Address'}
            onPress={() => {
              sheetRef1.current?.close(); // Close first sheet
              setTimeout(() => {
                sheetRef2.current?.open(); // Open second sheet after a short delay
              }, 300);
            }}
          />
        </View>
      </RBSheet>

      {/* Second Bottom Sheet - Add New Address */}
      <RBSheet
        ref={sheetRef2}
        height={hp(570)}
        openDuration={250}
        closeOnDragDown
        closeOnPressMask
        customStyles={{
          wrapper: {backgroundColor: 'rgba(0,0,0,0.35)'},
          draggableIcon: {backgroundColor: '#C4C4C4'},
          container: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }}>
        <View style={{flex: 1, backgroundColor: colors.white}}>
          <Text
            style={{
              color: colors.pureBlack,
              textAlign: 'center',
              marginTop: hp(25),
              marginBottom: hp(25),
              fontSize: fontSize(14),
              lineHeight: hp(18),
              fontFamily: fontFamily.poppins400,
            }}>
            Add New Address
          </Text>

          <View
            style={{width: '100%', height: 1, backgroundColor: '#E3E3E3'}}
          />

          <View style={{marginHorizontal: 18, marginTop: hp(19)}}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#999"
              style={{
                borderWidth: 1,
                borderColor: '#EAEAEA',
                borderRadius: 8,
                paddingHorizontal: 12,
                height: hp(45),
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins400,
                color: colors.pureBlack,
              }}
            />

            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor="#999"
              keyboardType={'number-pad'}
              maxLength={10}
              style={{
                borderWidth: 1,
                borderColor: '#EAEAEA',
                borderRadius: 8,
                paddingHorizontal: 12,
                height: hp(45),
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins400,
                color: colors.pureBlack,
                marginTop: hp(13),
              }}
            />

            <View
              style={{
                marginTop: hp(23),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={images.address_icon}
                style={{
                  tintColor: '#B0B0B0',
                  width: hp(11),
                  height: hp(14),
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  marginLeft: wp(12),
                  fontSize: fontSize(12),
                  lineHeight: hp(18),
                  fontFamily: fontFamily.poppins400,
                  color: colors.pureBlack,
                }}>
                Delivery Address
              </Text>
            </View>

            <TextInput
              placeholder="Pincode"
              placeholderTextColor="#999"
              keyboardType={'number-pad'}
              maxLength={6}
              style={{
                borderWidth: 1,
                borderColor: '#EAEAEA',
                borderRadius: 8,
                paddingHorizontal: 12,
                height: hp(45),
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins400,
                color: colors.pureBlack,
                marginTop: hp(21),
              }}
            />

            <TextInput
              placeholder="Address (House No, Building, Street, Area)"
              placeholderTextColor="#999"
              style={{
                borderWidth: 1,
                borderColor: '#EAEAEA',
                borderRadius: 8,
                paddingHorizontal: 12,
                height: hp(45),
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins400,
                color: colors.pureBlack,
                marginTop: hp(15),
              }}
            />

            <TextInput
              placeholder="Locality/Town"
              placeholderTextColor="#999"
              style={{
                borderWidth: 1,
                borderColor: '#EAEAEA',
                borderRadius: 8,
                paddingHorizontal: 12,
                height: hp(45),
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins400,
                color: colors.pureBlack,
                marginTop: hp(15),
              }}
            />

            <View style={{marginTop: hp(24)}}>
              <CheckBoxComponent />
            </View>

            {/* Your Add Address form goes here */}

            <GradientButton
              title={'Save Address'}
              onPress={() => {
                sheetRef2.current?.close();
              }}
              buttonStyle={{marginTop: 20}}
            />
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default DemoCodeScreen;
