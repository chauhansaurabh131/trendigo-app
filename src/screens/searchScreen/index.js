import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import {fontFamily, fontSize, hp, Touchable, wp} from '../../utils/helpers';
import {
  CrossIcon,
  GradientColorSearchIcon,
  SearchFilterIcon,
  SearchIcon,
} from '../../assets';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {colors} from '../../utils/colors';
import HomeAllProductCategoryComponent from '../../components/homeAllProductCategoryComponent';
import HomeTrendingComponent from '../../components/homeTrendingComponent';
import {useCallback, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {
  searchProductRequest,
  searchSuggestionRequest,
} from '../../redux/actions/searchActions';
const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const {suggestions, loading, recentSearches} = useSelector(
    state => state.search,
  );
  console.log(suggestions, 'SEARCH SUGGESTION IN UI ');
  console.log(recentSearches, 'RECENT SEARCH LIST');
  const token = useSelector(state => state.auth.token);
  console.log('Search token', token),
    useEffect(() => {
      if (token) {
        dispatch({
          type: 'RECENT_SEARCH_REQUEST',
        });
      }
    }, [token]);

  // Use useFocusEffect to reset your search state
  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsFocused(false);
        setSearchText('');
        Keyboard.dismiss();
      };
    }, []),
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          marginHorizontal: wp(18),
          marginTop: hp(15),
          zIndex: 1000,
        }}>
        <View
          activeOpacity={0.6}
          style={{
            marginTop: hp(9),
            width: '100%',
            height: hp(40),
            borderRadius: wp(25),
            backgroundColor: '#F7F7F7',
            justifyContent: 'center',
            paddingHorizontal: hp(15),
          }}>
          <Touchable
            style={{flexDirection: 'row', alignItems: 'center'}}
            activeOpacity={0.6}
            // onPress={() => navigation.navigate('SearchStack')}
          >
            <GradientColorSearchIcon width={hp(16)} height={hp(16)} />
            <TextInput
              style={{
                flex: 1,
                marginLeft: hp(11),
                fontSize: fontSize(14),
                lineHeight: hp(20),
                fontFamily: fontFamily.poppins400,
                color: '#979797',
                textAlignVertical: 'center',
                paddingVertical: 0,
              }}
              placeholder="Search for Products"
              placeholderTextColor={'#000'}
              value={searchText}
              returnKeyType="search"
              onFocus={() => setIsFocused(true)}
              onChangeText={text => {
                setSearchText(text);

                if (text.trim().length > 0) {
                  dispatch(searchSuggestionRequest(text));
                  console.log('SEARCH SUGGESTION TEXT===>', text);
                }
              }}
              onSubmitEditing={() => {
                if (searchText.trim().length > 0) {
                  // CLEAR OLD PRODUCTS
                  dispatch({
                    type: 'CLEAR_PRODUCTS',
                  });
                  // DISPATCH  SEARCH PRODUCT
                  // dispatch(searchProductRequest(searchText));
                  console.log('SEARCH PRODUCT REQUEST =>', {
                    keyword: searchText,
                    page: 1,
                    limit: 12,
                  });
                  dispatch(
                    searchProductRequest({
                      keyword: searchText,
                      page: 1,
                      limit: 12,
                    }),
                  );
                  dispatch({
                    type: 'RECENT_SEARCH_SUCCESS',
                    payload: [
                      searchText,
                      ...recentSearches.filter(
                        item =>
                          (item?.keyword || item).toLowerCase() !==
                          searchText.toLowerCase(),
                      ),
                    ],
                  });

                  navigation.navigate('SearchResultScreen', {
                    search: searchText,
                  });
                  setIsFocused(false);
                  Keyboard.dismiss();
                }
              }}
            />

            {searchText.trim().length > 0 && (
              <Touchable
                onPress={() => {
                  setSearchText('');
                }}>
                <CrossIcon />
              </Touchable>
            )}
          </Touchable>
        </View>
      </View>

      {/* MAIN SCREEN CONTENT */}
      <FlatList
        data={[{}]}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        contentContainerStyle={{
          paddingBottom: hp(50),
        }}
        ListHeaderComponent={
          <>
            <Text
              style={{
                color: colors.pureBlack,
                fontSize: fontSize(16),
                fontFamily: fontFamily.poppins700,
                marginHorizontal: wp(17),
                marginTop: hp(11),
              }}>
              Popular Search Categories
            </Text>

            <View style={{marginTop: hp(25)}}>
              <HomeAllProductCategoryComponent />
            </View>

            <View
              style={{
                width: '100%',
                borderColor: '#E7E7E7',
                borderWidth: 0.7,
                marginTop: hp(25),
              }}
            />

            <View style={{marginTop: hp(23)}}>
              <HomeTrendingComponent />
            </View>
          </>
        }
      />

      {/* BLACK OVERLAY */}
      {isFocused && (
        <View
          style={{
            position: 'absolute',
            top: hp(70),
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 5,
          }}
        />
      )}

      {/* SEARCH DROPDOWN */}
      {isFocused && (
        <View
          // pointerEvents="none"
          style={{
            position: 'absolute',
            top: hp(70),
            width: '100%',
            backgroundColor: '#FFF',
            maxHeight: hp(300),
            zIndex: 999,
          }}>
          {/* SEARCH HISTORY TITLE */}
          {token && searchText.length === 0 && recentSearches.length > 0 && (
            <Text
              style={{
                color: '#979797',
                fontSize: fontSize(13),
                fontFamily: fontFamily.poppins500,
                paddingHorizontal: wp(20),
                paddingBottom: hp(5),
                marginTop: hp(15),
              }}>
              Search History
            </Text>
          )}

          <FlatList
            contentContainerStyle={{
              paddingBottom: hp(20),
            }}
            data={
              searchText.length > 0 ? suggestions : token ? recentSearches : []
            }
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item, i) => i.toString()}
            renderItem={({item}) => {
              const value = item?.keyword || item;

              return (
                <Touchable
                  onPress={() => {
                    console.log('Clicked Value =>', value);

                    setSearchText(value);

                    console.log('Dispatch Search Product Request =>', {
                      keyword: value,
                      page: 1,
                      limit: 12,
                    });

                    dispatch(
                      searchProductRequest({
                        keyword: value,
                        page: 1,
                        limit: 12,
                      }),
                    );
                    const updatedRecentSearches = [
                      value,
                      ...recentSearches.filter(
                        item =>
                          (item?.keyword || item).toLowerCase() !==
                          value.toLowerCase(),
                      ),
                    ];

                    console.log(
                      'Updated Recent Searches =>',
                      updatedRecentSearches,
                    );

                    dispatch({
                      type: 'RECENT_SEARCH_SUCCESS',
                      payload: updatedRecentSearches,
                    });

                    setIsFocused(false);

                    Keyboard.dismiss();

                    console.log('Navigate To SearchResultScreen =>', value);

                    navigation.navigate('SearchResultScreen', {
                      search: value,
                    });
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: hp(12),
                      paddingHorizontal: wp(32),
                    }}>
                    <SearchFilterIcon
                      stroke={'#D0D0D0'}
                      width={hp(14)}
                      height={hp(14)}
                    />

                    <Text
                      style={{
                        marginLeft: wp(22),
                        color: '#000',
                        fontSize: fontSize(14),
                        fontFamily: fontFamily.poppins500,
                      }}>
                      {value}
                    </Text>
                  </View>
                </Touchable>
              );
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
