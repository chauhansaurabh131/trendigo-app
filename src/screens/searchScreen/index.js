// import React, {useEffect} from 'react';
// import {
//   SafeAreaView,
//   Text,
//   View,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   ToastAndroid,
// } from 'react-native';
// import {Keyboard} from 'react-native';
// import {ActivityIndicator} from 'react-native';
// import {Dimensions} from 'react-native';
// import {fontFamily, fontSize, hp, Touchable, wp} from '../../utils/helpers';
// import {
//   CrossIcon,
//   GradientColorSearchIcon,
//   GradientFullFillLike,
//   GradientLikeIcon,
//   SearchFilterIcon,
//   SearchIcon,
//   StarIcon,
// } from '../../assets';
// import {useNavigation} from '@react-navigation/native';
// import {colors} from '../../utils/colors';
// import HomeAllProductCategoryComponent from '../../components/homeAllProductCategoryComponent';
// import SearchResultsComponent from '../../components/searchResultComponent';
// import HomeTrendingComponent from '../../components/homeTrendingComponent';
// import {
//   recentSearchRequest,
//   searchProductRequest,
// } from '../../redux/actions/searchActions';
// import {searchSuggestionRequest} from '../../redux/actions/searchActions';
// import {useDispatch, useSelector} from 'react-redux';
// import {useState} from 'react';
// import {TextInput} from 'react-native-gesture-handler';
// import TopBrandComponent from '../../components/topBrandComponent';
// import {
//   getWishlistRequest,
//   REMOVE_WISHLIST_REQUEST,
//   WISHLIST_REQUEST,
// } from '../../redux/actions/wishlistActions';
// const SearchScreen = () => {
//   const navigation = useNavigation();
//   const [text, setText] = useState('');
// const dispatch = useDispatch();
// const [localWishlist, setLocalWishlist] = useState([]);
//   const [isInputFocused, setIsInputFocused] = useState(false);

//   const products = useSelector(state => state.search.products);
//   console.log('SEARCH PRODUCTS 👉', products);
//   const productList = products?.data || products || [];

//   // const hasSearchedProducts = text.trim().length > 0 && productList.length > 0;
//   // const hasTypedSearch = text.trim().length > 0;
//   const hasTypedSearch = text.trim().length > 0 && !isInputFocused;
//   const suggestions = useSelector(state => state.search.suggestions);
//   const loading = useSelector(state => state.search.loading);
//   console.log('REDUX SUGGESTIONS =>', suggestions);

//   const recentSearches = useSelector(state => state.search.recentSearches);

//   console.log('RECENT SEARCHES =>', recentSearches);
//   const onSearch = value => {
//     setText(value);
//     dispatch(searchProductRequest(value));
//   };

// const {wishlistData} = useSelector(state => state.wishlist);
// useEffect(() => {
//   if (Array.isArray(wishlistData)) {
//     setLocalWishlist(wishlistData);
//   }
// }, [wishlistData]);
// useEffect(() => {
//   dispatch(getWishlistRequest()); // ✅ ADD THIS
// }, []);
//   // console.log('Products in UI...:', products);

// const token = useSelector(state => state.auth.token);
// console.log('Auth Token in HomeTrendingComponent:', token);
// //wishlist function

// useEffect(() => {
//   if (!token) {
//     setLocalWishlist([]); // logout clear
//   }
// }, [token]);

//   const handleSuggestionPress = item => {
//     setText(item);
//     // setSuggestions([]);

//     dispatch(searchProductRequest(item));

//     Keyboard.dismiss();

//     setIsInputFocused(false);
//   };

//   useEffect(() => {
//     dispatch(recentSearchRequest());
//     console.log('DISPATCHED RECENT SEARCH REQUEST');
//   }, []);

// const renderProduct = ({item}) => {
//   const images = item?.variants?.[0]?.images || [];

//   const selectedImage = images.find(
//     img => img?.isSelectedForMainScreen === true,
//   );

//   const productImage = selectedImage?.imageUrl || images?.[0]?.imageUrl;
//   // console.log('PRODUCT IMAGE ID:', productImage);
//   // Now check if product exist in wishlist
//   const safeWishlist = Array.isArray(wishlistData) ? wishlistData : [];

//   /// when not token always emty heart show
//   const isWishlisted =
//     token &&
//     localWishlist.some(w => {
//       const productId = w.productId?.id || w.productId?._id;
//       return String(productId) === String(item._id);
//     });

//   return (
//     <TouchableOpacity
//       style={styles.card}
//       activeOpacity={0.6}
//       onPress={() => {
//         navigation.navigate('ProductDetails', {product: item});
//       }}>
//       {/* <Image source={item.image} style={styles.image} /> */}
//       <Image source={{uri: productImage}} style={styles.image} />

//       <View style={styles.content}>
//         <Text numberOfLines={1} style={styles.title}>
//           {item.title}
//         </Text>

//         <View style={styles.priceRow}>
//           <Text style={styles.price}>Rs. {item.finalPrice}</Text>
//           <Text style={styles.mrp}>MRP {item.variants?.[0]?.price}</Text>
//           <Text style={styles.discount}>
//             {item.variants?.[0]?.discount}% OFF
//           </Text>
//         </View>

//         <View style={styles.ratingRow}>
//           <View style={styles.ratingBox}>
//             <Text style={styles.ratingText}>
//               {' '}
//               {item?.reviewSummary?.[0]?.averageRating || 0}
//             </Text>
//             <StarIcon style={{top: -1, width: hp(9), height: hp(8)}} />
//           </View>
//           <Text style={styles.reviews}>
//             {' '}
//             ({item?.reviewSummary?.[0]?.totalReviews || 0})
//           </Text>

//           <TouchableOpacity style={styles.heartButton}>
//             {/*<Text style={{fontSize: 18}}>♡</Text>*/}

//             <TouchableOpacity
//               style={styles.heartButton}
//               onPress={() => {
//                 if (!token) {
//                   console.log(
//                     'User not authenticated → Redirect to StartingScreen',
//                   );
//                   navigation.navigate('StartingScreen');
//                   return;
//                 }

//                 console.log(' CLICK:', item._id);

//                 const alreadyExists = isWishlisted;

//                 console.log(' BEFORE LOCAL WISHLIST:', localWishlist);
//                 console.log(' ALREADY EXISTS:', alreadyExists);

//                 if (alreadyExists) {
//                   // 🔍 find wishlist item
//                   const wishlistItem = localWishlist.find(w => {
//                     const pid = w.productId?.id || w.productId?._id;
//                     return String(pid) === String(item._id);
//                   });

//                   console.log(' FOUND ITEM FOR REMOVE:', wishlistItem);

//                   if (!wishlistItem?.id) {
//                     console.log(' REMOVE FAILED: Wishlist ID not found');
//                     ToastAndroid.show('Remove failed', ToastAndroid.SHORT);
//                     return;
//                   }

//                   //  UI instant update
//                   setLocalWishlist(prev =>
//                     prev.filter(
//                       w => (w.productId?.id || w.productId?._id) !== item._id,
//                     ),
//                   );

//                   console.log('UI UPDATED (REMOVED)');

//                   //  API call
//                   dispatch({
//                     type: REMOVE_WISHLIST_REQUEST,
//                     payload: wishlistItem.id,
//                   });

//                   console.log(' REMOVE API CALLED:', wishlistItem.id);

//                   // Toast
//                   ToastAndroid.show(
//                     'Removed from Wishlist',
//                     ToastAndroid.SHORT,
//                   );
//                 } else {
//                   console.log(' ADD FLOW START');

//                   // ✅ UI instant update
//                   setLocalWishlist(prev => [
//                     ...prev,
//                     {productId: {id: item._id}},
//                   ]);

//                   console.log(' UI UPDATED (ADDED)');

//                   //  API call
//                   dispatch({
//                     type: WISHLIST_REQUEST,
//                     payload: {productId: item._id},
//                   });

//                   console.log(' ADD API CALLED');

//                   //  Toast
//                   ToastAndroid.show('Added to Wishlist', ToastAndroid.SHORT);
//                 }

//                 console.log(' AFTER LOCAL WISHLIST:', localWishlist);
//               }}>
//               {isWishlisted ? <GradientFullFillLike /> : <GradientLikeIcon />}
//             </TouchableOpacity>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
//       <View
//         style={{
//           marginHorizontal: 18,
//         }}>
//         <View
//           activeOpacity={0.6}
//           style={{
//             marginTop: hp(15),
//             width: '100%',
//             height: hp(40),
//             borderRadius: 25,
//             backgroundColor: '#F7F7F7',
//             marginBottom: 15,
//             justifyContent: 'center',

//             paddingHorizontal: hp(15),
//           }}>
//           <Touchable
//             style={{flexDirection: 'row', alignItems: 'center', height: '100%'}}
//             activeOpacity={0.6}
//             // onPress={() => navigation.navigate('SearchStack')}
//           >
//             <GradientColorSearchIcon width={hp(16)} height={hp(16)} />

//             <TextInput
//               value={text}
//               onFocus={() => setIsInputFocused(true)}
//               onBlur={() => setIsInputFocused(false)}
//               // onChangeText={value => setText(value)} //
//               onChangeText={value => {
//                 setText(value);

//                 if (value.trim().length > 0) {
//                   dispatch(searchSuggestionRequest(value));
//                   console.log(' DISPATCHED SUGGESTION REQUEST FOR:', value);
//                 }
//               }}
//               onSubmitEditing={() => dispatch(searchProductRequest(text))} //when user submits the search
//               placeholderTextColor={'#000'}
//               placeholder="Search for Products"
//               returnKeyType="search"
//               blurOnSubmit={false}
//               style={{
//                 marginLeft: hp(15),
//                 fontSize: fontSize(14),
//                 lineHeight: hp(20),
//                 fontFamily: fontFamily.poppins400,
//                 color: '#979797',
//                 flex: 1,
//                 textAlignVertical: 'center', // Android fix
//                 paddingVertical: 0, // remove extra space
//               }}
//             />
//             {text.length > 0 && (
//               <TouchableOpacity
//                 onPress={() => {
//                   setText('');
//                 }}>
//                 <CrossIcon width={hp(17)} height={hp(17)} />
//               </TouchableOpacity>
//             )}
//           </Touchable>
//         </View>
//       </View>
//       {/* {isInputFocused && suggestions.length > 0 && ( */}
//       {isInputFocused && (
//         <View
//           style={{
//             backgroundColor: '#fff',
//             // marginHorizontal: 18,
//             // borderRadius: 10,
//             // elevation: 5,
//             // paddingVertical: 5,
//             zIndex: 999,
//             elevation: 999,
//             width: '100%',
//             height: hp(200),
//           }}>
//           {/* Recent History Text */}
//           {text.length === 0 && recentSearches.length > 0 && (
//             <Text
//               style={{
//                 color: '#979797',
//                 fontSize: fontSize(12),
//                 fontFamily: fontFamily.poppins500,
//                 paddingHorizontal: wp(32),
//                 paddingTop: hp(12),
//                 paddingBottom: hp(5),
//               }}>
//               Search History
//             </Text>
//           )}
//           <FlatList
//             data={text.length > 0 ? suggestions : recentSearches}
//             keyExtractor={(item, index) => index.toString()}
//             keyboardShouldPersistTaps="handled"
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{
//               paddingBottom: hp(10),
//             }}
//             renderItem={({item}) => (
//               <TouchableOpacity
//                 onPress={() => handleSuggestionPress(item)}
//                 style={{
//                   paddingVertical: hp(10),
//                   paddingHorizontal: wp(32),
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                 }}>
//                 <View style={{marginRight: wp(23)}}>
//                   <SearchFilterIcon
//                     width={wp(14)}
//                     height={hp(14)}
//                     stroke={'#D0D0D0'}
//                   />
//                 </View>

//                 <Text
//                   // numberOfLines={1}
//                   // ellipsizeMode="tail"
//                   style={{
//                     flex: 1,
//                     color: '#000',
//                     fontSize: fontSize(14),
//                     lineHeight: hp(18),
//                     fontFamily: fontFamily.poppins500,
//                   }}>
//                   {item}
//                 </Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       )}
//       <View
//         style={{
//           flex: 1,
//         }}>
//         {loading ? (
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <ActivityIndicator size="large" color="#8225AF" />
//           </View>
//         ) : hasTypedSearch ? (
//           <SearchResultsComponent
//             products={productList}
//             renderProduct={renderProduct}
//           />
//         ) : (
//           <FlatList
//             key="default-list"
//             data={[]}
//             renderItem={null}
//             ListHeaderComponent={
//               <>
//                 <Text
//                   style={{
//                     color: colors.pureBlack,
//                     fontSize: fontSize(16),
//                     fontFamily: fontFamily.poppins700,
//                     marginHorizontal: 17,
//                     marginTop: hp(11),
//                   }}>
//                   Popular Search Categories
//                 </Text>

//                 <View style={{marginTop: hp(25)}}>
//                   <HomeAllProductCategoryComponent />
//                 </View>

//                 <View
//                   style={{
//                     width: '100%',
//                     borderColor: '#E7E7E7',
//                     borderWidth: 0.7,
//                     marginTop: hp(25),
//                   }}
//                 />

//                 <View style={{marginTop: hp(23)}}>
//                   <HomeTrendingComponent />
//                 </View>
//               </>
//             }
//           />
//         )}
//       </View>
//       {/* {isInputFocused && text.length > 0 && (
//        */}
//       {isInputFocused && text.length > 0 && suggestions.length > 0 && (
//         <View
//           style={{
//             position: 'absolute',
//             top: hp(70),
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             zIndex: 1,
//           }}
//         />
//       )}
//     </SafeAreaView>
//   );
// };
// const screenWidth = Dimensions.get('window').width;
// const cardWidth = (screenWidth - 40) / 2;

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 10,
//     // paddingTop: 10,
//   },
//   card: {
//     width: cardWidth,
//     // marginBottom: 15,
//     marginHorizontal: 5,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#eee',
//     backgroundColor: '#fff',
//     overflow: 'hidden',
//     marginTop: hp(15),
//   },
//   image: {
//     width: '100%',
//     height: hp(170),
//     resizeMode: 'cover',
//     borderBottomLeftRadius: 14,
//     borderBottomRightRadius: 14,
//   },
//   content: {
//     padding: 10,
//   },
//   title: {
//     fontSize: fontSize(10),
//     fontFamily: fontFamily.poppins400,
//     lineHeight: hp(14),
//     color: colors.black,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 6,
//     justifyContent: 'space-between',
//   },
//   price: {
//     marginRight: 6,
//     fontSize: fontSize(12),
//     fontFamily: fontFamily.poppins700,
//     lineHeight: hp(16),
//     color: colors.black,
//   },
//   mrp: {
//     fontSize: fontSize(10),
//     color: '#A5A5A5',
//     textDecorationLine: 'line-through',
//     marginRight: 6,
//     fontFamily: fontFamily.poppins500,
//     lineHeight: hp(14),
//   },
//   discount: {
//     fontSize: fontSize(10),
//     color: '#2B9909',
//     fontFamily: fontFamily.poppins600,
//     lineHeight: hp(14),
//   },
//   ratingRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 6,
//   },
//   ratingBox: {
//     backgroundColor: '#8225AF',
//     paddingHorizontal: 5,
//     borderRadius: 16,
//     width: hp(42),
//     height: hp(18),
//     justifyContent: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   ratingText: {
//     color: '#fff',
//     fontSize: fontSize(9),
//     fontFamily: fontFamily.poppins500,
//     marginRight: hp(5),
//     // top: 1,
//   },
//   reviews: {
//     fontSize: fontSize(10),
//     color: colors.pureBlack,
//     // marginRight: 6,
//     fontFamily: fontFamily.poppins500,
//     marginLeft: hp(12),
//   },
//   heartButton: {
//     marginLeft: 'auto',
//   },
// });

// export default SearchScreen;import React from 'react';

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
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../utils/colors';
import HomeAllProductCategoryComponent from '../../components/homeAllProductCategoryComponent';
import HomeTrendingComponent from '../../components/homeTrendingComponent';
import {useState} from 'react';
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
  console.log(suggestions, 'Suggestion in Ui');
  console.log(recentSearches, 'Recent Search show');
  const token = useSelector(state => state.auth.token);
  console.log('Search token', token),
    // useEffect(() => {
    //   dispatch({
    //     type: 'RECENT_SEARCH_REQUEST',
    //   });
    // }, []);

    useEffect(() => {
      if (token) {
        dispatch({
          type: 'RECENT_SEARCH_REQUEST',
        });
      }
    }, [token]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          marginHorizontal: 18,
          marginTop: hp(15),
          zIndex: 1000,
        }}>
        <View
          activeOpacity={0.6}
          style={{
            marginTop: hp(9),
            // marginTop:hp(15),
            width: '100%',
            height: hp(40),
            borderRadius: 25,
            backgroundColor: '#F7F7F7',
            // marginBottom: 15,
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
              // onBlur={() => setIsFocused(false)}
              // onChangeText={setSearchText}
              onChangeText={text => {
                setSearchText(text);

                if (text.trim().length > 0) {
                  dispatch(searchSuggestionRequest(text));
                  console.log('Search Suggestion text', text);
                }
              }}
              onSubmitEditing={() => {
                if (searchText.trim().length > 0) {
                  // CLEAR OLD PRODUCTS
                  dispatch({
                    type: 'CLEAR_PRODUCTS',
                  });

                  dispatch(searchProductRequest(searchText));

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

                  Keyboard.dismiss();

                  setIsFocused(false);
                }
              }}
            />

            {searchText.trim().length > 0 && (
              <Touchable
                onPress={() => {
                  setSearchText('');
                  // Keyboard.dismiss();
                  // setIsFocused(false);
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
                marginHorizontal: 17,
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
            // left: 18,
            // right: 18,
            width: '100%',
            backgroundColor: '#FFF',
            // borderBottomLeftRadius: 16,
            // borderBottomRightRadius: 16,
            maxHeight: hp(300),
            zIndex: 999,
            // paddingTop: hp(20),
          }}>
          {/* SEARCH HISTORY TITLE */}
          {/* {searchText.length === 0 && recentSearches.length > 0 && ( */}
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
            // data={
            //   searchText.length > 0
            //     ? suggestions.length > 0
            //       ? suggestions
            //       : recentSearches
            //     : recentSearches
            // }
            data={
              searchText.length > 0 ? suggestions : token ? recentSearches : []
            }
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item, i) => i.toString()}
            renderItem={({item}) => {
              const value = item?.keyword || item;

              return (
                <Touchable
                  // onPress={() => {
                  //   setSearchText(value);
                  //   setIsFocused(false);
                  //   Keyboard.dismiss();

                  //   navigation.navigate('SearchResultScreen', {
                  //     search: value,
                  //   });
                  // }}

                  onPress={() => {
                    console.log('Clicked Value =>', value);

                    setSearchText(value);

                    console.log('Dispatch Search Product Request =>', value);
                    dispatch(searchProductRequest(value));

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
