import React, {useState, useCallback, useMemo} from 'react';
import {SafeAreaView, View, Image, Pressable} from 'react-native';
import {images} from '../../assets';
import {hp} from '../../utils/helpers';

// Star sizes
const STAR_SIZE = {width: hp(25), height: hp(23)};
const TOTAL_STARS = 5;

// Individual Star component
const Star = ({filled, onPress, isLast}) => {
  const source = filled ? images.star_fulfil_icon : images.star_icon;
  return (
    <Pressable onPress={onPress} hitSlop={8}>
      <Image
        source={source}
        style={{
          width: STAR_SIZE.width,
          height: STAR_SIZE.height,
          marginRight: isLast ? 0 : hp(10), // space between but none after last star
        }}
      />
    </Pressable>
  );
};

// StarRating component
const StarRating = ({rating, onChange, max = TOTAL_STARS}) => {
  const stars = useMemo(
    () => Array.from({length: max}, (_, i) => i + 1),
    [max],
  );

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {stars.map((starValue, idx) => (
        <Star
          key={starValue}
          filled={starValue <= rating}
          onPress={() => onChange(starValue)}
          isLast={idx === stars.length - 1}
        />
      ))}
    </View>
  );
};

// Main screen
const RatingStatComponent = () => {
  const [rating, setRating] = useState(0);

  const handleChange = useCallback(value => {
    setRating(value);
    // you can call an API or do something with the rating here
  }, []);

  return (
    <SafeAreaView>
      <StarRating rating={rating} onChange={handleChange} />
    </SafeAreaView>
  );
};

export default RatingStatComponent;
