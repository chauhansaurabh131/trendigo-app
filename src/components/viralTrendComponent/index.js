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
import {navigate} from '../../navigations/NavigationService';
import {useNavigation} from '@react-navigation/native';
const ViralTrendyComponet = ({data}) => {
  const navigation = useNavigation();
  const viralData = [
    {
      id: '1',
      category: 'Men',
      video: require('../../assets/videos/reel3.mp4'),
      image: images.viral_image1,
      views: '1.4K',
      likes: '4.4K',
      title: 'Men Summary Outfit',
      description: 'Men',
    },
    {
      id: '2',
      category: 'Women',
      image: images.viral_trendy,
      video: require('../../assets/videos/reel2.mp4'),
      views: '8.2K',
      likes: '3.1K',
      title: 'Summer Collection',
      description: 'Women',
    },
    {
      id: '3',
      category: 'Kids',
      image: images.viral_image1,
      video: require('../../assets/videos/reel1.mp4'),
      views: '8.2K',
      likes: '3.1K',
      title: 'Kids Collection',
      description: 'Kids',
    },
  ];

  const renderItem = ({item}) => (
    <View
      style={{
        width: hp(195.55),
        height: hp(286),
        marginRight: wp(18),
      }}>
      <Image
        source={item.image}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
          borderRadius: wp(14),
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ReelsScreen', {
              videos: viralData,
              selectedId: item.id,
            })
          }>
          <Image
            source={images.video_play}
            style={{
              width: hp(38.22),
              height: hp(38.22),
            }}
          />
        </TouchableOpacity>
      </View>
      {/* </TouchableOpacity> */}
    </View>
  );
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
          Viral Trends
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('ViralTrends')}
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
            All Reels
          </Text>
        </TouchableOpacity>
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
