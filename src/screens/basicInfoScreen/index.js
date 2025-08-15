

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { fontFamily, hp, wp } from '../../utils/helpers';
import arrow_back from '../../assets/images/arrow_back.png';
import GradientButton from '../../components/gradientButton';
import { useNavigation } from '@react-navigation/native';

const GenderButton = ({ label, isActive, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.genderBtn, style, isActive && styles.genderBtnActive]}
      onPress={onPress}
    >
      <Text style={[styles.genderText, isActive && styles.genderTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const BasicInfoScreen = () => {
  const navigation = useNavigation();
  const [gender, setGender] = useState('Male');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const validate = () => {
    // Name validation
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name.');
      return false;
    }
    // Mobile validation
    if (!/^\d{10}$/.test(mobile)) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit mobile number.');
      return false;
    }
    // Email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email.');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validate()) {
      Alert.alert('Success', 'Your basic info has been saved.');
     
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={arrow_back} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Basic Info</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitials}>RS</Text>
          </View>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            keyboardType="default"
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.rectangle}>
            <View style={styles.genderOuterBox}>
              <GenderButton
                label="Male"
                isActive={gender === 'Male'}
                onPress={() => setGender('Male')}
                style={{
                  borderTopRightRadius: wp(10),
                  borderBottomRightRadius: wp(10),
                }}
              />
              <View style={styles.divider} />
              <GenderButton
                label="Female"
                isActive={gender === 'Female'}
                onPress={() => setGender('Female')}
                style={{
                  borderTopLeftRadius: wp(10),
                  borderBottomLeftRadius: wp(10),
                }}
              />
            </View>
          </View>

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={dob}
            onChangeText={setDob}
            keyboardType="numbers-and-punctuation"
          />

          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            keyboardType="number-pad"
            value={mobile}
            onChangeText={setMobile}
            maxLength={10}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, { marginBottom: 30 }]}
            placeholder="Enter email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <GradientButton title="Save Changes" onPress={handleSave} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(15),
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    paddingRight: 10,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamily.poppins500,
    fontSize: wp(18),
    color: '#000',
    marginRight: 30, 
  },
  arrowIcon: {
    width: wp(20),
    height: hp(18),
    resizeMode: 'contain',
  },
  scrollArea: {
    paddingHorizontal: 20,
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
    height: hp(48),
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: wp(10),
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  genderOuterBox: {
    flexDirection: 'row',
    borderColor: '#E2E2E2',
    borderRadius: wp(10),
    height: hp(40),
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
    fontSize: 15,
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
});

export default BasicInfoScreen;
