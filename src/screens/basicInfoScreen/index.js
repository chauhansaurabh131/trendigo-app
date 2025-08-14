import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { fontFamily, hp, wp } from '../../utils/helpers';
import arrow_back from '../../assets/images/arrow_back.png';

const BasicInfoScreen = () => {
  const [gender, setGender] = useState('Male');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header */}
      <View style={styles.basicinfoContainer}>
        <Image source={arrow_back} style={styles.arrowIcon} />
        <Text style={styles.basicinfoText}>Basic Info</Text>
      </View>

      {/* Profile Circle */}
      <View style={styles.profileCircle}>
        <Text style={styles.profileInitials}>RS</Text>
      </View>

      {/* Name */}
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="Enter your name" />

      {/* Gender */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.rectangle}>
        <View style={styles.genderOuterBox}>
          <TouchableOpacity
            style={[styles.genderBtn, gender === 'Male' && styles.genderBtnActive]}
            onPress={() => setGender('Male')}
          >
            <Text style={[styles.genderText, gender === 'Male' && styles.genderTextActive]}>
              Male
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={[styles.genderBtn, gender === 'Female' && styles.genderBtnActive]}
            onPress={() => setGender('Female')}
          >
            <Text style={[styles.genderText, gender === 'Female' && styles.genderTextActive]}>
              Female
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* DOB */}
      <Text style={styles.label}>Date of Birth</Text>
      <TextInput style={styles.input} placeholder="DD/MM/YYYY" />

      {/* Mobile */}
      <Text style={styles.label}>Mobile Number</Text>
      <TextInput style={styles.input} placeholder="Enter mobile number" keyboardType="phone-pad" />

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Enter email" keyboardType="email-address" />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  basicinfoContainer: {
    height: hp(57),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  basicinfoText: {
    fontFamily: fontFamily.poppins500,
    fontSize: wp(18),
    lineHeight: hp(70),
    textAlign: 'center',
    color: '#000000',
    width: wp(100),
  },
  profileCircle: {
    alignSelf: 'center',
    backgroundColor: '#F7E7FF',
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  profileInitials: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 15,
    marginBottom: 5,
    fontFamily: fontFamily.poppins500,
    color: '#000000',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: wp(10),
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  rectangle: {
    width: '100%',
    height: hp(60),
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: wp(10),
    justifyContent: 'center', // center vertically
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  genderOuterBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: wp(10),
    height: 40,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  genderBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderBtnActive: {
    backgroundColor: '#8225AF',
  },
  genderText: {
    fontSize: 14,
    fontFamily: fontFamily.poppins500,
    color: '#000000',
  },
  genderTextActive: {
    color: '#fff',
  },
  divider: {
    width: 1,
    backgroundColor: '#E2E2E2',
  },
  saveBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#0F52BA',
    height: 50,
    borderRadius: wp(100),
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  arrowIcon: {
    width: wp(20),
    height: hp(18),
    position: 'absolute',
    left: wp(10),
    resizeMode: 'contain',
  },
});

export default BasicInfoScreen;
