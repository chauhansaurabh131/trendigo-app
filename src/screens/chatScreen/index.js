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

const ChatItem = ({avatar, name, time, preview, online}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}>
      <Image
        source={avatar}
        style={{width: 44, height: 44, borderRadius: 22, marginRight: 12}}
      />
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              flex: 1,
              fontSize: 15,
              color: colors.pureBlack,
              fontWeight: '600',
            }}>
            {name}
          </Text>
          {!!online && (
            <Text style={{fontSize: 11, color: colors.primary}}>Online</Text>
          )}
          {!online && (
            <Text style={{fontSize: 11, color: '#9B9B9B'}}>{time}</Text>
          )}
        </View>
        <Text
          numberOfLines={1}
          style={{marginTop: 4, fontSize: 13, color: '#6B6B6B'}}>
          {preview}
        </Text>
      </View>
    </View>
  );
};

const ChatScreen = () => {
  const [query, setQuery] = useState('');

  // Example chat data
  const chatData = [
    {
      id: '1',
      avatar: images.user_one,
      name: 'Rishikesh Shah',
      time: '1h ago',
      preview: "Hi, I am busy, I'll drop you a message aft..",
      online: false,
    },
    {
      id: '2',
      avatar: images.user_two,
      name: 'Ronit Kumar',
      preview: "Hi, I am busy, I'll drop you a message aft..",
      online: true,
    },
    {
      id: '3',
      avatar: images.user_three,
      name: 'Priyal Mehta',
      time: '2h ago',
      preview: "Hi, I am busy, I'll drop you a message aft..",
      online: false,
    },
    {
      id: '4',
      avatar: images.user_four,
      name: 'Rhitik Gajjar',
      time: '2h ago',
      preview: "Hi, I am busy, I'll drop you a message aft..",
      online: false,
    },
  ];

  const onSearchPress = () => {
    console.log('Search:', query);
  };

  // Optional: Filter chats based on search
  const filteredChats = chatData.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

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
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ChatItem
            avatar={item.avatar}
            name={item.name}
            time={item.time}
            preview={item.preview}
            online={item.online}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
