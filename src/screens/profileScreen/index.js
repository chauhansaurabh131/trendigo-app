import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import arrow_back from '../../assets/images/arrow_back.png';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const handlePress = label => {
    console.log(`${label} pressed`);
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.profileContainer}>
        <Image source={arrow_back} style={styles.arrowIcon} />
        <Text style={styles.profileText}>Profile</Text>
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Info */}
        <View style={styles.userContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>RS</Text>
          </View>
          <Text style={styles.nameText}>Riya Shah</Text>
        </View>

        {/* Boxes */}
        <View style={styles.blackContainer}>
          <TouchableOpacity
            style={styles.boxWrapper}
            onPress={() => navigation.navigate('Basic Info')}>
            <View style={[styles.box, {backgroundColor: '#F6FBFF'}]}>
              <Image
                source={require('../../assets/images/basic_info.png')}
                style={styles.boxImage}
              />
            </View>
            <Text style={styles.boxLabel}>Basic Info</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boxWrapper}
            onPress={() => handlePress('Account')}>
            <View style={[styles.box, {backgroundColor: '#F9F9FF'}]}>
              <Image
                source={require('../../assets/images/account_info.png')}
                style={styles.boxImage}
              />
            </View>
            <Text style={styles.boxLabel}>Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boxWrapper}
            onPress={() => handlePress('My Orders')}>
            <View style={[styles.box, {backgroundColor: '#FCF6FF'}]}>
              <Image
                source={require('../../assets/images/my_order_icon.png')}
                style={styles.boxImage}
              />
            </View>
            <Text style={styles.boxLabel}>My Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boxWrapper}
            onPress={() => handlePress('Address')}>
            <View style={[styles.box, {backgroundColor: '#F6FFF7'}]}>
              <Image
                source={require('../../assets/images/address_icon_info.png')}
                style={styles.boxImage}
              />
            </View>
            <Text style={styles.boxLabel}>Address</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boxWrapper}
            onPress={() => handlePress('Saved Items')}>
            <View style={[styles.box, {backgroundColor: '#F6FAFF'}]}>
              <Image
                source={require('../../assets/images/saved_item.png')}
                style={styles.boxImage}
              />
            </View>
            <Text style={styles.boxLabel}>Saved Items</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boxWrapper}
            onPress={() => handlePress('Track Order')}>
            <View style={[styles.box, {backgroundColor: '#F7F5FD'}]}>
              <Image
                source={require('../../assets/images/track_icon_info.png')}
                style={styles.boxImage}
              />
            </View>
            <Text style={styles.boxLabel}>Track Order</Text>
          </TouchableOpacity>
        </View>

        {/* Separator */}
        <View style={styles.separator} />

        {/* About Section */}
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={() => handlePress('About Tranding')}>
            <Text style={styles.about}>About Tranding</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('Terms of Service')}>
            <Text style={styles.about}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('Privacy Policy')}>
            <Text style={styles.about}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('Help Center')}>
            <Text style={styles.about}>Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('Grievance Redressal')}>
            <Text style={styles.about}>Grievance Redressal</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutContainer}
          onPress={() => handlePress('Log Out')}>
          <Text style={styles.logoutBtn}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    height: hp(57),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileText: {
    fontFamily: fontFamily.poppins500,
    fontSize: fontSize(18),
    lineHeight: hp(18),
    textAlign: 'center',
    color: '#333',
  },
  arrowIcon: {
    width: wp(18),
    height: hp(18),
    position: 'absolute',
    left: wp(18),
    resizeMode: 'contain',
  },
  scrollContent: {
    paddingBottom: hp(50),
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(16),
    height: hp(84),
    backgroundColor: '#f8f8f8',
  },
  avatar: {
    width: hp(50),
    height: hp(50),
    borderRadius: hp(25),
    backgroundColor: '#F7E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(20),
  },
  avatarText: {
    fontFamily: fontFamily.poppins500,
    fontSize: fontSize(24),
    color: '#000',
  },
  nameText: {
    fontFamily: fontFamily.poppins600,
    fontSize: fontSize(16),
    marginLeft: wp(18),
    color: '#000',
    fontWeight: 'bold',
  },
  blackContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingVertical: hp(20),
  },
  boxWrapper: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: hp(16),
  },
  box: {
    width: hp(95.2),
    height: hp(95.2),
    borderRadius: hp(18),
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp(8),
  },
  boxLabel: {
    fontFamily: fontFamily.poppins400,
    fontSize: fontSize(14),
    lineHeight: hp(20),
    textAlign: 'center',
    color: '#000',
    marginTop: hp(6),
  },
  separator: {
    height: hp(6),
    backgroundColor: '#F4F4F4',
    marginVertical: hp(20),
  },
  mainContainer: {
    paddingHorizontal: wp(16),
    paddingVertical: hp(20),
  },
  about: {
    color: '#000',
    fontSize: fontSize(14),
    fontFamily: fontFamily.poppins400,
    marginBottom: hp(20),
  },
  logoutContainer: {
    alignSelf: 'center',
    width: wp(340),
    height: hp(50),
    borderRadius: wp(100),
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    marginTop: hp(40),
  },
  logoutBtn: {
    fontFamily: fontFamily.poppins400,
    color: '#000000',
    fontSize: fontSize(16),
    textAlign: 'center',
  },
  boxImage: {
    width: wp(33),
    height: wp(33),
    resizeMode: 'contain',
  },
});

export default ProfileScreen;
