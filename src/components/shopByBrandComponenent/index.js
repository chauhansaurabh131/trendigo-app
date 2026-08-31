import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {
  Adidas,
  BossIcon,
  CalvinIcon,
  LevisIcon,
  PullBearIcon,
  UniIcon,
} from '../../assets';
import {useNavigation} from '@react-navigation/native';
const ShopByBrandsComponent = () => {
  const navigation = useNavigation();
  const brands = [
    {id: '1', icon: PullBearIcon},
    {id: '2', icon: BossIcon},
    {id: '3', icon: UniIcon},
    {id: '4', icon: Adidas},
    {id: '5', icon: CalvinIcon},
    {id: '6', icon: LevisIcon},
  ];

  const renderItem = ({item}) => {
    const IconComponent = item.icon;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('BrandsScreen')}
        style={{
          width: hp(105.68),
          height: hp(65.08),
          borderRadius: wp(14),
          backgroundColor: '#F8F8F8',
          alignItems: 'center',
          justifyContent: 'center',
          // marginBottom: hp(13),
        }}>
        <IconComponent />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View
        style={{
          marginHorizontal: wp(17),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: '#000',
            fontFamily: fontFamily.poppins600,
            fontSize: fontSize(18),
          }}>
          Shop by Brands
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('BrandsScreen')}
          style={{
            borderColor: '#E5E5E5',
            borderWidth: 1,
            width: hp(68),
            height: hp(28),
            borderRadius: wp(10),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#000',
              fontFamily: fontFamily.poppins400,
              fontSize: fontSize(12),
            }}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={brands}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginHorizontal: wp(17),
          marginTop: hp(24),
        }}
      />
    </SafeAreaView>
  );
};
export default ShopByBrandsComponent;
