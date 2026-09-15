import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Modal,
  View,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import {fontFamily, fontSize, hp, wp, isIOS} from '../../utils/helpers';
import {colors} from '../../utils/colors';
import {
  CancelIcon,
  ChartImage,
  images,
  MesureButton,
  MesureStep,
  NavigationArrowIcon,
  SizeChart,
  SizeChartButton,
  SizeChartText,
  TitleText,
} from '../../assets';

const SizeChartComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showMeasure, setShowMeasure] = useState(false);

  const sizeData = [
    {size: 'S', bust: '34', waist: '44'},
    {size: 'M', bust: '36', waist: '46'},
    {size: 'L', bust: '38', waist: '48'},
    {size: 'XL', bust: '40', waist: '50'},
    {size: 'XXL', bust: '42', waist: '52'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setModalVisible(true)}
        style={styles.button}>
        <Text
          style={{
            fontSize: fontSize(12),
            color: '#7147E8',
            lineHeight: hp(16),
            fontFamily: fontFamily.poppins500,
          }}>
          Size Guide
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setShowMeasure(false);
        }}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setShowMeasure(false);
              }}
              style={{
                position: 'absolute',
                right: wp(10),
                width: hp(50),
                height: hp(50),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CancelIcon />
            </TouchableOpacity>

            <View style={{marginHorizontal: wp(22), marginTop: hp(23)}}>
              <Text style={styles.modalTitle}>
                {showMeasure ? 'How to Measure' : 'Size Chart'}
              </Text>

              {/*<View style={styles.separator} />*/}

              {showMeasure ? (
                <View style={{marginTop: hp(31)}}>
                  <MesureStep />
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: isIOS ? hp(50) : hp(13),
                    }}>
                    <ChartImage />
                  </View>
                </View>
              ) : (
                <>
                  {/* Header Row */}

                  <View style={{marginTop: hp(31)}}>
                    <TitleText />
                  </View>

                  <View style={{marginTop: hp(15)}}>
                    <SizeChart />
                  </View>

                  <View style={{marginTop: hp(26)}}>
                    <SizeChartText />
                  </View>
                </>
              )}
            </View>

            {/* Toggle Button */}
            <View
              style={{
                position: 'absolute',
                bottom: wp(24),
                alignItems: 'center',
                alignSelf: 'center',
                width: '100%',
              }}>
              <View style={styles.separator} />
              <TouchableOpacity
                onPress={() => setShowMeasure(prev => !prev)}
                style={{}}>
                {showMeasure ? <SizeChartButton /> : <MesureButton />}
              </TouchableOpacity>
            </View>

            {/* Close Button */}
            {/*<Pressable*/}
            {/*  onPress={() => {*/}
            {/*    setModalVisible(false);*/}
            {/*    setShowMeasure(false);*/}
            {/*  }}*/}
            {/*  style={styles.closeButton}>*/}
            {/*  <Text style={styles.closeText}>Close</Text>*/}
            {/*</Pressable>*/}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SizeChartComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // paddingHorizontal: 20,
  },

  sizeChartText: {},
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    // width: '90%',
    backgroundColor: 'white',
    borderRadius: wp(10),
    height: hp(592),
    // paddingBottom: 20,
  },
  modalTitle: {
    fontSize: fontSize(16),
    lineHeight: hp(24),
    color: colors.pureBlack,
    fontFamily: fontFamily.poppins700,
  },
  separator: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(12),
    // paddingHorizontal: 5,
  },
  headerText: {
    // flex: 1,
    fontSize: fontSize(14),
    lineHeight: hp(18),
    fontFamily: fontFamily.poppins700,
    color: colors.pureBlack,
    // textAlign: 'left',
  },
  cellText: {
    // flex: 1,
    fontSize: fontSize(14),
    lineHeight: hp(18),
    fontFamily: fontFamily.poppins400,
    color: colors.pureBlack,
    width: 50,
    textAlign: 'center',
    marginTop: hp(15),
    // textAlign: 'left',
    paddingHorizontal: 10,
  },
  toggleText: {
    fontSize: fontSize(16),
    color: colors.pureBlack,
    lineHeight: hp(24),
    fontFamily: fontFamily.poppins400,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 6,
    alignSelf: 'center',
  },
  closeText: {
    fontSize: 16,
    color: 'black',
  },
});

//  <View style={{flexDirection: 'row', zIndex: 99, top: 30}}>
//                 <TouchableOpacity
//                   onPress={() => {
//                     console.log('STORE DATA BEFORE NAVIGATION =>', storeData);
//                     navigation.navigate('MainTabs', {
//                       screen: 'SearchStack',
//                       params: {
//                         screen: 'SellerProfile',
//                         params: {store: storeData},
//                       },
//                     });
//                   }}
//                   style={{
//                     width: wp(95),
//                     height: hp(40),
//                     borderRadius: wp(50),
//                     borderColor: '#CDCDCD',
//                     borderWidth: 1,
//                     backgroundColor: 'white',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                   activeOpacity={0.8}>
//                   <Text
//                     style={{
//                       color: colors.pureBlack,
//                       fontSize: fontSize(12),
//                       lineHeight: hp(14),
//                       fontFamily: fontFamily.poppins400,
//                     }}>
//                     Visit Store
//                   </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={() => {
//                     if (!token) {
//                       navigation.navigate('StartingScreen'); // your login screen
//                       return;
//                     }
//                     navigation.navigate('SendEquiryScreen', {
//                       productId: productId,
//                       // storeId: storeData?.id,
//                       receiverId: storeData?.contact?.id,
//                       storeData,
//                     });
//                   }}
//                   style={{
//                     width: wp(141),
//                     height: hp(40),
//                     borderRadius: wp(50),
//                     borderColor: '#CDCDCD',
//                     borderWidth: 1,
//                     backgroundColor: 'white', // Inner background
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     marginLeft: hp(15),
//                     flexDirection: 'row',
//                   }}
//                   activeOpacity={0.8}>
//                   <SendEquiry1 />
//                   <Text
//                     style={{
//                       color: colors.pureBlack,
//                       fontSize: fontSize(12),
//                       lineHeight: hp(14),
//                       fontFamily: fontFamily.poppins400,
//                       marginLeft: hp(10),
//                     }}>
//                     Send Enquiry
//                   </Text>
//                 </TouchableOpacity>
//               </View>
