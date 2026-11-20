import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  AllGendersIcon,
  ApplyFilterButton,
  BlueInput,
  CloseButton,
  EmptyInput,
  KidsIcon,
  MaleIcon,
  WomenIcon,
} from '../../assets';

import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import LinearGradient from 'react-native-linear-gradient';
const GenderComponent = ({onClose}) => {
  const [selectedGender, setselectedGender] = useState('Women');
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{paddingBottom: hp(20)}}>
        <View style={{marginHorizontal: wp(16)}}>
          <View
            style={{
              width: '100%',
              height: hp(68),
              backgroundColor: '#FFF',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // marginTop: hp(19),
            }}>
            <View style={{}}>
              <Text
                style={{
                  color: '#171717',
                  fontFamily: fontFamily.poppins700,
                  fontSize: fontSize(18),
                }}>
                Select Gender
              </Text>
              <Text
                style={{
                  color: '#737373',
                  fontFamily: fontFamily.poppins500,
                  fontSize: fontSize(12),
                }}>
                Refining Women, Men & Kids Collection
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: '#431EE4',
                  fontFamily: fontFamily.poppins700,
                  fontSize: fontSize(12),
                }}>
                RESET
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#F5F5F5',
            height: hp(1),
            // marginTop: hp(13),
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: hp(16),
            marginHorizontal: wp(16),
          }}>
          <Text
            style={{
              color: '#A3A3A3',
              fontFamily: fontFamily.poppins500,
              fontSize: fontSize(12),
            }}>
            TARGET CATEGORY
          </Text>
          <Text
            style={{
              color: '#4F46E5',
              fontFamily: fontFamily.poppins600,
              fontSize: fontSize(12),
            }}>
            1 option selected
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setselectedGender('Women')}
          style={{
            borderWidth: selectedGender === 'Women' ? 2 : 1,
            borderColor: selectedGender === 'Women' ? '#5038ED' : '#E5E5E5',
            height: hp(80),
            borderRadius: wp(14),
            paddingHorizontal: wp(12),
            marginTop: hp(15),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: wp(16),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {selectedGender === 'Women' ? (
              <LinearGradient
                colors={['#5538EE', '#7A5CFF']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{
                  width: hp(48),
                  height: hp(48),
                  borderRadius: wp(12),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <WomenIcon />
              </LinearGradient>
            ) : (
              <View
                style={{
                  width: hp(48),
                  height: hp(48),
                  backgroundColor: '#F5F5F5',
                  borderRadius: wp(12),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <WomenIcon />
              </View>
            )}

            <Text
              style={{
                color: '#262626',
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(15),
                marginLeft: wp(12),
              }}>
              Women
            </Text>
            {/* <View style={{marginLeft: wp(6)}}>
                <DefaultViw />
              </View> */}
          </View>

          <View style={{marginLeft: wp(0)}}>
            {selectedGender === 'Women' ? <BlueInput /> : <EmptyInput />}
          </View>
        </TouchableOpacity>

        <View style={{marginHorizontal: wp(16)}}>
          <TouchableOpacity
            onPress={() => setselectedGender('Men')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              borderWidth: selectedGender === 'Men' ? 2 : 1,
              borderColor: selectedGender === 'Men' ? '#5038ED' : '#E5E5E5',
              height: hp(80),
              borderRadius: wp(14),
              paddingHorizontal: wp(12),

              marginTop: hp(15),
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {selectedGender === 'Men' ? (
                <LinearGradient
                  colors={['#5538EE', '#7A5CFF']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={{
                    width: hp(48),
                    height: hp(48),
                    borderRadius: wp(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaleIcon />
                </LinearGradient>
              ) : (
                <View
                  style={{
                    width: hp(48),
                    height: hp(48),
                    backgroundColor: '#F5F5F5',
                    borderRadius: wp(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaleIcon />
                </View>
              )}

              <Text
                style={{
                  color: '#262626',
                  fontFamily: fontFamily.poppins700,
                  fontSize: fontSize(15),
                  marginLeft: wp(12),
                }}>
                Men
              </Text>
            </View>

            <View style={{marginLeft: wp(0)}}>
              {selectedGender === 'Men' ? <BlueInput /> : <EmptyInput />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setselectedGender('Kids & Teens')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              borderWidth: selectedGender === 'Kids & Teens' ? hp(2) : hp(1),
              borderColor:
                selectedGender === 'Kids & Teens' ? '#5038ED' : '#E5E5E5',
              height: hp(78),
              borderRadius: wp(14),
              paddingHorizontal: wp(12),
              marginTop: hp(15),
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {selectedGender === 'Kids & Teens' ? (
                <LinearGradient
                  colors={['#5538EE', '#7A5CFF']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={{
                    width: hp(48),
                    height: hp(48),
                    borderRadius: wp(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <KidsIcon />
                </LinearGradient>
              ) : (
                <View
                  style={{
                    width: hp(48),
                    height: hp(48),
                    backgroundColor: '#F5F5F5',
                    borderRadius: wp(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <KidsIcon />
                </View>
              )}

              <Text
                style={{
                  color: '#262626',
                  fontFamily: fontFamily.poppins700,
                  fontSize: fontSize(12),
                  marginLeft: wp(12),
                }}>
                Kids & Teens
              </Text>
            </View>

            <View style={{marginLeft: wp(0)}}>
              {selectedGender === 'Kids & Teens' ? (
                <BlueInput />
              ) : (
                <EmptyInput />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setselectedGender('All Genders & Unisex')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              borderWidth:
                selectedGender === 'All Genders & Unisex' ? hp(2) : hp(1),
              borderColor:
                selectedGender === 'All Genders & Unisex'
                  ? '#5038ED'
                  : '#E5E5E5',
              height: hp(78),
              borderRadius: wp(14),
              paddingHorizontal: wp(12),
              marginTop: hp(15),
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {selectedGender === 'All Genders & Unisex' ? (
                <LinearGradient
                  colors={['#5538EE', '#7A5CFF']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={{
                    width: hp(48),
                    height: hp(48),
                    borderRadius: wp(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <AllGendersIcon />
                </LinearGradient>
              ) : (
                <View
                  style={{
                    width: hp(48),
                    height: hp(48),
                    backgroundColor: '#F5F5F5',
                    borderRadius: wp(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <AllGendersIcon />
                </View>
              )}

              <Text
                style={{
                  color: '#262626',
                  fontFamily: fontFamily.poppins700,
                  fontSize: fontSize(15),
                  marginLeft: wp(12),
                }}>
                All Genders & Unisex
              </Text>
            </View>

            <View style={{marginLeft: wp(0)}}>
              {selectedGender === 'All Genders & Unisex' ? (
                <BlueInput />
              ) : (
                <EmptyInput />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          bottom: hp(20),
          left: wp(16),
          right: wp(16),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={onClose}>
          <CloseButton />
        </TouchableOpacity>

        <TouchableOpacity>
          <ApplyFilterButton />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default GenderComponent;
