import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  SafeAreaView
  Modal,
} from 'react-native';
import {fontFamily, hp, wp} from '../../utils/helpers';
import check_icon from '../../assets/images/check_green_icon.png';
import edit_icon from '../../assets/images/edit_black_icon.png';
import arrow_back from '../../assets/images/arrow_back.png';
import {useNavigation} from '@react-navigation/native';
import GradientButton from '../../components/gradientButton';

const AccountScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('jit*****@gmail.com');
  const [mobile, setMobile] = useState('*******902');
  const [editingField, setEditingField] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isValidMobile = value => /^[0-9]{10}$/.test(value);

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    console.log('Account Deleted');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>

      {/* Header */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 30}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image source={arrow_back} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
      </SafeAreaView>

      <View style={styles.contentWrapper}>

        {/* Email Row */}
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.valueRow}>
            <View style={styles.valueWrapper}>
              {editingField === 'email' ? (
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  placeholder="Enter email"
                  keyboardType="email-address"
                  autoFocus
                />
              ) : (
                <Text style={styles.valueText}>{email}</Text>
              )}
              <Image source={check_icon} style={styles.checkIcon} />
            </View>
            <TouchableOpacity
              onPress={() =>
                setEditingField(editingField === 'email' ? null : 'email')
              }
            >
              <Image source={edit_icon} style={styles.editIcon} />
            {editingField === 'email' ? (
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Enter email"
                keyboardType="email-address"
                autoFocus
              />
            ) : (
              <Text style={styles.valueText}>{email}</Text>
            )}

            {isValidEmail(email) && (
              <Image source={check_icon} style={styles.icon} />
            )}
            <TouchableOpacity
              onPress={() =>
                setEditingField(editingField === 'email' ? null : 'email')
              }>
              <Image source={edit_icon} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Mobile Row */}
        <View style={styles.row}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.valueRow}>
            <View style={styles.valueWrapper}>
              {editingField === 'mobile' ? (
                <TextInput
                  value={mobile}
                  onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ''))}
                  style={styles.input}
                  placeholder="Enter mobile number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  autoFocus
                />
              ) : (
                <Text style={styles.valueText}>{mobile}</Text>
              )}
              <Image source={check_icon} style={styles.checkiconmobile} />
            </View>
            <TouchableOpacity
              onPress={() =>
                setEditingField(editingField === 'mobile' ? null : 'mobile')
              }
            >
              <Image source={edit_icon} style={styles.editIcon} />
            {editingField === 'mobile' ? (
              <TextInput
                value={mobile}
                onChangeText={text => setMobile(text.replace(/[^0-9]/g, ''))}
                style={styles.input}
                placeholder="Enter mobile number"
                keyboardType="phone-pad"
                maxLength={10}
                autoFocus
              />
            ) : (
              <Text style={styles.valueText}>{mobile}</Text>
            )}

            {isValidMobile(mobile) && (
              <Image source={check_icon} style={styles.icon} />
            )}
            <TouchableOpacity
              onPress={() =>
                setEditingField(editingField === 'mobile' ? null : 'mobile')
              }>
              <Image source={edit_icon} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Delete Account Section */}
        <View style={styles.deleteSection}>
          <Text style={styles.label}>Delete Account</Text>
          <Text style={styles.deleteText}>
            By clicking the 'delete' button, your profile and data will be
            permanently erased.
          </Text>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => setShowDeleteModal(true)}>
            <Text style={styles.deleteBtnText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Are you sure want proceed?</Text>

            <View style={styles.modalButtons}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setShowDeleteModal(false)}>
                  <Text style={styles.cancelBtnText}>Not Now</Text>
                </TouchableOpacity>

                <GradientButton
                  title="Yes, Delete"
                  onPress={handleDeleteAccount}
                  // style={styles.gradientBtn}
                  buttonStyle={{width: wp(135), height: hp(44)}}
                />

                {/*<GradientButton*/}
                {/*  title={'Add to Cart'}*/}
                {/*  buttonStyle={{width: wp(285), height: hp(50)}}*/}
                {/*/>*/}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    height: hp(57),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  backButton: {
    zIndex: 2,
  },
  arrowIcon: {
    width: wp(20),
    height: hp(18),
    resizeMode: 'contain',
  },
  backButton: { zIndex: 2 },
  arrowIcon: { width: wp(20), height: hp(18), resizeMode: 'contain' },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: fontFamily.poppins500,
    fontSize: 18,
    color: '#000',
  },
  contentWrapper: {
    paddingHorizontal: 20,
  },
  contentWrapper: { paddingHorizontal: 20 },

  row: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
  },

  label: {
    fontSize: 16,
    borderBottomColor: '#E7E7E7'
  },
  label: {
    fontSize: 16,
    fontFamily: fontFamily.poppins500,
    color: '#000',
    marginBottom: 8,
  },
    color: '#000',
    marginBottom: 8
  },

  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  valueText: {
    flex: 1,
    fontSize: 14,
    fontSize: 14,
    color: '#000',
    fontFamily: fontFamily.poppins500,
  },
    fontFamily: fontFamily.poppins500,
    paddingVertical: 2,
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    flex: 1,
    fontSize: 14,
    color: '#000',
    fontFamily: fontFamily.poppins400,
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginRight: 6,
    // borderBottomWidth removed
    // borderBottomColor removed
  },
  icon: {
    width: wp(14),
    height: wp(14),
    marginHorizontal: wp(10),
    resizeMode: 'cover',
  },
  deleteSection: {
    marginTop: 25,
  checkIcon: {
    width: wp(16),
    height: wp(16),
    resizeMode: 'contain',

  },
  checkiconmobile: {
    width: wp(16),
    height: wp(16),
    resizeMode: 'contain',
    marginRight:"65%",
  },
  editIcon: {
    width: wp(16),
    height: wp(16),
    marginLeft: 10,
    resizeMode: 'contain',
  },

  deleteSection: { marginTop: 25 },
  deleteText: {
    fontSize: 12,
    color: '#898989',
    marginTop: 5,
    marginBottom: 50,
    marginTop: 5,
    marginBottom: 50,
    fontFamily: fontFamily.poppins400,
  },
  deleteBtn: {
    backgroundColor: '#000',
    paddingVertical: 5,
    borderRadius: wp(60),
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: hp(45),
    borderRadius: wp(60),
    alignItems: 'center',
    justifyContent: 'center',
    width: "45%",
    height: hp(45),
    marginTop: hp(-25),
  },
  deleteBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamily.poppins400,
  },
  deleteBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamily.poppins400
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    // paddingVertical: 60,
    // paddingHorizontal: 40,
    // height: '30%',
    width: '90%',
    alignItems: 'center',
    // marginTop: '30%',
    // marginBottom: 10,
  },
  modalText: {
    fontSize: 19,
    fontFamily: fontFamily.poppins400,
    color: '#000000',
    marginBottom: 25,
    textAlign: 'center',
    justifyContent: 'center',
    lineHeight: hp(20),
    marginTop: hp(56),
    // marginBottom: 40,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(46),
    // backgroundColor: 'orange',
    marginHorizontal: 30,
    // width: '100%',
    // backgroundColor: 'red',
    // flex: 1,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: '#0F52BA',
    // paddingVertical: 12,
    alignItems: 'center',
    // borderRadius: wp(25),
    // marginRight: 20,
    width: hp(126),
    height: hp(44),
    borderRadius: 50,
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: wp(22),
  },
  cancelBtnText: {
    fontSize: 14,
    fontFamily: fontFamily.poppins400,
    color: '#0E0E0E',
  },
  gradientBtn: {
    // flex: 1,
    height: hp(45),
    borderRadius: wp(30),
    width: wp(135),
    // width: '40%',
  },
});
