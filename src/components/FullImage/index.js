// FullImage.js
import React, {useRef, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {hp} from '../../utils/helpers';
import {BackIcon} from '../../assets';

const {width, height} = Dimensions.get('window');

const FullImage = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Expecting route.params: { images: Array<ImageSource>, startIndex: number }
  const {images = [], startIndex = 0} = route.params || {};
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const flatListRef = useRef(null);

  // Stable index update after momentum ends
  const onMomentumScrollEnd = e => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(i);
  };

  return (
    <View style={styles.container}>
      {/* Header with back */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          {/*<Text style={styles.backText}>{'< Back'}</Text>*/}

          <BackIcon />
        </TouchableOpacity>
        <View style={{width: 60}} />
      </View>

      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        initialScrollIndex={startIndex}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        keyExtractor={(_, idx) => String(idx)}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({item}) => (
          <View style={styles.slide}>
            <Image source={item} style={styles.fullImage} />
          </View>
        )}
      />

      {/* Dot pagination at the bottom */}
      <View style={styles.dotsContainer}>
        {images.map((_, i) => {
          const isActive = activeIndex === i;
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
  );
};

const styles = StyleSheet.create({
  // Black/white background: choose what suits your design.
  // If images have white background and you want them to blend, use white.
  container: {flex: 1, backgroundColor: 'white'},

  header: {
    // position: 'absolute',
    // top: 0,
    // zIndex: 10,
    width,
    // paddingTop: hp(16),
    // paddingHorizontal: hp(16),
    // height: hp(64),
    // backgroundColor: 'rgba(0,0,0,0.35)',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  backBtn: {marginTop: 17, marginLeft: 17, marginBottom: 22},
  backText: {color: 'white', fontSize: 16},

  slide: {width, height, alignItems: 'center', justifyContent: 'center'},

  // Use contain to keep aspect ratio; swap to 'cover' if preferred
  fullImage: {width, height: '92%', top: -50},

  dotsContainer: {
    position: 'absolute',
    bottom: hp(24),
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: hp(16),
    height: hp(16),
    borderRadius: hp(8),
    marginHorizontal: hp(6),
  },
});

export default FullImage;
