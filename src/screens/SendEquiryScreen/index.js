// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   SafeAreaView,
//   FlatList,
//   TextInput,
//   ActivityIndicator,
// } from 'react-native';
// import {
//   BackIcon,
//   CameraIcon,
//   EmojiIcon,
//   images,
//   RightArrow,
//   ThreeDotsIcon,
// } from '../../assets';
// import {useState} from 'react';
// import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
// import {useSelector} from 'react-redux';
// import {connectSocket, getSocket} from '../../socket/socket';
// import {useEffect} from 'react';
// import {TouchableOpacity} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {useDispatch} from 'react-redux';
// import {useRef} from 'react';
// const SendEquiryScreen = ({route}) => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const flatListRef = useRef(null);
//   const [textMessage, setTextMessage] = React.useState('');
//   const {productId, receiverId, storeData} = route.params;

//   console.log('Product ID =>', productId);
//   console.log('Receiver ID =>', receiverId);
//   console.log('Store Data =>', storeData);
//   const {product} = useSelector(state => state.productDetails);
//   // console.log('PRODUCTS IN SEND ENQUIRY =>', product);
//   const firstVariant = product?.variants?.[0];
//   // console.log('First Variant =>', firstVariant);

//   const mainImage = firstVariant?.images?.find(
//     image => image.isSelectedForMainScreen === true,
//   );

//   // console.log('Main Image =>', mainImage);
//   const token = useSelector(state => state.auth.token);
//   const {messages: chatMessages} = useSelector(state => state.chat);
//   console.log('GET SELLER AND USER CONVERSATIONS  MESSAGES =>', chatMessages);
//   const {messages} = useSelector(state => state.chat);

//   useEffect(() => {
//     console.log('REDUX MESSAGES =>', messages);
//   }, [messages]);
//   // const displayMessages = [...chatMessages].reverse();
//   //filter messages
//   const filteredMessages = chatMessages.filter(
//     item => item.product?.id === productId || item.product?._id === productId,
//   );
//   console.log(filteredMessages, 'FilterMessages');
//   const displayMessages = [...filteredMessages].reverse();
//   // SIMPLE WAY SCREEN OPEN GET TOKEN CONNECT SERVER
//   // Run this code when the screen opens.
//   // useEffect(() => {
//   //   // If token is missing, do not connect.
//   //   if (!token) {
//   //     return;
//   //   }
//   //   // Call connectSocket() and connect to server.

//   //   const socket = connectSocket(token);

//   //   // Wait for server to accept connection.
//   //   socket.on('connect', () => {
//   //     console.log('Connected');
//   //     console.log('Socket ID:', socket.id);
//   //     socket.emit('get_messages', {
//   //       counterpartyId: receiverId,
//   //       page: 1,
//   //       limit: 10,
//   //     });

//   //     console.log('GET_MESSAGES EMITTED');

//   //     socket.onAny((event, data) => {
//   //       console.log('EVENT =>', event);
//   //       console.log('DATA =>', data);
//   //     });
//   //   });
//   //   socket.on('messages_list', response => {
//   //     console.log('MESSAGES RESPONSE =>', response);

//   //     dispatch({
//   //       type: 'SET_MESSAGES',
//   //       payload: response.results,
//   //     });
//   //     setLoading(false);

//   //     socket.on('message_sent', message => {
//   //       dispatch({
//   //         type: 'ADD_MESSAGE',
//   //         payload: {
//   //           ...message,
//   //           createdAt: new Date().toISOString(),
//   //         },
//   //       });
//   //     });
//   //   });

//   //   // Handle connection errors.
//   //   socket.on('connect_error', error => {
//   //     console.log('Socket Error:', error);
//   //   });
//   //   // When user leaves the screen,
//   //   // close the socket connection.
//   //   return () => {
//   //     socket.disconnect();
//   //   };
//   // }, [token]);

//   useEffect(() => {
//     if (!token) {
//       return;
//     }

//     const socket = connectSocket(token);

//     socket.on('connect', () => {
//       console.log('✅ SOCKET CONNECTED');
//       console.log('✅ SOCKET ID =>', socket.id);

//       socket.emit('get_messages', {
//         counterpartyId: receiverId,

//         page: 1,
//         limit: 10,
//       });

//       console.log('GET_MESSAGES EMITTED');

//       socket.onAny((event, data) => {
//         console.log(' EVENT =>', event);
//         console.log(' DATA =>', data);
//       });
//     });

//     // Initial messages
//     socket.on('messages_list', response => {
//       console.log(' MESSAGES_LIST RESPONSE =>', response);
//       console.log(' TOTAL MESSAGES =>', response?.results?.length);

//       dispatch({
//         type: 'SET_MESSAGES',
//         payload: response.results,
//       });

//       setLoading(false);
//     });
//     socket.on('message_sent', message => {
//       console.log(' MESSAGE SENT EVENT', message);

//       dispatch({
//         type: 'ADD_MESSAGE',
//         payload: {
//           ...message,
//           createdAt: new Date().toISOString(),
//         },
//       });
//     });
//     // New incoming message
//     socket.on('receive_message', message => {
//       console.log('RECEIVE_MESSAGE EVENT FIRED');
//       console.log(' NEW MESSAGE =>', message);

//       dispatch({
//         type: 'ADD_MESSAGE',
//         payload: {
//           ...message,
//           createdAt: new Date().toISOString(),
//         },
//       });
//     });

//     socket.on('connect_error', error => {
//       console.log('SOCKET ERROR =>', error);
//     });

//     return () => {
//       console.log(' CLEANUP SOCKET');

//       socket.off('messages_list');
//       socket.off('receive_message');
//       socket.off('connect');
//       socket.off('connect_error');
//     };
//   }, [token, receiverId]);

//   // when send to seller
//   const handleSendMessage = () => {
//     console.log('TEXT MESSAGE =>', textMessage);
//     const socket = getSocket();

//     if (!socket) {
//       console.log('Socket not connected');
//       return;
//     }

//     const payload = {
//       receiverId,
//       receiverModel: 'SellerUser',
//       message: textMessage,
//       productId,
//     };

//     console.log('Payload =>', payload);
//     socket.emit('send_message', payload);
//     console.log('Message emitted');
//     setTextMessage('');
//   };

//   // Scroll when messages load initially
//   useEffect(() => {
//     if (displayMessages.length > 0) {
//       setTimeout(() => {
//         flatListRef.current?.scrollToEnd({animated: false});
//       }, 100);
//     }
//   }, [loading]);
//   //Scroll when new message arrives
//   useEffect(() => {
//     if (displayMessages.length > 0) {
//       setTimeout(() => {
//         flatListRef.current?.scrollToEnd({animated: true});
//       }, 100);
//     }
//   }, [displayMessages.length]);

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
//       <View
//         style={{
//           width: '100%',
//           height: hp(70),
//           backgroundColor: '#FFFFFF',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             marginLeft: wp(16),
//             marginRight: wp(26),
//           }}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <BackIcon />
//           </TouchableOpacity>
//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginLeft: wp(16),
//             }}>
//             <View
//               style={{
//                 width: hp(40),
//                 height: hp(40),
//                 borderRadius: hp(20),
//                 overflow: 'hidden',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 backgroundColor: '#E6F4EA',
//               }}>
//               {storeData?.profileImage ? (
//                 <Image
//                   source={{uri: storeData.profileImage}}
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                   }}
//                 />
//               ) : (
//                 <Text
//                   style={{
//                     fontSize: fontSize(15),
//                     fontFamily: fontFamily.poppins600,
//                     color: '#006E2F',
//                   }}>
//                   {storeData?.name?.charAt(0)?.toUpperCase() || 'NA'}
//                 </Text>
//               )}
//             </View>
//             <Text
//               style={{
//                 marginLeft: wp(16),
//                 fontSize: fontSize(15),
//                 fontFamily: fontFamily.poppins600,
//                 color: '#000000',
//               }}>
//               {storeData?.name || 'Star Cloths'}
//             </Text>
//           </View>
//           <ThreeDotsIcon />
//         </View>
//       </View>

//       <FlatList
//         // data={displayMessages}
//         ref={flatListRef}
//         data={loading ? [] : displayMessages}
//         // keyExtractor={item => item.id}
//         // keyExtractor={item => item._id}
//         keyExtractor={item => item._id || item.id}
//         contentContainerStyle={{
//           // paddingTop: hp(279),
//           paddingBottom: hp(40),
//         }}
//         ListHeaderComponent={() => (
//           <>
//             {loading && (
//               <View
//                 style={{
//                   // marginTop: hp(40),
//                   position: 'absolute',
//                   bottom: 30,
//                   top: 0,
//                   bottom: 0,
//                   left: 0,
//                   right: 0,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <ActivityIndicator size="large" color="#8225AF" />
//                 {/* <Text
//                   style={{
//                     marginTop: 10,
//                     color: '#000',
//                     textAlign: 'center',
//                   }}>
//                   Loading messages...
//                 </Text> */}
//               </View>
//             )}
//             <View
//               style={{
//                 width: '100%',
//                 backgroundColor: '#FDF8FF',
//                 // paddingHorizontal: wp(19),
//                 marginLeft: wp(19),
//                 paddingRight: wp(40),
//                 paddingVertical: hp(16),
//                 // marginBottom: hp(400),
//               }}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                 }}>
//                 <Image
//                   source={{uri: mainImage?.imageUrl}}
//                   style={{
//                     width: hp(73),
//                     height: hp(95),
//                     borderRadius: hp(15),
//                   }}
//                 />

//                 <View
//                   style={{
//                     flex: 1,
//                     marginLeft: wp(18),
//                   }}>
//                   <Text
//                     numberOfLines={2}
//                     ellipsizeMode="tail"
//                     style={{
//                       fontSize: fontSize(15),
//                       fontFamily: fontFamily.poppins700,
//                       color: '#000000',
//                       width: wp(164),
//                     }}>
//                     {/* Designer Traditional Dress */}
//                     {product?.title || 'No Product Name'}
//                   </Text>

//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       marginTop: hp(12),
//                       flexWrap: 'wrap',
//                     }}>
//                     <Text
//                       style={{
//                         fontSize: fontSize(11),
//                         fontFamily: fontFamily.poppins600,
//                         color: '#000000',
//                       }}>
//                       Rs {firstVariant?.sellingPrice || 'NA'}
//                     </Text>

//                     <Text
//                       style={{
//                         fontSize: fontSize(11),
//                         fontFamily: fontFamily.poppins400,
//                         color: '#000000',
//                         marginLeft: 5,
//                       }}>
//                       MRP
//                     </Text>

//                     <Text
//                       style={{
//                         fontSize: fontSize(11),
//                         fontFamily: fontFamily.poppins400,
//                         color: '#000000',
//                         textDecorationLine: 'line-through',
//                         marginLeft: 2,
//                       }}>
//                       Rs {firstVariant?.price || 'NA'}
//                     </Text>

//                     <Text
//                       style={{
//                         fontSize: fontSize(11),
//                         fontFamily: fontFamily.poppins600,
//                         color: '#2B9909',
//                         marginLeft: 10,
//                       }}>
//                       {firstVariant?.discount || 'NA'}% Off
//                     </Text>
//                   </View>
//                 </View>

//                 <View
//                   style={
//                     {
//                       // marginLeft: wp(10),
//                     }
//                   }>
//                   <RightArrow />
//                 </View>
//               </View>
//             </View>
//           </>
//         )}
//         renderItem={({item}) => (
//           // console.log(item, 'ITem'),
//           // console.log('chat message length =>', chatMessages?.length),
//           // console.log('CREATED AT =>', item.createdAt),
//           // console.log('TIME =>', new Date(item.createdAt).toLocaleTimeString()),
//           <View
//             style={{
//               // alignSelf: item.isMe ? 'flex-end' : 'flex-start',
//               // backgroundColor: item.isMe ? '#FBF4FF' : '#EDF4FF',
//               alignSelf:
//                 item.senderModel === 'User' ? 'flex-end' : 'flex-start',
//               backgroundColor:
//                 item.senderModel === 'User' ? '#FBF4FF' : '#EDF4FF',
//               borderRadius: 18,
//               paddingHorizontal: wp(17),
//               paddingVertical: hp(12),
//               marginHorizontal: wp(17),
//               marginVertical: hp(6),
//               maxWidth: '75%',
//             }}>
//             <Text
//               style={{
//                 fontSize: fontSize(14),
//                 fontFamily: fontFamily.poppins400,
//                 color: '#000000',
//               }}>
//               <Text>{item.message}</Text>
//             </Text>

//             <Text
//               style={{
//                 fontSize: fontSize(10),
//                 fontFamily: fontFamily.poppins400,
//                 color: '#000000',
//                 marginTop: hp(4),
//               }}>
//               {new Date(item.createdAt).toLocaleTimeString()}
//             </Text>
//           </View>
//         )}
//       />
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           paddingHorizontal: wp(17),
//           marginBottom: hp(16),
//         }}>
//         <View
//           style={{
//             flex: 1,
//             borderColor: '#DDDDDD',
//             borderWidth: 1,
//             borderRadius: 25,
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingHorizontal: wp(12),
//             // height: hp(50),
//             marginRight: wp(10),
//           }}>
//           <EmojiIcon />

//           <TextInput
//             value={textMessage}
//             onChangeText={text => {
//               console.log('INPUT =>', text);
//               setTextMessage(text);
//             }}
//             placeholder="Message"
//             placeholderTextColor="#000000"
//             style={{
//               flex: 1,
//               marginLeft: wp(12),
//               fontSize: fontSize(14),
//               fontFamily: fontFamily.poppins400,
//               color: '#000000',
//             }}
//           />

//           <CameraIcon />
//         </View>

//         <TouchableOpacity
//           onPress={handleSendMessage}
//           style={{
//             width: hp(40),
//             height: hp(40),
//             borderRadius: 20,
//             backgroundColor: '#2B9909',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <RightArrow />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default SendEquiryScreen;

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
const SendEquiryScreen = ({route}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const [textMessage, setTextMessage] = React.useState('');
  const isDisabled = !textMessage.trim();
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
  console.log('GET SELLER AND USER CONVERSATIONS  MESSAGES =>', chatMessages);
  const {messages} = useSelector(state => state.chat);

  useEffect(() => {
    console.log('REDUX MESSAGES =>', messages);
  }, [messages]);

  // const displayMessages = [...chatMessages].reverse();
  //filter messages
  const filteredMessages = chatMessages.filter(
    item =>
      item.senderId?._id === receiverId || item.receiverId?._id === receiverId,
  );
  console.log(filteredMessages, 'FilterMessages');
  const displayMessages = [...filteredMessages].reverse();

  useEffect(() => {
    if (!token) {
      return;
    }

    const socket = connectSocket(token);

    socket.on('connect', () => {
      console.log('✅ SOCKET CONNECTED');
      console.log('✅ SOCKET ID =>', socket.id);

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
      console.log(' MESSAGES_LIST RESPONSE =>', response);
      console.log(' TOTAL MESSAGES =>', response?.results?.length);

      dispatch({
        type: 'SET_MESSAGES',
        payload: response.results,
      });

      setLoading(false);
    });
    socket.on('message_sent', message => {
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
    });
    // New incoming message
    socket.on('receive_message', message => {
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
      message: textMessage,
      productId,
    };

    console.log('Payload =>', payload);
    socket.emit('send_message', payload);
    console.log('Message emitted');
    setTextMessage('');
  };

  // Scroll when messages load initially
  useEffect(() => {
    if (displayMessages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: false});
      }, 100);
    }
  }, [loading]);
  //Scroll when new message arrives
  useEffect(() => {
    if (displayMessages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 100);
    }
  }, [displayMessages.length]);

  const flatListData = [];

  displayMessages.forEach((msg, index) => {
    const variant = msg.product?.variants?.[0];

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

    flatListData.push({
      id: `message-${msg._id}-${index}`,
      _id: msg._id, // 👈 Add this
      type: 'message',
      message: msg.message,
      time: new Date(msg.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isMe: msg.senderModel === 'User',
    });
  });

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
            <Text
              style={{
                marginLeft: wp(16),
                fontSize: fontSize(15),
                fontFamily: fontFamily.poppins600,
                color: '#000000',
              }}>
              {storeData?.name || 'Star Cloths'}
            </Text>
          </View>
          <ThreeDotsIcon />
        </View>
      </View>

      <FlatList
        data={flatListData}
        keyExtractor={item => item.id}
        style={{flex: 1}}
        contentContainerStyle={{
          paddingBottom: hp(120),
        }}
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
                borderRadius: 18,
                paddingHorizontal: wp(17),
                paddingVertical: hp(12),
                marginHorizontal: wp(17),
                marginVertical: hp(6),
                maxWidth: '75%',
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
                {item.time}
              </Text>
            </TouchableOpacity>
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
          <View
            style={{
              width: hp(34),
              height: hp(34),
              backgroundColor: '#EAEAEA',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ShareIcon />
          </View>
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
            disabled={isDisabled}
            style={{
              width: hp(52),
              height: hp(39),
              borderRadius: 20,
              backgroundColor: '#5029F4',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isDisabled ? 0.5 : 1,
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
                Sure want to Delete this chat?
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
                  borderRadius: 30,
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

              {/* <GradientButton
                onPress={() => {
                  socket.emit('delete_message', {
                    messageId: selectedMessageId,
                  });

                  setModalVisible(false);
                }}
                title={'Yes, Delete'}
                buttonStyle={{
                  width: wp(146),
                  height: hp(50),
                }}
              /> */}

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

// import React from 'react';
// import {
//   Image,
//   TouchableOpacity,
//   Text,
//   View,
//   SafeAreaView,
//   TextInput,
//   FlatList,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
// import {colors} from '../../utils/colors';
// import {connectSocket, getSocket} from '../../socket/socket';
// import {useEffect} from 'react';
// import {
//   CameraIcon,
//   EmojiIcon,
//   images,
//   RightArrow,
//   ThreeDotsIcon,
//   BackIcon,
// } from '../../assets';
// import {useSelector} from 'react-redux';

// const SendEnquiryScreen = ({route}) => {
//   const navigation = useNavigation();
//   const [textMessage, setTextMessage] = React.useState('');
//   const [messages, setMessages] = React.useState([]);
//   const {productId, receiverId, storeData} = route.params;
//   const token = useSelector(state => state.auth.token);
//   console.log('Product ID =>', productId);
//   console.log('Receiver ID =>', receiverId);
//   console.log('Store Data =>', storeData);
//   const {product} = useSelector(state => state.productDetails);
//   console.log('PRODUCTS IN SEND ENQUIRY =>', product);

//   const firstVariant = product?.variants?.[0];

//   const productImage =
//     firstVariant?.images?.[0]?.imageUrl || product?.images?.[0]?.imageUrl;

//   const sellingPrice = firstVariant?.sellingPrice;
//   const originalPrice = firstVariant?.price;
//   const discount = firstVariant?.discount;

//   useEffect(() => {
//     if (!token) {
//       return;
//     }

//     const socket = connectSocket(token);

//     socket.on('connect', () => {
//       console.log('✅ SOCKET CONNECTED');
//       console.log('✅ SOCKET ID =>', socket.id);

//       socket.emit('get_messages', {
//         counterpartyId: receiverId,

//         page: 1,
//         limit: 10,
//       });

//       console.log('GET_MESSAGES EMITTED');

//       socket.onAny((event, data) => {
//         console.log(' EVENT =>', event);
//         console.log(' DATA =>', data);
//       });
//     });

//     // Initial messages
//     socket.on('messages_list', response => {
//       console.log(' MESSAGES_LIST RESPONSE =>', response);
//       console.log(' TOTAL MESSAGES =>', response?.results?.length);

//       dispatch({
//         type: 'SET_MESSAGES',
//         payload: response.results,
//       });

//       setLoading(false);
//     });
//     socket.on('message_sent', message => {
//       console.log(' MESSAGE SENT EVENT', message);

//       dispatch({
//         type: 'ADD_MESSAGE',
//         payload: {
//           ...message,
//           createdAt: new Date().toISOString(),
//         },
//       });
//     });
//     // New incoming message
//     socket.on('receive_message', message => {
//       console.log('RECEIVE_MESSAGE EVENT FIRED');
//       console.log(' NEW MESSAGE =>', message);

//       dispatch({
//         type: 'ADD_MESSAGE',
//         payload: {
//           ...message,
//           createdAt: new Date().toISOString(),
//         },
//       });
//     });

//     socket.on('connect_error', error => {
//       console.log('SOCKET ERROR =>', error);
//     });

//     return () => {
//       console.log(' CLEANUP SOCKET');

//       socket.off('messages_list');
//       socket.off('receive_message');
//       socket.off('connect');
//       socket.off('connect_error');
//     };
//   }, [token, receiverId]);

//   const handleSendMessage = () => {
//     if (!textMessage.trim()) {
//       return;
//     }

//     const newMessage = {
//       _id: Date.now().toString(),
//       message: textMessage,
//       sender: 'me',
//       product: product,
//     };

//     // Show instantly in UI
//     setMessages(prev => [...prev, newMessage]);

//     const socket = getSocket();

//     socket?.emit('send_message', {
//       receiverId,
//       receiverModel: 'SellerUser',
//       message: textMessage,
//       productId,
//     });

//     setTextMessage('');
//   };
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
//       {/* Header */}
//       <View
//         style={{
//           width: '100%',
//           height: hp(70),
//           backgroundColor: '#FFFFFF',
//           justifyContent: 'center',
//         }}>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginHorizontal: wp(16),
//           }}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <BackIcon />
//           </TouchableOpacity>

//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginLeft: wp(16),
//             }}>
//             <View
//               style={{
//                 width: hp(40),
//                 height: hp(40),
//                 borderRadius: hp(20),
//                 overflow: 'hidden',
//                 backgroundColor: '#E6F4EA',
//               }}>
//               <Image
//                 source={{uri: storeData?.profileImage}}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                 }}
//               />
//             </View>

//             <Text
//               style={{
//                 marginLeft: wp(16),
//                 fontSize: fontSize(15),
//                 fontFamily: fontFamily.poppins600,
//                 color: '#000',
//               }}>
//               {storeData?.name || 'Store Name'}
//             </Text>
//           </View>

//           <ThreeDotsIcon />
//         </View>
//       </View>

//       {/* Chat Area Empty */}
//       <View style={{flex: 1}} />

//       {/* Product Card Above Input */}
//       <View
//         style={{
//           // width: '100%',
//           backgroundColor: '#FDF8FF',
//           marginHorizontal: wp(19),
//           paddingLeft: wp(19),
//           paddingRight: wp(40),
//           paddingVertical: hp(16),
//           borderRadius: 18,
//           // marginBottom: hp(400),
//         }}>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//           }}>
//           <Image
//             // source={{uri: mainImage?.imageUrl}}
//             source={{uri: productImage}}
//             style={{
//               width: hp(73),
//               height: hp(95),
//               borderRadius: hp(15),
//             }}
//           />

//           <View
//             style={{
//               flex: 1,
//               marginLeft: wp(18),
//             }}>
//             <Text
//               numberOfLines={2}
//               ellipsizeMode="tail"
//               style={{
//                 fontSize: fontSize(14),
//                 fontFamily: fontFamily.poppins700,
//                 color: '#000000',
//                 width: wp(164),
//               }}>
//               {product?.title}
//               {/* {product?.title || 'No Product Name'} */}
//             </Text>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 marginTop: hp(12),
//                 flexWrap: 'wrap',
//               }}>
//               <Text
//                 style={{
//                   fontSize: fontSize(11),
//                   fontFamily: fontFamily.poppins600,
//                   color: '#000000',
//                 }}>
//                 {/* Rs {firstVariant?.sellingPrice || 'NA'} */}
//                 Rs. {sellingPrice}
//               </Text>

//               <Text
//                 style={{
//                   fontSize: fontSize(11),
//                   fontFamily: fontFamily.poppins400,
//                   color: '#000000',
//                   marginLeft: 5,
//                 }}>
//                 MRP
//               </Text>

//               <Text
//                 style={{
//                   fontSize: fontSize(11),
//                   fontFamily: fontFamily.poppins400,
//                   color: '#000000',
//                   textDecorationLine: 'line-through',
//                   marginLeft: 2,
//                 }}>
//                 {/* Rs {firstVariant?.price || 'NA'}
//                  */}
//                 Rs.{originalPrice}
//               </Text>

//               <Text
//                 style={{
//                   fontSize: fontSize(11),
//                   fontFamily: fontFamily.poppins600,
//                   color: '#2B9909',
//                   marginLeft: 10,
//                 }}>
//                 {/* {firstVariant?.discount || 'NA'}% Off */}
//                 {discount} %off
//               </Text>
//             </View>
//           </View>

//           <View
//             style={
//               {
//                 // marginLeft: wp(10),
//               }
//             }>
//             <RightArrow />
//           </View>
//         </View>
//       </View>
//       <FlatList
//         data={messages}
//         keyExtractor={item => item._id}
//         renderItem={({item}) => (
//           <View
//             style={{
//               alignSelf: 'flex-end',
//               backgroundColor: '#FBF4FF',
//               borderRadius: 18,
//               paddingHorizontal: wp(17),
//               paddingVertical: hp(12),
//               marginHorizontal: wp(17),
//               marginVertical: hp(6),
//               maxWidth: '75%',
//             }}>
//             <Text
//               style={{
//                 fontSize: fontSize(14),
//                 fontFamily: fontFamily.poppins400,
//                 color: '#000000',
//                 marginTop: hp(4),
//               }}>
//               {item.message}
//             </Text>

//             <Text
//               style={{
//                 fontSize: fontSize(10),
//                 fontFamily: fontFamily.poppins400,
//                 color: '#000000',
//                 marginTop: hp(4),
//               }}>
//               {new Date(item.createdAt).toLocaleTimeString()}
//             </Text>
//           </View>
//         )}
//       />
//       {/* Message Input */}
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           paddingHorizontal: wp(17),
//           paddingBottom: hp(16),
//           marginTop: hp(20),
//         }}>
//         <View
//           style={{
//             flex: 1,
//             borderWidth: 1,
//             borderColor: '#DDDDDD',
//             borderRadius: 25,
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingHorizontal: wp(12),
//             marginRight: wp(10),
//           }}>
//           <EmojiIcon />

//           <TextInput
//             value={textMessage}
//             onChangeText={text => {
//               console.log('INPUT =>', text);
//               setTextMessage(text);
//             }}
//             placeholder="Message"
//             placeholderTextColor="#000"
//             style={{
//               flex: 1,
//               marginLeft: wp(12),
//               fontSize: fontSize(14),
//               fontFamily: fontFamily.poppins400,
//               color: '#000',
//             }}
//           />

//           <CameraIcon />
//         </View>

//         <TouchableOpacity
//           onPress={handleSendMessage}
//           style={{
//             width: hp(40),
//             height: hp(40),
//             borderRadius: hp(20),
//             backgroundColor: '#2B9909',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <RightArrow />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default SendEnquiryScreen;
