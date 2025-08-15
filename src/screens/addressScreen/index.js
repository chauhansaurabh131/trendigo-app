import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { fontFamily, hp, wp } from '../../utils/helpers';
import { useNavigation } from '@react-navigation/native';
import back_icon from '../../assets/images/arrow_back.png';
import edit_address_icon from '../../assets/images/adress_icon.png';
import delete_icon from '../../assets/images/delete_address_icon.png';
import check_icon from '../../assets/images/check_right_icon.png';
import location_icon from '../../assets/images/location_address_icon.png';
import GradientButton from '../../components/gradientButton';

const AddressScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back_icon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Addresses</Text>
        <View style={{ width: wp(25) }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.defaultRow}>
            <View style={styles.defaultTag}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.name}>Rahul Gajjar</Text>
            <Text style={styles.type}>Home</Text>
          </View>
          <Text style={styles.address}>
            25/3 Housing Estate, Near by sector 17, Singapore 31134
          </Text>
          <Text style={styles.mobile}>
            <Text style={styles.mobileLabel}>Mobile :</Text> +91 95022 22322
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconButton}>
              <Image source={edit_address_icon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Image source={delete_icon} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.name}>Neha Gajjar</Text>
            <Text style={styles.type}>Office</Text>
          </View>
          <Text style={styles.address}>
            25/3 Housing Estate, Near by sector 17, Singapore 31134
          </Text>
          <Text style={styles.mobile}>
            <Text style={styles.mobileLabel}>Mobile :</Text> +91 95022 22322
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconButton}>
              <Image source={edit_address_icon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Image source={delete_icon} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={{ marginHorizontal: 17, marginBottom: 20 }}>
        <GradientButton
          title="Add New Address"
          onPress={() => setIsModalVisible(true)}
        />
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Add New Address</Text>

              <TextInput style={styles.input} placeholder="Name" />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                keyboardType="phone-pad"
              />

              <View style={styles.iconLabelRow}>
                <Image source={location_icon} style={styles.locationIcon} />
                <Text style={styles.sectionTitle}>Delivery Address</Text>
              </View>

              <TextInput style={styles.input} placeholder="Pincode" />
              <TextInput
                style={styles.input}
                placeholder="Address (House No, Building, Street, Area)"
                multiline
              />
              <TextInput style={styles.input} placeholder="Locality/Town" />

              <View style={styles.defaultAddressRow}>
                <Image source={check_icon} style={styles.checkIcon} />
                <Text style={styles.defaultAddressText}>Make it default address</Text>
              </View>

              <GradientButton
                title="Save Address"
                onPress={() => {
                  setIsModalVisible(false);
                }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
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
    marginRight: wp(8),
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
    marginLeft: wp(3),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: wp(15),
    paddingHorizontal: wp(20),
    paddingVertical: wp(10),
    marginTop: '50%',
    height: '80%',
  },
  modalTitle: {
    fontSize: wp(16),
    fontFamily: fontFamily.poppins500,
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 30,
    fontFamily: fontFamily.poppins400,
    fontSize: 14,
  },
  iconLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  locationIcon: {
    width: wp(16),
    height: wp(16),
    resizeMode: 'contain',
    marginRight: wp(5),
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: fontFamily.poppins500,
    color: '#000',
  },
  defaultAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  defaultAddressText: {
    fontSize: 16,
    fontFamily: fontFamily.poppins500,
    color: '#000',
  },
});
