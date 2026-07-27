import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {colors} from '../../utils/colors';

const CheckBoxComponent = ({isDefault, onPress}) => {
  // const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[styles.checkboxBase, isDefault && styles.checkboxChecked]}
        onPress={onPress}
        activeOpacity={0.7}>
        {isDefault && <Text style={styles.checkmark}>✔</Text>}
      </TouchableOpacity>

      <Text style={styles.label}>Make it default address</Text>
    </SafeAreaView>
  );
};

export default CheckBoxComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 20,
  },
  checkboxBase: {
    width: hp(18),
    height: hp(18),
    borderRadius: wp(3),
    borderWidth: 2,
    // borderColor: '#8e44ad',
    borderColor: '#5029F3',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#5029F3',
  },
  checkmark: {
    color: 'white',
    fontSize: fontSize(10),
  },
  label: {
    marginLeft: wp(10),
    fontSize: fontSize(16),
    color: colors.pureBlack,
    fontFamily: fontFamily.poppins400,
  },
});
