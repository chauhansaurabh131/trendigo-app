import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {ChatShareIcon, Icon, images} from '../../assets';
import {colors} from '../../utils/colors';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connectSocket, getSocket} from '../../socket/socket';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateConversations,
  getSellerConversationsRequest,
} from '../../redux/actions/sellerChatActions';
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
const AdminScreen = ({selectedTab, setSelectedTab}) => {
  const [query, setQuery] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Example chat data
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
  // const filteredChats = (conversations?.data || []).filter(item => {
  //   const userName = item.user?.name || item.user?.email || 'Unknown User';

  //   return userName.toLowerCase().includes(query.toLowerCase());
  // });

  const filteredChats = (conversations?.data || []).filter(item => {
    return (
      item._id?.model === 'User' &&
      (item.user?.name || item.user?.email || '')
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  });
  // console.log(JSON.stringify(filteredChats, null, 2), 'FILTERED CHATS =>');

  // //if want to both then this use it
  // const adminChats = (conversations?.data || []).filter(
  //   item => item.isAdmin || item.user?.isAdmin,
  // );
  // console.log('ADMIN CHATS =>', JSON.stringify(adminChats, null, 2));
  //if want to show only user admin then use it

  const adminChats = (conversations?.data || []).filter(
    item => item._id?.model === 'User' && (item.isAdmin || item.user?.isAdmin),
  );

  // console.log('ADMIN CHATS =>', JSON.stringify(adminChats, null, 2));
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
        // console.log('SOCKET CONVERSATIONS =>', JSON.stringify(data, null, 2));

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
          // paddingHorizontal: wp(16),
          paddingTop: hp(13),
          paddingBottom: hp(10),
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: wp(19),
          // justifyContent: 'space-between',
        }}>
        <View style={{alignItems: 'center', flex: 1}}>
          <View
            style={{
              width: wp(187),
              height: hp(30),
              borderWidth: 1,
              borderRadius: wp(25),
              borderColor: '#EBEBEB',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setSelectedTab('customer')}
              style={{
                width: wp(94),
                height: hp(30),
                borderRadius: wp(25),
                backgroundColor:
                  selectedTab === 'customer' ? '#5029F4' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: selectedTab === 'customer' ? '#FFF' : '#000',
                  fontFamily: fontFamily.poppins400,
                  fontSize: fontSize(12),
                }}>
                Customers
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedTab('admin')}
              style={{
                width: wp(94),
                height: hp(30),
                borderRadius: wp(25),
                backgroundColor:
                  selectedTab === 'admin' ? '#5029F4' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: selectedTab === 'admin' ? '#FFF' : '#000',
                  fontFamily: fontFamily.poppins400,
                  fontSize: fontSize(12),
                }}>
                Admin
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: hp(44),
            borderRadius: wp(12),
            // backgroundColor: '#F7F7F7',
            // borderWidth: 1,
            // borderColor: '#E6E6E6',
            flexDirection: 'row',
            alignItems: 'center',
            // paddingHorizontal: wp(12),
          }}>
          {/* <Image
            source={images.search_black_icon}
            style={{
              width: hp(20),
              height: hp(20),
              tintColor: '#000',
            }}
            resizeMode="contain"
          /> */}

          {/* <TextInput
            placeholder="Search users..."
            value={query}
            onChangeText={setQuery}
            style={{
              // flex: 1,
              // marginLeft: wp(10),
              fontSize: fontSize(14),
              fontFamily: fontFamily.poppins500,
              color: '#000',
            }}
            placeholderTextColor="#999"
          /> */}
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
        data={adminChats}
        keyExtractor={item => `${item._id?.id}_${item._id?.model}`}
        renderItem={({item}) => (
          // console.log(item, 'ADMIN ITEM'),
          // <TouchableOpacity
          //   onPress={() => navigation.navigate('Admin Message Screen')}>
          //   <ChatItem
          //     avatar={item.avatar}
          //     // name={item.name}
          //     name={item.user?.name || item.user?.email || 'Unknown User'}
          //     time={formatTime(item.lastMessageAt)}
          //     preview={item.lastMessage || 'No messages'}
          //     online={false}
          //     unreadCount={item.unreadCount}
          //   />
          // </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log(
                'NAVIGATION DATA =>',
                JSON.stringify(
                  {
                    receiverId: item._id?.id,
                    model: item._id?.model,
                    user: item.user,
                    unreadCount: item.unreadCount,
                  },
                  null,
                  2,
                ),
              );

              navigation.navigate('SellerChatMessage', {
                receiverId: item._id.id,
                user: item.user,
              });
            }}>
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
export default AdminScreen;
