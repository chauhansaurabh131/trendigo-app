import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import {fontSize} from '../../utils/helpers';
import {fontFamily} from '../../utils/helpers';
import {images, ReviewImage} from '../../assets';
import arrow_back from '../../assets/images/arrow_back.png';
import {hp, wp} from '../../utils/helpers';
import {useNavigation, useRoute} from '@react-navigation/native';
import RatingStatComponent from '../../components/ratingStarComponent';
import GradientButton from '../../components/gradientButton';
import {Modal} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {addReviewRequest} from '../../redux/actions/reviewActions';
import {GET_PRESIGNED_URL_REQUEST} from '../../redux/actions/reviewActions';
const ReviewandRatingsScreen = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [model, setModel] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  // const {product} = route.params;
  // ✅ FIRST destructure
  // const {product, rating: initialRating} = route.params || {};
  const {product: productArray, rating: initialRating} = route.params || {};

  const product = Array.isArray(productArray) ? productArray[0] : productArray;
  console.log('Review Product 👉', product);
  const productId = product?._id || product?.id;
  const sellerId = product?.storeId?.id;
  const [rating, setRating] = useState(initialRating || 0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewDesc, setReviewDesc] = useState('');

  const handleSubmitReview = () => {
    if (!rating || !reviewTitle || !reviewDesc) {
      alert('Please fill all fields');
      return;
    }

    // 🔥 If image selected → call presigned saga
    if (selectedImage) {
      dispatch({
        type: GET_PRESIGNED_URL_REQUEST,
        payload: {
          name:
            selectedImage.fileName ||
            selectedImage.uri.split('/').pop() ||
            `review_${Date.now()}.jpg`,

          key:
            selectedImage.fileName ||
            selectedImage.uri.split('/').pop() ||
            `review_${Date.now()}.jpg`,
          file: selectedImage, // 🔥🔥🔥 THIS IS MISSING

          contentType: selectedImage.type || 'image/jpeg',
          productId: product?._id?.trim() || '',
          sellerId: product?.storeId?.id?.trim() || '',
          title: reviewTitle.trim(),
          description: reviewDesc.trim(),
          rating: Number(rating),
          isAdminAprove: true,
        },
      });
    } else {
      // 🔥 No image → direct review submit
      const payload = {
        productId: product._id.trim(),
        sellerId: product.storeId.id.trim(),
        title: reviewTitle.trim(),
        description: reviewDesc.trim(),
        rating: Number(rating),
        isAdminAprove: true,
      };

      dispatch(addReviewRequest(payload));
    }
    setModel(true); // success modal (later move this on success)
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 3, // 🔥 allow 3 images
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled');
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImages(prev => {
          const newImages = [...prev, ...response.assets];
          return newImages.slice(0, 3); // max 3 images
        });
      }
    });
  };
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
            Ratings & Reviews
          </Text>
        </View>
      </View>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: hp(140)}} // ✅
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: '#F2F2F2',
            marginTop: hp(17),
          }}
        />
        <View
          style={{
            marginTop: hp(17),
            marginHorizontal: wp(18),
          }}>
          <Text
            style={{
              fontSize: fontSize(13),
              color: '#000',
              fontFamily: fontFamily.poppins500,
            }}>
            Rate this product
          </Text>
        </View>
        <View style={{marginHorizontal: wp(18), marginTop: hp(11)}}>
          <RatingStatComponent
            value={rating}
            onRatingChange={value => setRating(value)}
          />
        </View>
        <View
          style={{
            marginTop: hp(30),
            marginHorizontal: wp(18),
          }}>
          <Text
            style={{
              fontSize: fontSize(13),
              color: '#000',
              fontFamily: fontFamily.poppins500,
            }}>
            Review Title
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: wp(18),
            borderWidth: 1,
            borderColor: '#EAEAEA',
            // width: '100%',
            height: hp(44),
            marginTop: hp(11),
            borderRadius: 10,
          }}>
          <TextInput
            value={reviewTitle}
            onChangeText={setReviewTitle}
            placeholderTextColor={'#000'}
            // placeholder="Great Product!"
            style={{
              fontSize: fontSize(15),
              fontFamily: fontFamily.poppins400,
              color: '#000',
              marginLeft: wp(10),
            }}
          />
        </View>
        <View
          style={{
            marginTop: hp(29),
            marginHorizontal: wp(18),
          }}>
          <Text
            style={{
              fontSize: fontSize(13),
              color: '#000',
              fontFamily: fontFamily.poppins500,
            }}>
            Write Your Experience
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: wp(18),
            borderWidth: 1,
            borderColor: '#EAEAEA',
            // width: '100%',
            height: hp(268),
            marginTop: hp(11),
            borderRadius: 10,
          }}>
          <TextInput
            value={reviewDesc}
            onChangeText={setReviewDesc}
            placeholderTextColor={'#000'}
            // placeholder="Great Product!"
            style={{
              fontSize: fontSize(15),
              fontFamily: fontFamily.poppins400,
              color: '#000',
              // marginLeft: wp(19),
              // marginTop: hp(18),
              marginLeft: wp(10),
              marginTop: hp(1),
            }}
          />
        </View>
        <View style={{marginTop: hp(23), marginHorizontal: wp(18)}}>
          <Text
            style={{
              color: '#000',
              fontSize: fontSize(13),
              fontFamily: fontFamily.poppins500,
            }}>
            Share Photo
          </Text>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {selectedImage && (
            <View
              style={{
                marginTop: hp(19),
                marginHorizontal: wp(18),
                position: 'relative',
              }}>
              <Image
                source={{uri: selectedImage.uri}}
                style={{
                  width: wp(60),
                  height: hp(60),
                  borderRadius: 10,
                }}
              />

              <TouchableOpacity
                onPress={() => setSelectedImage(null)}
                style={{
                  width: wp(15),
                  height: hp(15),
                  borderRadius: 10,
                  backgroundColor: '#000',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                }}>
                <Image
                  source={images.review_delete}
                  style={{width: wp(8.18), height: hp(8.18)}}
                />
              </TouchableOpacity>
            </View>
          )}

          <View
            style={{
              width: wp(60),
              height: hp(60),
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#9317CF',
              marginTop: hp(19),
              marginLeft: wp(15),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={openGallery}>
              <Image
                source={images.camera_icon}
                style={{
                  width: wp(20.6),
                  height: hp(18.81),
                }}
              />
            </TouchableOpacity>
          </View>
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(19),
            marginHorizontal: wp(18),
          }}>
          {/* 🖼 Selected Images FIRST */}
          {selectedImages.map((item, index) => (
            <View key={index} style={{marginRight: 10}}>
              <Image
                source={{uri: item.uri}}
                style={{
                  width: wp(60),
                  height: hp(60),
                  borderRadius: 10,
                }}
              />

              {/* ❌ Delete Button */}
              <TouchableOpacity
                onPress={() => {
                  const updated = selectedImages.filter((_, i) => i !== index);
                  setSelectedImages(updated);
                }}
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  backgroundColor: '#000',
                  width: wp(15),
                  height: hp(15),
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={images.review_delete}
                  style={{width: wp(8.18), height: hp(8.18)}}
                />
              </TouchableOpacity>
            </View>
          ))}

          {/* 📷 Camera LAST */}
          {selectedImages.length < 3 && (
            <TouchableOpacity
              onPress={openGallery}
              style={{
                width: wp(60),
                height: hp(60),
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#9317CF',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={images.camera_icon}
                style={{
                  width: wp(20.6),
                  height: hp(18.81),
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <View style={{bottom: hp(16), marginHorizontal: wp(18)}}>
        <GradientButton
          title={'Submit Review'}
          // onPress={() => setModel(true)}
          onPress={handleSubmitReview}
        />
      </View>
      <Modal
        visible={model}
        transparent
        animationType="fade"
        onRequestClose={() => setModel(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              height: hp(206),
              backgroundColor: '#fff',
              borderRadius: 10,
              // alignItems: 'center',
              // justifyContent: 'flex-start',
              paddingTop: hp(40), // now this works properly
            }}>
            <View
              style={{
                marginHorizontal: wp(32),
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: fontSize(16),
                  fontFamily: fontFamily.poppins400,
                  textAlign: 'center',
                }}>
                Thank You So much,
                {'\n'}Your Review has been saved!
              </Text>
            </View>
            <View style={{alignItems: 'center', marginTop: hp(33)}}>
              <GradientButton
                title={'Ok'}
                onPress={() => setModel(false)}
                buttonStyle={{width: wp(88), height: hp(50)}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default ReviewandRatingsScreen;
