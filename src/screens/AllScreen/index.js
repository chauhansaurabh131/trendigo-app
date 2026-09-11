import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView, View} from 'react-native';
import {images} from '../../assets';
import {hp, wp} from '../../utils/helpers';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const AllScreen = ({data}) => {
  const navigation = useNavigation();

  const renderVideoItem = ({item}) => {
    return (
      <View
        style={{
          // flexDirection: 'row',
          // alignItems: 'center',
          marginBottom: hp(17),
        }}>
        <View>
          <Image
            source={item.image}
            style={{
              width: hp(163),
              height: hp(240),
              resizeMode: 'contain',
              borderRadius: wp(12),
            }}
          />

          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: 'center',
              backgroundColor: '#84848433',
              alignItems: 'center',
              borderRadius: wp(12),
              overflow: 'hidden',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ReelsScreen', {
                  videos: data,
                  selectedId: item.id,
                })
              }>
              <Image
                source={images.video_play}
                style={{
                  width: hp(38.22),
                  height: hp(38.22),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderVideoItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        contentContainerStyle={{
          marginHorizontal: wp(17),
        }}
      />
    </SafeAreaView>
  );
};
export default AllScreen;
