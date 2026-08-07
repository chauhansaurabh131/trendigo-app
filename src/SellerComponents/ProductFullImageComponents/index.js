import React, {useState, useRef, useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const ProductFullImageComponents = ({
  product,
  setSelectedColor,
  setSelectedVariant,
}) => {
  const navigation = useNavigation();

  const variants = product?.variants || [];

  const fullVariantImages = variants.map(v =>
    (v.images || [])
      .filter(img => img.imageUrl)
      .map(img => ({uri: img.imageUrl})),
  );
  // console.log(
  //   'PRODUCT RECEIVED IN IMAGE COMPONENT =>',
  //   JSON.stringify(product, null, 2),
  // );

  const imageVariants = variants.filter(item => item.images?.length > 0);
  const thumbnailImages = imageVariants.map(v => {
    const mainImage =
      v.images.find(img => img.isSelectedForMainScreen) || v.images[0];

    return {
      uri: mainImage.imageUrl,
    };
  });
  console.log(thumbnailImages, 'thumbnailImages====>');
  const [selectedGroupKey, setSelectedGroupKey] = useState('groupOne');
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(
    fullVariantImages[0] || [],
  );

  useEffect(() => {
    if (!variants.length) return;

    const firstVariantWithImage = variants.findIndex(v => v.images?.length > 0);

    if (firstVariantWithImage !== -1) {
      setSelectedGroup(fullVariantImages[firstVariantWithImage]);

      setSelectedVariantIndex(firstVariantWithImage);
    }
  }, [variants]);

  const handleGroupChange = index => {
    // console.log('=================================');
    // console.log('THUMBNAIL CLICKED INDEX =>', index);

    // Get variant from filtered imageVariants
    const variant = imageVariants[index];

    console.log('SELECTED IMAGE VARIANT =>', JSON.stringify(variant, null, 2));

    // Get color from variant
    const colorObj = variant?.variants?.find(item => item.key === 'color');

    console.log('COLOR OBJECT =>', colorObj);

    if (colorObj?.value) {
      console.log('SELECTED COLOR =>', colorObj.value);
      setSelectedColor(colorObj.value);
    }

    // Update thumbnail selection
    setSelectedVariantIndex(index);

    // Update carousel images
    const variantImages = (variant?.images || []).map(img => ({
      uri: img.imageUrl,
    }));

    // console.log('VARIANT IMAGES =>', JSON.stringify(variantImages, null, 2));

    setSelectedGroup(variantImages);

    // Reset carousel to first image
    setActiveIndex(0);

    flatListRef.current?.scrollToIndex({
      index: 0,
      animated: false,
    });
  };
  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  // console.log(
  //   'Selected Group Images =>',
  //   JSON.stringify(selectedGroup, null, 2),
  // );

  // console.log('VARIANTS DATA =>', JSON.stringify(variants, null, 2));
  // console.log('Thumbnail Images =>', JSON.stringify(thumbnailImages, null, 2));

  // console.log('MAIN IMAGE URI =>', selectedGroup?.[0]?.uri);
  return (
    <SafeAreaView style={styles.container}>
      {/* Big Image Carousel */}
      <View style={styles.carouselWrapper}>
        <FlatList
          ref={flatListRef}
          key={selectedVariantIndex}
          data={selectedGroup}
          // data={selectedGroup}
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
                {/* <Image source={item} style={styles.mainImage} />
                 */}
                <Image source={{uri: item.uri}} style={styles.mainImage} />
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
                  backgroundColor: activeIndex === index ? '#5029F3' : '#888',
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Thumbnails */}
      <View style={styles.thumbnailsRow}>
        {thumbnailImages.map((img, index) => {
          if (!img?.uri) return null;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleGroupChange(index)}
              style={{marginRight: hp(20)}}>
              <Image
                source={{uri: img.uri}}
                style={[
                  styles.thumbnail,
                  {
                    borderWidth: selectedVariantIndex === index ? 2 : 0,
                    borderColor: '#5029F3',
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  carouselWrapper: {
    position: 'relative',
    // height: 457,
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
    // justifyContent: 'space-around',
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

export default ProductFullImageComponents;
