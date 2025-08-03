import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {images} from '../../assets';
import {fontFamily, fontSize, hp, Touchable} from '../../utils/helpers';
import {colors} from '../../utils/colors'; // Make sure your image paths are correct

// 🔹 Each image has a title
const allItems = [
  {image: images.image, title: 'Jeans'},
  {image: images.image_one, title: 'Kurta'},
  {image: images.image_two, title: 'Saree'},
  {image: images.image_three, title: 'Shirt'},
  {image: images.image_four, title: 'Top'},
  {image: images.image_five, title: 'Dress'},
  {image: images.image_six, title: 'T-Shirt'},
  {image: images.image_seven, title: 'Hoodie'},
  {image: images.image, title: 'Lehenga'},
  {image: images.image_one, title: 'Jacket'},
  {image: images.image_two, title: 'Shorts'},
  {image: images.image_three, title: 'Skirt'},
  {image: images.image_four, title: 'Blazer'},
  {image: images.image_five, title: 'Tracksuit'},
  {image: images.image_six, title: 'Suit'},
  {image: images.image_seven, title: 'Sweater'},
];

// 🔹 Group items into pairs (2 rows)
const groupItemsInPairs = data => {
  const result = [];
  for (let i = 0; i < data.length; i += 2) {
    result.push(data.slice(i, i + 2));
  }
  return result;
};

const HomeAllProductCategoryComponent = () => {
  const itemPairs = groupItemsInPairs(allItems);

  return (
    <SafeAreaView>
      <FlatList
        data={itemPairs}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={({item}) => (
          <View style={styles.imageColumn}>
            {item.map((entry, idx) => (
              <Touchable
                key={idx}
                style={styles.itemContainer}
                activeOpacity={0.6}
                onPress={() => {
                  console.log(' === var ===> ', entry);
                }}>
                <View style={styles.imageWrapper}>
                  <Image source={entry.image} style={styles.image} />
                </View>
                <Text style={styles.label}>{entry.title}</Text>
              </Touchable>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageColumn: {
    marginHorizontal: 10,
    justifyContent: 'space-between',
    // paddingLeft: 2,
  },
  itemContainer: {
    alignItems: 'center',
    marginVertical: 1,
  },
  imageWrapper: {
    // borderWidth: 1,
    borderColor: '#ccc', // gray border
    borderRadius: 16,
    // width: 102,
    // height: 102,
    // padding: 0.5, // padding around image
  },
  image: {
    width: hp(100),
    height: hp(100),
    borderRadius: 12,
  },
  label: {
    marginTop: 6,
    fontSize: fontSize(14),
    color: colors.pureBlack,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: fontFamily.poppins400,
  },
});

export default HomeAllProductCategoryComponent;
