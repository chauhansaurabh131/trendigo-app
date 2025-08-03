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

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const originalImages = [
  images.sale_banner_img,
  images.men_collection_img,
  images.women_collection_img,
  images.kids_collection_img,
];

const imageData = [...originalImages, originalImages[0]];

const HomeHeaderAddBannersComponent = () => {
  const flatListRef = useRef(null);
  const currentIndexRef = useRef(0);
  const [visibleIndex, setVisibleIndex] = useState(0); // for rendering dots

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndexRef.current + 1;

      if (nextIndex === imageData.length) {
        return;
      }

      if (nextIndex === imageData.length - 1) {
        flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({index: 0, animated: false});
          currentIndexRef.current = 0;
          setVisibleIndex(0);
        }, 300);
      } else {
        flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
        currentIndexRef.current = nextIndex;
        setVisibleIndex(nextIndex); // update for dots
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View>
        <FlatList
          ref={flatListRef}
          data={imageData}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={{width: SCREEN_WIDTH}}>
              <Image
                source={item}
                style={{
                  width: SCREEN_WIDTH,
                  height: hp(169),
                  resizeMode: 'cover',
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
          {originalImages.map((_, i) => {
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
