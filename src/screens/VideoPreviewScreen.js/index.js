import React, {useState} from 'react';
import Video from 'react-native-video';
import {
  TextInput,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {colors} from '../../utils/colors';
import {
  DeleteIcon,
  EditIcon,
  NewBackIcon,
  NewEditIcon,
  PublicIcon,
  VisibiltyIcon,
  WithoutFiled,
} from '../../assets';
import {useNavigation} from '@react-navigation/native';
const VideoPreviewScreen = ({route}) => {
  const navigation = useNavigation();
  const {videoUri} = route.params;
  const [isVisible, setIsVisible] = useState(true);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <ScrollView contentContainerStyle={{paddingBottom: hp(20)}} style={{}}>
        <Video
          source={{uri: videoUri}}
          style={{
            width: '100%',
            height: hp(550),
          }}
          resizeMode="cover"
          repeat
          // paused={false}
        />

        <View
          style={{
            position: 'absolute',
            top: hp(20),
            left: wp(18),
            right: wp(18),
            // flexDirection: 'row',
            // alignItems: 'center',
            // justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <NewBackIcon />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity style={{marginRight: wp(13)}}>
                <DeleteIcon />
              </TouchableOpacity>

              <TouchableOpacity>
                <NewEditIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            // width: '100%',
            height: hp(56),
            borderWidth: 1,
            borderColor: '#B6B6B6',
            marginHorizontal: wp(18),
            marginTop: hp(22),
            borderRadius: wp(12),
            paddingHorizontal: wp(16),
            justifyContent: 'center',
          }}>
          <TextInput
            placeholderTextColor={'#000'}
            placeholder="Reel Title"
            style={{
              fontFamily: fontFamily.poppins400,
              fontSize: fontSize(14),
              color: '#000',
            }}
          />
        </View>

        <View
          style={{
            marginHorizontal: wp(18),
            marginTop: hp(22),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: fontSize(14),
              fontFamily: fontFamily.poppins400,
            }}>
            Visibilty
          </Text>

          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            {isVisible ? <VisibiltyIcon /> : <WithoutFiled />}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={{alignItems: 'center', marginBottom: hp(24)}}>
        <PublicIcon />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VideoPreviewScreen;
