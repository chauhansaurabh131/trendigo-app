import React from 'react';
import {View, Text, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {colors} from '../../utils/colors';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import arrow_icon from '../../assets/images/arrow_back.png';

const WomenCategoryScreen = () => {
  const navigation = useNavigation();

  const renderContent = () => {
    if (type === 'men') {
      return <Text></Text>;
    }
    if (type === 'women') {
      return;
    }
    if (type === 'kids') {
      return;
    }
    if (type === 'beauty') {
      return;
    }
    return null;
  };

  const route = useRoute();
  const {title, image, type} = route.params; // 👈 receive params

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {/* Header */}
      <View
        style={{
          height: hp(57),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // backgroundColor: colors.greyLight,
          paddingHorizontal: wp(16),
        }}>
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={arrow_icon}
            style={{
              width: wp(20),
              height: hp(18),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        {/* Title */}
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            color: colors.black,
            fontSize: fontSize(16),
            fontFamily: fontFamily.poppins400,
            marginRight: wp(20), // 👈 balance for arrow space
          }}>
          {title}
        </Text>

        {/* Right side placeholder (empty for now) */}
        <View style={{width: wp(20)}} />
      </View>

      {/* Image */}
      <View style={{flex: 1}}>
        <Image
          source={image}
          style={{
            width: '100%',
            height: hp(130),
            // borderRadius: 52,
          }}
          resizeMode="cover"
        />
      </View>
      <View style={{flex: 1, padding: 16}}>{renderContent()}</View>
    </SafeAreaView>
  );
};

export default WomenCategoryScreen;
