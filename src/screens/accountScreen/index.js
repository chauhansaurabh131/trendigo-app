import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  SafeAreaView,
} from 'react-native';
import {fontFamily, hp, wp, fontSize} from '../../utils/helpers';
import check_icon from '../../assets/images/check_green_icon.png';
import edit_icon from '../../assets/images/edit_black_icon.png';
import arrow_back from '../../assets/images/arrow_back.png';
import {useNavigation} from '@react-navigation/native';
import GradientButton from '../../components/gradientButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {LOGOUT} from '../../redux/actions/authActions';
import {
  SEND_EMAIL_OTP_REQUEST,
  sendEmailOtpRequest,
  verifyEmailOtpRequest,
  VERIFY_EMAIL_OTP_REQUEST,
  VERIFY_CHANGE_EMAIL_OTP_REQUEST,
  deleteAccountRequest,
  resetEmailVerifyStatus,
  sendMobileOtpRequest,
  verifyMobileOtpRequest,
} from '../../redux/actions/userAccountActions';
import {resetMobileMessage} from '../../redux/actions/userAccountActions';

import {getMeRequest} from '../../redux/actions/userAccountActions';

import LinearGradient from 'react-native-linear-gradient';
import {images, OtpVerifyIcon} from '../../assets';
// import {VERIFY_EMAIL_OTP_REQUEST} from '../../redux/actions/authActions';
const AccountScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const [email, setEmail] = useState('jit*****@gmail.com');
  const [editingField, setEditingField] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showMobileEditModal, setShowMobileEditModal] = useState(false);
  const [showMobileOtpModal, setShowMobileOtpModal] = useState(false);
  const [showMobileSuccessModal, setShowMobileSuccessModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  // const user = useSelector(state => state.userAccount.user);
  const user = useSelector(state => state.userAccount.user);
  const userData = useSelector(state => state.userAccount.user?.user);
  const updatedEmail = useSelector(state => state.userAccount.updatedEmail);
  const message = useSelector(state => state.userAccount.message);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [newMobileNumber, setNewMobileNumber] = useState('');
  const [timer, setTimer] = useState(48);
  console.log('EMAIL:', userData?.email);
  const token = useSelector(state => state.auth.token);
  console.log('TOKEN IN ACCOUNT SCREEN:', token);
  useEffect(() => {
    let interval = null;

    if (showMobileOtpModal) {
      setTimer(48); // modal open → reset timer

      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [showMobileOtpModal]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };
  useEffect(() => {
    let interval = null;

    if (showOtpModal || showMobileOtpModal) {
      setTimer(48);

      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [showOtpModal, showMobileOtpModal]);

  // const user = useSelector(state => state.user?.data);

  // useEffect(() => {
  //   if (user?.email) {
  //     setEmail(user.email);
  //   }
  // }, [user]);

  useEffect(() => {
    if (user?.user?.email) {
      setEmail(user.user.email);
    }
  }, [user]);
  useEffect(() => {
    if (user?.user?.mobileNumber) {
      setMobile(String(user.user.mobileNumber)); // 🔥 IMPORTANT
    }
  }, [user]);
  console.log('MOBILE NUMBER ===>', mobile);
  console.log('USER ===>', user);
  console.log('EMAIL in user ===>', userData?.email);

  const handleSendOtp = async () => {
    const token = await AsyncStorage.getItem('authToken');
    console.log(token, 'authToken');

    if (!email.trim() || !newEmail.trim()) {
      alert('Please enter both emails');
      return;
    }

    // Dispatch Saga
    console.log('send OTP PAYLOAD:', {
      token,
      currentEmail: email,
      newEmail,
      // otp: finalOtp,
    });

    dispatch({
      type: SEND_EMAIL_OTP_REQUEST,
      payload: {
        token,
        currentEmail: email,
        newEmail,
      },
    });

    setShowEditModal(false);
    setShowOtpModal(true);
  };

  const handleVerifyOtp = async () => {
    const finalOtp = otp.join('');

    if (finalOtp.length !== 4) {
      alert('Enter valid 4-digit OTP');
      return;
    }

    const token = await AsyncStorage.getItem('authToken');
    console.log(token, 'authToken');
    console.log('VERIFY OTP PAYLOAD:', {
      token,
      currentEmail: email,
      newEmail,
      otp: finalOtp,
    });

    dispatch({
      // type: VERIFY_EMAIL_OTP_REQUEST,
      type: VERIFY_CHANGE_EMAIL_OTP_REQUEST,
      payload: {
        token,
        currentEmail: email,
        newEmail,
        otp: finalOtp,
      },
    });
  };

  const emailVerified = useSelector(state => state.userAccount.emailVerified);

  // useEffect(() => {
  //   if (emailVerified) {
  //     setShowOtpModal(false); // close OTP popup
  //     setShowSecondModal(true); // open success popup
  //   }
  // }, [emailVerified]);

  useEffect(() => {
    if (emailVerified) {
      setShowOtpModal(false);
      setShowSecondModal(true);

      // 🔥 RESET so next time works properly
      dispatch(resetEmailVerifyStatus());
    }
  }, [emailVerified]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      console.log(token, 'authToken');
      if (token) {
        dispatch(getMeRequest(token));
      }
    };

    fetchUser();
  }, []);
  const handleDelete = async () => {
    const token = await AsyncStorage.getItem('authToken');
    console.log('DELETE TOKEN:', token);

    if (!token) {
      alert('Token not found');
      return;
    }

    dispatch(deleteAccountRequest(token));
  };

  const {loading, error, isDeleted} = useSelector(state => state.userAccount);
  console.log('isDeleted:', isDeleted);
  //  import AsyncStorage from '@react-native-async-storage/async-storage';

  useEffect(() => {
    if (isDeleted) {
      Alert.alert(
        'Account Deleted',
        'Your account has been deleted. Please login again.',
        [
          {
            text: 'OK',
            onPress: async () => {
              // ✅ REMOVE TOKEN
              await AsyncStorage.removeItem('authToken');

              // ✅ RESET REDUX AUTH
              dispatch({type: LOGOUT});

              // ✅ RESET NAVIGATION
              navigation.reset({
                index: 0,
                routes: [{name: 'StartingScreen'}],
              });
            },
          },
        ],
      );
    }
  }, [isDeleted]);

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Error',
        error, // 👉 "Email already taken"
        [{text: 'OK'}],
      );
    }
  }, [error]);
  // const {message} = useSelector(state => state.userAccount);
  useEffect(() => {
    if (message === 'Mobile number updated successfully') {
      setShowMobileSuccessModal(true);
    }
  }, [message]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 30}}>
      <>
        {/* Header */}
        <SafeAreaView style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image source={arrow_back} style={styles.arrowIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account Settings</Text>
        </SafeAreaView>

        <View style={styles.contentWrapper}>
          {/* EMAIL ROW */}
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.valueRow}>
              <View style={styles.valueWrapper}>
                {editingField === 'email' ? (
                  <TextInput
                    value={newEmail}
                    // editable={false}
                    onChangeText={setNewEmail}
                    style={styles.input}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoFocus
                  />
                ) : (
                  // <Text style={styles.valueText}>{email}</Text>
                  <Text style={styles.valueText}>
                    {email ? email : 'Not Provided'}
                  </Text>
                )}

                {editingField !== 'email' && email ? (
                  <Image source={check_icon} style={styles.checkIcon} />
                ) : null}
              </View>

              <TouchableOpacity
                onPress={() => {
                  setEditingField('email');
                  setShowEditModal(true);
                }}>
                <Image source={edit_icon} style={styles.editIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            visible={showEditModal}
            transparent
            animationType="slide"
            onRequestClose={() => setShowEditModal(false)}>
            <View style={styles.modalOverlay}>
              <View
                style={{
                  width: wp(375),
                  height: hp(432),
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <View
                  style={{
                    marginTop: hp(24),
                    marginLeft: wp(30),
                  }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.poppins500,
                      fontSize: fontSize(16),
                      color: '#000',
                    }}>
                    Update Email
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#E7E7E7',
                    width: '100%',
                    marginTop: hp(20),
                  }}
                />
                <View
                  style={{
                    marginTop: hp(36),
                    marginLeft: wp(39),
                  }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.poppins500,
                      fontSize: fontSize(16),
                      color: '#000',
                    }}>
                    Current Email
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#CDCDCD',
                    borderRadius: 25,
                    marginHorizontal: wp(39),
                    height: hp(50),
                    marginTop: hp(9),
                  }}>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={{
                      color: '#000',
                      fontSize: fontSize(14),
                      fontFamily: fontFamily.poppins400,
                      marginLeft: wp(26),
                    }}
                  />
                </View>

                <View
                  style={{
                    marginTop: hp(21),
                    marginLeft: wp(39),
                  }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.poppins500,
                      fontSize: fontSize(16),
                      color: '#000',
                    }}>
                    New Email
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#CDCDCD',
                    borderRadius: 25,
                    marginHorizontal: wp(39),
                    height: hp(50),
                    marginTop: hp(9),
                  }}>
                  <TextInput
                    value={newEmail}
                    onChangeText={setNewEmail}
                    style={{
                      color: '#000',
                      fontSize: fontSize(14),
                      fontFamily: fontFamily.poppins400,
                      marginLeft: wp(26),
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: hp(42),
                    marginHorizontal: wp(39),
                  }}>
                  <LinearGradient
                    colors={['#0F52BA', '#985DD2']}
                    style={{
                      width: wp(136),
                      height: hp(50),
                      borderRadius: 25,
                      padding: 2, // ⭐ THIS IS THE KEY
                    }}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 23, // 👈 25 - padding
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setShowEditModal(false);
                        setEditingField(null);
                      }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: fontSize(16),
                          fontFamily: fontFamily.poppins400,
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>

                  {/* <GradientButton
                    title={'Continue'}
                    buttonStyle={{width: wp(136), height: hp(50)}}
                    onPress={() => {
                      if (!newEmail.trim()) {
                        alert('Please enter new email');
                        return;
                      }

                      setShowEditModal(false);
                      setShowOtpModal(true);
                    }}
                  /> */}

                  <GradientButton
                    title={'Continue'}
                    buttonStyle={{width: wp(136), height: hp(50)}}
                    onPress={handleSendOtp}
                  />
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            visible={showOtpModal}
            transparent
            animationType="slide"
            onRequestClose={() => setShowOtpModal(false)}>
            <View style={styles.modalOverlay}>
              <View
                style={{
                  width: wp(375),
                  height: hp(432),
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <View
                  style={{
                    marginTop: hp(24),
                    marginLeft: wp(30),
                  }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.poppins500,
                      fontSize: fontSize(16),
                      color: '#000',
                    }}>
                    Verify Email
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#E7E7E7',
                    width: '100%',
                    marginTop: hp(20),
                  }}
                />
                <View
                  style={{
                    marginTop: wp(34),
                    marginLeft: hp(57),
                  }}>
                  <Text
                    style={{
                      fontSize: fontSize(14),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    <Text style={{color: '#A3A3A3'}}>OTP sent on</Text>
                    <Text style={{color: '#000000'}}>{newEmail}</Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: hp(32),
                    marginHorizontal: wp(20),
                  }}>
                  {[0, 1, 2, 3].map((_, index) => (
                    <TextInput
                      key={index}
                      ref={inputRefs[index]}
                      style={{
                        width: wp(60),
                        height: hp(50),
                        borderBottomWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center',
                        color: '#000000',
                        fontSize: fontSize(24),
                        fontFamily: fontFamily.poppins600,
                      }}
                      maxLength={1}
                      keyboardType="number-pad"
                      onChangeText={value => handleOtpChange(value, index)}
                      value={otp[index]}
                    />
                  ))}
                </View>
                <View style={{marginTop: hp(59), marginLeft: wp(126)}}>
                  <Text
                    style={{
                      fontSize: fontSize(14),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    <Text style={{color: '#A3A3A3'}}>Resend in </Text>
                    <Text style={{color: '#000000'}}>{timer}Sec.</Text>
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: wp(37),
                    marginTop: hp(58),
                  }}>
                  {/* <GradientButton
                    title={'Verify Code'}
                    // onPress={() => {
                    //   // setShowSecondModal(true);
                    //   const finalOtp = otp.join('');

                    //   if (finalOtp.length !== 4) {
                    //     alert('Please enter full 4-digit OTP');
                    //     return;
                    //   }
                    //   console.log('OTP BEFORE DISPATCH:', otp);
                    //   dispatch(
                    //     verifyEmailOtpRequest(token, email, newEmail, otp),
                    //   );
                    // }}

                    onPress={() => {
                      // setShowSecondModal(true);
                      const finalOtp = otp.join('');

                      if (finalOtp.length !== 4) {
                        alert('Please enter full 4-digit OTP');
                        return;
                      }
                    }}
                  /> */}

                  <GradientButton
                    title={'Verify Code'}
                    onPress={handleVerifyOtp}
                    // buttonStyle={{width: wp(136), height: hp(50)}}
                  />
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            transparent={true}
            visible={showSecondModal}
            animationType="slide"
            onRequestClose={() => setShowSecondModal(false)}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: wp(375),
                  height: hp(257),
                  backgroundColor: '#FFFFFF',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <View
                  style={{
                    marginTop: hp(44),
                    marginLeft: wp(170),
                  }}>
                  <Image
                    source={images.otp_verify}
                    style={{
                      width: wp(34),
                      height: hp(34),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: hp(33),
                    marginLeft: wp(77),
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: fontSize(18),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    Email has been updated
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: hp(33),
                    marginLeft: wp(127),
                  }}>
                  <GradientButton
                    // onPress={() => {
                    //   setShowSecondModal(false);
                    //   // navigation.navigate('Account');
                    // }}

                    onPress={() => {
                      setShowSecondModal(false);
                      setEditingField(null);
                      setShowEditModal(false);
                      navigation.goBack(); // or navigation.navigate('Account')
                    }}
                    title={'Ok'}
                    buttonStyle={{width: wp(120), height: hp(50)}}
                  />
                </View>
              </View>
            </View>
          </Modal>

          {/* MOBILE ROW */}
          <View style={styles.row}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.valueRow}>
              <View style={styles.valueWrapper}>
                {editingField === 'mobile' ? (
                  <TextInput
                    value={mobile}
                    onChangeText={text =>
                      setMobile(text.replace(/[^0-9]/g, ''))
                    }
                    style={styles.input}
                    placeholder="Enter mobile number"
                    keyboardType="phone-pad"
                    maxLength={10}
                    autoFocus
                  />
                ) : (
                  // <Text style={styles.valueText}>{mobile}</Text>
                  <Text style={styles.valueText}>
                    {mobile ? mobile : 'Not Provided'}
                  </Text>
                )}

                {editingField !== 'mobile' && mobile ? (
                  <Image source={check_icon} style={styles.checkiconmobile} />
                ) : null}
              </View>

              <TouchableOpacity
                onPress={
                  () => {
                    setEditingField('mobile');
                    setShowMobileEditModal(true);
                  }
                  // setEditingField(editingField === 'mobile' ? null : 'mobile')
                }>
                <Image source={edit_icon} style={styles.editIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            visible={showMobileEditModal}
            transparent
            animationType="slide"
            onRequestClose={() => setShowMobileEditModal(false)}>
            <View style={styles.modalOverlay}>
              <View
                style={{
                  width: wp(375),
                  height: hp(432),
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <View
                  style={{
                    marginTop: hp(24),
                    marginLeft: wp(30),
                  }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.poppins500,
                      fontSize: fontSize(16),
                      color: '#000',
                    }}>
                    Update Mobile Number
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#E7E7E7',
                    width: '100%',
                    marginTop: hp(20),
                  }}
                />
                <View
                  style={{
                    marginTop: hp(36),
                    marginLeft: wp(39),
                  }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.poppins500,
                      fontSize: fontSize(16),
                      color: '#000',
                    }}>
                    Current Mobile Number
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#CDCDCD',
                    borderRadius: 25,
                    marginHorizontal: wp(39),
                    height: hp(50),
                    marginTop: hp(9),
                  }}>
                  <TextInput
                    value={mobile}
                    onChangeText={setMobile}
                    style={{
                      color: '#000',
                      fontSize: fontSize(14),
                      fontFamily: fontFamily.poppins400,
                      marginLeft: wp(26),
                    }}
                  />
                </View>

                <View
                  style={{
                    marginTop: hp(21),
                    marginLeft: wp(39),
                  }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.poppins500,
                      fontSize: fontSize(16),
                      color: '#000',
                    }}>
                    New Mobile Number
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#CDCDCD',
                    borderRadius: 25,
                    marginHorizontal: wp(39),
                    height: hp(50),
                    marginTop: hp(9),
                  }}>
                  <TextInput
                    value={newMobileNumber}
                    onChangeText={setNewMobileNumber}
                    style={{
                      color: '#000',
                      fontSize: fontSize(14),
                      fontFamily: fontFamily.poppins400,
                      marginLeft: wp(26),
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: hp(42),
                    marginHorizontal: wp(39),
                  }}>
                  <LinearGradient
                    colors={['#0F52BA', '#985DD2']}
                    style={{
                      width: wp(136),
                      height: hp(50),
                      borderRadius: 25,
                      padding: 2, // ⭐ THIS IS THE KEY
                    }}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 23, // 👈 25 - padding
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setShowEditModal(false);
                        setShowMobileEditModal(null);
                      }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: fontSize(16),
                          fontFamily: fontFamily.poppins400,
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>

                  <GradientButton
                    title={'Continue'}
                    buttonStyle={{width: wp(136), height: hp(50)}}
                    onPress={() => {
                      if (!newMobileNumber.trim()) {
                        Alert.alert('Error', 'Please enter new mobile number');
                        return;
                      }
                      // setShowEditModal(false);
                      // setShowMobileOtpModal(true);
                      dispatch(
                        sendMobileOtpRequest(
                          token,
                          mobile, // current mobile
                          newMobileNumber, // new mobile
                        ),
                      );
                      console.log(
                        'token, mobile, newMobileNumber',
                        token,
                        mobile,
                        newMobileNumber,
                      );
                      setShowMobileOtpModal(true);
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            visible={showMobileOtpModal}
            transparent
            animationType="slide"
            onRequestClose={() => setShowMobileOtpModal(false)}>
            <View style={styles.modalOverlay}>
              <View
                style={{
                  width: wp(375),
                  height: hp(432),
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <View
                  style={{
                    marginTop: hp(24),
                    marginLeft: wp(30),
                  }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.poppins500,
                      fontSize: fontSize(16),
                      color: '#000',
                    }}>
                    Verify Mobile Number
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#E7E7E7',
                    width: '100%',
                    marginTop: hp(20),
                  }}
                />
                <View
                  style={{
                    marginTop: wp(34),
                    marginLeft: hp(57),
                  }}>
                  <Text
                    style={{
                      fontSize: fontSize(14),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    <Text style={{color: '#A3A3A3'}}>OTP sent on</Text>
                    <Text style={{color: '#000000'}}>{newMobileNumber}</Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: hp(32),
                    marginHorizontal: wp(20),
                  }}>
                  {[0, 1, 2, 3].map((_, index) => (
                    <TextInput
                      key={index}
                      ref={inputRefs[index]}
                      style={{
                        width: wp(60),
                        height: hp(50),
                        borderBottomWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center',
                        color: '#000000',
                        fontSize: fontSize(24),
                        fontFamily: fontFamily.poppins600,
                      }}
                      maxLength={1}
                      keyboardType="number-pad"
                      onChangeText={value => handleOtpChange(value, index)}
                      value={otp[index]}
                    />
                  ))}
                </View>
                <View style={{marginTop: hp(59), marginLeft: wp(126)}}>
                  <Text
                    style={{
                      fontSize: fontSize(14),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    <Text style={{color: '#A3A3A3'}}>Resend in </Text>
                    <Text style={{color: '#000000'}}>{timer} Sec.</Text>
                  </Text>
                </View>

                <View
                  style={{
                    marginHorizontal: wp(37),
                    marginTop: hp(58),
                  }}>
                  <GradientButton
                    title={'Verify Code'}
                    onPress={() => {
                      const finalOtp = otp.join('');

                      if (finalOtp.length !== 4) {
                        alert('Please enter full 4-digit OTP');
                        return;
                      }
                      dispatch(
                        verifyMobileOtpRequest(
                          token,
                          mobile,
                          newMobileNumber,
                          finalOtp,
                        ),
                      );
                      console.log(
                        'token, mobile, newMobileNumber, finalOtp',
                        token,
                        mobile,
                        newMobileNumber,
                        finalOtp,
                      );
                      console.log('OTP ENTERED:', finalOtp);

                      setShowMobileSuccessModal(true);
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            transparent={true}
            visible={showMobileSuccessModal}
            animationType="slide"
            onRequestClose={() => setShowMobileSuccessModal(false)}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: wp(375),
                  height: hp(257),
                  backgroundColor: '#FFFFFF',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <View
                  style={{
                    marginTop: hp(44),
                    marginLeft: wp(170),
                  }}>
                  <Image
                    source={images.otp_verify}
                    style={{
                      width: wp(34),
                      height: hp(34),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: hp(33),
                    marginHorizontal: wp(30),
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: fontSize(18),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    Mobile Number has been updated
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: hp(33),
                    marginLeft: wp(127),
                  }}>
                  {/* <GradientButton
                    onPress={() => {
                      setShowMobileOtpModal(false);
                      setEditingField(null);
                      setShowMobileSuccessModal(false);
                      navigation.goBack();
                    }}
                    title={'Ok'}
                    buttonStyle={{width: wp(120), height: hp(50)}}
                  /> */}
                  <GradientButton
                    title={'Ok'}
                    buttonStyle={{width: wp(120), height: hp(50)}}
                    onPress={() => {
                      // 1️⃣ Close success modal
                      setShowMobileSuccessModal(false);

                      // 2️⃣ Close OTP modal
                      setShowMobileOtpModal(false);

                      // 3️⃣ Close edit modal
                      setShowMobileEditModal(false);

                      // 4️⃣ Stop editing
                      setEditingField(null);
                      // 🔥 IMPORTANT: RESET redux message
                      dispatch(resetMobileMessage());

                      // 5️⃣ Go back to previous screen
                      navigation.goBack();
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>

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
              {/* <Text style={styles.modalText}>Are you sure want proceed?</Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setShowDeleteModal(false)}>
                  <Text style={styles.cancelBtnText}>Not Now</Text>
                </TouchableOpacity>

                <GradientButton
                  title="Yes, Delete"
                  onPress={handleDelete}
                  buttonStyle={{width: 135, height: 45}}
                />
              </View> */}
              <View
                style={{
                  marginTop: hp(56),
                  marginHorizontal: wp(44),
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: fontFamily.poppins400,
                    fontSize: fontSize(18),
                  }}>
                  Are you sure want proceed?
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  gap: wp(20),
                  marginTop: hp(39),
                }}>
                <LinearGradient
                  colors={['#0F52BA', '#985DD2']}
                  style={{
                    width: wp(135),
                    height: hp(44),
                    borderRadius: 25,
                    padding: 2,
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 23,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => setShowDeleteModal(false)}>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: fontSize(16),
                        fontFamily: fontFamily.poppins400,
                      }}>
                      Not Now
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
                <GradientButton
                  title={'Yes, Delete '}
                  onPress={handleDelete}
                  buttonStyle={{width: wp(135), height: hp(44)}}
                />
              </View>
            </View>
          </View>
        </Modal>
      </>
      {/* )} */}
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
  backButton: {zIndex: 2},
  arrowIcon: {width: wp(20), height: hp(18), resizeMode: 'contain'},
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: fontFamily.poppins500,
    fontSize: 18,
    color: '#000',
  },
  contentWrapper: {paddingHorizontal: 20},

  row: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
  },
  label: {
    fontSize: 16,
    fontFamily: fontFamily.poppins500,
    color: '#000',
    marginBottom: 8,
  },

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
    fontSize: 14,
    color: '#000',
    fontFamily: fontFamily.poppins500,
    paddingVertical: 2,
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    fontFamily: fontFamily.poppins400,
    paddingVertical: 2,
    marginRight: 6,
  },
  checkIcon: {
    width: wp(16),
    height: wp(16),
    resizeMode: 'contain',
  },
  checkiconmobile: {
    width: wp(16),
    height: wp(16),
    resizeMode: 'contain',
    marginRight: '65%',
  },
  editIcon: {
    width: wp(16),
    height: wp(16),
    marginLeft: 10,
    resizeMode: 'contain',
  },

  deleteSection: {marginTop: 25},
  deleteText: {
    fontSize: 12,
    color: '#898989',
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
    marginTop: hp(-25),
  },
  deleteBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamily.poppins400,
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
    // padding: 25,
    // width: '85%',
    width: wp(340),
    alignItems: 'center',
    height: hp(206),
    top: hp(50),
  },
  modalText: {
    fontSize: 18,
    fontFamily: fontFamily.poppins400,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: hp(60),
    top: hp(30),
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    top: hp(5),
  },
  cancelBtn: {
    width: hp(126),
    borderColor: '#0F52BA',
    height: hp(44),
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontFamily: fontFamily.poppins400,
    color: '#0E0E0E',
  },
});
