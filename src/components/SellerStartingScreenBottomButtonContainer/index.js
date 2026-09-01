import React, {
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
  useEffect,
} from 'react';
import {
  Alert,
  Platform,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import GradientButton from '../gradientButton';
import {GoogleIcon} from '../../assets';
import {OtpInput} from 'react-native-otp-entry';
import {useDispatch, useSelector} from 'react-redux';
import {
  sellerForgotPasswordRequest,
  sellerLoginRequest,
  sellerLoginReset,
  sellerResetPasswordRequest,
  sellerVerifyResetOtpRequest,
} from '../../redux/actions/sellerAuthActions';
import {useNavigation} from '@react-navigation/native';
import {getMessaging} from '@react-native-firebase/messaging';
// Platform-specific TouchableOpacity
const Touchable =
  Platform.OS === 'ios'
    ? require('react-native-gesture-handler').TouchableOpacity
    : require('react-native').TouchableOpacity;

const SellerStartingScreenBottomButtonComponent = forwardRef((props, ref) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendVisible, setResendVisible] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  //
  const [otpDestination, setOtpDestination] = useState('');
  // Login states
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  // Reset Password states
  const [resetValue, setResetValue] = useState('');
  //ref
  const bottomSheetRef = useRef(null);
  const resetPasswordSheetRef = useRef();
  const verifyBottomSheetRef = useRef(null);
  const newPasswordSheetRef = useRef();
  const notificationSheetRef = useRef();
  useEffect(() => {
    if (!otpSent) return;
    let interval;

    if (timer > 0) {
      console.log('TIMER =>', timer);
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setResendVisible(true);
    }

    return () => clearInterval(interval);
  }, [timer, otpSent]);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} Sec`;
  };

  // Allow parent to trigger open method
  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.open(),
  }));

  const formatMobileNumber = text => {
    let formattedText = text.replace(/[^\d]/g, '');
    if (formattedText.length > 5) {
      formattedText =
        formattedText.slice(0, 5) + ' ' + formattedText.slice(5, 10);
    }
    return formattedText.slice(0, 13);
  };

  // get fcm Token
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const token = await getMessaging().getToken();
      setFcmToken(token);
    };

    getToken();
  }, []);
  //login
  const {loading, sellerData, error} = useSelector(state => state.sellerAuth);
  // console.log('LOADING', loading);
  // console.log('SELLER DATA', sellerData);
  // console.log('ERROR', error);

  //validation
  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidMobile = mobile => /^[0-9]{10}$/.test(mobile);

  const isValid =
    (isValidEmail(inputValue.trim()) || isValidMobile(inputValue.trim())) &&
    password.trim().length > 0;

  const handleVerifyCode = () => {
    const value = inputValue.trim();
    console.log('Verify Code button pressed', value);
    let payload = {};

    if (isValidEmail(value)) {
      payload = {
        email: value,
        password: password.trim(),
        deviceToken: fcmToken,
        platform: 'android',
      };
    } else if (isValidMobile(value)) {
      payload = {
        mobileNumber: value,
        password: password.trim(),
        countryCodeId: '6957b791f4ef97291c4df2d0',
        deviceToken: fcmToken,
        platform: 'android',
      };
    } else {
      return;
    }

    console.log('LOGIN PAYLOAD =>', payload);

    dispatch(sellerLoginRequest(payload));
    // bottomSheetRef.current?.close();

    setTimeout(() => {
      // verifyBottomSheetRef.current?.open();
    }, 300);
  };

  // after success
  useEffect(() => {
    if (sellerData?.status === 'Success') {
      ToastAndroid.show('Login Successful', ToastAndroid.SHORT);

      bottomSheetRef.current?.close();

      navigation.navigate('SellerMains');

      // setTimeout(() => {
      //   notificationSheetRef.current?.open();
      // }, 300);
    }
  }, [sellerData]);

  //if error
  useEffect(() => {
    if (error) {
      ToastAndroid.show(error?.message || 'Login Failed', ToastAndroid.SHORT);
    }
  }, [error]);

  //reset and forgot
  const {forgotPasswordLoading, forgotPasswordData, forgotPasswordError} =
    useSelector(state => state.sellerAuth);
  // console.log('FORGOT PASSWORD LOADING', forgotPasswordLoading),
  //   console.log('FORGOT PASSWORD DATA', forgotPasswordData),
  //   console.log('FORGOT PASSWORD ERROR', forgotPasswordError);

  // Reset validation
  const isResetValid =
    isValidEmail(resetValue.trim()) || isValidMobile(resetValue.trim());

  const handleResetPassword = () => {
    console.log('Handle Reset Password');
    const value = resetValue.trim();

    let payload = {};

    if (isValidEmail(value)) {
      setOtpDestination(value);
      payload = {
        email: value,
      };
      console.log('Reset Email:', value);
    } else if (isValidMobile(value)) {
      setOtpDestination(value);
      payload = {
        mobileNumber: value,
      };
      console.log('Reset Mobile:', value);
    } else {
      return;
    }

    console.log('FORGOT PASSWORD PAYLOAD =>', payload);

    dispatch(sellerForgotPasswordRequest(payload));
  };

  useEffect(() => {
    if (forgotPasswordData?.status === 'Success') {
      setOtpSent(true);
      setTimer(60);
      setOtpDestination(resetValue.trim());
      ToastAndroid.show('OTP Sent Successfully', ToastAndroid.SHORT);

      resetPasswordSheetRef.current?.close();

      setTimeout(() => {
        verifyBottomSheetRef.current?.open();
      }, 300);
    }
  }, [forgotPasswordData]);

  useEffect(() => {
    if (forgotPasswordError) {
      ToastAndroid.show(
        forgotPasswordError?.message || 'Something went wrong',
        ToastAndroid.SHORT,
      );
    }
  }, [forgotPasswordError]);

  // Verify otp
  const {verifyResetOtpLoading, verifyResetOtpData, verifyResetOtpError} =
    useSelector(state => state.sellerAuth);

  const onVerifyPress = () => {
    console.log('Verify Otp Loaded');
    const value = otpDestination?.trim();

    let payload = {};

    if (isValidEmail(value)) {
      payload = {
        email: value,
        otp: Number(otp),
      };
    } else if (isValidMobile(value)) {
      payload = {
        mobileNumber: value,
        otp: Number(otp),
      };
    } else {
      return;
    }

    console.log('VERIFY RESET OTP PAYLOAD =>', payload);

    dispatch(sellerVerifyResetOtpRequest(payload));
  };

  useEffect(() => {
    if (verifyResetOtpData?.status === 'Success') {
      ToastAndroid.show('OTP Verified Successfully', ToastAndroid.SHORT);

      verifyBottomSheetRef.current?.close();

      setTimeout(() => {
        newPasswordSheetRef.current?.open();
      }, 300);
    }
  }, [verifyResetOtpData]);

  useEffect(() => {
    if (verifyResetOtpError) {
      ToastAndroid.show(
        verifyResetOtpError?.message || 'Invalid OTP',
        ToastAndroid.SHORT,
      );
    }
  }, [verifyResetOtpError]);

  const handleOtpChange = value => {
    setOtp(value);
  };

  //resent otp

  const handleResendOtp = () => {
    const value = otpDestination?.trim();

    let payload = {};

    if (isValidEmail(value)) {
      payload = {
        email: value,
      };
    } else if (isValidMobile(value)) {
      payload = {
        mobileNumber: value,
      };
    } else {
      return;
    }

    console.log('RESEND OTP PAYLOAD =>', payload);

    dispatch(sellerForgotPasswordRequest(payload));

    setTimer(60);
    setResendVisible(false);
  };

  // set password

  const {resetPasswordLoading, resetPasswordData, resetPasswordError} =
    useSelector(state => state.sellerAuth);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8}$/;

  const isPasswordValid =
    passwordRegex.test(newPassword) && confirmPassword === newPassword;

  const getPasswordError = () => {
    if (!newPassword) return '';

    if (newPassword.length < 8) {
      return 'Password must be at least 8 characters';
    }

    if (!/[A-Z]/.test(newPassword)) {
      return 'Password must contain one uppercase letter';
    }

    if (!/[a-z]/.test(newPassword)) {
      return 'Password must contain one lowercase letter';
    }

    if (!/\d/.test(newPassword)) {
      return 'Password must contain one number';
    }

    if (!/[@$!%*?&#]/.test(newPassword)) {
      return 'Password must contain one special character';
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return 'Passwords do not match';
    }

    return '';
  };
  const handleSetPassword = () => {
    if (!passwordRegex.test(newPassword)) {
      Alert.alert(
        'Invalid Password',
        'Password must contain uppercase, lowercase, number, special character and be at least 8 characters long.',
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        'Password Mismatch',
        'New Password and Confirm Password must match.',
      );
      return;
    }

    const value = otpDestination?.trim();

    let payload = {};

    if (isValidEmail(value)) {
      payload = {
        email: value,
        otp: Number(otp),
        password: newPassword,
      };
    } else if (isValidMobile(value)) {
      payload = {
        mobileNumber: value,
        otp: Number(otp),
        password: newPassword,
      };
    } else {
      return;
    }

    console.log('RESET PASSWORD PAYLOAD =>', payload);

    dispatch(sellerResetPasswordRequest(payload));
  };

  useEffect(() => {
    if (resetPasswordData?.status === 'Success') {
      ToastAndroid.show('Password Reset Successfully', ToastAndroid.SHORT);

      newPasswordSheetRef.current?.close();

      setTimeout(() => {
        bottomSheetRef.current?.open(); // Login sheet
      }, 300);
    }
  }, [resetPasswordData]);

  useEffect(() => {
    if (resetPasswordError) {
      ToastAndroid.show(
        resetPasswordError?.message || 'Reset Password Failed',
        ToastAndroid.SHORT,
      );
    }
  }, [resetPasswordError]);

  return (
    <GestureHandlerRootView>
      {/* First Bottom Sheet */}
      <RBSheet
        ref={bottomSheetRef}
        height={hp(464)}
        openDuration={250}
        closeDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: wp(25),
            borderTopRightRadius: wp(25),
          },
        }}>
        <View
          style={{
            alignItems: 'center',
            marginTop: hp(31),
            marginHorizontal: wp(38),
          }}>
          <Text
            style={{
              fontSize: fontSize(18),
              color: 'black',
              fontFamily: fontFamily.poppins500,
            }}>
            Seller Login
          </Text>

          <View style={{marginTop: hp(39)}}>
            <View
              style={{
                width: '100%',
                height: hp(50),
                borderWidth: 1,
                borderRadius: wp(50),
                paddingHorizontal: wp(28),
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#DDDDDD',
              }}>
              <TextInput
                placeholder="Enter Email or Mobile "
                placeholderTextColor={'#000000'}
                style={{
                  flex: 1,
                  height: hp(50),
                  fontSize: fontSize(16),
                  color: 'black',
                }}
                keyboardType="default"
                value={inputValue}
                onChangeText={text => setInputValue(text)}
                autoCapitalize="none"
              />
            </View>
            <View style={{marginTop: hp(15)}}>
              <View
                style={{
                  width: '100%',
                  height: hp(50),
                  borderWidth: 1,
                  borderRadius: wp(50),
                  paddingHorizontal: wp(28),
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: '#DDDDDD',
                }}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={'#000000'}
                  style={{
                    flex: 1,
                    height: hp(50),
                    fontSize: fontSize(16),
                    color: 'black',
                  }}
                  keyboardType="default"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  // autoCorrect={false}
                />
              </View>
            </View>
            <View style={{marginTop: hp(28)}}>
              <GradientButton
                title="Login"
                onPress={handleVerifyCode}
                disabled={!isValid || loading}
                buttonStyle={{
                  width: '100%',
                  height: hp(50),
                  borderRadius: wp(25),
                  opacity: isValid ? 1 : 0.5,
                }}
                textStyle={{
                  fontSize: fontSize(16),
                  fontFamily: fontFamily.poppins500,
                  lineHeight: hp(24),
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current?.close();

              setTimeout(() => {
                resetPasswordSheetRef.current?.open();
              }, 300);
            }}
            style={{
              marginTop: hp(19),
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#5029F3',
                fontSize: fontSize(16),
                fontFamily: fontFamily.poppins400,
              }}>
              Reset Password
            </Text>
          </TouchableOpacity>

          <View
            style={{
              width: '100%',
              height: hp(1),
              backgroundColor: '#E1E1E1',
              marginTop: hp(23),
            }}
          />

          <View
            style={{
              marginTop: hp(27),
              borderWidth: 1,
              borderColor: '#D1D1D1',
              height: hp(50),
              width: '100%',
              borderRadius: wp(27),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#5029F4',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(16),
              }}>
              Become Seller on Trulybag
            </Text>
          </View>
        </View>
      </RBSheet>

      {/* reset password sheet */}
      <RBSheet
        ref={resetPasswordSheetRef}
        height={hp(381)}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: wp(25),
            borderTopRightRadius: wp(25),
          },
        }}>
        <View style={{marginTop: hp(31), alignItems: 'center'}}>
          <Text
            style={{
              fontSize: fontSize(18),
              color: 'black',
              fontFamily: fontFamily.poppins500,
            }}>
            Reset Password
          </Text>
        </View>
        <View style={{marginTop: hp(39), marginHorizontal: wp(38)}}>
          <View
            style={{
              // width: '100%',
              height: hp(50),
              borderWidth: 1,
              borderRadius: wp(50),
              paddingHorizontal: wp(28),
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: '#DDDDDD',
            }}>
            <TextInput
              placeholder="Enter Email or Mobile "
              placeholderTextColor={'#000000'}
              style={{
                flex: 1,
                height: hp(50),
                fontSize: fontSize(16),
                color: 'black',
              }}
              value={resetValue}
              onChangeText={setResetValue}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={{marginTop: hp(39), marginHorizontal: wp(38)}}>
          <GradientButton
            title="Send OTP"
            onPress={handleResetPassword}
            disabled={!isResetValid || forgotPasswordLoading}
            buttonStyle={{
              width: '100%',
              height: hp(50),
              borderRadius: wp(25),
              opacity: isResetValid ? 1 : 0.5,
            }}
            textStyle={{
              fontSize: fontSize(16),
              fontFamily: fontFamily.poppins500,
              lineHeight: hp(24),
            }}
          />
        </View>
      </RBSheet>

      {/* Second Bottom Sheet */}
      <RBSheet
        ref={verifyBottomSheetRef}
        height={hp(376)}
        openDuration={250}
        closeDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: wp(25),
            borderTopRightRadius: wp(25),
          },
        }}>
        <View
          style={{
            alignItems: 'center',
            marginTop: hp(31),
            marginHorizontal: wp(35),
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: fontSize(18),
              lineHeight: hp(26),
              fontFamily: fontFamily.poppins500,
            }}>
            Verify OTP
          </Text>

          <View>
            <Text
              style={{
                fontSize: fontSize(14),
                lineHeight: hp(20),
                color: 'black',
                fontFamily: fontFamily.poppins400,
                marginTop: hp(8),
                textAlign: 'center',
              }}>
              sent on <Text style={{color: '#704EFE'}}> {otpDestination}</Text>
            </Text>

            <View style={{marginTop: hp(59)}}>
              <OtpInput
                numberOfDigits={4}
                type="numeric"
                onTextChange={handleOtpChange}
                theme={{
                  pinCodeContainerStyle: {
                    width: hp(69),
                    height: hp(50),
                    borderWidth: 1,
                    borderRadius: 14,
                    backgroundColor: '#F6F6F6', // ✅ Add background color here
                    borderColor: '#E0E0E0', // Optional: lighter border
                  },
                  pinCodeTextStyle: {
                    fontSize: fontSize(22),
                    color: '#000',
                    fontFamily: fontFamily.poppins400,
                  },
                }}
                focusColor="black"
              />
            </View>

            <View style={{marginTop: hp(32)}}>
              <Touchable disabled={!resendVisible} onPress={handleResendOtp}>
                <Text
                  style={{
                    fontSize: fontSize(14),
                    color: resendVisible ? 'black' : 'gray',
                    flexDirection: 'row',
                    textAlign: 'center',
                    lineHeight: hp(20),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  {resendVisible ? (
                    'Resend'
                  ) : (
                    <>
                      Resend in{' '}
                      <Text style={{color: '#714FFE'}}>{formatTime()}</Text>
                    </>
                  )}
                </Text>
              </Touchable>

              <View style={{marginTop: hp(32)}}>
                <GradientButton
                  title="Verify"
                  // onPress={() => {
                  //   verifyBottomSheetRef.current?.close();
                  // }}
                  onPress={onVerifyPress}
                  disabled={otp.length !== 4 || verifyResetOtpLoading}
                  buttonStyle={{
                    width: '100%',
                    height: hp(50),
                    borderRadius: wp(25),
                    opacity:
                      otp.length === 4 && !verifyResetOtpLoading ? 1 : 0.5,
                  }}
                  textStyle={{
                    fontSize: fontSize(16),
                    fontFamily: fontFamily.poppins500,
                    lineHeight: hp(24),
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </RBSheet>

      <RBSheet
        ref={newPasswordSheetRef}
        height={hp(381)}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: wp(25),
            borderTopRightRadius: wp(25),
          },
        }}>
        <View
          style={{
            marginTop: hp(31),
            // marginHorizontal: wp(38),
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: fontFamily.poppins500,
              fontSize: fontSize(18),
              color: 'black',
            }}>
            Set Password
          </Text>
        </View>
        <View style={{marginTop: hp(39), marginHorizontal: wp(38)}}>
          <View
            style={{
              width: '100%',
              height: hp(50),
              borderWidth: 1,
              borderRadius: wp(50),
              paddingHorizontal: wp(28),
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: '#DDDDDD',
            }}>
            <TextInput
              placeholder="New Password"
              placeholderTextColor={'#000000'}
              style={{
                flex: 1,
                height: hp(50),
                fontSize: fontSize(16),
                fontFamily: fontFamily.poppins400,
                color: 'black',
              }}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={{marginTop: hp(19), marginHorizontal: wp(38)}}>
          <View
            style={{
              width: '100%',
              height: hp(50),
              borderWidth: 1,
              borderRadius: wp(50),
              paddingHorizontal: wp(28),
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: '#DDDDDD',
            }}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={'#000000'}
              style={{
                flex: 1,
                height: hp(50),
                fontSize: fontSize(16),
                fontFamily: fontFamily.poppins400,
                color: 'black',
              }}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={{marginTop: hp(70)}}>
            <GradientButton
              title="Submit"
              onPress={handleSetPassword}
              // disabled={!isPasswordValid || resetPasswordLoading}
              buttonStyle={{
                width: '100%',
                height: hp(50),
                borderRadius: wp(25),
                // opacity: isPasswordValid ? 1 : 0.5,
              }}
              textStyle={{
                fontSize: fontSize(16),
                fontFamily: fontFamily.poppins500,
                lineHeight: hp(24),
              }}
            />
          </View>
        </View>
      </RBSheet>
    </GestureHandlerRootView>
  );
});

export default SellerStartingScreenBottomButtonComponent;
