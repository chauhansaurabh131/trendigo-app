import React, {useState, useEffect, useRef} from 'react';
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
  Alert,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import arrow_back from '../../assets/images/arrow_back.png';
import GradientButton from '../../components/gradientButton';
// import {updateUserRequest} from '../../redux/actions/userActions';
import {uploadProfilePicRequest} from '../../redux/actions/profileImageActions';
import {
  resetUpdateUser,
  UPDATE_USER_OTP_REQUEST,
  updateUserRequest,
  VERIFY_UPDATE_OTP_REQUEST,
} from '../../redux/actions/updateUserActions';
import {colors} from '../../utils/colors';
import {images} from '../../assets';
import {fetchUserRequest} from '../../redux/actions/userActions';
import {SEND_OTP_REQUEST} from '../../redux/actions/otpActions';
import {VERIFY_OTP_REQUEST} from '../../redux/actions/emailAndMobileActions';
import {RESEND_OTP_REQUEST} from '../../redux/actions/authActions';

const GenderButton = ({label, isActive, onPress, style}) => (
  <TouchableOpacity
    style={[styles.genderBtn, style, isActive && styles.genderBtnActive]}
    onPress={onPress}>
    <Text style={[styles.genderText, isActive && styles.genderTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const BasicInfoScreen = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const successSheetRef = useRef();
  // const [otpSent, setOtpSent] = useState(false);
  const isMobileValid = mobile?.length === 10;
  // const isEmailValid = email ? /^\S+@\S+\.\S+$/.test(email) : false;

  const isValid = isMobileValid || isEmailValid;
  const [timer, setTimer] = useState(0);
  const [finalOtpType, setFinalOtpType] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [otpType, setOtpType] = useState('mobile'); // 'mobile' or 'email'
  const prevImageUrl = useRef(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const loginType = useSelector(state => state.auth.loginType);
  console.log('LOGIN TYPE:', loginType);
  // change to 'mobile' to test
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const user = useSelector(state => state.user.user);
  const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg'];
  const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
  // const token = useSelector(state => state.auth.token);
  const [photoModalVisible, setPhotoModalVisible] = useState(false); // ✔ Move here
  const [profileImage, setProfileImage] = useState(null);
  const [showEditMobileModal, setShowEditMobileModal] = useState(false);
  const [showEditOtpMobileModel, setShowEditOtpMobileModel] = useState(false);
  // profile image upload
  const {imageUrl} = useSelector(state => state.profileImage || {});
  const profileImageState = useSelector(state => state.profileImage);
  // when i update basic info
  const {loading, userData} = useSelector(state => state.updateUser);
  const {otpSent, otpVerified, error} = useSelector(state => state.optVerify);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  // Validation
  const validate = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name.');
      return false;
    }
    // if (!/^\d{10}$/.test(mobile)) {
    //   Alert.alert(
    //     'Validation Error',
    //     'Please enter a valid 10-digit mobile number.',
    //   );
    //   return false;
    // }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email.');
      return false;
    }
    return true;
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };
  //Backspace handle for otp input
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Display format (1:59)
  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (otpVerified) {
      refRBSheet.current.close();

      setTimeout(() => {
        successSheetRef.current.open();
      }, 300);
    }
  }, [otpVerified]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);
  //Validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  //dob convert
  const convertToISO = dob => {
    if (!dob || dob.length !== 10) return null;
    const [day, month, year] = dob.split('/');
    return `${year}-${month}-${day}`;
  };

  // when i click to save changes   updated  after thatall basic info

  const handleSave = () => {
    if (!validate()) return;

    console.log('SAVE CLICKED ');

    const payload = {
      name,
      gender: gender.toLowerCase(),
      dateOfBirth: convertToISO(dob),
      phone: mobile,
    };

    console.log('USER UPDATE  PAYLOAD ', payload);
    // console.log('TOKEN ', token);

    // dispatch(updateUserRequest(payload, token));
    dispatch(updateUserRequest(payload));
  };

  useEffect(() => {
    if (userData) {
      ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);

      //  Reset state
      dispatch(resetUpdateUser());

      //ADD THIS to get updated user data after update
      // dispatch(fetchUserRequest(token));
      dispatch(fetchUserRequest());
    }
  }, [userData]);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  //DOB FORMATTER LOGIC

  const handleDobChange = text => {
    // space remove
    text = text.replace(/\s/g, '');

    //  only numbers allow
    if (!/^\d*$/.test(text.replace(/\//g, ''))) {
      return;
    }

    let formatted = text.replace(/\D/g, '');

    // DAY
    if (formatted.length >= 2) {
      let day = parseInt(formatted.substring(0, 2), 10);
      if (day < 1 || day > 31) return;
      formatted = formatted.substring(0, 2) + '/' + formatted.substring(2);
    }

    // MONTH
    if (formatted.length >= 5) {
      let month = parseInt(formatted.substring(3, 5), 10);
      if (month < 1 || month > 12) return;
      formatted = formatted.substring(0, 5) + '/' + formatted.substring(5);
    }

    // YEAR
    if (formatted.length >= 10) {
      let year = parseInt(formatted.substring(6, 10), 10);
      if (year > 2026) return;
    }

    setDob(formatted);
  };

  // when get all the data server afte that run
  useEffect(() => {
    if (!user) return;

    setName(user.name || '');
    if (user.profilePic) {
      setProfileImage(user.profilePic); //  ADD THIS
    }

    setGender(
      user.gender
        ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
        : 'Male',
    );
    setEmail(user.email || '');
    // setMobile(user.phone || '');
    setMobile(user.mobileNumber ? String(user.mobileNumber) : '');

    //  DOB set ONLY first time
    if (user.dateOfBirth) {
      const date = new Date(user.dateOfBirth);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      setDob(prev => (prev ? prev : `${day}/${month}/${year}`));
    }
  }, [user]);
  //when i change or update image and get new url  after that run
  useEffect(() => {
    if (imageUrl && imageUrl !== prevImageUrl.current) {
      console.log('NEW IMAGE URL 👉', imageUrl);

      setProfileImage(imageUrl);

      prevImageUrl.current = imageUrl;
    }
  }, [imageUrl]);
  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.didCancel || !result.assets?.length) return;

    const image = result.assets[0];

    if (!ALLOWED_MIME_TYPES.includes(image.type)) {
      Alert.alert('Invalid Image', 'Only PNG, JPG, JPEG images are allowed');
      return;
    }

    const fileName = image.fileName?.toLowerCase() || '';
    const isValidExtension = ALLOWED_EXTENSIONS.some(ext =>
      fileName.endsWith(ext),
    );

    if (!isValidExtension) {
      Alert.alert('Invalid File', 'Please select a PNG, JPG or JPEG image');
      return;
    }

    // Dispatch correct image
    dispatch(uploadProfilePicRequest(image));
  };

  useEffect(() => {
    if (!user) {
      setName('');
      setGender('Male');
      setDob('');
      setMobile('');
      setEmail('');
      setProfileImage(null);
    }
  }, [user]);

  useEffect(() => {
    if (!user) setProfileImage(null);
  }, [user]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  useEffect(() => {
    dispatch(fetchUserRequest());
  }, []);
  const isOtpComplete = otp.join('').length === 4;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image source={arrow_back} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Basic Info</Text>
      </View>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={{paddingBottom: 40}}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => {
              if (profileImage) {
                setPhotoModalVisible(true);
              } else {
                openGallery();
              }
            }}>
            <View style={styles.profileCircle}>
              {profileImage ? (
                <Image
                  source={{uri: profileImage}}
                  style={styles.profileImage}
                />
              ) : (
                <Text style={styles.profileInitials}>
                  {/* {name ? name.charAt(0).toUpperCase() : 'NA'} */}
                  {name
                    ? name
                        .trim()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase())
                        .slice(0, 2)
                        .join('')
                    : 'NA'}
                </Text>
              )}
            </View>
          </TouchableOpacity>

          <Modal
            transparent={true}
            animationType="fade"
            visible={photoModalVisible}
            onRequestClose={() => setPhotoModalVisible(false)}>
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setPhotoModalVisible(false)}>
              {/* <View style={styles.modalBox}> */}
              <View
                style={{
                  backgroundColor: colors.white,
                  width: wp(340),
                  height: hp(147),
                  borderRadius: 20,
                }}>
                <TouchableOpacity
                  // style={styles.modalRow}
                  style={{
                    marginTop: hp(26),
                    marginHorizontal: wp(31),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => {
                    setPhotoModalVisible(false);
                    openGallery(); // 👈 open gallery
                  }}>
                  <Text style={styles.modalText}>Change Photo</Text>
                  {/* <Text style={styles.arrow}>{'>'}</Text> */}
                  <Image
                    source={images.white_icon}
                    style={{width: wp(7.78), height: hp(13.96)}}
                  />
                </TouchableOpacity>

                {/* <View style={styles.modalLine} /> */}
                <View
                  style={{
                    marginTop: hp(24),
                    borderColor: '#D8D8D8',
                    borderWidth: 1,
                    marginHorizontal: wp(31),
                  }}
                />

                <TouchableOpacity
                  // style={styles.modalRow}
                  style={{
                    marginTop: hp(21),
                    marginHorizontal: wp(31),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => {
                    setProfileImage(null); // 👈 delete image
                    setPhotoModalVisible(false);
                  }}>
                  <Text style={styles.modalText}>Delete Photo</Text>
                  {/* <Text style={styles.arrow}>{'>'}</Text> */}
                  <Image
                    source={images.white_icon}
                    style={{width: wp(7.78), height: hp(13.96)}}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={'grey'}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.rectangle}>
            <View style={styles.genderOuterBox}>
              <GenderButton
                label="Male"
                isActive={gender === 'Male'}
                onPress={() => setGender('Male')}
              />
              <View style={styles.divider} />
              <GenderButton
                label="Female"
                isActive={gender === 'Female'}
                onPress={() => setGender('Female')}
              />
            </View>
          </View>

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={dob}
            editable={true} // if using date
            placeholderTextColor={'grey'}
            // onChangeText={setDob}
            onChangeText={handleDobChange}
            keyboardType="numbers-and-punctuation"
          />

          <Text style={styles.label}>Mobile Number</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: wp(10),
              // paddingHorizontal: 12,
              paddingLeft: 12,
              paddingRight: 5,
              overflow: 'hidden', // 👈 important (cut edges perfectly)
              height: hp(50),
              borderWidth: 1,
              borderColor: '#ccc',
              color: '#000000',
            }}>
            <TextInput
              // style={styles.input}
              style={{flex: 1, color: '#000000'}}
              placeholder="Enter mobile number"
              keyboardType="number-pad"
              value={mobile}
              placeholderTextColor={'grey'}
              onChangeText={setMobile}
              maxLength={10}
            />

            {/* 👇 Hide when mobile login */}
            {loginType === 'email' && (
              <GradientButton
                onPress={() => {
                  console.log(' CLICK: Send OTP (Mobile)');
                  if (mobile.length !== 10) {
                    Alert.alert('Error', 'Enter valid mobile number');
                    return;
                  }
                  const payloadData = {
                    mobileNumber: mobile, //  FIXED KEY
                    countryCodeId: '6957b791f4ef97291c4df2d0',
                  };

                  console.log('FINAL PAYLOAD:', payloadData);

                  dispatch({
                    type: SEND_OTP_REQUEST,
                    payload: {
                      data: payloadData,
                    },
                  });

                  // console.log('TYPE:', 'mobile');
                  // console.log('MOBILE:', mobile);
                  // console.log('EMAIL:', email);

                  // if (!isMobileValid) return;
                  setOtpType('mobile');
                  // setOtpType(true);
                  setFinalOtpType('mobile'); // ADD THIS
                  setOtp(['', '', '', '']); // reset OTP
                  setTimer(119); // start timer
                  refRBSheet.current.open();
                }}
                title={'Send OTP'}
                buttonStyle={{
                  width: wp(94),
                  height: hp(39),
                  borderRadius: 10,
                  // opacity: isMobileValid ? 1 : 0.5,

                  // borderRadius: 20,
                }}
                // disabled={!isMobileValid}
                textStyle={{fontSize: fontSize(14)}}
              />
            )}
          </View>

          <RBSheet
            ref={refRBSheet}
            height={hp(432)}
            openDuration={250}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
              wrapper: {backgroundColor: 'rgba(0,0,0,0.3)'},
              draggableIcon: {backgroundColor: '#C4C4C4'},
              container: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: '#FFFFFF',
              },
            }}>
            <View style={styles.modalOverlay}>
              <View
                style={{
                  // width: wp(375),
                  width: '100%',
                  height: hp(432),
                  backgroundColor: '#FFFFFF',
                  // borderWidth: 1,
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
                    Verify Mobile
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
                    // marginLeft: hp(57),
                    alignItems: 'center',
                    // justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: fontSize(14),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    <Text style={{color: '#A3A3A3'}}> OTP sent on </Text>
                    {/* <Text style={{color: '#000000'}}> {mobile}</Text> */}
                    {/* {console.log('RENDER TYPE:', otpType)} */}
                    <Text style={{color: '#000000'}}>
                      {otpType === 'mobile' ? mobile : email}
                    </Text>
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
                      ref={ref => (inputRefs.current[index] = ref)}
                      style={{
                        width: wp(60),
                        height: hp(50),
                        borderBottomWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center',
                        color: '#000000',
                        fontSize: fontSize(24),
                        fontFamily: fontFamily.poppins600,
                        lineHeight: hp(50),
                        paddingVertical: 0,
                      }}
                      maxLength={1}
                      keyboardType="number-pad"
                      onChangeText={value => handleOtpChange(value, index)}
                      value={otp[index]}
                      onKeyPress={e => handleKeyPress(e, index)}
                    />
                  ))}
                </View>
                <View style={{marginTop: hp(59), marginLeft: wp(126)}}>
                  {/* <Text
                    style={{
                      fontSize: fontSize(14),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    <Text style={{color: '#A3A3A3'}}>Resend in </Text>
                    <Text style={{color: '#000000'}}>{formatTime(timer)}</Text>
                  </Text> */}
                  {timer > 0 ? (
                    <Text
                      style={{
                        fontSize: fontSize(14),
                        fontFamily: fontFamily.poppins400,
                      }}>
                      <Text style={{color: '#A3A3A3'}}>Resend in </Text>
                      <Text style={{color: '#000000'}}>
                        {formatTime(timer)}
                      </Text>
                    </Text>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        // const payload =
                        //   otpType === 'mobile'
                        //     ? {
                        //         mobileNumber: mobile,
                        //       }
                        //     : {
                        //         email: email,
                        //       };

                        // console.log('====================');
                        // console.log('🔄 RESEND OTP CLICKED');
                        // console.log('OTP TYPE:', otpType);
                        // console.log('MOBILE:', mobile);
                        // console.log('EMAIL:', email);
                        // console.log('📤 RESEND OTP PAYLOAD:', payload);
                        // console.log('====================');

                        // dispatch({
                        //   type: SEND_OTP_REQUEST,
                        //   payload: {
                        //     data:
                        //       otpType === 'mobile'
                        //         ? {
                        //             mobileNumber: mobile,
                        //             countryCodeId: '6957b791f4ef97291c4df2d0',
                        //           }
                        //         : {
                        //             email: email,
                        //           },
                        //   },
                        // });
                        const payload = {
                          data:
                            otpType === 'mobile'
                              ? {
                                  mobileNumber: mobile,
                                  countryCodeId: '6957b791f4ef97291c4df2d0',
                                }
                              : {
                                  email: email,
                                },
                        };

                        console.log('====================');
                        console.log(' RESEND OTP CLICKED');
                        console.log('OTP TYPE:', otpType);
                        console.log('MOBILE:', mobile);
                        console.log('EMAIL:', email);
                        console.log(' SEND_OTP_REQUEST PAYLOAD:', payload);
                        console.log('====================');

                        dispatch({
                          type: SEND_OTP_REQUEST,
                          payload,
                        });
                        setTimer(120);
                      }}>
                      {/* <Text
                        style={{
                          fontSize: fontSize(14),
                          fontFamily: fontFamily.poppins400,
                        }}>
                        <Text style={{color: '#A3A3A3'}}>Resend in </Text>
                        <Text style={{color: '#000000'}}>
                          {formatTime(timer)}
                        </Text>
                      </Text> */}
                      <View style={{alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: fontSize(14),
                            fontFamily: fontFamily.poppins400,
                            color: '#A3A3A3',
                          }}>
                          Resend OTP
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
                <View
                  style={{
                    marginHorizontal: wp(37),
                    marginTop: hp(58),
                  }}>
                  <GradientButton
                    // title="Verify Code"
                    title={'Verify Code'}
                    disabled={!isOtpComplete || loading}
                    onPress={() => {
                      const finalOtp = otp.join('');
                      console.log(' CLICK: Verify OTP');
                      console.log(' ENTERED OTP:', finalOtp);
                      console.log('TYPE:', otpType);
                      if (finalOtp.length !== 4) {
                        Alert.alert('Error', 'Enter 4-digit OTP');
                        return;
                      }

                      // //  Close OTP sheet
                      // refRBSheet.current.close();

                      // //  Open Success sheet (after small delay)
                      // setTimeout(() => {
                      //   successSheetRef.current.open();
                      // }, 300);
                      console.log(' VERIFY REQUEST SEND');
                      console.log(' VERIFY OTP', {
                        otp: finalOtp,
                        type: otpType,
                      });
                      dispatch({
                        type: VERIFY_OTP_REQUEST,

                        payload: {
                          data: {
                            otp: finalOtp,
                            type: otpType, // 'mobile' or 'email'
                          },
                          // token: token,
                        },
                      });
                    }}
                  />
                </View>
              </View>
            </View>
          </RBSheet>

          <RBSheet
            ref={successSheetRef}
            height={hp(257)}
            openDuration={250}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
              container: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
              },
            }}>
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
                    {/* Mobile has been updated */}
                    {finalOtpType === 'mobile'
                      ? 'Mobile has been updated'
                      : 'Email has been updated'}
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
                      successSheetRef.current?.close();

                      dispatch({type: 'RESET_OTP_STATE'});
                    }}
                    title={'Ok'}
                    buttonStyle={{width: wp(120), height: hp(50)}}
                  />
                </View>
              </View>
            </View>
          </RBSheet>

          <Text style={styles.label}>Email</Text>

          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: wp(10),
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 12,
              paddingRight: 5,
              // paddingHorizontal: 12,
              height: 50,
              borderWidth: 1,
              borderColor: '#ccc',
              color: '#000000',
              marginBottom: 30,
            }}>
            <TextInput
              // style={[styles.input, {marginBottom: 30}]}
              style={{flex: 1, color: '#000000'}}
              placeholder="Enter email"
              keyboardType="email-address"
              placeholderTextColor={'grey'}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            {/* 👇 Hide when email login */}
            {loginType === 'mobile' && (
              <GradientButton
                title={'Send OTP'}
                buttonStyle={{
                  width: wp(94),
                  height: hp(39),
                  borderRadius: 10,
                }}
                textStyle={{fontSize: fontSize(14)}}
                // onPress={() => {
                //   console.log('TYPE:', 'email');
                //   console.log('MOBILE:', mobile);
                //   console.log('EMAIL:', email);

                //   if (!isEmailValid) return;
                //   setOtpType('email'); // ✅ correct (small letters)
                //   setOtpType(true);
                //   setOtp(['', '', '', '']);
                //   setTimer(119);

                //   refRBSheet.current.open(); // same sheet use કરી શકે
                // }}

                onPress={() => {
                  console.log('CLICK: Send OTP (Email)');

                  if (!email || !email.includes('@')) {
                    Alert.alert('Error', 'Enter valid email');
                    return;
                  }
                  console.log(' SEND OTP PAYLOAD:', {
                    email,
                    loginType,
                  });

                  dispatch({
                    type: SEND_OTP_REQUEST,
                    payload: {
                      data: {email: email},
                      // token: token,
                    },
                  });
                  console.log('OTP TYPE SET: email');
                  setOtpType('email'); // ✅ only this
                  setFinalOtpType('email'); // ✅ ADD THIS
                  setOtp(['', '', '', '']);
                  setTimer(119);

                  refRBSheet.current.open();
                }}
              />
            )}
          </View>
          {!isKeyboardVisible && (
            <GradientButton
              title={loading ? 'Saving...' : 'Save Changes'}
              onPress={handleSave}
              // disabled={loading}
              loading={loading}
              buttonStyle={{height: hp(45)}}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff'},
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
  backButton: {paddingRight: 10},
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamily.poppins500,
    fontSize: wp(18),
    color: '#000',
    marginRight: 30,
  },
  arrowIcon: {width: wp(20), height: hp(18), resizeMode: 'contain'},
  scrollArea: {paddingHorizontal: 20},
  profileCircle: {
    alignSelf: 'center',
    backgroundColor: '#F7E7FF',
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    overflow: 'hidden', // REQUIRED!
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  profileInitials: {fontSize: 22, fontWeight: 'bold', color: '#333'},
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
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000000',
  },
  rectangle: {
    width: '100%',
    height: hp(48),
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: wp(10),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    paddingHorizontal: 5,
    paddingVertical: 5,
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
  genderBtnActive: {backgroundColor: '#8225AF', borderRadius: wp(10)},
  genderText: {
    fontSize: 15,
    fontFamily: fontFamily.poppins500,
    color: '#000000',
  },
  genderTextActive: {color: '#fff'},
  // divider: {width: 1, backgroundColor: '#E2E2E2'},
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modalBox: {
    width: wp(80),
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 15,
    elevation: 5,
  },

  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  modalText: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: 'black',
  },

  modalLine: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 20,
  },

  arrow: {
    fontSize: 18,
    color: '#A0A0A0',
  },
});

export default BasicInfoScreen;
