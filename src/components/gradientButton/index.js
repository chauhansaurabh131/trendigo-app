import React from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';

const GradientButton = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  disabled = false,
  loading = false,
  icon,
}) => {
  const isDisabled = disabled || loading;

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={[{marginTop: hp(1)}, buttonStyle, isDisabled && {opacity: 0.6}]}
        activeOpacity={0.7}
        onPress={onPress}
        disabled={isDisabled}>
        <LinearGradient
          colors={isDisabled ? ['#5029F3', '#7251FF'] : ['#5029F3', '#7251FF']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1.2}}
          style={[
            {
              width: '100%',
              height: hp(50),
              borderRadius: wp(25),
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              overflow: 'hidden',
            },
            buttonStyle,
          ]}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {icon && <View style={{marginRight: wp(8)}}>{icon}</View>}
              <Text
                style={[
                  {
                    color: 'white',
                    fontSize: fontSize(16),
                    lineHeight: hp(24),
                    fontFamily: fontFamily.poppins400,
                  },
                  textStyle,
                ]}>
                {title}
              </Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GradientButton;
