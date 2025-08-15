import React from 'react';
import {SafeAreaView, Text, View, FlatList} from 'react-native';
import {fontFamily, fontSize, hp, Touchable} from '../../utils/helpers';
import {GradientColorSearchIcon} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../utils/colors';
import HomeAllProductCategoryComponent from '../../components/homeAllProductCategoryComponent';
import HomeTrendingComponent from '../../components/homeTrendingComponent';

const SearchScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          marginHorizontal: 18,
        }}>
        <View
          activeOpacity={0.6}
          style={{
            marginTop: hp(15),
            width: '100%',
            height: hp(40),
            borderRadius: 25,
            backgroundColor: '#F7F7F7',
            marginBottom: 15,
            justifyContent: 'center',
            paddingHorizontal: hp(15),
          }}>
          <Touchable
            style={{flexDirection: 'row', alignItems: 'center'}}
            activeOpacity={0.6}
            // onPress={() => navigation.navigate('SearchStack')}
          >
            <GradientColorSearchIcon width={hp(16)} height={hp(16)} />
            <Text
              style={{
                marginLeft: hp(15),
                fontSize: fontSize(14),
                lineHeight: hp(20),
                fontFamily: fontFamily.poppins400,
                color: '#979797',
              }}>
              Search for Products
            </Text>
          </Touchable>
        </View>
      </View>

      <FlatList
        data={[{}]} // dummy data
        keyExtractor={(_, index) => index.toString()}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text
              style={{
                color: colors.pureBlack,
                fontSize: fontSize(16),
                fontFamily: fontFamily.poppins700,
                marginHorizontal: 17,
                marginTop: hp(11),
              }}>
              Popular Search Categories
            </Text>

            <View style={{marginTop: hp(25)}}>
              <HomeAllProductCategoryComponent />
            </View>

            <View
              style={{
                width: '100%',
                borderColor: '#E7E7E7',
                borderWidth: 0.7,
                marginTop: hp(25),
              }}
            />

            <View style={{marginTop: hp(23)}}>
              <HomeTrendingComponent />
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
