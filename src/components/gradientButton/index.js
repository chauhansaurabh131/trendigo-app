import React from 'react';
import {Text, TouchableOpacity, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {fontFamily, fontSize, hp} from '../../utils/helpers';

const GradientButton = ({title, onPress, buttonStyle, textStyle, disabled}) => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={[{marginTop: hp(1)}, buttonStyle]} // Applying custom button style
        activeOpacity={0.7}
        onPress={onPress}
        disabled={disabled} // Disable the button when disabled is true
      >
        <LinearGradient
          colors={['#0F52BA', '#8225AF']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1.2}}
          style={[
            {
              width: '100%',
              height: hp(50),
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            },
            buttonStyle,
          ]}>
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
            {title} {/* Button text dynamically passed as prop */}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GradientButton;
