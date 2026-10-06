import React, {useEffect} from 'react';
import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import {colors} from '../../utils/colors';
import {
  ColorTrendiGo,
  GradientColorSearchIcon,
  NewAdd,
  NewAddIcon,
  NewLogo,
  ProfileIcon,
  ProfileNewIcon,
  SmallTrulyBag,
  TrulyBag,
} from '../../assets';
import {fontFamily, fontSize, hp, Touchable, wp} from '../../utils/helpers';
import {useNavigation} from '@react-navigation/native';
import HomeHeaderAddBannersComponent from '../../components/homeHeaderAddBannersComponent';
import HomeAllProductCategoryComponent from '../../components/homeAllProductCategoryComponent';
import HomeTrendingComponent from '../../components/homeTrendingComponent';
import LatestTrendyComponet from '../../components/latestTrendyComponent';
import ViralTrendyComponet from '../../components/viralTrendComponent';
import ShopByBrandsComponent from '../../components/shopByBrandComponenent';
import RecentlyViewComponent from '../../components/recentlyViewComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserRequest} from '../../redux/actions/userActions';
import {GET_CART_REQUEST} from '../../redux/actions/cartActions';
import HomeFilterComponent from '../../components/HomeFilterComponent';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const token = useSelector(state => state.auth.token);
  const {loading, cartData, error} = useSelector(state => state.addToCard);
  const cartCount = cartData?.productDetailList?.length || 0;
  useEffect(() => {
    dispatch(fetchUserRequest());
  }, []);

  console.log('TAB CART COUNT =>', cartCount);

  useEffect(() => {
    if (token) {
      console.log('ALLING CART API FROM PRODUCT DETAILS');

      dispatch({
        type: GET_CART_REQUEST,
        token: token,
      });
    }
  }, [token]);

  console.log('PROFILE PIC IN HOMESCREEN', user?.profilePic);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {/* Non-scrollable header */}
      <View
        style={{
          marginTop: hp(19),
          marginHorizontal: hp(17),
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <NewLogo />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('BagScreen')}
            style={{
              width: hp(38),
              height: hp(38),
              borderRadius: wp(35),
              borderColor: '#E2E8F0CC',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              marginRight: wp(16),
            }}>
            <NewAdd />
            {cartCount > 0 && (
              <View
                style={{
                  position: 'absolute',
                  right: wp(-4),
                  // top: wp(-12),
                  bottom: wp(-6),
                  backgroundColor: '#5932EA',
                  borderRadius: wp(30),
                  width: hp(18),
                  height: hp(18),
                  justifyContent: 'center',
                  alignItems: 'center',
                  // paddingHorizontal: wp(3),
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: fontSize(9),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  {cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate('ProfileScreen');
            }}>
            {user?.profilePic ? (
              //  Profile image
              <Image
                source={{uri: user.profilePic}}
                style={{
                  width: hp(38),
                  height: hp(38),
                  borderRadius: wp(20),
                }}
              />
            ) : (
              // Not Logged In
              <ProfileNewIcon />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View
        activeOpacity={0.6}
        style={{
          marginTop: hp(11),
          // width: '100%',
          height: hp(38),
          borderRadius: wp(16),
          marginHorizontal: hp(17),
          backgroundColor: '#FFFFFF',
          borderColor: '#E2E8F0CC',
          borderWidth: 1,
          marginBottom: hp(12),
          justifyContent: 'center',
          paddingHorizontal: hp(16),
        }}>
        <Touchable
          style={{flexDirection: 'row', alignItems: 'center'}}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('SearchStack')}>
          <GradientColorSearchIcon width={hp(12)} height={hp(12)} />
          <Text
            style={{
              marginLeft: hp(11),
              fontSize: fontSize(12),
              lineHeight: hp(20),
              fontFamily: fontFamily.poppins500,
              color: '#94A3B8',
            }}>
            Search Product, brands
          </Text>
        </Touchable>
      </View>

      {/* Scrollable content */}
      {/* <FlatList
        data={[{}]} // dummy data
        keyExtractor={(_, index) => index.toString()}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={{marginTop: hp(5)}}>
              <HomeHeaderAddBannersComponent />
            </View>
            <View style={{marginTop: hp(25)}}>
              <HomeAllProductCategoryComponent />
            </View>

            <View style={{marginTop: hp(28)}}>
              <LatestTrendyComponet />
            </View>

            <View
              style={{
                // marginTop: hp(18),
                marginTop: hp(35),
                //  marginLeft: 8
              }}>
              <HomeTrendingComponent />
            </View>

         
          </>
        }
      /> */}

      <FlatList
        data={[{type: 'filter'}, {type: 'products'}]}
        keyExtractor={item => item.type}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={{marginTop: hp(5)}}>
              <HomeHeaderAddBannersComponent />
            </View>

            <View style={{marginTop: hp(25)}}>
              <HomeAllProductCategoryComponent />
            </View>

            <View style={{marginTop: hp(28)}}>
              <LatestTrendyComponet />
            </View>

            <Text
              style={{
                paddingHorizontal: wp(10),
                fontSize: fontSize(18),
                color: colors.pureBlack,
                fontFamily: fontFamily.poppins700,
                marginTop: hp(35),
                marginBottom: hp(20),
                marginLeft: hp(5),
              }}>
              Trending
            </Text>
          </>
        }
        stickyHeaderIndices={[1]}
        renderItem={({item}) => {
          if (item.type === 'filter') {
            return (
              <View
                style={{
                  backgroundColor: colors.white,
                  zIndex: 100,
                  elevation: 5,
                }}>
                <HomeFilterComponent />
              </View>
            );
          }

          if (item.type === 'products') {
            return <HomeTrendingComponent />;
          }

          return null;
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
