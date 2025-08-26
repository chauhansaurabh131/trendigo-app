import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fontFamily, fontSize, hp, Touchable} from '../../utils/helpers';
import {images, NavigationArrowIcon} from '../../assets';
import { useNavigation } from '@react-navigation/native';

const CategoryScreen = () => {
  const navigation = useNavigation(); 
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          height: hp(57),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: colors.pureBlack,
            fontSize: fontSize(16),
            lineHeight: hp(24),
            fontFamily: fontFamily.poppins400,
          }}>
          Explore Categories
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: 18,
            marginTop: hp(17),
          }}>
          <TouchableOpacity activeOpacity={0.6}
           onPress={() => navigation.navigate('MenCategoryScreen')}
          >
            <View style={{position: 'relative'}}>
              <Image
                source={images.men_collection_img}
                style={{
                  width: '100%',
                  height: hp(146),
                  resizeMode: 'contain',
                  borderRadius: 12,
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  left: 36,
                  right: 36,
                  top: 60,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: fontSize(22),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  Men
                </Text>

                <View
                  style={{
                    width: hp(34),
                    height: hp(34),
                    borderRadius: hp(34) / 2,
                    backgroundColor: '#FFFFFF99',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <NavigationArrowIcon stroke="black" />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6} style={{marginTop: hp(17)}}>
            <View style={{position: 'relative'}}>
              <Image
                source={images.women_collection_img}
                style={{
                  width: '100%',
                  height: hp(146),
                  resizeMode: 'contain',
                  borderRadius: 12,
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  left: 36,
                  right: 36,
                  top: 60,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(22),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  Women
                </Text>

                <View
                  style={{
                    width: hp(34),
                    height: hp(34),
                    borderRadius: hp(34) / 2,
                    backgroundColor: '#FFFFFF99',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <NavigationArrowIcon stroke="black" />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6} style={{marginTop: hp(17)}}>
            <View style={{position: 'relative'}}>
              <Image
                source={images.kids_collection_img}
                style={{
                  width: '100%',
                  height: hp(146),
                  resizeMode: 'contain',
                  borderRadius: 12,
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  left: 36,
                  right: 36,
                  top: 60,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(22),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  Kids
                </Text>

                <View
                  style={{
                    width: hp(34),
                    height: hp(34),
                    borderRadius: hp(34) / 2,
                    backgroundColor: '#FFFFFF99',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <NavigationArrowIcon stroke="black" />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6} style={{marginTop: hp(17)}}>
            <View style={{position: 'relative'}}>
              <Image
                source={images.beauty_product_img}
                style={{
                  width: '100%',
                  height: hp(146),
                  resizeMode: 'contain',
                  borderRadius: 12,
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  left: 36,
                  right: 36,
                  top: 60,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(22),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  Beauty
                </Text>

                <View
                  style={{
                    width: hp(34),
                    height: hp(34),
                    borderRadius: hp(34) / 2,
                    backgroundColor: '#FFFFFF99',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <NavigationArrowIcon stroke="black" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{height: hp(50)}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;
