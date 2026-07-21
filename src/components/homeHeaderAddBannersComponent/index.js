import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {colors} from '../../utils/colors';
import {images} from '../../assets';
import {hp} from '../../utils/helpers';
import {fetchBannerRequest} from '../../redux/actions/bannerActions';
import {useSelector, useDispatch} from 'react-redux';
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const HomeHeaderAddBannersComponent = () => {
  const dispatch = useDispatch();

  const {banners, loading} = useSelector(state => state.banner);
  useEffect(() => {
    dispatch(fetchBannerRequest());
  }, []);
  //found the Banner Images
  const bannerImages =
    banners?.map(banner => banner.images?.[0]?.imageUrl)?.filter(Boolean) || [];
  // console.log('BANNER IMAGES', bannerImages);
  // console.log('BANNERS', banners);

  //  ADD DUPLICATE IMAGE FOR INFINITE SCROLL
  const bannerData =
    bannerImages.length > 0 ? [...bannerImages, bannerImages[0]] : [];

  const flatListRef = useRef(null);
  const currentIndexRef = useRef(0);
  const [visibleIndex, setVisibleIndex] = useState(0); // for rendering dots

  // Auto Scroll
  useEffect(() => {
    if (bannerData.length <= 1) return;

    const interval = setInterval(() => {
      let nextIndex = currentIndexRef.current + 1;

      if (nextIndex === bannerData.length - 1) {
        flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});

        setTimeout(() => {
          flatListRef.current?.scrollToIndex({index: 0, animated: false});
          currentIndexRef.current = 0;
          setVisibleIndex(0);
        }, 300);
      } else {
        flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
        currentIndexRef.current = nextIndex;
        setVisibleIndex(nextIndex);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [bannerData]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View>
        <FlatList
          ref={flatListRef}
          // data={imageData}
          data={bannerData} // ✅ FIXED
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={{width: SCREEN_WIDTH}}>
              <Image
                source={{uri: item}}
                // resizeMode="stretch"
                resizeMode="cover"
                style={{
                  width: SCREEN_WIDTH,
                  // height: hp(169),
                  height: hp(200),
                }}
              />
            </View>
          )}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
          scrollEventThrottle={16}
        />

        {/* Pagination Dots inside image */}
        <View style={styles.paginationContainer}>
          {/* {originalImages.map((_, i) => { */}
          {bannerData.slice(0, -1).map((_, i) => {
            const isActive = visibleIndex === i;
            return (
              <View
                key={i}
                style={[
                  styles.dot,
                  {backgroundColor: isActive ? '#8225AF' : '#FFFFFF'},
                ]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    bottom: hp(12),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: hp(16),
    height: hp(16),
    borderRadius: 25,
    marginHorizontal: hp(4),
  },
});

export default HomeHeaderAddBannersComponent;
