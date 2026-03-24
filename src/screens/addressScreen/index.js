import React, {useRef, useState, useEffect} from 'react';
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
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import back_icon from '../../assets/images/arrow_back.png';
import edit_address_icon from '../../assets/images/adress_icon.png';
import delete_icon from '../../assets/images/delete_address_icon.png';
import check_icon from '../../assets/images/check_right_icon.png';
import location_icon from '../../assets/images/location_address_icon.png';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../../components/gradientButton';
import {RemoveIcon, EditIcon} from '../../assets';
import {FlatList} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
// IMPORT ACTION CREATORS (ensure these exist / match names)
import {
  getAddressRequest,
  addAddressRequest,
  updateAddressRequest,
  deleteAddressRequest,
} from '../../redux/actions/addressActions';

const AddressScreen = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();

  // --- Redux selectors (assumes you saved token & user in redux) ---
  // const token = useSelector(state => state.auth?.token); // <- adjust if your key different
  // const token = useSelector(state => state.auth?.token);
  const token = useSelector(state => state.auth?.token);

  console.log('TOKEN ===>', token);

  // const userId = useSelector(state => state.auth?.user?.id);
  const userId = useSelector(state => state.auth?.user?.id);

  console.log('USER ID ===>', userId);

  // Address list comes from redux address reducer
  const addresses = useSelector(state => state.addresses?.list) || [];
  const loading = useSelector(state => state.addresses?.loading);
  const error = useSelector(state => state.addresses?.error);

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

  useEffect(() => {
    dispatch(getAddressRequest(userId, token));
  }, []);

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
  const openEditSheet = item => {
    // Map API fields to your form fields
    // setEditId(item._id || item.id); // API likely returns _id
    // setEditId(item._id);
    setEditId(item.id);

    // setForm({
    //   name: item.name || '',
    //   mobile: String(item.mobileNumber || item.mobile || ''),
    //   pincode: String(item.pincode || ''),
    //   address: item.addressLineOne || item.address || '',
    //   locality: item.addressLineTwo || item.locality || '',
    //   isDefault: !!item.isDefaultAddress || !!item.isDefault,
    // });
    setForm({
      name: item.name,
      mobile: String(item.mobileNumber),
      pincode: String(item.pincode),
      address: item.addressLineOne,
      locality: item.addressLineTwo,
      isDefault: item.isDefaultAddress,
    });

    bottomSheetRef.current?.open();
  };
  const saveAddress = () => {
    if (!userId || !token) return;

    const payload = {
      userId,
      name: form.name,
      mobileNumber: Number(form.mobile),
      pincode: Number(form.pincode),
      addressLineOne: form.address,
      addressLineTwo: form.locality,
      city: 'patan',
      isDefaultAddress: form.isDefault,
    };

    if (editId) {
      console.log('click to edited', editId);
      dispatch(
        updateAddressRequest(
          editId, // correct address ID
          payload, // full body data
          token, // correct token from redux
          userId,
        ),
      );

      console.log('Updating address with ID:', editId);
    } else {
      // ADD
      dispatch(addAddressRequest(payload, token));
    }

    bottomSheetRef.current?.close();
  };

  // confirm delete
  const confirmDelete = id => {
    console.log('donfirm delete id:', id);
    setDeleteId(id);
    setShowConfirm(true);
  };

  // const handleDelete = () => {
  //   console.log('DELETE ID INSIDE HANDLE DELETE:', deleteId);
  //   if (!deleteId || !token || !userId) return;
  //   dispatch(deleteAddressRequest(deleteId, token, userId));
  //   console.log('DELETE ID BEFORE DISPATCH:', deleteId);
  //   setShowConfirm(false);
  //   setDeleteId(null);
  // };
  const handleDelete = id => {
    console.log('DELETE ID INSIDE HANDLE DELETE:', id);
    if (!id || !token || !userId) return;
    dispatch(deleteAddressRequest(id, token, userId));
    setShowConfirm(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back_icon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Addresses</Text>
        <View style={{width: wp(25)}} />
      </View>

      {/* Address List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* {loading && <Text>Loading...</Text>}
        {error && <Text style={{color: 'red'}}>{JSON.stringify(error)}</Text>} */}

        <FlatList
          data={addresses}
          // keyExtractor={item => item._id} // 👈 FIX

          // keyExtractor={item => item.id}
          keyExtractor={(item, index) =>
            item?.id ? item.id.toString() : index.toString()
          }
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: 'center',
                marginTop: 20,
                color: '#000',
                fontFamily: fontFamily.poppins400,
                fontSize: fontSize(16),
              }}>
              No Address Found
            </Text>
          }
          renderItem={({item}) => {
            if (!item) return null; // ✅ IMPORTANT

            const addressText = `${item.addressLineOne || ''}, ${
              item.addressLineTwo || ''
            }`;
            const isDefault = item.isDefaultAddress;

            // const addressText = `${item.addressLineOne}, ${item.addressLineTwo}`;
            // const isDefault = item.isDefaultAddress;
            console.log('ITEM:', item); // <-- ADD THIS HERE
            return (
              <View style={styles.card}>
                <View
                  style={{
                    // width: '100%',
                    height: hp(244),
                    borderWidth: 1,
                    borderColor: '#E8E8E8',
                    borderRadius: 14,
                    paddingHorizontal: wp(18),
                    marginTop: hp(28),
                    marginHorizontal: wp(24), // 👈 ADD THIS
                  }}>
                  <View style={styles.defaultRow}>
                    {/* <View
                        style={{
                          marginTop: hp(25),

                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <LinearGradient
                          colors={['#8B5CF6', '#A855F7']}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          style={{
                            width: wp(81),
                            height: hp(23),
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={styles.defaultText}>Default</Text>
                        </LinearGradient>

                        <Text
                          style={{
                            color: '#9CA3AF',
                            fontSize: fontSize(12),
                            fontFamily: fontFamily.poppins500,
                            marginLeft: wp(10),
                          }}>
                          Home
                        </Text>
                      </View> */}

                    <View
                      style={{
                        marginTop: hp(25),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      {isDefault && (
                        <LinearGradient
                          colors={['#8B5CF6', '#A855F7']}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          style={{
                            width: wp(81),
                            height: hp(23),
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={styles.defaultText}>Default</Text>
                        </LinearGradient>
                      )}
                      <Text
                        style={{
                          color: '#9CA3AF',
                          fontSize: fontSize(12),
                          fontFamily: fontFamily.poppins500,
                          // marginLeft: wp(10),
                          left: wp(271),
                        }}>
                        {item.type || 'Office'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.type}>{item.type}</Text>
                  </View>

                  <Text style={styles.address}>{addressText}</Text>

                  <Text style={styles.mobile}>
                    <Text style={styles.mobileLabel}>Mobile :</Text>{' '}
                    {item.mobileNumber}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: hp(31),
                      marginLeft: wp(177),
                      right: wp(20),
                    }}>
                    {/* // {styles.actions} */}

                    <TouchableOpacity
                      // style={styles.iconButton}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingRight: wp(16),
                        borderRightWidth: 1,
                        borderRightColor: '#E5E5E5',
                      }}
                      onPress={() => openEditSheet(item)}>
                      {/* <Image source={edit_address_icon} style={styles.icon} /> */}
                      <EditIcon />
                      <Text
                        style={{
                          color: '#6366F1',
                          fontSize: fontSize(14),
                          fontFamily: fontFamily.poppins500,
                        }}>
                        Edit
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: wp(16),
                      }}
                      // style={styles.iconButton}
                      // onPress={() => confirmDelete(item._id)}
                      onPress={() => confirmDelete(item.id)}>
                      {/* <Image source={delete_icon} style={styles.icon} /> */}
                      <RemoveIcon />
                      <Text
                        style={{
                          color: '#F43F5E',
                          fontSize: fontSize(14),
                          fontFamily: fontFamily.poppins500,
                        }}>
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>

      <View style={{marginHorizontal: 17, marginBottom: 20}}>
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
          wrapper: {backgroundColor: 'rgba(0,0,0,0.5)'},
          draggableIcon: {backgroundColor: '#ccc'},
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: '80%',
          },
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {/* 🔽 ALL TextInputs here */}
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
            <View style={{paddingHorizontal: 20}}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={form.name}
                onChangeText={val => setForm({...form, name: val})}
                placeholderTextColor="#9C9C9C"
              />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                value={form.mobile}
                onChangeText={val => setForm({...form, mobile: val})}
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
                onChangeText={val => setForm({...form, pincode: val})}
                placeholderTextColor="#9C9C9C"
              />
              <TextInput
                style={styles.input}
                placeholder="Address (House No, Building, Street, Area)"
                value={form.address}
                onChangeText={val => setForm({...form, address: val})}
                placeholderTextColor="#9C9C9C"
                multiline
              />
              <TextInput
                // style={styles.input}
                style={[styles.input, {minHeight: 45}]}
                placeholder="Locality/Town"
                value={form.locality}
                onChangeText={val => setForm({...form, locality: val})}
                placeholderTextColor="#9C9C9C"
              />

              <TouchableOpacity
                style={styles.defaultAddressRow}
                onPress={() => setForm({...form, isDefault: !form.isDefault})}>
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

              <View style={{marginBottom: 10}}>
                <GradientButton title="Save Address" onPress={saveAddress} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </RBSheet>

      {/* Delete Confirmation Modal */}
      {showConfirm && console.log('MODAL OPEN - deleteId:', deleteId)}

      <Modal
        visible={showConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirm(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmText}>
              Are you sure want to delete this address?
            </Text>

            {console.log('INSIDE MODAL deleteId:', deleteId)}

            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowConfirm(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <GradientButton
                title="Yes, Delete"
                // onPress={handleDelete}
                onPress={() => handleDelete(deleteId || null)}
                buttonStyle={{width: 130}}
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
  container: {flex: 1, backgroundColor: '#fff'},
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
  scrollContainer: {
    // padding: wp(5)
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: wp(15),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  defaultRow: {
    // flexDirection: 'row',
    // alignItems: 'center',
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
  defaultText: {color: '#fff', fontSize: 12},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: fontSize(16),
    fontFamily: fontFamily.poppins700,
    color: '#000000',

    marginTop: 2,
  },
  type: {
    fontSize: 12,
    fontFamily: fontFamily.poppins500,
    color: '#B0B0B0',
  },
  address: {
    fontSize: fontSize(16),
    fontFamily: fontFamily.poppins400,
    color: '#000000',
    marginTop: 2,
  },
  mobile: {
    fontFamily: fontFamily.poppins500,
    color: '#000000',
    marginTop: 2,
    fontSize: fontSize(14),
  },
  mobileLabel: {
    fontFamily: fontFamily.poppins500,
    fontSize: fontSize(14),
    color: '#94A3B8',
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
    alignSelf: 'flex-start',
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
