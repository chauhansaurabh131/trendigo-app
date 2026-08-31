import React from 'react';
import {SafeAreaView, View, Text, FlatList} from 'react-native';
import {colors} from '../../utils/colors';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {BrandIcon} from '../../assets';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const AllBrandsScreen = () => {
  const navigation = useNavigation();
  const brandsData = [
    {
      id: '1',
      name: 'Pull & Bear',
      category: 'Women',
      products: '2,345',
    },

    {
      id: '2',
      name: 'Adidas',
      category: 'Men',
      products: '1,200',
    },
    {
      id: '3',
      name: 'Levis',
      category: 'Unisex',
      products: '3,100',
    },
    {
      id: '4',
      name: 'Levis',
      category: 'Unisex',
      products: '3,100',
    },
    {
      id: '5',
      name: 'Levis',
      category: 'Unisex',
      products: '3,100',
    },
    {
      id: '6',
      name: 'Levis',
      category: 'Unisex',
      products: '3,100',
    },
    {
      id: '7',
      name: 'Levis',
      category: 'Unisex',
      products: '3,100',
    },
  ];
  const {storeData} = useSelector(state => state.sellerStore);
  console.log('STORE DATA ALL BRANDS SCREEN', storeData);
  const renderAllBrand = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MainTabs', {
            screen: 'SearchStack',
            params: {
              screen: 'SellerProfile',
              params: {store: storeData},
            },
          });
        }}
        style={{
          width: hp(162),
          // height: hp(212),
          borderColor: '#E8E8E8',
          borderWidth: 1,
          borderRadius: wp(14),
        }}>
        <View style={{marginTop: hp(53), alignItems: 'center'}}>
          <BrandIcon />
        </View>
        <View
          style={{
            backgroundColor: '#E8E8E8',
            height: hp(1),
            marginHorizontal: wp(14),
            marginTop: hp(47),
          }}
        />

        <View style={{marginLeft: wp(17), marginTop: hp(13)}}>
          <Text
            style={{
              color: '#000',
              fontFamily: fontFamily.poppins700,
              fontSize: fontSize(12),
            }}>
            {item.name}
          </Text>
        </View>

        <View style={{marginLeft: wp(17), marginTop: hp(5)}}>
          <Text
            style={{
              color: '#000',
              fontFamily: fontFamily.poppins400,
              fontSize: fontSize(8),
            }}>
            {item.category}
          </Text>
        </View>

        <View
          style={{marginLeft: wp(17), marginTop: hp(5), marginBottom: hp(13)}}>
          <Text style={{color: '#000', fontSize: fontSize(8)}}>
            <Text
              style={{
                fontFamily: fontFamily.poppins600,
              }}>
              {item.products}
              {'  '}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.poppins400,
              }}>
              Products
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <FlatList
        renderItem={renderAllBrand}
        data={brandsData}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{
          marginHorizontal: wp(17),
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingBottom: hp(13),
        }}
      />
    </SafeAreaView>
  );
};
export default AllBrandsScreen;
