import React from 'react';
import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import {images} from '../../assets';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
const LatestTrendyComponet = () => {
  //
  const trendyImages = [
    {id: '1', image: images.latest_trendy},
    {id: '2', image: images.latest_trendy},
    {id: '3', image: images.latest_trendy},
    // {id: '4', image: images.trending_three},
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{marginLeft: wp(17)}}>
        <Text
          style={{
            color: '#000',
            fontFamily: fontFamily.poppins600,
            fontSize: fontSize(18),
          }}>
          Latest Genzy Trends
        </Text>
      </View>
      {/* <View style={{marginLeft: wp(17), marginTop: hp(19)}}> */}
      <View style={{marginTop: hp(19)}}>
        <FlatList
          data={trendyImages}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: wp(17)}}
          renderItem={({item}) => (
            <Image
              source={item.image}
              style={{
                width: wp(315),
                height: hp(226),
                resizeMode: 'contain',
                marginRight: wp(13),
                borderRadius: 12,
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default LatestTrendyComponet;
