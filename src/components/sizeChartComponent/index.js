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
import {fontFamily, fontSize, hp, isIOS} from '../../utils/helpers';
import {colors} from '../../utils/colors';
import {CancelIcon, images, NavigationArrowIcon} from '../../assets';

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
        <Text style={styles.sizeChartText}>Size Chart</Text>
        <NavigationArrowIcon style={{marginLeft: 10}} />
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
                right: 10,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CancelIcon />
            </TouchableOpacity>

            <View style={{marginHorizontal: 22, marginTop: hp(23)}}>
              <Text style={styles.modalTitle}>
                {showMeasure ? 'How to Measure' : 'Size Chart'}
              </Text>

              {/*<View style={styles.separator} />*/}

              {showMeasure ? (
                <View style={{marginTop: hp(25)}}>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    <Text style={{fontFamily: fontFamily.poppins700}}>
                      Waist
                    </Text>{' '}
                    : Measure the narrowest part above your navel.
                  </Text>

                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    <Text style={{fontFamily: fontFamily.poppins700}}>
                      Shoulder
                    </Text>{' '}
                    : Measure across your back from one shoulder tip to the
                    other.
                  </Text>

                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    <Text style={{fontFamily: fontFamily.poppins700}}>
                      Bust
                    </Text>{' '}
                    : Measure around the fullest part of your bust.
                  </Text>

                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(10),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    <Text style={{fontFamily: fontFamily.poppins700}}>Hip</Text>{' '}
                    : Measure the widest area below your waist.
                  </Text>

                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: isIOS ? hp(50) : hp(20),
                    }}>
                    <Image
                      source={images.measureImage}
                      style={{width: 204, height: 282}}
                    />
                  </View>
                </View>
              ) : (
                <>
                  {/* Header Row */}
                  <View style={styles.separator} />
                  <View style={styles.row}>
                    <Text style={styles.headerText}>Size</Text>
                    <Text style={styles.headerText}>Bust</Text>
                    <Text style={styles.headerText}>Waist</Text>
                  </View>

                  <View style={styles.separator} />

                  {/* Data Rows */}
                  {sizeData.map((item, index) => (
                    <View key={index} style={styles.row}>
                      <Text style={[styles.cellText, {textAlign: 'left'}]}>
                        {item.size}
                      </Text>
                      <Text style={[styles.cellText, {marginRight: 10}]}>
                        {item.bust}
                      </Text>
                      <Text style={[styles.cellText, {textAlign: 'right'}]}>
                        {item.waist}
                      </Text>
                    </View>
                  ))}

                  <View style={styles.separator} />
                </>
              )}
            </View>

            {/* Toggle Button */}
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                alignItems: 'center',
                alignSelf: 'center',
                width: '100%',
              }}>
              <View style={styles.separator} />
              <TouchableOpacity
                onPress={() => setShowMeasure(prev => !prev)}
                style={{
                  // backgroundColor: 'orange',
                  width: '100%',
                  alignItems: 'center',
                  height: 50,
                  justifyContent: 'center',
                }}>
                <Text style={styles.toggleText}>
                  {showMeasure ? 'Size Chart' : 'How to Measure'}
                </Text>
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
  button: {
    width: hp(110),
    height: hp(28),
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    borderColor: '#CECECE',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sizeChartText: {
    fontSize: fontSize(12),
    color: colors.pureBlack,
    lineHeight: hp(16),
    fontFamily: fontFamily.poppins500,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    height: hp(520),
    // paddingBottom: 20,
  },
  modalTitle: {
    fontSize: fontSize(16),
    lineHeight: hp(24),
    color: colors.pureBlack,
    fontFamily: fontFamily.poppins700,
  },
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#DBDBDB',
    marginTop: hp(15),
    // height: hp(50),
  },
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
