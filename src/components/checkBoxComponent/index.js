import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {fontFamily, fontSize} from '../../utils/helpers';
import {colors} from '../../utils/colors';

const CheckBoxComponent = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[styles.checkboxBase, isChecked && styles.checkboxChecked]}
        onPress={() => setIsChecked(!isChecked)}
        activeOpacity={0.7}>
        {isChecked && <Text style={styles.checkmark}>✔</Text>}
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
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#8e44ad',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#8e44ad',
  },
  checkmark: {
    color: 'white',
    fontSize: 10,
  },
  label: {
    marginLeft: 10,
    fontSize: fontSize(16),
    color: colors.pureBlack,
    fontFamily: fontFamily.poppins400,
  },
});
