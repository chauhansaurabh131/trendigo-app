import React, {useEffect} from 'react';
import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import {colors} from '../../utils/colors';
import {
  ColorTrendiGo,
  GradientColorSearchIcon,
  NewLogo,
  ProfileIcon,
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

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user, loading} = useSelector(state => state.user);
  useEffect(() => {
    dispatch(fetchUserRequest());
  }, []);
  console.log('PROFILE PIC ', user?.profilePic);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {/* Non-scrollable header */}
      <View
        style={{
          marginTop: hp(19),
          marginHorizontal: hp(17),
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <NewLogo />

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
                  width: hp(24),
                  height: hp(24),
                  borderRadius: 20,
                }}
              />
            ) : user?.name || user?.email ? (
              // First Letter
              <View
                style={{
                  width: hp(24),
                  height: hp(24),
                  borderRadius: 25,
                  backgroundColor: '#F7E7FF',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: fontSize(12),
                    fontFamily: fontFamily.poppins500,
                  }}>
                  {/* {(user?.name || user?.email)?.charAt(0)?.toUpperCase()} */}
                  {user?.name
                    ? user.name
                        .trim()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase())
                        .slice(0, 2)
                        .join('')
                    : user?.email?.charAt(0)?.toUpperCase()}
                </Text>
              </View>
            ) : (
              // Not Logged In
              <ProfileIcon />
            )}
          </TouchableOpacity>
        </View>

        <View
          activeOpacity={0.6}
          style={{
            marginTop: hp(23),
            width: '100%',
            height: hp(40),
            borderRadius: 25,
            backgroundColor: '#F7F7F7',
            marginBottom: 12,
            justifyContent: 'center',
            paddingHorizontal: hp(15),
          }}>
          <Touchable
            style={{flexDirection: 'row', alignItems: 'center'}}
            activeOpacity={0.6}
            onPress={() => navigation.navigate('SearchStack')}>
            <GradientColorSearchIcon width={hp(16)} height={hp(16)} />
            <Text
              style={{
                marginLeft: hp(15),
                fontSize: fontSize(14),
                lineHeight: hp(20),
                fontFamily: fontFamily.poppins400,
                color: '#979797',
              }}>
              Search for Products
            </Text>
          </Touchable>
        </View>
      </View>

      {/* 🔄 Scrollable content */}
      <FlatList
        data={[{}]} // dummy data
        keyExtractor={(_, index) => index.toString()}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <HomeHeaderAddBannersComponent />
            <View style={{marginTop: hp(25)}}>
              <HomeAllProductCategoryComponent />
            </View>

            {/* <View
              style={{
                width: '100%',
                borderColor: '#E7E7E7',
                borderWidth: 0.7,
                // marginTop: hp(10),
              }}
            /> */}
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
            <View style={{marginTop: hp(28)}}>
              <ViralTrendyComponet />
            </View>
            <View style={{marginTop: hp(47)}}>
              <ShopByBrandsComponent />
            </View>
            <View style={{marginTop: hp(35.17), marginHorizontal: wp(0)}}>
              <RecentlyViewComponent />
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
