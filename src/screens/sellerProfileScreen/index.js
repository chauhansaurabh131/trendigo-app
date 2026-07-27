import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {images} from '../../assets';
import arrow_back from '../../assets/images/arrow_back.png';
import TopbrandScreen from '../sellerinsidescreens/topbrandScreen';
import TopRatedScreen from '../sellerinsidescreens/topRatedScreen';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useRoute} from '@react-navigation/native';
import {colors} from '../../utils/colors';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const SellerProfileScreen = ({route}) => {
  // const route = useRoute();
  const {store} = route.params;
  // const store = route?.params?.store;
  console.log(store, 'Received store');

  console.log('ROUTE PARAMS =>', route?.params);
  console.log('STORE =>', route?.params?.store);
  const [activeTab, setActiveTab] = useState('Top Brand');
  const navigation = useNavigation();
  //banner image
  const bannerImage = store?.bannerImages?.[0];
  //shop image
  const shopImage = store?.profileImage;
  const {data} = useSelector(state => state.storeProduct);
  const tabs = ['Top Brand', 'Top Rated', 'Deals', 'Trending'];
  // Render content based on current tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Top Brand':
        return <TopbrandScreen storeId={store?.id} />;

      case 'Top Rated':
        return <TopRatedScreen />;

      // case 'Deals':
      //   return <DealsScreen />;

      // case 'Trending':
      //   return <TrendingScreen />;

      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp(20)}}>
        <View
          style={{
            marginHorizontal: wp(24),
            marginTop: hp(20),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={arrow_back}
              style={{width: wp(18), height: hp(18)}}
            />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: fontFamily.poppins400,
                color: '#000',
                fontSize: fontSize(16),
              }}>
              Seller Profile
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: hp(16),
          }}>
          {bannerImage ? (
            <Image
              source={{uri: bannerImage}}
              style={{width: '100%', height: hp(121)}}
            />
          ) : null}
        </View>
        <View style={{marginTop: hp(17), alignItems: 'center'}}>
          <View
            style={{
              width: hp(90),
              height: hp(90),
              borderRadius: wp(50),
              backgroundColor: '#fff',
              borderColor: '#ccc',
              borderWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {shopImage && shopImage.trim() !== '' ? (
              <Image
                source={{uri: shopImage}}
                style={{
                  width: hp(84),
                  height: hp(84),
                  borderRadius: wp(50),
                  resizeMode: 'cover',
                }}
              />
            ) : (
              <Text
                style={{
                  fontSize: fontSize(28),
                  fontFamily: fontFamily.poppins500,
                  color: '#000',
                }}>
                {store?.name?.charAt(0)?.toUpperCase() || '?'}
              </Text>
            )}
          </View>
        </View>
        <View style={{marginTop: hp(17), alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: fontFamily.poppins600,
              fontSize: fontSize(16),
              color: '#000',
            }}>
            {/* Galaxy Fashion Hub */}
            {store?.name?.charAt(0)?.toUpperCase() + store.name.slice(1) ||
              'No Name of store'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: wp(95),
            marginTop: hp(13),
          }}>
          <View>
            <Text
              style={{
                fontFamily: fontFamily.poppins600,
                fontSize: fontSize(14),
              }}>
              <Text
                style={{
                  color: '#000',
                }}>
                {/* 4.2{'  '} */}
                {data?.storeAverageRating ?? '0.0'}
                {'  '}
              </Text>
              <Text
                style={{
                  color: '#868686',
                }}>
                Ratings
              </Text>
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: fontFamily.poppins600,
                fontSize: fontSize(14),
              }}>
              <Text
                style={{
                  color: '#000',
                }}>
                {/* 190 */}
                {data?.totalResults ?? '0'}
                {'  '}
              </Text>
              <Text
                style={{
                  color: '#868686',
                }}>
                Products
              </Text>
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: wp(17),
            marginTop: hp(27),
          }}>
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveTab(tab)}
                style={{marginRight: wp(12)}}>
                {isActive ? (
                  <LinearGradient
                    colors={['#5029F3', '#7756FF']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      width: wp(94), // fixed width
                      height: hp(30),
                      borderRadius: wp(24),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: fontSize(12),
                        fontFamily: fontFamily.poppins400,
                      }}>
                      {tab}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View
                    style={{
                      backgroundColor: '#F7F7F7',
                      width: wp(94), // fixed width
                      height: hp(30),
                      borderRadius: wp(24),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: fontSize(12),
                        fontFamily: fontFamily.poppins400,
                      }}>
                      {tab}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={{marginTop: hp(20)}}>{renderTabContent()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SellerProfileScreen;
