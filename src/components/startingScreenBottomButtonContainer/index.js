import React, {
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
  useEffect,
} from 'react';
import {Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import GradientButton from '../gradientButton';
import {GoogleIcon} from '../../assets';
import {OtpInput} from 'react-native-otp-entry';
import {fetchUserRequest} from '../../redux/actions/userActions';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Keyboard} from 'react-native';

import {
  registerRequest,
  verifyEmailOtpRequest,
  resetAuthFlow,
  resendOtpRequest,
  setLoginType,
} from '../../redux/actions/authActions';
import {set} from 'mongoose';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Platform-specific TouchableOpacity
const Touchable =
  Platform.OS === 'ios'
    ? require('react-native-gesture-handler').TouchableOpacity
    : require('react-native').TouchableOpacity;

const StartingScreenBottomButtonContainer = forwardRef((props, ref) => {
  // const [email, setEmail] = useState('');
  const [input, setInput] = useState(''); // email OR mobile
  // const [loginType, setLoginType] = useState(null); // 'email' | 'mobile'
  const loginType = useSelector(state => state.auth.loginType);

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendVisible, setResendVisible] = useState(false);
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const {product} = props;
  const route = useRoute();
  const redirectTo = route.params?.redirectTo;
  const bottomSheetRef = useRef(null);
  const verifyBottomSheetRef = useRef(null);
  const navigation = useNavigation();
  const [keyboardClosed, setKeyboardClosed] = useState(false);
  const dispatch = useDispatch();
  const {
    // redux state
    loading: authLoading,
    otpSent,
    token,
    error,
  } = useSelector(state => state.auth);
  const detectLoginType = value => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const mobileRegex = /^[0-9]{8,15}$/;

    if (emailRegex.test(value)) return 'email';
    if (mobileRegex.test(value)) return 'mobile';
    return null;
  };

  useEffect(() => {
    if (!resendVisible && otpSent) {
      setIsOtpExpired(false);
      setTimer(60);

      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendVisible(true);
            setIsOtpExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [resendVisible, otpSent]);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} Sec`;
  };

  // =============================
  //  Expose open() to parent
  // =============================
  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.open(),
  }));

  // =============================
  // Auto open OTP Sheet when saga sets otpSent = true
  // =============================
  useEffect(() => {
    if (otpSent) {
      bottomSheetRef.current?.close();
      setTimeout(() => {
        verifyBottomSheetRef.current?.open();
      }, 300);
    }
  }, [otpSent]);

  // =============================
  // REGISTER Button
  // =============================

  const onContinuePress = async () => {
    const type = detectLoginType(input);

    if (!type) {
      alert('Enter valid Email or Mobile number');
      return;
    }

    await AsyncStorage.setItem('loginType', type);

    const check = await AsyncStorage.getItem('loginType');
    console.log('AFTER SAVE CHECK:', check);
    dispatch(resetAuthFlow());
    dispatch(setLoginType(type));
    const payload =
      // loginType === 'email'
      type === 'email'
        ? {email: input}
        : {
            mobileNumber: input,
            countryCodeId: '6957b791f4ef97291c4df2d0',
          };

    dispatch(registerRequest(payload));
    console.log('REGISTER REQUEST DISPATCHED with payload:', payload);
    console.log('LOGIN TYPE SET:', type);
  };

  // =============================
  // Auto Close OTP Sheet after token received
  // =============================
  useEffect(() => {
    if (token) {
      verifyBottomSheetRef.current?.close();
      console.log('LOGIN SUCCESS TOKEN:', token);
    }
  }, [token]);

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem('authToken');

      if (savedToken) {
        console.log('TOKEN RESTORED:', savedToken);
        dispatch(loadTokenFromStorage(savedToken));
      }
    };

    loadToken();
  }, []);

  const handleOtpChange = value => {
    setOtp(value);
  };

  const onVerifyPress = () => {
    if (otp.length !== 4) {
      alert('Enter 4-digit OTP');
      return;
    }

    const payload =
      loginType === 'email' ? {email: input, otp} : {mobileNumber: input, otp};

    dispatch(verifyEmailOtpRequest(payload));
    console.log('VERIFY OTP REQUEST DISPATCHED with payload:', payload);
  };

  const handleResend = () => {
    setOtp('');
    setTimer(60);
    setResendVisible(false);
    setIsOtpExpired(false);

    const payload =
      loginType === 'email'
        ? {email: input}
        : {
            mobileNumber: input,
            countryCodeId: '6957b791f4ef97291c4df2d0',
          };

    dispatch(resendOtpRequest(payload));
    console.log('RESEND OTP REQUEST DISPATCHED with payload:', payload);
  };

  useEffect(() => {
    if (token) {
      const redirect = route?.params?.redirectTo;

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'MainTabs',
            params: redirect ? {screen: redirect} : undefined,
          },
        ],
      });
    }
  }, [token]);
  useEffect(() => {
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (emailRegex.test(input)) {
      const t = setTimeout(() => {
        Keyboard.dismiss();
      }, 2000);

      return () => clearTimeout(t);
    }
  }, [input]);

  useEffect(() => {
    console.log('AUTH LOADING =>', authLoading);
  }, [authLoading]);
  return (
    <GestureHandlerRootView>
      {/* First Bottom Sheet */}
      <RBSheet
        ref={bottomSheetRef}
        height={hp(450)}
        openDuration={250}
        closeDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: wp(20),
            borderTopRightRadius: wp(20),
          },
        }}>
        <View
          style={{
            alignItems: 'center',
            marginTop: hp(64),
            marginHorizontal: wp(35),
          }}>
          <Text
            style={{
              fontSize: fontSize(18),
              color: 'black',
              fontFamily: fontFamily.poppins500,
            }}>
            Login or Signup
          </Text>

          <View style={{marginTop: hp(43)}}>
            <View
              style={{
                width: '100%',
                height: hp(50),
                borderWidth: 1,
                borderRadius: wp(50),
                paddingHorizontal: wp(20),
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#DDDDDD',
              }}>
              <TextInput
                style={{
                  // marginLeft: hp(22),/
                  flex: 1,
                  height: hp(50),
                  fontSize: fontSize(16),
                  color: 'black',
                }}
                placeholder="Enter Email or Mobile "
                placeholderTextColor={'black'}
                autoCapitalize="none"
                value={input}
                onChangeText={text => {
                  setInput(text);
                  setLoginType(detectLoginType(text));
                }}
                keyboardType="default"
                maxLength={50}
                onSubmitEditing={() => Keyboard.dismiss()}
              />
            </View>

            {/* Continue Button */}
            <View style={{marginTop: hp(26)}}>
              <GradientButton
                title={authLoading ? 'Please wait...' : 'Continue'}
                onPress={onContinuePress}
                disabled={!input || authLoading}
                buttonStyle={{
                  width: '100%',
                  height: hp(50),
                  borderRadius: wp(25),
                  opacity: input && !authLoading ? 1 : 0.5,
                }}
                textStyle={{
                  fontSize: fontSize(16),
                  fontFamily: fontFamily.poppins500,
                  lineHeight: hp(24),
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: hp(26),
            }}>
            <Text
              style={{
                fontSize: fontSize(12),
                color: 'black',
                fontFamily: fontFamily.poppins400,
              }}>
              I agree to the{' '}
            </Text>
            <Touchable onPress={() => console.log('Terms pressed')}>
              <Text
                style={{
                  color: '#5029F3',
                  fontSize: fontSize(12),
                  fontFamily: fontFamily.poppins400,
                }}>
                Terms & Privacy Policy
              </Text>
            </Touchable>
          </View>

          <View
            style={{
              width: '100%',
              borderWidth: 0.5,
              borderColor: '#E2E2E2',
              marginTop: hp(27),
            }}
          />

          <View style={{marginTop: hp(43), flexDirection: 'row'}}>
            <Text
              style={{
                color: 'black',
                fontSize: fontSize(16),
                fontFamily: fontFamily.poppins400,
              }}>
              or Sign In using
            </Text>
            <Touchable style={{marginLeft: hp(21)}}>
              <GoogleIcon />
            </Touchable>
          </View>
        </View>
      </RBSheet>

      {/* Second Bottom Sheet */}
      <RBSheet
        ref={verifyBottomSheetRef}
        height={hp(450)}
        openDuration={250}
        closeDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: wp(20),
            borderTopRightRadius: wp(20),
          },
        }}>
        <View
          style={{
            alignItems: 'center',
            marginTop: hp(50),
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
              sent on <Text style={{color: '#5029F3'}}>{input}</Text>
            </Text>
            {/* OTP Input */}
            <View style={{marginTop: 40}}>
              <OtpInput
                numberOfDigits={4}
                type="numeric"
                onTextChange={handleOtpChange}
                lo
                theme={{
                  pinCodeContainerStyle: {
                    width: hp(69),
                    height: hp(50),
                    borderWidth: 1,
                    borderRadius: wp(14),
                    backgroundColor: '#F6F6F6',
                    borderColor: '#E0E0E0',
                  },
                  pinCodeTextStyle: {
                    fontSize: fontSize(20),
                    fontFamily: fontFamily.poppins400,
                    color: '#000',
                  },
                }}
                focusColor="black"
              />
            </View>
            <View style={{marginTop: hp(32)}}>
              <TouchableOpacity
                disabled={!resendVisible}
                onPress={handleResend}>
                <Text
                  style={{
                    fontSize: fontSize(14),
                    color: resendVisible ? 'black' : 'gray',
                    textAlign: 'center',
                    lineHeight: hp(20),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  {resendVisible ? (
                    'Resend'
                  ) : (
                    <>
                      Resend in{' '}
                      <Text style={{color: '#5029F3'}}>{formatTime()}</Text>
                    </>
                  )}
                </Text>
              </TouchableOpacity>

              {/* VERIFY BUTTON */}
              <View style={{marginTop: hp(32)}}>
                <GradientButton
                  title="Verify"
                  onPress={onVerifyPress}
                  loading={authLoading}
                  disabled={otp.length !== 4}
                  buttonStyle={{
                    width: '100%',
                    height: hp(50),
                    borderRadius: wp(25),
                    opacity: otp.length === 4 ? 1 : 0.5,
                  }}
                  textStyle={{
                    fontSize: fontSize(16),
                    fontFamily: fontFamily.poppins500,
                    lineHeight: hp(24),
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: hp(43),
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: fontSize(16),
                    fontFamily: fontFamily.poppins400,
                  }}>
                  or Sign In using
                </Text>
                <Touchable style={{marginLeft: hp(21)}}>
                  <GoogleIcon />
                </Touchable>
              </View>
            </View>
          </View>
        </View>
      </RBSheet>
    </GestureHandlerRootView>
  );
});

export default StartingScreenBottomButtonContainer;
