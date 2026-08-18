import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  BackIcon,
  CameraIcon,
  ChatShareIcon,
  EmojiIcon,
  Icon,
  images,
  RightArrow,
  ShareIcon,
  ThreeDotsIcon,
} from '../../assets';
import {useState} from 'react';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {useSelector} from 'react-redux';
import {connectSocket, getSocket} from '../../socket/socket';
import {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useRef} from 'react';
import {it} from 'rn-emoji-keyboard';
import {Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../../components/gradientButton';
import {ToastAndroid} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  UPLOAD_CUSTOMER_CHAT_IMAGE_REQUEST,
  UPLOAD_CUSTOMER_IMAGE_TO_S3_REQUEST,
} from '../../redux/actions/chatAction';
const SendEquiryScreen = ({route}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const canLoadMore = useRef(false);
  const flatListRef = useRef(null);
  const [textMessage, setTextMessage] = React.useState('');
  const isDisabled = !textMessage.trim();
  const [page, setPage] = useState(1);
  const pageRef = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const {productId, receiverId, storeData} = route.params;

  console.log('Product ID =>', productId);
  console.log('Receiver ID =>', receiverId);
  console.log('Store Data =>', storeData);
  const {product} = useSelector(state => state.productDetails);
  // console.log('PRODUCTS IN SEND ENQUIRY =>', product);
  const firstVariant = product?.variants?.[0];
  // console.log('First Variant =>', firstVariant);

  const mainImage = firstVariant?.images?.find(
    image => image.isSelectedForMainScreen === true,
  );

  // console.log('Main Image =>', mainImage);
  const token = useSelector(state => state.auth.token);
  const {messages: chatMessages} = useSelector(state => state.chat);
  // console.log('GET SELLER AND USER CONVERSATIONS  MESSAGES =>', chatMessages);
  const {messages} = useSelector(state => state.chat);

  const filteredMessages = chatMessages.filter(item => {
    const senderId = item.senderId?._id || item.senderId?.id;
    const receiverIdData = item.receiverId?._id || item.receiverId?.id;

    return senderId === receiverId || receiverIdData === receiverId;
  });

  const displayMessages = filteredMessages;

  useEffect(() => {
    if (!token) {
      return;
    }

    const socket = connectSocket(token);

    socket.on('connect', () => {
      console.log(' SOCKET CONNECTED');
      console.log(' SOCKET ID =>', socket.id);

      socket.emit('get_messages', {
        counterpartyId: receiverId,

        page: 1,
        limit: 10,
      });

      console.log('GET_MESSAGES EMITTED');

      socket.onAny((event, data) => {
        console.log(' EVENT =>', event);
        console.log(' DATA =>', data);
      });
    });

    // Initial messages
    socket.on('messages_list', response => {
      console.log(
        'MESSAGES_LIST RESPONSE =>',
        JSON.stringify(response, null, 2),
      );

      if (response.page === 1) {
        dispatch({
          type: 'SET_MESSAGES',
          payload: response.results,
        });
      } else {
        dispatch({
          type: 'APPEND_MESSAGES',
          payload: response.results,
        });
      }

      if (response.results.length < 10) {
        setHasMore(false);
      }

      setLoading(false);
      setLoadingMore(false);
    });
    socket.on('message_sent', message => {
      console.log('MESSAGE_SENT ID =>', message.id);
      console.log(' MESSAGE SENT EVENT', message);
      console.log('NEW MESSAGE =>', message);
      socket.emit('get_messages', {
        counterpartyId: receiverId,
        page: 1,
        limit: 10,
      });
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          ...message,
          createdAt: new Date().toISOString(),
        },
      });
      setSelectedImage(null);

      dispatch({
        type: 'CLEAR_UPLOADED_IMAGE',
      });
    });
    // New incoming message
    socket.on('receive_message', message => {
      console.log('RECEIVE_MESSAGE ID =>', message._id);
      console.log('RECEIVE_MESSAGE EVENT FIRED');
      console.log(' NEW MESSAGE =>', message);

      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          ...message,
          createdAt: new Date().toISOString(),
        },
      });
    });

    socket.on('message_deleted', response => {
      console.log(' MESSAGE_DELETED EVENT RECEIVED');
      console.log(' RESPONSE =>', response);

      dispatch({
        type: 'DELETE_MESSAGE',
        payload: response.messageId,
      });
      ToastAndroid.show('Message deleted successfully', ToastAndroid.SHORT);
    });

    socket.on('error', error => {
      console.log('SOCKET ERROR EVENT =>', error);

      ToastAndroid.show(
        error?.error || error?.message || 'Something went wrong',
        ToastAndroid.SHORT,
      );
    });

    socket.on('connect_error', error => {
      console.log('SOCKET ERROR =>', error);
    });

    return () => {
      console.log(' CLEANUP SOCKET');

      socket.off('messages_list');
      socket.off('receive_message');
      socket.off('connect');
      socket.off('connect_error');
    };
  }, [token, receiverId]);

  // when send to seller
  const handleSendMessage = () => {
    console.log('TEXT MESSAGE =>', textMessage);
    const socket = getSocket();

    if (!socket) {
      console.log('Socket not connected');
      return;
    }

    const payload = {
      receiverId,
      receiverModel: 'SellerUser',
      // message: textMessage,
      productId,
      message: textMessage || 'Sending a photo!',
      fileUrl: uploadedCustomerS3Image,
    };

    console.log('Payload =>', payload);
    socket.emit('send_message', payload);
    console.log('Message emitted');
    console.log('SEND IMAGE PAYLOAD =>', JSON.stringify(payload, null, 2));
    setTextMessage('');
    // Add this
    // setSelectedImage(null);

    // dispatch({
    //   type: 'CLEAR_UPLOADED_IMAGE',
    // });
  };

  const initialLoadDone = useRef(false);

  useEffect(() => {
    if (displayMessages.length > 0 && !initialLoadDone.current) {
      initialLoadDone.current = true;

      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: 0,
          animated: false,
        });
      }, 100);
    }
  }, [displayMessages.length]);

  const flatListData = [];
  displayMessages.forEach((msg, index) => {
    const variant = msg.product?.variants?.[0];

    // First Message
    flatListData.push({
      id: `message-${msg._id || msg.id}-${index}`,
      _id: msg._id || msg.id,
      type: 'message',
      message: msg.message,
      fileUrl: msg.fileUrl, // ADD THIS
      time: new Date(msg.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isMe: (msg.senderId?._id || msg.senderId?.id) !== receiverId,
    });

    // Then Product
    if (msg.product) {
      flatListData.push({
        id: `product-${msg._id}-${index}`,
        type: 'product',
        title: msg.product.title,
        price: variant?.price || '',
        discount: variant?.discount || '',
        image: variant?.images?.[0]?.imageUrl || '',
      });
    }
    // console.log('FLATLIST_DATA =>', flatListData);
  });
  const loadMoreMessages = () => {
    // console.log('PAGE =>', page);
    // console.log('HAS MORE =>', hasMore);
    // console.log('LOADING MORE =>', loadingMore);

    if (loadingMore || !hasMore) {
      return;
    }

    setLoadingMore(true);
    const nextPage = pageRef.current + 1;

    pageRef.current = nextPage;
    setPage(nextPage);

    const socket = getSocket();

    socket.emit('get_messages', {
      counterpartyId: receiverId,
      page: nextPage,
      limit: 10,
    });

    setPage(nextPage);
  };

  const {uploadImageLoading, uploadedImageData, uploadingImageError} =
    useSelector(state => state.chat);
  // console.log(uploadImageLoading, 'UPLOAD IMAGE LOADING');
  // console.log(uploadedImageData, 'UPLOAD IMAGE DATA');
  // console.log(uploadingImageError, 'UPLOAD IMAGE ERROR');
  const {uploadedCustomerS3Image} = useSelector(state => state.chat);
  // console.log(uploadedCustomerS3Image, 'uploadedCustomerS3Image======>');
  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('USER CANCELLED');
          return;
        }

        if (response.errorCode) {
          console.log('IMAGE PICKER ERROR =>', response.errorMessage);
          return;
        }

        const image = response.assets?.[0];

        if (!image) {
          console.log('NO IMAGE SELECTED');
          return;
        }

        setSelectedImage(image);

        const dispatchPayload = {
          fileName: image.fileName || `chat_image_${Date.now()}.jpg`,
          fileType: image.type || 'image/jpeg',
          image,
        };

        console.log(
          'DISPATCH PAYLOAD JSON =>',
          JSON.stringify(dispatchPayload, null, 2),
        );

        dispatch({
          type: UPLOAD_CUSTOMER_CHAT_IMAGE_REQUEST,
          payload: dispatchPayload,
        });

        console.log('DISPATCH CALLED');
      },
    );
  };
  useEffect(() => {
    console.log('UPLOADED CUSTOMER S3 IMAGE =>', uploadedCustomerS3Image);
  }, [uploadedCustomerS3Image]);

  useEffect(() => {
    console.log('UPLOADED IMAGE DATA =>', uploadedImageData);

    if (uploadedImageData?.uploadUrl && selectedImage) {
      const payload = {
        uploadUrl: uploadedImageData.uploadUrl,
        fileUrl: uploadedImageData.fileUrl,
        imageUri: selectedImage.uri,
        fileType: selectedImage.type,
      };

      console.log('S3 PAYLOAD =>', JSON.stringify(payload, null, 2));

      dispatch({
        type: UPLOAD_CUSTOMER_IMAGE_TO_S3_REQUEST,
        payload,
      });
    }
  }, [uploadedImageData]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          width: '100%',
          height: hp(70),
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: wp(16),
            marginRight: wp(26),
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: wp(16),
            }}>
            <View
              style={{
                width: hp(40),
                height: hp(40),
                borderRadius: hp(20),
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E6F4EA',
              }}>
              {storeData?.profileImage ? (
                <Image
                  source={{uri: storeData.profileImage}}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              ) : (
                <Text
                  style={{
                    fontSize: fontSize(15),
                    fontFamily: fontFamily.poppins600,
                    color: '#006E2F',
                  }}>
                  {storeData?.name?.charAt(0)?.toUpperCase() || 'NA'}
                </Text>
              )}
            </View>
            <View
              style={{
                marginLeft: wp(16),
              }}>
              <Text
                style={{
                  fontSize: fontSize(15),
                  fontFamily: fontFamily.poppins600,
                  color: '#000000',
                  lineHeight: hp(22),
                }}>
                {storeData?.name || 'Star Cloths'}
              </Text>

              <Text
                style={{
                  fontSize: fontSize(12),
                  fontFamily: fontFamily.poppins400,
                  color: '#2B9909',
                  // marginTop: hp(2),
                }}>
                Online
              </Text>
            </View>
          </View>
          <ThreeDotsIcon />
        </View>
      </View>

      <FlatList
        inverted
        // onEndReached={loadMoreMessages}
        // onEndReachedThreshold={0.3}
        onMomentumScrollBegin={() => {
          canLoadMore.current = true;
        }}
        onEndReached={() => {
          if (!canLoadMore.current) {
            return;
          }

          canLoadMore.current = false;

          loadMoreMessages();
        }}
        onEndReachedThreshold={0.3}
        ref={flatListRef}
        data={flatListData}
        keyExtractor={item => item.id}
        style={{flex: 1}}
        contentContainerStyle={
          {
            // paddingBottom: hp(120),
          }
        }
        renderItem={({item}) => {
          if (item.type === 'product') {
            return (
              <View
                style={{
                  backgroundColor: '#FDF8FF',
                  marginHorizontal: wp(19),
                  paddingLeft: wp(19),
                  paddingRight: wp(22),
                  paddingVertical: hp(16),
                  borderRadius: 18,
                  marginBottom: hp(10),
                  marginTop: hp(20),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      item.image ? {uri: item.image} : images.productImageFour
                    }
                    style={{
                      width: hp(73),
                      height: hp(95),
                      borderRadius: hp(15),
                    }}
                  />

                  <View
                    style={{
                      flex: 1,
                      marginLeft: wp(18),
                    }}>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: fontSize(15),
                        fontFamily: fontFamily.poppins700,
                        color: '#000000',
                      }}>
                      {item.title}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: hp(12),
                        flexWrap: 'wrap',
                      }}>
                      <Text
                        style={{
                          fontSize: fontSize(11),
                          fontFamily: fontFamily.poppins600,
                          color: '#000000',
                        }}>
                        Rs {item?.price || 'NA'}
                      </Text>

                      <Text
                        style={{
                          fontSize: fontSize(11),
                          fontFamily: fontFamily.poppins400,
                          color: '#000000',
                          marginLeft: 5,
                        }}>
                        MRP
                      </Text>

                      <Text
                        style={{
                          fontSize: fontSize(11),
                          fontFamily: fontFamily.poppins400,
                          color: '#000000',
                          textDecorationLine: 'line-through',
                          marginLeft: 2,
                        }}>
                        Rs {item?.price || 'NA'}
                      </Text>

                      <Text
                        style={{
                          fontSize: fontSize(11),
                          fontFamily: fontFamily.poppins600,
                          color: '#2B9909',
                          marginLeft: 10,
                        }}>
                        {item?.discount || 'NA'}% Off
                      </Text>
                    </View>
                  </View>

                  <RightArrow />
                </View>
              </View>
            );
          }

          return (
            <TouchableOpacity
              onPress={() => {
                console.log('SELECTED MESSAGE =>', item);

                setSelectedMessageId(item._id);

                console.log('MESSAGE ID SAVED =>', item._id);

                setModalVisible(true);
              }}
              style={{
                alignSelf: item.isMe ? 'flex-end' : 'flex-start',
                backgroundColor: item.isMe ? '#FBF4FF' : '#EDF4FF',
                borderRadius: wp(18),
                paddingHorizontal: wp(17),
                paddingVertical: hp(12),
                marginHorizontal: wp(17),
                marginVertical: hp(6),
                maxWidth: '75%',
                marginTop: hp(18),
                // marginBottom: hp(18),
              }}>
              {item.fileUrl ? (
                <Image
                  source={{uri: item.fileUrl}}
                  style={{
                    width: hp(200),
                    height: hp(200),
                    borderRadius: wp(10),
                    marginBottom: hp(8),
                  }}
                  resizeMode="cover"
                />
              ) : null}
              <Text
                style={{
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins400,
                  color: '#000000',
                }}>
                {item.message}
              </Text>

              <Text
                style={{
                  fontSize: fontSize(10),
                  fontFamily: fontFamily.poppins400,
                  color: '#000000',
                  marginTop: hp(4),
                }}>
                {item.time}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {(uploadedCustomerS3Image || selectedImage) && (
        <View
          style={{
            paddingHorizontal: wp(20),
            marginBottom: hp(10),
          }}>
          <View
            style={{
              width: hp(90),
              height: hp(90),
              borderRadius: wp(12),
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: uploadedCustomerS3Image || selectedImage?.uri}}
              style={{
                width: '100%',
                height: '100%',
              }}
            />

            <TouchableOpacity
              onPress={() => {
                setSelectedImage(null);

                dispatch({
                  type: 'CLEAR_UPLOADED_IMAGE',
                });
              }}
              style={{
                position: 'absolute',
                top: wp(5),
                right: wp(5),
                width: hp(20),
                height: hp(20),
                borderRadius: wp(10),
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: fontFamily.poppins400,
                  fontSize: fontSize(12),
                }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: wp(19),
          paddingVertical: hp(16),
          // backgroundColor: '#be2121',
          // borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
        }}>
        <View
          style={{
            flex: 1,
            borderColor: '#CFCFCF',
            borderWidth: 1,
            borderRadius: 25,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: wp(8),
            // marginRight: wp(10),

            backgroundColor: '#FFFFFF',
          }}>
          <TouchableOpacity
            onPress={openGallery}
            style={{
              width: hp(34),
              height: hp(34),
              backgroundColor: '#EAEAEA',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ChatShareIcon />
          </TouchableOpacity>
          <TextInput
            value={textMessage}
            onChangeText={setTextMessage}
            placeholder="Message..."
            placeholderTextColor="#000000"
            style={{
              flex: 1,
              marginLeft: wp(12),
              fontSize: fontSize(14),
              fontFamily: fontFamily.poppins500,
              color: '#000000',
              height: hp(45),
            }}
          />

          <TouchableOpacity
            onPress={handleSendMessage}
            // disabled={isDisabled}
            style={{
              width: hp(52),
              height: hp(39),
              borderRadius: 20,
              backgroundColor: '#5029F4',
              alignItems: 'center',
              justifyContent: 'center',
              // opacity: isDisabled ? 0.5 : 1,
            }}>
            <Icon />
          </TouchableOpacity>
        </View>
      </View>
      {/* modal  */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              width: wp(340),
              // height: hp(206),
              backgroundColor: '#FFFFFF',
              borderRadius: 18,
            }}>
            <View style={{marginHorizontal: wp(68), marginTop: hp(40)}}>
              <Text
                style={{
                  fontSize: fontSize(18),
                  fontFamily: fontFamily.poppins500,
                  color: '#000000',
                  textAlign: 'center',
                }}>
                Sure want to Delete this Message?
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: hp(26),
                marginHorizontal: wp(28),
                marginBottom: hp(36),
              }}>
              <LinearGradient
                colors={['#0F52BA', '#8225AF']}
                style={{
                  width: wp(112),
                  height: hp(50),
                  borderRadius: wp(30),
                  padding: 1,
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setModalVisible(false);
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
                buttonStyle={{
                  width: wp(146),
                  height: hp(50),
                }}
                title={'Yes, Delete'}
                onPress={() => {
                  console.log('SELECTED MESSAGE ID =>', selectedMessageId);

                  if (!selectedMessageId) {
                    console.log('NO MESSAGE ID FOUND');
                    return;
                  }

                  const socket = getSocket();

                  // console.log('🔌 SOCKET =>', socket);

                  if (!socket) {
                    // console.log('SOCKET NOT CONNECTED');
                    return;
                  }
                  console.log(
                    'ALL CHAT IDS =>',
                    chatMessages.map(item => item._id),
                  );
                  console.log('EMITTING delete_message EVENT');

                  socket.emit('delete_message', {
                    messageId: selectedMessageId,
                  });

                  console.log('PAYLOAD =>', {
                    messageId: selectedMessageId,
                  });

                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SendEquiryScreen;
