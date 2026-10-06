import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
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
import LinearGradient from 'react-native-linear-gradient';
const ReelsVideoScreen = () => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const videoRefs = useRef({});
  const [videoProgress, setVideoProgress] = useState({});
  const [videoDurations, setVideoDurations] = useState({});
  const route = useRoute();

  const {videos, selectedId} = route.params;
  console.log(videos, 'VIDEO=======>');
  const {width, height} = Dimensions.get('window');

  const selectedIndex = videos.findIndex(
    item => String(item.id) === String(selectedId),
  );

  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const [pausedVideoId, setPausedVideoId] = useState(null);

  // const onViewableItemsChanged = useRef(({viewableItems}) => {
  //   if (viewableItems.length > 0) {
  //     setCurrentIndex(viewableItems[0].index);
  //     setPausedVideoId(null);
  //   }
  // }).current;

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;
  const renderItem = ({item, index}) => {
    const currentProgress = videoProgress[item.id] || 0;

    const currentDuration = videoDurations[item.id] || 1;
    const percentage = Math.min(
      ((videoProgress[item.id] || 0) / (videoDurations[item.id] || 1)) * 100,
      100,
    );

    return (
      <View style={{width, height}}>
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 1}}
          onPress={() => {
            setPausedVideoId(prev => (prev === item.id ? null : item.id));
          }}>
          <Video
            ref={ref => {
              if (ref) {
                videoRefs.current[item.id] = ref;
              }
            }}
            progressUpdateInterval={600}
            source={item.video}
            style={{width, height}}
            resizeMode="cover"
            // repeat={false}
            paused={pausedVideoId === item.id || currentIndex !== index}
            onLoad={data => {
              setVideoDurations(prev => ({
                ...prev,
                [item.id]: data.duration,
              }));
            }}
            onProgress={data => {
              console.log(
                'Current:',
                data.currentTime,
                'Duration:',
                videoDurations[item.id],
              );
              if (currentIndex === index) {
                setVideoProgress(prev => ({
                  ...prev,
                  [item.id]: data.currentTime,
                }));
              }
            }}
            onEnd={() => {
              setVideoProgress(prev => ({
                ...prev,
                [item.id]: videoDurations[item.id],
              }));
            }}
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

        <LinearGradient
          colors={['#00000000', '#000000']}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: hp(213),
          }}>
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
        </LinearGradient>
        <TouchableWithoutFeedback
          activeOpacity={1}
          onPress={event => {
            const touchX = event.nativeEvent.locationX;

            const seekPercentage = touchX / width;

            const seekTime = seekPercentage * (videoDurations[item.id] || 0);

            videoRefs.current[item.id]?.seek(seekTime);

            setVideoProgress(prev => ({
              ...prev,
              [item.id]: seekTime,
            }));

            // resume video
            setPausedVideoId(null);
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: hp(4),
              backgroundColor: 'grey',
              borderRadius: wp(10),
            }}>
            <View
              style={{
                width: `${percentage}%`,
                height: '100%',
                backgroundColor: colors.white,
                borderRadius: wp(10),
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
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
