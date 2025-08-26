import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
  Modal,
} from 'react-native';
import { fontFamily, hp, wp } from '../../utils/helpers';
import { useNavigation } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';

import back_icon from '../../assets/images/arrow_back.png';
import edit_address_icon from '../../assets/images/adress_icon.png';
import delete_icon from '../../assets/images/delete_address_icon.png';
import check_icon from '../../assets/images/check_right_icon.png';
import location_icon from '../../assets/images/location_address_icon.png';
import GradientButton from '../../components/gradientButton';

const AddressScreen = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);

  // store addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Rahul Gajjar',
      type: 'Home',
      address: '25/3 Housing Estate, Near by sector 17, Singapore 31134',
      mobile: '+91 95022 22322',
      pincode: '31134',
      locality: 'Sector 17',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Neha Gajjar',
      type: 'Office',
      address: '25/3 Housing Estate, Near by sector 17, Singapore 31134',
      mobile: '+91 95022 22322',
      pincode: '31134',
      locality: 'Sector 17',
      isDefault: false,
    },
  ]);

  // form states
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    pincode: '',
    address: '',
    locality: '',
    isDefault: false,
  });

  // track edit or add
  const [editId, setEditId] = useState(null);

  // confirmation modal states
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // open add sheet with blank form
  const openAddSheet = () => {
    setEditId(null);
    setForm({
      name: '',
      mobile: '',
      pincode: '',
      address: '',
      locality: '',
      isDefault: false,
    });
    bottomSheetRef.current.open();
  };

  const openEditSheet = (item) => {
    setEditId(item.id);
    setForm({
      name: item.name,
      mobile: item.mobile,
      pincode: item.pincode || '',
      address: item.address,
      locality: item.locality || '',
      isDefault: item.isDefault,
    });
    bottomSheetRef.current.open();
  };

  const saveAddress = () => {
    if (editId) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editId ? { ...addr, ...form } : addr
        )
      );
    } else {
      const newId = Date.now();
      setAddresses((prev) => [...prev, { id: newId, ...form, type: 'Home' }]);
    }
    bottomSheetRef.current.close();
  };

  // confirm delete
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== deleteId));
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back_icon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Addresses</Text>
        <View style={{ width: wp(25) }} />
      </View>

      {/* Address List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {addresses.map((item) => (
          <View style={styles.card} key={item.id}>
            {item.isDefault && (
              <View style={styles.defaultRow}>
                <View style={styles.defaultTag}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              </View>
            )}
            <View style={styles.row}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.type}>{item.type}</Text>
            </View>
            <Text style={styles.address}>{item.address}</Text>
            <Text style={styles.mobile}>
              <Text style={styles.mobileLabel}>Mobile :</Text> {item.mobile}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => openEditSheet(item)}
              >
                <Image source={edit_address_icon} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => confirmDelete(item.id)}
              >
                <Image source={delete_icon} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={{ marginHorizontal: 17, marginBottom: 20 }}>
        <GradientButton title="Add New Address" onPress={openAddSheet} />
      </View>

      {/* Bottom Sheet */}
      <RBSheet
        ref={bottomSheetRef}
        animationType="slide"
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={hp(80)}
        customStyles={{
          wrapper: { backgroundColor: 'rgba(0,0,0,0.5)' },
          draggableIcon: { backgroundColor: '#ccc' },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: '80%',
          },
        }}
      >
        <Text style={styles.modalTitle}>
          {editId ? 'Edit Address' : 'Add New Address'}
        </Text>
        <View
          style={{
            borderBottomColor: '#E3E3E3',
            borderBottomWidth: 1,
            width: '100%',
            marginTop: 5,
            marginBottom: 15,
          }}
        />
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={form.name}
            onChangeText={(val) => setForm({ ...form, name: val })}
            placeholderTextColor="#9C9C9C"
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            value={form.mobile}
            onChangeText={(val) => setForm({ ...form, mobile: val })}
            placeholderTextColor="#9C9C9C"
          />

          <View style={styles.iconLabelRow}>
            <Image source={location_icon} style={styles.locationIcon} />
            <Text style={styles.sectionTitle}>Delivery Address</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Pincode"
            value={form.pincode}
            onChangeText={(val) => setForm({ ...form, pincode: val })}
            placeholderTextColor="#9C9C9C"
          />
          <TextInput
            style={styles.input}
            placeholder="Address (House No, Building, Street, Area)"
            value={form.address}
            onChangeText={(val) => setForm({ ...form, address: val })}
            placeholderTextColor="#9C9C9C"
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Locality/Town"
            value={form.locality}
            onChangeText={(val) => setForm({ ...form, locality: val })}
            placeholderTextColor="#9C9C9C"
          />

          <TouchableOpacity
            style={styles.defaultAddressRow}
            onPress={() => setForm({ ...form, isDefault: !form.isDefault })}
          >
            <View style={styles.checkboxContainer}>
              {form.isDefault ? (
                <Image source={check_icon} style={styles.checkIcon} />
              ) : (
                <View style={styles.uncheckedBox} />
              )}
            </View>
            <Text style={styles.defaultAddressText}>
              Make it default address
            </Text>
          </TouchableOpacity>

          <View style={{ marginBottom: 10 }}>
            <GradientButton title="Save Address" onPress={saveAddress} />
          </View>
        </View>
      </RBSheet>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmText}>
              Are you sure want to delete this address?
            </Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowConfirm(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <GradientButton
                title="Yes, Delete"
                onPress={handleDelete}
                buttonStyle={{ width: 130 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
  backIcon: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamily.poppins500,
    fontSize: wp(18),
    color: '#000',
    marginRight: 30,
    marginLeft: 30,
  },
  scrollContainer: { padding: wp(5) },
  card: {
    backgroundColor: '#fff',
    padding: wp(15),
    marginBottom: wp(15),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  defaultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(10),
  },
  checkIcon: {
    width: wp(18),
    height: wp(18),
    resizeMode: 'contain',
  },
  defaultTag: {
    backgroundColor: '#9317CF',
    alignSelf: 'flex-start',
    paddingHorizontal: wp(23),
    paddingVertical: wp(4),
    borderRadius: wp(13),
    marginTop: hp(5),
  },
  defaultText: { color: '#fff', fontSize: 12 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontFamily: fontFamily.poppins600,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 10,
  },
  type: {
    fontSize: 12,
    fontFamily: fontFamily.poppins500,
    color: '#B0B0B0',
  },
  address: {
    fontSize: 12,
    fontFamily: fontFamily.poppins400,
    color: '#000000',
    marginTop: 10,
  },
  mobile: {
    fontFamily: fontFamily.poppins400,
    color: '#000000',
    marginTop: 10,
  },
  mobileLabel: {
    fontFamily: fontFamily.poppins500,
    fontSize: 13,
    color: '#000000',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: '70%',
  },
  iconButton: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(10),
  },
  icon: {
    width: wp(18),
    height: wp(18),
    resizeMode: 'contain',
    marginLeft: wp(5),
    marginRight: wp(5),
  },
  modalTitle: {
    fontSize: wp(16),
    fontFamily: fontFamily.poppins500,
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontFamily: fontFamily.poppins400,
    fontSize: 14,
    color: '#000000',
  },
  iconLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    width: wp(16),
    height: wp(16),
    resizeMode: 'contain',
    marginBottom: 10,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: fontFamily.poppins500,
    color: '#000',
    marginTop: 10,
    marginBottom: 20,
  },
  defaultAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    alignSelf: 'flex-start'
  },
  checkboxContainer: {
    width: wp(18),
    height: wp(18),
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uncheckedBox: {
    width: wp(18),
    height: wp(18),
    borderWidth: 1,
    borderColor: '#9317CF',
    borderRadius: 3,
  },
  defaultAddressText: {
    fontSize: 16,
    fontFamily: fontFamily.poppins500,
    color: '#000',
    marginTop: 10,
    marginBottom: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBox: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 18,
    fontFamily: fontFamily.poppins500,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#0F52BA',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: wp(25),
    marginRight: 20,
    width: 130,
  },
  cancelText: {
    fontSize: 15,
    fontFamily: fontFamily.poppins500,
    color: '#0E0E0E',
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: fontFamily.poppins500,
  },
});