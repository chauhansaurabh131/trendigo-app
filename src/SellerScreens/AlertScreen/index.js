import React from 'react';
import {FlatList, SafeAreaView, Text} from 'react-native';
import {View} from 'react-native';
import {AlertIcon, BlueBagIcon, SmallTrulyBag} from '../../assets';
import {fontFamily, fontSize, hp} from '../../utils/helpers';
import {colors} from '../../utils/colors';
const AlertScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          width: '100%',
          height: hp(57),
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'pink',
        }}>
        <Text
          style={{
            color: '#000',
            fontFamily: fontFamily.poppins500,
            fontSize: fontSize(18),
          }}>
          All Notifications
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          height: hp(1),
          backgroundColor: '#E2E2E2',
        }}
      />

      <FlatList
        // data={data}
        // keyExtractor={(item, index) => index.toString()}
        // renderItem={renderItem}
        // // scrollEnabled={false}
        contentContainerStyle={{paddingBottom: hp(20), flexGrow: 1}}
        // showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AlertIcon />
            <Text
              style={{
                fontSize: fontSize(16),
                fontFamily: fontFamily.poppins400,
                color: colors.pureBlack,
                marginTop: hp(20),
              }}>
              No Notification Found
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
export default AlertScreen;
