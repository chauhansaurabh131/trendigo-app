import React, {useState, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import {images} from '../../assets';
import {hp, wp} from '../../utils/helpers';

const {width} = Dimensions.get('window');

const ProductFullImageComponets = () => {
  const groupOneImages = [
    images.productImageTwo,
    images.productImageOne,
    images.productImageThree,
    images.productImageFour,
  ];

  const groupTwoImages = [
    images.productImageFive,
    images.productImageSix,
    images.productImageSeven,
    images.productImageFive,
  ];

  const [selectedGroupKey, setSelectedGroupKey] = useState('groupOne');
  const [selectedGroup, setSelectedGroup] = useState(groupOneImages);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleGroupChange = (group, key) => {
    setSelectedGroup(group);
    setSelectedGroupKey(key);
    setActiveIndex(0);
    flatListRef.current?.scrollToIndex({index: 0, animated: false});
  };

  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Big Image Carousel */}
      <View style={styles.carouselWrapper}>
        <FlatList
          ref={flatListRef}
          data={selectedGroup}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({item}) => (
            <View style={styles.imageWrapper}>
              <Image source={item} style={styles.mainImage} />
            </View>
          )}
        />

        {/* Pagination */}
        <View style={styles.paginationContainer}>
          {selectedGroup.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: activeIndex === index ? '#5029F4' : '#888',
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Thumbnails */}
      <View style={styles.thumbnailsRow}>
        <TouchableOpacity
          onPress={() => handleGroupChange(groupOneImages, 'groupOne')}
          style={{marginRight: hp(20)}}>
          <Image
            source={groupOneImages[0]}
            style={[
              styles.thumbnail,
              {
                borderWidth: selectedGroupKey === 'groupOne' ? 2 : 0,
                borderColor:
                  selectedGroupKey === 'groupOne' ? '#5029F4' : 'transparent',
              },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleGroupChange(groupTwoImages, 'groupTwo')}>
          <Image
            source={groupTwoImages[0]}
            style={[
              styles.thumbnail,
              {
                borderWidth: selectedGroupKey === 'groupTwo' ? 2 : 0,
                borderColor:
                  selectedGroupKey === 'groupTwo' ? '#5029F4' : 'transparent',
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // flex: 1,
    // paddingTop: 20,
  },
  carouselWrapper: {
    position: 'relative',
    height: hp(457),
    width: width,
  },
  imageWrapper: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    width: width,
    height: hp(457),
    resizeMode: 'cover',
    borderRadius: wp(15),
  },
  paginationContainer: {
    position: 'absolute',
    bottom: hp(20),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: hp(16),
    height: hp(16),
    borderRadius: wp(50),
    marginHorizontal: wp(5),
  },
  thumbnailsRow: {
    flexDirection: 'row',
    paddingHorizontal: wp(20),
    marginTop: hp(20),
    alignSelf: 'center',
  },
  thumbnail: {
    width: hp(45),
    height: hp(50),
    resizeMode: 'stretch',
    borderRadius: wp(10),
  },
});

export default ProductFullImageComponets;
