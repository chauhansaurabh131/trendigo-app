import React from 'react';
import {
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import arrow_back from '../../assets/images/arrow_back.png';
import {useState} from 'react';
import {colors} from '../../utils/colors';
import AllScreen from '../AllScreen';
import AllBrandsScreen from '../AllBrandScreen';
const BrandsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Men', 'Women', 'Kids', 'Beauty'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'All':
        return (
          <View style={{flex: 1}}>
            <AllBrandsScreen />
          </View>
        );
      case 'Men':
        return <View style={{}}>{/* <DeliveredScreen /> */}</View>;
      case 'Women':
        return <View style={{}}>{/* <ReturnedScreen /> */}</View>;
      case 'Kids':
        return <View style={{}}>{/* <CancelledScreen /> */}</View>;
      case 'Beauty':
        return <View style={{}}>{/* <CancelledScreen /> */}</View>;
      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          marginTop: hp(19),
          marginHorizontal: wp(18),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={arrow_back}
            style={{
              width: hp(18),
              height: hp(18),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center'}}>
          <Text
            style={{
              fontSize: fontSize(18),
              color: '#000',
              fontFamily: fontFamily.poppins500,
            }}>
            Brands
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: '#F2F2F2',
          height: hp(1),
          marginTop: hp(17),
        }}
      />

      {/* Horizontal, scrollable tabs */}
      <View style={{height: hp(50), marginTop: hp(17), marginBottom: hp(30)}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}>
          {tabs.map((tab, index) => {
            const isActive = tab === activeTab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tabButton,
                  {
                    backgroundColor: isActive ? colors.black : '#F6F6F6',
                    marginRight: index === tabs.length - 1 ? 0 : wp(15),
                  },
                ]}>
                <Text
                  style={{
                    color: isActive ? colors.white : colors.black,
                    fontFamily: fontFamily.poppins400,
                    fontSize: fontSize(12),
                  }}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Tab-specific Content */}
      <View style={{flex: 1}}>{renderTabContent()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 18,
  },
  headerTitle: {
    fontSize: fontSize(18),
    color: colors.black,
    lineHeight: hp(26),
    fontFamily: fontFamily.poppins500,
  },
  divider: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  tabsContent: {
    paddingVertical: hp(8),
    paddingHorizontal: wp(18),
  },
  tabButton: {
    paddingVertical: hp(8),
    paddingHorizontal: wp(20),
    borderRadius: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenContent: {
    flex: 1,
  },
});

export default BrandsScreen;
