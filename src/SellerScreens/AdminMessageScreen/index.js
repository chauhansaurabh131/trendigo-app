import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import {
  BackIcon,
  ChatShareIcon,
  Icon,
  images,
  ThreeDotsIcon,
} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {colors} from '../../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connectSocket, getSocket} from '../../socket/socket';
const AdminMessageScreen = ({route}) => {
  const navigation = useNavigation();
  const {receiverId, user} = route.params || {};
  console.log('ADMIN USER ===========>', user);
  console.log('RECEIVER ID =>', receiverId);
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState('');

  const userName = user?.name || user?.email || 'Unknown User';

  const profileImage = user?.profileImage || user?.avatar || null;
  const socket = getSocket();
  useEffect(() => {
    const initializeSocket = async () => {
      const token = await AsyncStorage.getItem('sellerAccessToken');

      const socket = connectSocket(token);

      socket.on('connect', () => {
        console.log('SOCKET CONNECTED');
      });

      socket.on('message_sent', data => {
        console.log('MESSAGE_SENT =>', data);

        setMessages(prev => [...(prev || []), data]);
      });
    };

    initializeSocket();
  }, []);
  const handleSendMessage = () => {
    if (!textMessage.trim()) {
      return;
    }

    socket.emit('send_message_to_admin', {
      message: textMessage.trim(),
    });

    console.log('MESSAGE SENT =>', textMessage);

    setTextMessage('');
  };

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
                  }}
                />
              ) : (
                <Text
                  style={{
                    fontSize: fontSize(16),
                    fontFamily: fontFamily.poppins600,
                    color: '#2B9909',
                  }}>
                  {userName?.charAt(0)?.toUpperCase()}
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
      <View style={{flex: 1}}>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <>
              <TouchableOpacity
                onPress={() => {
                  console.log('SELECTED MESSAGE =>', item._id);
                }}
                style={{
                  alignSelf: 'flex-end',
                  backgroundColor: '#FBF4FF',
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
                  Hi, is this available?
                </Text>

                <Text
                  style={{
                    fontSize: fontSize(10),
                    fontFamily: fontFamily.poppins400,
                    color: '#000000',
                    marginTop: hp(4),
                  }}>
                  12:30
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  console.log('SELECTED MESSAGE =>', item._id);
                }}
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#EDF4FF',
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
                  Hi, is this available?
                </Text>

                <Text
                  style={{
                    fontSize: fontSize(10),
                    fontFamily: fontFamily.poppins400,
                    color: '#000000',
                    marginTop: hp(4),
                  }}>
                  12:30
                </Text>
              </TouchableOpacity>
            </>
          )}
        />
      </View>
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
            // onPress={openGallery}
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
    </SafeAreaView>
  );
};
export default AdminMessageScreen;
