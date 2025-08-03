import React, {
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
  useEffect,
} from 'react';
import {Platform, Text, TextInput, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import {fontFamily, fontSize, hp} from '../../utils/helpers';
import GradientButton from '../gradientButton';
import {GoogleIcon} from '../../assets';
import {OtpInput} from 'react-native-otp-entry';

// Platform-specific TouchableOpacity
const Touchable =
  Platform.OS === 'ios'
    ? require('react-native-gesture-handler').TouchableOpacity
    : require('react-native').TouchableOpacity;

const StartingScreenBottomButtonContainer = forwardRef((props, ref) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendVisible, setResendVisible] = useState(false);

  const bottomSheetRef = useRef(null);
  const verifyBottomSheetRef = useRef(null);

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setResendVisible(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

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

  const handleVerifyCode = () => {
    const rawMobileNumber = mobileNumber.replace(/\s/g, '');
    console.log('Verify Code button pressed', rawMobileNumber);
    bottomSheetRef.current?.close();
    setTimeout(() => {
      verifyBottomSheetRef.current?.open();
    }, 300);
  };

  const onVerifyPress = () => {
    verifyBottomSheetRef.current?.close();
  };

  const handleOtpChange = value => {
    setOtp(value);
  };

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
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}>
        <View
          style={{
            alignItems: 'center',
            marginTop: hp(64),
            marginHorizontal: 35,
          }}>
          <Text
            style={{
              fontSize: hp(18),
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
                borderRadius: 50,
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#DDDDDD',
              }}>
              <Text style={{color: 'black', fontSize: fontSize(16)}}>+91</Text>
              <View
                style={{
                  height: hp(25),
                  width: 1,
                  borderWidth: 1,
                  marginLeft: hp(22),
                  borderColor: '#DDDDDD',
                }}
              />
              <TextInput
                style={{
                  marginLeft: hp(22),
                  flex: 1,
                  height: hp(50),
                  fontSize: 16,
                  color: 'black',
                }}
                placeholder="Mobile Number"
                keyboardType="numeric"
                value={mobileNumber}
                onChangeText={text => setMobileNumber(formatMobileNumber(text))}
                maxLength={13}
              />
            </View>

            <View style={{marginTop: hp(26)}}>
              <GradientButton
                title="Continue"
                onPress={handleVerifyCode}
                disabled={mobileNumber.length !== 11}
                buttonStyle={{
                  width: '100%',
                  height: hp(50),
                  borderRadius: 25,
                  opacity: mobileNumber.length === 11 ? 1 : 0.5,
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
            <Text style={{fontSize: fontSize(12), color: 'black'}}>
              I agree to the{' '}
            </Text>
            <Touchable onPress={() => console.log('Terms pressed')}>
              <Text style={{color: '#9317CF', fontSize: fontSize(12)}}>
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
            <Text style={{color: 'black', fontSize: fontSize(16)}}>
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
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}>
        <View
          style={{
            alignItems: 'center',
            marginTop: hp(50),
            marginHorizontal: 35,
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
              sent on <Text style={{color: '#9317CF'}}>+91 {mobileNumber}</Text>
            </Text>

            <View style={{marginTop: 40}}>
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
                    fontSize: 20,
                    color: '#000',
                  },
                }}
                focusColor="black"
              />
            </View>

            <View style={{marginTop: hp(32)}}>
              <Touchable
                disabled={!resendVisible}
                onPress={() => {
                  setTimer(60);
                  setResendVisible(false);
                }}>
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
                      <Text style={{color: '#9317CF'}}>{formatTime()}</Text>
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
                  disabled={otp.length !== 4}
                  buttonStyle={{
                    width: '100%',
                    height: hp(50),
                    borderRadius: 25,
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
                <Text style={{color: 'black', fontSize: fontSize(16)}}>
                  or Sign In using
                </Text>
                <Touchable style={{marginLeft: hp(21)}}>
                  <GoogleIcon />
                </Touchable>
              </View>
            </View>
          </View>

          {/*<Touchable onPress={() => verifyBottomSheetRef.current?.close()}>*/}
          {/*  <Text>Close</Text>*/}
          {/*</Touchable>*/}
        </View>
      </RBSheet>
    </GestureHandlerRootView>
  );
});

export default StartingScreenBottomButtonContainer;
