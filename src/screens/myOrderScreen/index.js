import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fontFamily, fontSize, hp} from '../../utils/helpers';
import {BackIcon} from '../../assets';
import ProcessingScreen from '../myOrderInsideAllScreen/ProcessingScreen';
import {useNavigation} from '@react-navigation/native';
import DeliveredScreen from '../myOrderInsideAllScreen/DeliveredScreen';
import ReturnedScreen from '../myOrderInsideAllScreen/ReturnedScreen';
import CancelledScreen from '../myOrderInsideAllScreen/CancelledScreen';

const MyOrderScreen = () => {
  const [activeTab, setActiveTab] = useState('Processing');

  const tabs = ['Processing', 'Delivered', 'Returned', 'Cancelled'];

  const navigation = useNavigation();

  // Render content based on current tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Processing':
        return (
          <View style={styles.screenContent}>
            <ProcessingScreen />
          </View>
        );
      case 'Delivered':
        return (
          <View style={styles.screenContent}>
            <DeliveredScreen />
          </View>
        );
      case 'Returned':
        return (
          <View style={styles.screenContent}>
            <ReturnedScreen />
          </View>
        );
      case 'Cancelled':
        return (
          <View style={styles.screenContent}>
            <CancelledScreen />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {/* Header */}
      <View style={{height: hp(57), justifyContent: 'center'}}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={{position: 'absolute', left: 0}}
            onPress={() => {
              navigation.goBack();
            }}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Order</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Horizontal, scrollable tabs */}
      <View style={{height: hp(50), marginTop: hp(10), marginBottom: hp(15)}}>
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
                    backgroundColor: isActive ? colors.black : '#F7F7F7',
                    marginRight: index === tabs.length - 1 ? 0 : 15,
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
    marginHorizontal: 18,
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
    paddingHorizontal: 18,
  },
  tabButton: {
    paddingVertical: hp(8),
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenContent: {
    flex: 1,
  },
});

export default MyOrderScreen;
