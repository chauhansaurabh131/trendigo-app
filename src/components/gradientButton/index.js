// import React from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   ActivityIndicator,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {fontFamily, fontSize, hp} from '../../utils/helpers';

// const GradientButton = ({
//   title,
//   onPress,
//   buttonStyle,
//   textStyle,
//   disabled,
//   loading = false,
//    icon,   // ✅ ADD THIS
// }) => {
//   return (
//     <SafeAreaView>
//       <TouchableOpacity
//         style={[{marginTop: hp(1)}, buttonStyle]} // Applying custom button style
//         activeOpacity={0.7}
//         onPress={onPress}
//         // disabled={disabled} // Disable the button when disabled is true
//         disabled={disabled || loading} // ✅ prevent multi click when loading
//       >
//         <LinearGradient
//           colors={['#0F52BA', '#8225AF']}
//           start={{x: 0, y: 0}}
//           end={{x: 1, y: 1.2}}
//           style={[
//             {
//               width: '100%',
//               height: hp(50),
//               borderRadius: 50,
//               alignItems: 'center',
//               justifyContent: 'center',
//               alignSelf: 'center',
//             },
//             buttonStyle,
//           ]}>
//           {/* 🔥 HERE IS THE MAIN CHANGE */}
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text
//               style={[
//                 {
//                   color: 'white',
//                   fontSize: fontSize(16),
//                   lineHeight: hp(24),
//                   fontFamily: fontFamily.poppins400,
//                 },
//                 textStyle,
//               ]}>
//               {title} {/* Button text dynamically passed as prop */}
//             </Text>
//           )}
//         </LinearGradient>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default GradientButton;

import React from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  View, // ✅ add this
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {fontFamily, fontSize, hp} from '../../utils/helpers';

const GradientButton = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  disabled,
  loading = false,
  icon,
}) => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={[{marginTop: hp(1)}, buttonStyle]}
        activeOpacity={0.7}
        onPress={onPress}
        disabled={disabled || loading}>
        <LinearGradient
          colors={['#0F52BA', '#8225AF']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1.2}}
          style={{
            width: '100%',
            height: hp(50),
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {icon && <View style={{marginRight: 8}}>{icon}</View>}
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
