// import React, {useState, useRef} from 'react';
// import {
//   Image,
//   SafeAreaView,
//   View,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   StyleSheet,
// } from 'react-native';
// import {images} from '../../assets';
// import {hp} from '../../utils/helpers';
// import {useNavigation} from '@react-navigation/native';

// const {width} = Dimensions.get('window');

// // const ProductImageComponent = ({product}) => {
// const ProductImageComponent = ({
//   product,
//   setSelectedColor,
//   setSelectedVariant,
// }) => {
//   const navigation = useNavigation();

//   const variants = product?.variants || [];

//   // console.log(variants, 'variants');

//   // main screen images (default group)
//   // const variantImages = variants.map(v =>
//   //   (v.images || [])
//   //     .filter(img => img.imageUrl)
//   //     .map(img => ({uri: img.imageUrl})),
//   // );
//   // console.log(variantImages, 'variatns images');

//   const fullVariantImages = variants.map(v =>
//     (v.images || [])
//       .filter(img => img.imageUrl)
//       .map(img => ({uri: img.imageUrl})),
//   );

//   console.log(fullVariantImages, 'FULLVAIRANTS======>');
//   const thumbnailImages = variants.map(v => {
//     const images = v.images || [];

//     const mainImage = images.find(img => img.isSelectedForMainScreen);
//     const finalImage = mainImage || images[0];

//     return finalImage ? {uri: finalImage.imageUrl} : null;
//   });
//   console.log(thumbnailImages, 'thumbnailImages====>');
//   const [selectedGroupKey, setSelectedGroupKey] = useState('groupOne');
//   // const [selectedGroup, setSelectedGroup] = useState(groupOneImages);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const flatListRef = useRef(null);
//   // const [selectedGroup, setSelectedGroup] = useState(mainImages);
//   const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
//   // const [selectedGroup, setSelectedGroup] = useState(variantImages[0] || []);
//   const [selectedGroup, setSelectedGroup] = useState(
//     fullVariantImages[0] || [],
//   );

//   const handleGroupChange = index => {
//     console.log('THUMBNAIL CLICKED INDEX:', index);
//     console.log('SELECTED VARIANT IMAGES:', thumbnailImages[index]);

//     const variant = product?.variants[index];
//     setSelectedVariant && setSelectedVariant(variant);
//     const colorObj = variant?.variants?.find(v => v.key === 'color');

//     if (colorObj && setSelectedColor) {
//       console.log('COLOR FROM THUMBNAIL:', colorObj.value);
//       setSelectedColor(colorObj.value);
//     }

//     setSelectedVariantIndex(index);
//     // setSelectedGroup(variantImages[index]);
//     setSelectedGroup(fullVariantImages[index]);
//     setActiveIndex(0);

//     flatListRef.current?.scrollToIndex({index: 0, animated: false});
//   };
//   const handleScroll = event => {
//     const index = Math.round(event.nativeEvent.contentOffset.x / width);
//     setActiveIndex(index);
//   };

//   console.log(
//     'Selected Group Images =>',
//     JSON.stringify(selectedGroup, null, 2),
//   );

//   console.log('VARIANTS DATA =>', JSON.stringify(variants, null, 2));
//   console.log('Thumbnail Images =>', JSON.stringify(thumbnailImages, null, 2));
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Big Image Carousel */}
//       <View style={styles.carouselWrapper}>
//         <FlatList
//           ref={flatListRef}
//           data={selectedGroup}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           keyExtractor={(_, index) => index.toString()}
//           onScroll={handleScroll}
//           scrollEventThrottle={16}
//           renderItem={({item, index}) => (
//             <View style={styles.imageWrapper}>
//               <TouchableOpacity
//                 activeOpacity={0.9}
//                 onPress={() =>
//                   navigation.navigate('FullImage', {
//                     images: selectedGroup, // current group images
//                     startIndex: index, // open at the tapped image index
//                     groupKey: selectedGroupKey, // 'groupOne' | 'groupTwo'
//                   })
//                 }>
//                 {/* <Image source={item} style={styles.mainImage} />
//                  */}
//                 <Image source={{uri: item.uri}} style={styles.mainImage} />
//               </TouchableOpacity>
//             </View>
//           )}
//         />

//         {/* Pagination */}
//         <View style={styles.paginationContainer}>
//           {selectedGroup.map((_, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.dot,
//                 {
//                   backgroundColor: activeIndex === index ? '#8225AF' : '#888',
//                 },
//               ]}
//             />
//           ))}
//         </View>
//       </View>

//       {/* Thumbnails */}
//       <View style={styles.thumbnailsRow}>
//         {thumbnailImages.map((img, index) => {
//           if (!img?.uri) return null;

//           return (
//             <TouchableOpacity
//               key={index}
//               onPress={() => handleGroupChange(index)}
//               style={{marginRight: hp(20)}}>
//               <Image
//                 source={{uri: img.uri}}
//                 style={[
//                   styles.thumbnail,
//                   {
//                     borderWidth: selectedVariantIndex === index ? 2 : 0,
//                     borderColor: '#8225AF',
//                   },
//                 ]}
//               />
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     // flex: 1,
//     // paddingTop: 20,
//   },
//   carouselWrapper: {
//     position: 'relative',
//     height: 457,
//     width: width,
//   },
//   imageWrapper: {
//     width: width,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mainImage: {
//     width: width,
//     height: 457,
//     // resizeMode: 'contain',
//     // borderRadius: 15, // Add border radius to large image
//   },
//   paginationContainer: {
//     position: 'absolute',
//     bottom: 20,
//     flexDirection: 'row',
//     alignSelf: 'center',
//   },
//   dot: {
//     width: hp(16),
//     height: hp(16),
//     borderRadius: 50,
//     marginHorizontal: 5,
//   },
//   thumbnailsRow: {
//     flexDirection: 'row',
//     // justifyContent: 'space-around',
//     paddingHorizontal: 20,
//     marginTop: 20,
//     alignSelf: 'center',
//   },
//   thumbnail: {
//     width: hp(45),
//     height: hp(50),
//     resizeMode: 'stretch',
//     borderRadius: 10,
//   },
// });

// export default ProductImageComponent;

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
import {hp} from '../../utils/helpers';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

// const ProductImageComponent = ({product}) => {
const ProductImageComponent = ({
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
  // console.log(fullVariantImages, 'FULLVAIRANTS======>');
  const thumbnailImages = variants.map(v => {
    const images = v.images || [];

    const mainImage = images.find(img => img.isSelectedForMainScreen);
    const finalImage = mainImage || images[0];

    return finalImage ? {uri: finalImage.imageUrl} : null;
  });
  console.log(thumbnailImages, 'thumbnailImages====>');
  const [selectedGroupKey, setSelectedGroupKey] = useState('groupOne');
  // const [selectedGroup, setSelectedGroup] = useState(groupOneImages);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  // const [selectedGroup, setSelectedGroup] = useState(mainImages);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  // const [selectedGroup, setSelectedGroup] = useState(variantImages[0] || []);
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
    console.log('THUMBNAIL CLICKED INDEX:', index);
    console.log('SELECTED VARIANT IMAGES:', thumbnailImages[index]);

    const variant = product?.variants[index];
    setSelectedVariant && setSelectedVariant(variant);
    const colorObj = variant?.variants?.find(v => v.key === 'color');

    if (colorObj && setSelectedColor) {
      console.log('COLOR FROM THUMBNAIL:', colorObj.value);
      setSelectedColor(colorObj.value);
    }

    setSelectedVariantIndex(index);
    // setSelectedGroup(variantImages[index]);
    setSelectedGroup(fullVariantImages[index]);
    setActiveIndex(0);

    flatListRef.current?.scrollToIndex({index: 0, animated: false});
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
                  backgroundColor: activeIndex === index ? '#8225AF' : '#888',
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
                    borderColor: '#8225AF',
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
    // resizeMode: 'contain',
    // borderRadius: 15, // Add border radius to large image
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
