import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {fontFamily, fontSize, hp} from '../../utils/helpers';
import {colors} from '../../utils/colors';

const ratingsData = [
  {rating: 5, count: 50},
  {rating: 4, count: 60},
  {rating: 3, count: 45},
  {rating: 2, count: 10},
  {rating: 1, count: 80},
];

const MAX_COUNT = 100;

const totalCount = ratingsData.reduce((sum, item) => sum + item.count, 0);

const ReviewRatingComponent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.totalCountText}>
        {totalCount} <Text style={{color: '#8F8F8F'}}>Verified Buyers</Text>
      </Text>

      {ratingsData.map(({rating, count}) => {
        const barWidth = (count / MAX_COUNT) * 100;
        return (
          <View key={rating} style={styles.row}>
            <Text style={styles.ratingText}>{rating}</Text>
            <View style={styles.barContainer}>
              <LinearGradient
                colors={['#0F52BA', '#8225AF']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[styles.barFill, {width: `${barWidth}%`}]}
              />
            </View>
            <Text style={styles.countText}>{count}</Text>
          </View>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    marginTop: 10,
  },
  totalCountText: {
    color: colors.pureBlack,
    fontSize: fontSize(14),
    fontFamily: fontFamily.poppins400,
    lineHeight: hp(18),
    marginBottom: hp(20),
    // paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    width: 25,
    fontSize: fontSize(12),
    lineHeight: hp(16),
    fontFamily: fontFamily.poppins500,
    color: colors.pureBlack,
  },
  barContainer: {
    flex: 1,
    height: 2,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  barFill: {
    height: 2,
    backgroundColor: '#0F52BA',
    borderRadius: 5,
  },
  countText: {
    width: 35,
    fontSize: fontSize(12),
    lineHeight: hp(16),
    fontFamily: fontFamily.poppins500,
    color: colors.pureBlack,
    textAlign: 'right',
  },
});

export default ReviewRatingComponent;
