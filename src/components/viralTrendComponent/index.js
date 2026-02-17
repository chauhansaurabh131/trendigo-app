import React from 'react';
import {
  FlatList,
  Image,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {images} from '../../assets';
const ViralTrendyComponet = () => {
  const viralData = [
    {id: '1', image: images.viral_trendy},
    {id: '2', image: images.viral_trendy},
    {id: '3', image: images.viral_trendy},
  ];

  const renderItem = ({item}) => (
    <View
      style={{
        width: wp(195.55),
        height: hp(286),
        marginRight: wp(18),
      }}>
      <Image
        source={item.image}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
        }}
      />

      {/* Play Button Overlay */}
      {/* <TouchableOpacity */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={images.video_play}
          style={{
            width: hp(38.22),
            height: hp(38.22),
          }}
        />
      </View>
      {/* </TouchableOpacity> */}
    </View>
  );
  return (
    <SafeAreaView>
      <View style={{marginLeft: wp(17)}}>
        <Text
          style={{
            color: '#000',
            fontFamily: fontFamily.poppins600,
            fontSize: fontSize(18),
          }}>
          Viral Trends
        </Text>
      </View>

      <FlatList
        data={viralData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: wp(17),
          marginTop: hp(16),
        }}
      />
    </SafeAreaView>
  );
};
export default ViralTrendyComponet;
