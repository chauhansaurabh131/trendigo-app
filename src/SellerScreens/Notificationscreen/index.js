import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../utils/colors';
import {images} from '../../assets';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSellerConversationsRequest,
  updateConversations,
} from '../../redux/actions/sellerChatActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connectSocket, getSocket} from '../../socket/socket';

const ChatItem = ({avatar, name, time, preview, online, unreadCount}) => {
  const formatUnreadCount = count => {
    if (count > 50) {
      return '50+';
    }
    return count.toString();
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: wp(16),
        paddingVertical: hp(12),
      }}>
      {avatar ? (
        <Image
          source={{uri: avatar}}
          style={{
            width: hp(44),
            height: hp(44),
            borderRadius: wp(22),
            marginRight: wp(12),
          }}
        />
      ) : (
        <View
          style={{
            width: hp(44),
            height: hp(44),
            borderRadius: wp(22),
            marginRight: wp(12),
            // backgroundColor: '#8225AF',
            borderWidth: 1,
            borderColor: '#5029F4',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: fontSize(16),
              fontFamily: fontFamily.poppins500,
            }}>
            {name?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>
      )}
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              flex: 1,
              fontSize: fontSize(14),
              color: colors.pureBlack,
              fontFamily: fontFamily.poppins600,
            }}>
            {name}
          </Text>
          {!!online && (
            <Text
              style={{
                fontSize: fontSize(11),
                fontFamily: fontFamily.poppins400,
                color: '#000000',
              }}>
              Online
            </Text>
          )}
          {!online && (
            <Text
              style={{
                fontSize: fontSize(11),
                fontFamily: fontFamily.poppins400,
                color: '#9B9B9B',
              }}>
              {time}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(4),
          }}>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: fontSize(13),
              color: '#6B6B6B',
            }}>
            {preview}
          </Text>

          {unreadCount > 0 && (
            <View
              style={{
                width: hp(24),
                height: hp(24),
                borderRadius: hp(30),
                backgroundColor: '#5029F4',
                justifyContent: 'center',
                alignItems: 'center',
                // marginLeft: 8,
                // paddingHorizontal: 6,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: fontSize(10),
                  fontFamily: fontFamily.poppins500,
                }}>
                {unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const NotificationScreen = () => {
  const [query, setQuery] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSellerConversationsRequest());
  }, []);

  const {sellerChatLoading, error, conversations} = useSelector(
    state => state.sellerChat,
  );

  // console.log('SELLER CONVERSATION =>', conversations);

  console.log('REDUX CONVERSATIONS =>', conversations?.data?.[0]?.unreadCount);

  const formatTime = date => {
    return new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  // Optional: Filter chats based on search
  const filteredChats = (conversations?.data || []).filter(item => {
    const userName = item.user?.name || item.user?.email || 'Unknown User';

    return userName.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    const initializeSocket = async () => {
      const token = await AsyncStorage.getItem('sellerAccessToken');

      const socket = connectSocket(token);

      socket.on('connect', () => {
        console.log('SOCKET CONNECTED =>', socket.id);

        socket.emit('get_conversations');

        console.log('GET_CONVERSATIONS SENT');
      });

      // Listen for updated conversations
      socket.on('conversations_list', data => {
        console.log('SOCKET CONVERSATIONS =>', data);

        dispatch(updateConversations(data));
      });

      socket.onAny((event, data) => {
        console.log('EVENT NAME =>', event);
        // console.log('EVENT DATA =>', data);
      });

      socket.on('connect_error', error => {
        console.log('SOCKET ERROR =>', error);
      });
    };

    initializeSocket();

    return () => {
      const socket = getSocket();

      if (socket) {
        socket.off('conversations_list');
        socket.disconnect();
      }
    };
  }, []);

  if (sellerChatLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: hp(40),
            height: hp(40),
            borderRadius: wp(25),
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'#5029F4'} />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {/* Search Bar */}
      <View
        style={{
          paddingHorizontal: wp(16),
          paddingTop: hp(8),
          paddingBottom: hp(10),
        }}>
        <View
          style={{
            height: hp(44),
            borderRadius: wp(12),
            // backgroundColor: '#F7F7F7',
            // borderWidth: 1,
            // borderColor: '#E6E6E6',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: wp(12),
          }}>
          <Image
            source={images.search_black_icon}
            style={{
              width: hp(20),
              height: hp(20),
              tintColor: '#000',
            }}
            resizeMode="contain"
          />

          <TextInput
            placeholder="Search users..."
            value={query}
            onChangeText={setQuery}
            style={{
              flex: 1,
              marginLeft: wp(10),
              fontSize: fontSize(14),
              fontFamily: fontFamily.poppins500,
              color: '#000',
            }}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Divider */}
      <View
        style={{
          width: '100%',
          height: hp(1),
          backgroundColor: '#E2E2E2',
          marginBottom: hp(5),
        }}
      />

      {/* FlatList for chats */}
      <FlatList
        // data={conversations?.data || []}
        data={filteredChats}
        // keyExtractor={item => item._id?.id}
        keyExtractor={item => `${item._id?.id}-${item._id?.model}`}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SellerChatMessage', {
                receiverId: item._id.id,
                user: item.user,
              })
            }>
            <ChatItem
              avatar={item.avatar}
              // name={item.name}
              name={item.user?.name || item.user?.email || 'Unknown User'}
              time={formatTime(item.lastMessageAt)}
              preview={item.lastMessage || 'No messages'}
              online={false}
              unreadCount={item.unreadCount}
            />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
