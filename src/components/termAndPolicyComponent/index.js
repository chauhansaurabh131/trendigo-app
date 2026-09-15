import React, {useState} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, Modal} from 'react-native';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {colors} from '../../utils/colors';

const TermAndPolicy = () => {
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => setShowPolicyModal(true)}
        style={{
          width: wp(164),
          height: hp(39),
          borderColor: '#EAE7EE',
          borderWidth: hp(1),
          borderRadius: wp(8),
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: hp(14),
        }}>
        <Text
          style={{
            fontSize: fontSize(12),
            // lineHeight: hp(26),
            fontFamily: fontFamily.poppins400,
            color: colors.pureBlack,
          }}>
          Term & Policy
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showPolicyModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPolicyModal(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: wp(340),
              backgroundColor: '#FFF',
              borderRadius: wp(12),
              // height: hp(612),
            }}>
            <View
              style={{
                marginTop: hp(12),
                marginHorizontal: wp(20),
              }}>
              <Text
                style={{
                  fontSize: fontSize(13),
                  // lineHeight: hp(26),
                  fontFamily: fontFamily.poppins400,
                  color: colors.pureBlack,
                }}>
                Terms of Use and Policy
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                height: hp(1),
                backgroundColor: '#D8D8D8',
                marginTop: hp(12),
              }}
            />

            <View style={{marginHorizontal: wp(20), marginTop: hp(16)}}>
              <Text
                style={{
                  fontSize: fontSize(13),
                  // lineHeight: hp(26),
                  fontFamily: fontFamily.poppins600,
                  color: colors.pureBlack,
                }}>
                Privacy Policies
              </Text>
            </View>

            <View style={{marginHorizontal: wp(20), marginTop: hp(16)}}>
              <Text
                style={{
                  fontSize: fontSize(12),
                  // lineHeight: hp(26),
                  fontFamily: fontFamily.poppins400,
                  color: colors.pureBlack,
                }}>
                At Fashion Boutique, we are committed to protecting your
                personal information.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: hp(1),
                marginHorizontal: wp(20),
                marginTop: hp(16),
              }}>
              <Text
                style={{
                  fontSize: fontSize(13),
                  fontFamily: fontFamily.poppins400,
                  marginLeft: wp(6),
                  color: '#000000',
                }}>
                •
              </Text>

              <Text
                style={{
                  fontSize: fontSize(12),
                  color: '#000000',
                  fontFamily: fontFamily.poppins400,
                  marginLeft: wp(6),
                }}>
                Data Collection: We collect your name, email, address, and
                payment information to process orders and improve your shopping
                experience.
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginBottom: hp(1),
                marginHorizontal: wp(20),
                // marginTop: hp(16),
              }}>
              <Text
                style={{
                  fontSize: fontSize(13),
                  fontFamily: fontFamily.poppins400,
                  marginLeft: wp(6),
                  color: '#000000',
                }}>
                •
              </Text>

              <Text
                style={{
                  fontSize: fontSize(12),
                  color: '#000000',
                  fontFamily: fontFamily.poppins400,
                  marginLeft: wp(6),
                }}>
                Usage: Your data is used strictly for order fulfillment,
                customer service, and marketing (if you opt-in).
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginBottom: hp(1),
                marginHorizontal: wp(20),
                // marginTop: hp(16),
              }}>
              <Text
                style={{
                  fontSize: fontSize(13),
                  fontFamily: fontFamily.poppins400,
                  marginLeft: wp(6),
                  color: '#000000',
                }}>
                •
              </Text>

              <Text
                style={{
                  fontSize: fontSize(12),
                  color: '#000000',
                  fontFamily: fontFamily.poppins400,
                  marginLeft: wp(6),
                }}>
                Security: We employ industry-standard security measures to
                protect your information.
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginBottom: hp(1),
                marginHorizontal: wp(20),
                // marginTop: hp(16),
              }}>
              <Text
                style={{
                  fontSize: fontSize(13),
                  fontFamily: fontFamily.poppins400,
                  marginLeft: wp(6),
                  color: '#000000',
                }}>
                •
              </Text>

              <Text
                style={{
                  fontSize: fontSize(12),
                  color: '#000000',
                  fontFamily: fontFamily.poppins400,
                  marginLeft: wp(6),
                }}>
                Sharing: We do not share or sell your data to third parties,
                except for trusted partners required to fulfill your order.
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginBottom: hp(1),
                marginHorizontal: wp(20),
                // marginTop: hp(16),
              }}>
              <Text
                style={{
                  fontSize: fontSize(13),
                  fontFamily: fontFamily.poppins400,
                  marginLeft: wp(6),
                  color: '#000000',
                }}>
                •
              </Text>

              <Text
                style={{
                  fontSize: fontSize(12),
                  color: '#000000',
                  fontFamily: fontFamily.poppins400,
                  marginLeft: wp(6),
                }}>
                Your Rights: You can access, update, or delete your personal
                information at any time by contacting us
                at privacy@fashionboutique.com.
              </Text>
            </View>

            <View style={{marginHorizontal: wp(20), marginTop: hp(16)}}>
              <Text
                style={{
                  fontSize: fontSize(12),
                  // lineHeight: hp(26),
                  fontFamily: fontFamily.poppins400,
                  color: colors.pureBlack,
                }}>
                For more details, please refer to our full Privacy Policy
                available on our website.
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                height: hp(1),
                backgroundColor: '#D8D8D8',
                marginTop: hp(16),
              }}
            />

            <View style={{marginHorizontal: wp(20), marginTop: hp(16)}}>
              <Text
                style={{
                  fontSize: fontSize(13),
                  // lineHeight: hp(26),
                  fontFamily: fontFamily.poppins600,
                  color: colors.pureBlack,
                }}>
                Shipping Policy
              </Text>
            </View>
            <View style={{marginHorizontal: wp(20), marginTop: hp(16)}}>
              <Text
                style={{
                  fontSize: fontSize(12),
                  // lineHeight: hp(26),
                  fontFamily: fontFamily.poppins400,
                  color: colors.pureBlack,
                }}>
                At Fashion Boutique, we are committed to protecting your
                personal information.
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginBottom: hp(1),
                marginHorizontal: wp(20),
                marginTop: hp(16),
                marginBottom: hp(16),
              }}>
              <Text
                style={{
                  fontSize: fontSize(13),
                  fontFamily: fontFamily.poppins400,
                  marginLeft: wp(6),
                  color: '#000000',
                }}>
                •
              </Text>

              <Text
                style={{
                  fontSize: fontSize(12),
                  color: '#000000',
                  fontFamily: fontFamily.poppins400,
                  marginLeft: wp(6),
                }}>
                Data Collection: We collect your name, email, address, and
                payment information to process orders and improve your shopping
                experience.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default TermAndPolicy;
