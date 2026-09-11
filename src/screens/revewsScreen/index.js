import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import arrow_back from '../../assets/images/arrow_back.png';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {images, RevewsIcon} from '../../assets';
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
  const {reviewByUserData, loading} = useSelector(
    state => state.reviewByUserId,
  );
  console.log(
    'REVIEW USER DATA====>',
    JSON.stringify(reviewByUserData, null, 2),
  );
  const token = useSelector(state => state.auth.token);
  console.log('TOKEN', token);
  const {user} = useSelector(state => state.user);
  console.log('USER====> ', user);
  const userId = user?.id || user?._id;
  console.log('USER ID', userId);
  console.log('USER ID =>', user?.id);

  useEffect(() => {
    if (userId && token) {
      dispatch(ReviewUserIdAction(userId, token));
    }
  }, [userId, token]);

  const [deleteReview, setDeleteReview] = useState(false);
  const reviews = reviewByUserData?.data?.reviews || [];

  const renderReviewItem = ({item}) => {
    console.log('PRODUCT IMAGES =>', item?.product?.images);
    const formattedDate = new Date(item?.createdAt).toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      },
    );
    return (
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
            Submitted on {formattedDate}
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
          {item?.product?.images?.[0]?.imageUrl ? (
            <Image
              source={{
                uri: item?.product?.images?.[0]?.imageUrl,
              }}
              style={{width: wp(50), height: hp(58)}}
            />
          ) : (
            <View
              style={{
                width: wp(50),
                height: hp(58),
                borderWidth: 1,
                borderColor: '#E8E8E8',
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: fontSize(10),
                  color: '#000000',
                  fontFamily: fontFamily.poppins500,
                  textAlign: 'center',
                }}>
                N/A
              </Text>
            </View>
          )}
          <Text
            style={{
              color: '#000',
              marginLeft: wp(16),
              fontSize: fontSize(13),
              fontFamily: fontFamily.poppins500,
            }}>
            {item?.product?.title}
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
            {item?.title}
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
              {item?.rating}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: wp(13), marginTop: hp(11)}}>
          <Text
            style={{
              color: '#000',
              fontFamily: fontFamily.poppins400,
              fontSize: fontSize(12),
              lineHeight: hp(20),
            }}>
            {item?.description}
          </Text>
        </View>
        <View
          style={{
            marginLeft: wp(14),
            marginTop: hp(14),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {item?.images?.map((img, index) => (
            <Image
              key={index}
              source={{uri: img}}
              style={{
                width: wp(50),
                height: hp(67),
                borderRadius: 10,
                marginRight: wp(15),
              }}
            />
          ))}
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
          <TouchableOpacity>
            <Text
              style={{
                color: '#8225AF',
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins400,
              }}>
              Edit Review
            </Text>
          </TouchableOpacity>
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
    );
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={'#5029F3'} />
      </View>
    );
  }
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
              width: hp(18),
              height: hp(18),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center'}}>
          <Text
            style={{
              fontSize: fontSize(16),
              color: '#000',
              fontFamily: fontFamily.poppins500,
            }}>
            My Reviews ({reviews.length})
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

      <FlatList
        data={reviews}
        keyExtractor={(item, index) =>
          item?._id?.toString() || index.toString()
        }
        renderItem={renderReviewItem}
        contentContainerStyle={{flex: 1}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop: hp(100),
            }}>
            <View>
              <RevewsIcon />
            </View>
            <Text
              style={{
                color: '#000000',
                fontSize: fontSize(16),
                fontFamily: fontFamily.poppins500,
                marginTop: hp(23),
              }}>
              No Reviews Found
            </Text>
          </View>
        }
      />
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
