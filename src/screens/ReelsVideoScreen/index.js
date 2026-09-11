import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  EyeIcon,
  HeartIcon,
  images,
  WhiteArrow,
  WhiteHeartIcon,
} from '../../assets';
import {colors} from '../../utils/colors';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import Video from 'react-native-video';
const ReelsVideoScreen = () => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const route = useRoute();

  const {videos, selectedId} = route.params;
  console.log(videos, 'VIDEO=======>');
  const {width, height} = Dimensions.get('window');

  const selectedIndex = videos.findIndex(
    item => String(item.id) === String(selectedId),
  );
  const [pausedVideoId, setPausedVideoId] = useState(null);

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
      setPausedVideoId(null);
    }
  }).current;
  const renderItem = ({item, index}) => (
    <View style={{width, height}}>
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1}}
        onPress={() => setPausedVideoId(item.id)}>
        <Video
          source={item.video}
          style={{width, height}}
          resizeMode="cover"
          repeat
          paused={pausedVideoId === item.id || currentIndex !== index}
        />
      </TouchableOpacity>

      {/* Top Header */}
      <View
        style={{
          position: 'absolute',
          top: hp(24),
          left: wp(24),

          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <WhiteArrow />
        </TouchableOpacity>

        <Text
          style={{
            color: '#fff',
            fontSize: fontSize(18),
            fontFamily: fontFamily.poppins500,
            marginLeft: wp(30),
          }}>
          {item.category}
        </Text>
      </View>

      <View style={{position: 'absolute', right: wp(29), bottom: hp(151)}}>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          {liked ? (
            <HeartIcon />
          ) : (
            <WhiteHeartIcon /> // white heart
          )}
        </TouchableOpacity>
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: fontSize(12),
              fontFamily: fontFamily.poppins400,
              // marginLeft: wp(30),
              textAlign: 'center',
              marginTop: hp(4),
            }}>
            {item.likes}
          </Text>
        </View>
      </View>

      <View style={{position: 'absolute', right: wp(29), bottom: hp(85)}}>
        <TouchableOpacity>
          <EyeIcon />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: fontSize(12),
              fontFamily: fontFamily.poppins400,
              // marginLeft: wp(30),
              // marginTop: hp(2),
              textAlign: 'center',
            }}>
            {item.views}
          </Text>
        </View>
      </View>

      <View style={{position: 'absolute', left: wp(37), bottom: hp(35)}}>
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: fontSize(16),
              fontFamily: fontFamily.poppins700,
            }}>
            {item.title}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: fontSize(16),
              fontFamily: fontFamily.poppins400,
            }}>
            {item.description}
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        pagingEnabled
        initialScrollIndex={selectedIndex}
        vertical
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        onScrollBeginDrag={() => setPausedVideoId(null)}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 80,
        }}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        keyExtractor={item => item.id}
      />

      {pausedVideoId === videos[currentIndex]?.id && (
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
          <TouchableOpacity onPress={() => setPausedVideoId(null)}>
            <Image
              source={images.video_play}
              style={{
                width: hp(38.22),
                height: hp(38.22),
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ReelsVideoScreen;
