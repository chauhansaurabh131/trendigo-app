import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import arrow_back from '../../assets/images/arrow_back.png';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {images} from '../../assets';
import {Modal} from 'react-native';
import GradientButton from '../../components/gradientButton';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import {
  REVIEW_BY_USER_ID_REQUEST,
  ReviewUserIdAction,
} from '../../redux/actions/reviewByUserIdActions';
const RevewsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {reviewByUserData} = useSelector(state => state.reviewByUserId);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  const userId = user?.id || user?._id;
  useEffect(() => {
    if (userId && token) {
      dispatch(ReviewUserIdAction(userId, token));
    }
  }, [userId, token]);
  console.log('USER ID ===>', userId);
  console.log('TOKEN ===>', token);
  const [deleteReview, setDeleteReview] = useState(false);
  const reviews = reviewByUserData?.data?.reviews || [];
  // const reviews = [
  //   {
  //     _id: '1',
  //     createdAt: '02 Feb, 2026',
  //     productName: 'Designer Traditional Dress',
  //     title: 'Great Product',
  //     rating: 4.2,
  //     description:
  //       "I love this kurta set from Libas. The fitting is nice too but in the top it's a little too accurate.",
  //     images: [images.reviews_image, images.reviews_image],
  //   },
  //   {
  //     _id: '2',
  //     createdAt: '02 Feb, 2026',
  //     productName: 'Designer Traditional Dress',
  //     title: 'Great Product',
  //     rating: 4.2,
  //     description:
  //       "I love this kurta set from Libas. The fitting is nice too but in the top it's a little too accurate.",
  //     images: [images.reviews_image, images.reviews_image],
  //   },
  // ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          marginTop: hp(19),
          marginHorizontal: wp(18),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={arrow_back}
            style={{
              width: 18,
              height: 18,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center'}}>
          <Text
            style={{
              fontSize: fontSize(18),
              color: '#000',
              fontFamily: fontFamily.poppins500,
            }}>
            My Reviews (1)
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          borderColor: '#F2F2F2',
          borderWidth: 1,
          marginTop: hp(17),
        }}
      />
      <View
        style={{
          // width: '100%',
          // height: hp(370),
          // height: hp(401),
          borderColor: '#E8E8E8',
          borderWidth: 1,
          marginHorizontal: wp(18),
          borderRadius: 14,
          marginTop: hp(18),
        }}>
        <View style={{marginTop: hp(15), paddingHorizontal: wp(13)}}>
          <Text
            style={{
              fontSize: fontSize(12),
              color: '#000',
              fontFamily: fontFamily.poppins400,
            }}>
            Submitted on 02 Feb, 2026
          </Text>
          <View
            style={{
              width: '100%',
              borderWidth: 0.4,
              borderColor: '#E8E8E8',
              marginTop: hp(12),
              // marginHorizontal: wp(13),
            }}
          />
        </View>
        <View
          style={{
            marginHorizontal: wp(13),
            marginTop: hp(13),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={images.my_review}
            style={{width: wp(50), height: hp(58)}}
          />
          <Text
            style={{
              color: '#000',
              marginLeft: wp(16),
              fontSize: fontSize(13),
              fontFamily: fontFamily.poppins500,
            }}>
            Designer Traditional Dress
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: wp(13),
            marginTop: hp(17),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: fontSize(12),
              fontFamily: fontFamily.poppins600,
              textAlignVertical: 'center',
              includeFontPadding: false,
            }}>
            Great Product
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: wp(17),
            }}>
            <Image
              source={images.star_fulfil_icon}
              style={{
                width: wp(14),
                height: hp(14),
              }}
              resizeMode="contain"
            />

            <Text
              style={{
                color: '#8225AF',
                fontSize: fontSize(14),
                fontFamily: fontFamily.poppins600,
                marginLeft: wp(12),
                textAlignVertical: 'center',
                includeFontPadding: false,
              }}>
              4.2
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: wp(13), marginTop: hp(11)}}>
          <Text
            style={{
              color: '#000',
              fontFamily: fontFamily.poppins400,
              fontSize: fontSize(12),
            }}>
            I love this kurta set from Libas. The fitting is nice too{'\n'}but
            in the top it's a little too accurate, if this shrunk {'\n'}in the
            wash it won't fit me.
          </Text>
        </View>
        <View
          style={{
            marginLeft: wp(14),
            marginTop: hp(14),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={images.reviews_image}
            style={{width: wp(50), height: hp(67), borderRadius: 10}}
          />

          <Image
            source={images.reviews_image}
            style={{
              width: wp(50),
              height: hp(67),
              borderRadius: 10,
              marginLeft: wp(15),
            }}
          />
        </View>
        <View
          style={{
            // width: '100%',
            borderWidth: 0.3,
            borderColor: '#E8E8E8',
            marginTop: hp(22),
            marginHorizontal: wp(13),
          }}
        />
        <View
          style={{
            marginHorizontal: wp(55),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: hp(16),
            marginBottom: hp(16),
          }}>
          <Text
            style={{
              color: '#8225AF',
              fontSize: fontSize(13),
              fontFamily: fontFamily.poppins400,
            }}>
            Edit Review
          </Text>
          <View
            style={{
              width: 1,
              height: '100%',
              backgroundColor: '#E8E8E8',
              marginHorizontal: wp(10),
            }}
          />
          <TouchableOpacity onPress={() => setDeleteReview(true)}>
            <Text
              style={{
                color: '#8225AF',
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins400,
              }}>
              Delete Review
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={deleteReview}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteReview(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              // width: '100%',
              width: wp(340),
              height: hp(206),
              backgroundColor: '#fff',
              borderRadius: 14,
            }}>
            <View
              style={{
                // marginHorizontal: wp(29),
                marginTop: hp(40),
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins400,
                  textAlign: 'center',
                  lineHeight: hp(24),
                }}>
                Are you sure you want to{'\n'}
                delete this review?
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-evenly',
                justifyContent: 'space-between',
                marginTop: hp(26),
                marginHorizontal: wp(28),
              }}>
              <LinearGradient
                colors={['#0F52BA', '#8225AF']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  borderRadius: 50,
                  width: wp(112),
                  height: hp(50),
                  padding: 1,
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    borderRadius: 50, // 👈 VERY IMPORTANT
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => setDeleteReview(false)}>
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: fontFamily.poppins500,
                      fontSize: fontSize(14),
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </LinearGradient>

              <GradientButton
                title={'Yes, Delete'}
                buttonStyle={{width: wp(146), height: hp(50)}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default RevewsScreen;
