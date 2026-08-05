import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
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

const SellerReviewRatingComponent = () => {
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
                colors={['#5029F4', '#7251FF']}
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
    marginTop: hp(10),
  },
  totalCountText: {
    color: colors.pureBlack,
    fontSize: fontSize(14),
    fontFamily: fontFamily.poppins400,
    lineHeight: hp(18),
    marginBottom: hp(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(8),
  },
  ratingText: {
    width: wp(25),
    fontSize: fontSize(12),
    lineHeight: hp(16),
    fontFamily: fontFamily.poppins500,
    color: colors.pureBlack,
  },
  barContainer: {
    flex: 1,
    height: hp(2),
    backgroundColor: '#e0e0e0',
    marginHorizontal: wp(5),
    borderRadius: wp(5),
  },
  barFill: {
    height: hp(2),
    backgroundColor: '#0F52BA',
    borderRadius: wp(5),
  },
  countText: {
    width: wp(35),
    fontSize: fontSize(12),
    lineHeight: hp(16),
    fontFamily: fontFamily.poppins500,
    color: colors.pureBlack,
    textAlign: 'right',
  },
});

export default SellerReviewRatingComponent;
