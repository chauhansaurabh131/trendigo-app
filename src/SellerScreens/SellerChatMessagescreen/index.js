import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {
  BackIcon,
  Icon,
  images,
  RightArrow,
  ThreeDotsIcon,
  ShareIcon,
  ChatShareIcon,
} from '../../assets';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {connectSocket} from '../../socket/socket';
import GradientButton from '../../components/gradientButton';
import LinearGradient from 'react-native-linear-gradient';
import {
  CLEAR_CHAT_MESSAGES,
  getChatMessagesRequest,
  getSellerConversationsRequest,
  uploadChatImageRequest,
} from '../../redux/actions/sellerChatActions';
import {useEffect} from 'react';
import {getSocket} from '../../socket/socket';
import {launchImageLibrary} from 'react-native-image-picker';
import {ToastAndroid} from 'react-native';

useSelector;
const SellerChatMessagesscreen = ({route}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [textMessage, setTextMessage] = useState();
  const dispatch = useDispatch();
  const socket = getSocket();
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const {receiverId, user} = route.params;
  console.log('GET USER RECEIVER ID =>', receiverId);
  console.log('USER=====>', user);
  const profileImage = user?.profileImage;
  const userName = user?.name || user?.email || 'No User';
  useEffect(() => {
    // dispatch({type: CLEAR_CHAT_MESSAGES});
    dispatch(
      getChatMessagesRequest({
        receiverId,
        page: 1,
        limit: 10,
      }),
    );
  }, [receiverId]);

  useEffect(() => {
    dispatch(getSellerConversationsRequest());
  }, []);

  const {chatMessages, chatMessagesLoading} = useSelector(
    state => state.sellerChat,
  );

  // console.log('CHAT MESSAGES =>', chatMessages);
  // const messages = chatMessages?.data?.results || [];
  const messages = chatMessages?.results || [];
  // console.log('MESSAGES =>', messages);
  // console.log('MESSAGES LENGTH =>', messages.length);
  // console.log('FIRST MESSAGE =>', messages[0]);

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        console.log('========== SOCKET INIT START ==========');

        const token = await AsyncStorage.getItem('sellerAccessToken');

        console.log('SOCKET TOKEN =>', token);
        //create the connection wih server
        connectSocket(token);

        const socket = getSocket();

        // console.log('SOCKET INSTANCE =>', socket);

        if (!socket) {
          console.log('SOCKET NOT FOUND');
          return;
        }
        //This event fire when socket connected successful
        socket.on('connect', () => {
          console.log('SOCKET CONNECTED =>', socket.id);

          const payload = {
            counterpartyId: receiverId,
            page: 1,
            limit: 10,
          };

          console.log('EMIT get_messages =>', JSON.stringify(payload, null, 2));

          socket.emit('get_messages', payload);
        });

        socket.on('messages_list', data => {
          console.log('PAGE RECEIVED =>', data.page);
          console.log('RESULTS RECEIVED =>', data.results?.length);
          console.log('HAS NEXT PAGE =>', data.hasNextPage);
          // console.log(
          //   'MESSAGES_LIST RECEIVED =>',
          //   JSON.stringify(data, null, 2),
          // );

          // console.log('PAGE =>', data?.page);
          // console.log(
          //   'RESULTS COUNT =>',
          //   data?.results?.length || data?.data?.results?.length,
          // );

          if (data.page === 1) {
            dispatch({
              type: 'SET_CHAT_MESSAGES',
              payload: data,
            });
          } else {
            dispatch({
              type: 'APPEND_CHAT_MESSAGES',
              payload: data,
            });
          }
          setLoadingMore(false);
        });
        //when user send to message then fire event
        socket.on('receive_message', message => {
          console.log('RECEIVE_MESSAGE =>', JSON.stringify(message, null, 2));
          console.log('RECEIVE_MESSAGE =>', message);

          dispatch({
            type: 'ADD_MESSAGE',
            payload: {
              ...message,
              createdAt: message.createdAt || new Date().toISOString(),
            },
          });
        });
        //  when i send message then confirmation you sent a message
        socket.on('message_sent', data => {
          console.log('MESSAGE_SENT =>', JSON.stringify(data, null, 2));
          console.log('MESSAGE_SENT =>', data);
          console.log('CREATED AT =>', data.createdAt);
          dispatch({
            type: 'ADD_MESSAGE',
            payload: {
              ...data,
              createdAt: new Date().toISOString(),
            },
          });
        });
        socket.on('message_deleted', data => {
          console.log('MESSAGE DELETED =>', data);

          dispatch({
            type: 'DELETE_MESSAGE',
            payload: data.messageId,
          });

          ToastAndroid.show('Message deleted successfully', ToastAndroid.SHORT);
        });

        socket.on('error', error => {
          console.log('DELETE ERROR =>', error);

          ToastAndroid.show(
            error?.error || error?.message || 'Failed to delete message',
            ToastAndroid.SHORT,
          );
        });

        socket.on('connect_error', error => {
          console.log('SOCKET CONNECT ERROR =>', error);
        });

        socket.on('disconnect', reason => {
          console.log('SOCKET DISCONNECTED =>', reason);
        });
      } catch (error) {
        console.log('SOCKET INIT ERROR =>', error);
      }
    };

    initializeSocket();

    return () => {
      console.log('SOCKET CLEANUP');

      const socket = getSocket();

      if (socket) {
        socket.off('connect');
        socket.off('messages_list');
        socket.off('receive_message');
        socket.off('message_sent');
        socket.off('connect_error');
        socket.off('disconnect');
      }
    };
  }, [receiverId]);
  const handleSendMessage = () => {
    const socket = getSocket();

    console.log('CURRENT SOCKET =>', socket?.id);

    if (!textMessage?.trim()) {
      return;
    }

    const payload = {
      receiverId,
      receiverModel: 'User',
      message: textMessage.trim(),
      // productId: messages?.[0]?.product?._id,
    };

    socket?.emit('send_message', payload);
    console.log('send message=====>', payload);

    setTextMessage('');
  };
  const loadMoreMessages = () => {
    // console.log('LOAD MORE CALLED');

    // console.log('CURRENT PAGE =>', page);
    // console.log('HAS NEXT PAGE =>', chatMessages?.hasNextPage);
    // console.log('LOADING MORE =>', loadingMore);

    if (loadingMore || !chatMessages?.hasNextPage) {
      console.log('LOAD MORE STOPPED');
      return;
    }

    const nextPage = page + 1;

    // console.log('REQUESTING PAGE =>', nextPage);

    setPage(nextPage);
    setLoadingMore(true);

    socket.emit('get_messages', {
      counterpartyId: receiverId,
      page: nextPage,
      limit: 10,
    });
  };

  const formatTime = dateString => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  const {uploadImageLoading, uploadedImageData, error} = useSelector(
    state => state.sellerChat,
  );
  useEffect(() => {
    console.log('UPLOAD IMAGE DATA CHANGED =>', uploadedImageData);
  }, [uploadedImageData]);

  const {uploadedS3ImageUrl} = useSelector(state => state.sellerChat);
  console.log(uploadedS3ImageUrl, 'UPLOAD S3 IMAGE ');

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        console.log('GALLERY RESPONSE =>', response);

        if (response.assets?.length) {
          const image = response.assets[0];

          // console.log('========== IMAGE SELECTED ==========');
          // console.log('FULL IMAGE OBJECT =>', image);
          // console.log('FILE NAME =>', image.fileName);
          // console.log('FILE TYPE =>', image.type);
          // console.log('FILE SIZE =>', image.fileSize);
          // console.log('IMAGE URI =>', image.uri);
          // console.log('IMAGE WIDTH =>', image.width);
          // console.log('IMAGE HEIGHT =>', image.height);

          setSelectedImage(image);

          // console.log('SELECTED IMAGE STORED IN STATE');

          const payload = {
            fileName: image.fileName,
            fileType: image.type,
          };

          console.log('UPLOAD REQUEST PAYLOAD =>', payload);

          dispatch(uploadChatImageRequest(payload));

          // console.log('UPLOAD_CHAT_IMAGE_REQUEST DISPATCHED');
        }
      },
    );
  };
  useEffect(() => {
    if (uploadedImageData && selectedImage) {
      console.log('STARTING S3 UPLOAD');

      dispatch({
        type: 'UPLOAD_IMAGE_TO_S3_REQUEST',
        payload: {
          uploadUrl: uploadedImageData.uploadUrl,
          fileUrl: uploadedImageData.fileUrl,
          imageUri: selectedImage.uri,
          fileType: selectedImage.type,
        },
      });
    }
  }, [uploadedImageData]);

  // console.log(uploadedImageData?.fileUrl, 'FINAL S3 IMAGE URL');

  useEffect(() => {
    // console.log('IMAGE SEND EFFECT RUNNING');

    if (uploadedS3ImageUrl) {
      // console.log('FOUND IMAGE URL =>', uploadedS3ImageUrl);

      const socket = getSocket();

      console.log('SOCKET ID =>', socket?.id);

      const payload = {
        receiverId,
        receiverModel: 'User',
        message: 'Sending a photo!',
        fileUrl: uploadedS3ImageUrl,
      };

      console.log('EMITTING IMAGE MESSAGE =>', payload);

      socket?.emit('send_message', payload);
      dispatch({
        type: 'CLEAR_UPLOADED_S3_IMAGE',
      });
    }
  }, [uploadedS3ImageUrl]);
  useEffect(() => {
    dispatch({
      type: 'CLEAR_UPLOADED_S3_IMAGE',
    });
  }, []);

  useEffect(() => {
    console.log('IMAGE EFFECT RUNNING =>', uploadedS3ImageUrl);

    if (uploadedS3ImageUrl) {
      console.log('SENDING IMAGE MESSAGE...');
    }
  }, [uploadedS3ImageUrl]);
  if (chatMessagesLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="#5029F4" size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
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
              {profileImage ? (
                <Image
                  source={{uri: profileImage}}
                  style={{
                    width: hp(40),
                    height: hp(40),
                    borderRadius: hp(20),
                    resizeMode: 'cover',
                  }}
                />
              ) : (
                <Text
                  style={{
                    fontSize: fontSize(16),
                    fontFamily: fontFamily.poppins600,
                    color: '#2B9909',
                  }}>
                  {userName.charAt(0).toUpperCase()}
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
                {userName}
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
        // data={chatMessages?.results || []}
        inverted
        data={messages}
        // keyExtractor={item => item.id}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.3}
        renderItem={({item, index}) => {
          // console.log('ITEM =>', item);
          // console.log('MESSAGE ITEM =>', item);
          const firstVariant = item.product?.variants?.[0];
          // console.log('FIRST VARIANTS', firstVariant);
          // console.log('PRODUCT =>', item.product);

          return (
            <View>
              {item.product && (
                <View
                  style={{
                    backgroundColor: '#FAFAFA',
                    marginHorizontal: wp(19),
                    paddingLeft: wp(19),
                    paddingRight: wp(22),
                    paddingVertical: hp(16),
                    borderRadius: 18,
                    marginBottom: hp(10),
                    // marginTop: hp(20),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: firstVariant?.images?.[0]?.imageUrl}}
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
                        {item.product?.title}
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
                          Rs. {firstVariant?.price}
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
                          {item.mrp}
                        </Text>

                        <Text
                          style={{
                            fontSize: fontSize(11),
                            fontFamily: fontFamily.poppins600,
                            color: '#2B9909',
                            marginLeft: 10,
                          }}>
                          {firstVariant?.discount}% Off
                        </Text>
                      </View>
                    </View>

                    <RightArrow />
                  </View>
                </View>
              )}

              {item.fileUrl && (
                <View
                  style={{
                    alignSelf:
                      item.senderModel === 'SellerUser'
                        ? 'flex-end'
                        : 'flex-start',
                    marginHorizontal: wp(15),
                    marginVertical: hp(6),
                    backgroundColor:
                      item.senderModel === 'SellerUser' ? '#FBF4FF' : '#EDF4FF',
                    borderRadius: wp(16),
                    padding: hp(6),
                    // maxWidth: hp(220),
                  }}>
                  <Image
                    source={{uri: item.fileUrl}}
                    style={{
                      width: hp(200),
                      height: hp(200),
                      borderRadius: wp(12),
                    }}
                    resizeMode="cover"
                  />

                  <Text
                    style={{
                      alignSelf: 'flex-end',
                      fontSize: fontSize(11),
                      fontFamily: fontFamily.poppins400,
                      color: '#000000',
                      marginTop: hp(10),
                    }}>
                    {formatTime(item.createdAt)}
                  </Text>
                </View>
              )}
              {(!item.fileUrl || item.message !== 'Sending a photo!') && (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedMessageId(item._id);
                    console.log('SELECTED MESSAGE =>', item._id);

                    setModalVisible(true);
                  }}
                  style={{
                    alignSelf:
                      item.senderModel === 'SellerUser'
                        ? 'flex-end'
                        : 'flex-start',
                    backgroundColor:
                      item.senderModel === 'SellerUser' ? '#FBF4FF' : '#EDF4FF',
                    borderRadius: wp(18),
                    paddingHorizontal: wp(17),
                    paddingVertical: hp(12),
                    marginHorizontal: wp(17),
                    marginVertical: hp(6),
                    // maxWidth: '75%',
                    marginTop: hp(18),
                    // marginBottom: hp(18),
                  }}>
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
                    {formatTime(item.createdAt)}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: wp(19),
          paddingVertical: hp(16),
          // backgroundColor: '#FFFFFF',
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
            style={{
              width: hp(52),
              height: hp(39),
              borderRadius: 20,
              backgroundColor: '#5029F4',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon />
          </TouchableOpacity>
        </View>
      </View>

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
                  const socket = getSocket();

                  console.log('SELECTED MESSAGE ID =>', selectedMessageId);

                  socket?.emit('delete_message', {
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
export default SellerChatMessagesscreen;
