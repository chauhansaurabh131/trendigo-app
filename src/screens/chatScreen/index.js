import React, {useState} from 'react';
import {
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
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {connectSocket, getSocket} from '../../socket/socket';
import GET_CHAT_LIST_REQUEST, {
  getChatListRequest,
  getMessagesRequest,
} from '../../redux/actions/chatAction';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {fontFamily, fontSize, hp} from '../../utils/helpers';
const ChatItem = ({avatar, name, time, preview, online, unreadCount}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}>
      {avatar ? (
        <Image
          source={{uri: avatar}}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            marginRight: 12,
          }}
        />
      ) : (
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            marginRight: 12,
            // backgroundColor: '#8225AF',
            borderWidth: 1,
            borderColor: '#8225AF',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: fontSize(16),
              fontFamily: fontFamily.poppins600,
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
              fontSize: fontSize(15),
              color: colors.pureBlack,
              fontWeight: '600',
            }}>
            {name}
          </Text>
          {!!online && (
            <Text style={{fontSize: fontSize(11), color: colors.primary}}>
              Online
            </Text>
          )}
          {!online && (
            <Text style={{fontSize: fontSize(11), color: '#9B9B9B'}}>
              {time}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 4,
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
                width: hp(16),
                height: hp(16),
                borderRadius: hp(9),
                backgroundColor: '#8225AF',
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

// time formatting function to display time in a user-friendly format
const formatChatTime = dateString => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  return date.toLocaleDateString();
};
const ChatScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const [loadingMessages, setLoadingMessages] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      console.log('CHAT SCREEN FOCUSED');

      dispatch(getChatListRequest());

      return () => {
        console.log('CHAT SCREEN UNFOCUSED');
      };
    }, [dispatch]),
  );
  const {chatList, loading} = useSelector(state => state.chat);

  // Fetch chat list when the component mounts
  useEffect(() => {
    dispatch(getChatListRequest());
  }, []);
  console.log(
    'GET CONVERSATIONS SELLER LIST IN CHAT SCREEN =>',
    getChatListRequest(),
  );
  console.log('GET CONVERSATIONS SELLER LIST IN CHAT SCREEN=>', chatList);
  const token = useSelector(state => state.auth.token);

  // Connect to the socket server when the component mounts and disconnect when it unmounts

  useEffect(() => {
    if (!token) {
      return;
    }

    const socket = connectSocket(token);

    socket.on('connect', () => {
      console.log('Connected');
      console.log('Socket ID:', socket.id);
      //
      socket.emit('get_conversations');
      // Request the list of conversations from the server
    });
    socket.on('conversations_list', response => {
      // Handle the received conversations list from the server
      console.log('CONVERSATIONS LIST =>', response);

      dispatch({
        type: 'GET_CHAT_LIST_SUCCESS',
        payload: response,
      });
    });

    return () => {
      socket.off('conversations_list');
    };
  }, [token]);

  const filteredChats = chatList.filter(item =>
    item?.seller?.name?.toLowerCase()?.includes(query.toLowerCase()),
  );

  const onSearchPress = () => {
    console.log('Search:', query);
  };

  // // Optional: Filter chats based on search
  // const filteredChats = chatData.filter(item =>
  //   item.name.toLowerCase().includes(query.toLowerCase()),
  // );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {/* Search Bar */}
      <View style={{paddingHorizontal: 16, paddingTop: 8, paddingBottom: 10}}>
        <View
          style={{
            height: 44,
            borderRadius: 12,
            // backgroundColor: '#F7F7F7',
            // borderWidth: 1,
            // borderColor: '#E6E6E6',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
          }}>
          <TextInput
            style={{flex: 1, fontSize: 16, color: colors.pureBlack}}
            value={query}
            onChangeText={setQuery}
            placeholder="Search Member"
            placeholderTextColor="black"
            returnKeyType="search"
            onSubmitEditing={onSearchPress}
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={onSearchPress}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
            <Image
              source={images.search_black_icon}
              style={{width: 20, height: 20, tintColor: '#000'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#E2E2E2',
          marginBottom: 5,
        }}
      />

      {/* FlatList for chats */}
      <FlatList
        data={filteredChats}
        keyExtractor={item => `${item._id.id}-${item._id.model}`}
        contentContainerStyle={{flexGrow: 1}}
        renderItem={({item}) => {
          console.log(
            'GET CONVERSATIONS SELLER LIST ITEM CHAT SCREEN =>',
            item,
          );

          return (
            <>
              {/* <TouchableOpacity
                onPress={() => {
                  // console.log('CHAT ITEM =>', JSON.stringify(item, null, 2));

                  console.log('SELLER ID =>', item?.seller?._id);

                  dispatch(getMessagesRequest(item?.seller?._id));

                  navigation.navigate(
                    'SendEquiryScreen',
                    {
                      receiverId: item?.seller?._id,
                      storeData: item?.seller?.storeId,
                      productId: item?.product?._id,
                    },
                    console.log('ALL PASSING DATA', {
                      receiverId: item?.seller?._id,
                      storeData: item?.seller?.storeId,
                      // productId: item?.product?._id,
                    }),
                  );
                }}> */}
              <TouchableOpacity
                onPress={() => {
                  console.log('ITEM =>', item);
                  console.log('ITEM SELLER =>', item?.seller);
                  console.log('FULL ITEM =>', JSON.stringify(item, null, 2));
                  console.log('SELLER ID CHAT SCREEN', item?.seller?._id);
                  console.log('STORE DATA =>', item?.seller?.storeId);
                  // console.log('PRODUCT =>', item?.product);
                  // console.log('PRODUCT ID =>', item?.product?._id);

                  dispatch(getMessagesRequest(item?.seller?._id));

                  const navigationData = {
                    receiverId: item?.seller?._id,
                    storeData: item?.seller?.storeId,
                    productId: item?.product?._id,
                  };

                  console.log('NAVIGATION DATA =>', navigationData);

                  navigation.navigate('SendEquiryScreen', navigationData);
                }}>
                <ChatItem
                  // avatar={{
                  //   uri: item?.seller?.storeId?.profileImage,
                  // }}
                  avatar={item?.seller?.storeId?.profileImage}
                  name={item?.seller?.name}
                  // time={item?.lastMessageAt}
                  time={formatChatTime(item?.lastMessageAt)}
                  preview={item?.lastMessage}
                  // online={item.online}
                  unreadCount={item?.unreadCount}
                />
              </TouchableOpacity>
            </>
          );
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.pureBlack,
                fontSize: fontSize(20),
                fontFamily: fontFamily.poppins600,
              }}>
              No Chats Found
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
