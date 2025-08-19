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
import {hp} from '../../utils/helpers';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const ProductImageComponent = () => {
  const navigation = useNavigation();

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
          renderItem={({item, index}) => (
            <View style={styles.imageWrapper}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate('FullImage', {
                    images: selectedGroup, // current group images
                    startIndex: index, // open at the tapped image index
                    groupKey: selectedGroupKey, // 'groupOne' | 'groupTwo'
                  })
                }>
                <Image source={item} style={styles.mainImage} />
              </TouchableOpacity>
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
                  backgroundColor: activeIndex === index ? '#8225AF' : '#888',
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
                  selectedGroupKey === 'groupOne' ? '#8225AF' : 'transparent',
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
                  selectedGroupKey === 'groupTwo' ? '#8225AF' : 'transparent',
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
    height: 457,
    width: width,
  },
  imageWrapper: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    width: width,
    height: 457,
    resizeMode: 'contain',
    borderRadius: 15, // Add border radius to large image
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: hp(16),
    height: hp(16),
    borderRadius: 50,
    marginHorizontal: 5,
  },
  thumbnailsRow: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  thumbnail: {
    width: hp(45),
    height: hp(50),
    resizeMode: 'stretch',
    borderRadius: 10,
  },
});

export default ProductImageComponent;
