import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {colors} from '../../utils/colors';
import {
  fontFamily,
  fontSize,
  hp,
  isIOS,
  Touchable,
  wp,
} from '../../utils/helpers';
import {BackIcon, DeleteIcoon, images, NavigationArrowIcon} from '../../assets';
import {useNavigation, useRoute} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import GradientButton from '../../components/gradientButton';
import CheckBoxComponent from '../../components/checkBoxComponent';
import purple_image from '../../assets/images/purple_kurta_image.png';
import pink_kurta from '../../assets/images/pink_kurta_image.png';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_CART_REQUEST,
  removeCartRequest,
  updateCartRequest,
} from '../../redux/actions/cartActions';
import {FlatList} from 'react-native-gesture-handler';
import {GET_PRODUCT_VARIANT_REQUEST} from '../../redux/actions/productVariantActions';
import {
  ADD_ADDRESS_REQUEST,
  getAddressRequest,
} from '../../redux/actions/addressActions';
import {ActivityIndicator} from 'react-native';
const BagScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [removingItemId, setRemovingItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [colorOptions, setColorOptions] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const product = route.params?.product;
  // console.log('RECEIVED PRODUCT:', product);
  const productId = product?.id || product?._id;
  // console.log('FINAL PRODUCT ID 👉', productId);

  // const variants = selectedItem?.productId?.variants || [];
  // const variants = product?.variants || [];
  const {variants} = useSelector(state => state.productVariant);
  // console.log('Variants 👉', variants);
  // console.log(variants, 'Variants =======>');
  const {cartData, loading, error} = useSelector(state => state.addToCard);
  // console.log('Cart Data', cartData);
  const token = useSelector(state => state.auth.token);
  console.log('TOKEN IN BagScreen:', token);
  // console.log('SELECTED ITEM:', selectedItem);
  // console.log('VARIANTS:', selectedItem?.variants);
  useEffect(() => {
    if (token) {
      dispatch({
        type: GET_CART_REQUEST,
        token: token,
      });
      console.log('GET_CART_REQUEST DISPATCHED with token:', token);
    }
  }, [token]);
  // user id
  // const user = useSelector(state => state.auth.user);
  const userId = useSelector(state => state.user?.user?.id);
  // const userId = user?.id || user?._id;

  useEffect(() => {
    dispatch({type: 'FETCH_USER_REQUEST'});
  }, []);

  console.log('USER ID in BagScreen:', userId);

  useEffect(() => {
    if (userId) {
      console.log('Calling GET ADDRESS API with userId:', userId);

      dispatch(getAddressRequest(userId));
    }
  }, [userId]);

  // const addressList = useSelector(state => state.addresses?.list || []);
  const addressList = useSelector(state => state?.addresses?.list ?? []);
  console.log(addressList, 'ADDRESS LIST IN BAG SCREEN=====>');

  const addressState = useSelector(state => state.addresses);

  useEffect(() => {
    if (!addressState.loading && !addressState.error) {
      sheetRef2.current?.close();

      resetForm(); // ✅ clear after submit
    }
  }, [addressState.loading, addressState.error]);

  // console.log(
  //   'FULL STATE OF ADDRESS ',
  //   useSelector(state => state),
  // );

  const sheetRef1 = useRef(); // First bottom sheet - Address
  const sheetRef2 = useRef(); // Second bottom sheet - Add Address
  const sheetRef3 = useRef(); // Third bottom sheet - Edit Item

  // State for selected color and size
  // const [selectedColor, setSelectedColor] = useState(null);
  // const [selectedSize, setSelectedSize] = useState(null);
  // const [selectedQuantity, setSelectedQuantity] = useState('1');

  // // Color options with their respective images - Replace these with your actual image paths
  // // const colorOptions = [
  // //   {
  // //     id: 'sky_blue',
  // //     name: 'Sky Blue',
  // //     image: images.trending_one,
  // //   },
  // //   {
  // //     id: 'purple',
  // //     name: 'Purple',
  // //     image: images.purple_image,
  // //   },
  // //   {
  // //     id: 'pink',
  // //     name: 'Pink',
  // //     image: images.pink_image,
  // //   },
  // // ];
  // useEffect(() => {
  //   // console.log('=== VARIANTS FETCHED ===', variants);

  //   if (variants && variants.length > 0) {
  //     const colors = variants.map((variant, index) => {
  //       console.log(`--- VARIANT ${index} ---`, variant);

  //       const colorObj = variant.variants.find(v => v.key === 'color');
  //       console.log('ColorObj:', colorObj);

  //       const mainImage =
  //         variant.images.find(i => i.isSelectedForMainScreen) ||
  //         variant.images[0];
  //       console.log('Main Image:', mainImage);

  //       return {
  //         id: colorObj?.value,
  //         name: colorObj?.value,
  //         image: {uri: mainImage?.imageUrl},
  //       };
  //     });

  //     console.log('Color Options (Before filter):', colors);

  //     // Remove duplicates and empty ids
  //     const uniqueColors = colors
  //       .filter(c => c.id)
  //       .filter((c, idx, self) => self.findIndex(v => v.id === c.id) === idx);
  //     console.log('Color Options (Unique & valid):', uniqueColors);

  //     setColorOptions(uniqueColors);
  //   }
  // }, [variants]);
  // // Size options
  // const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

  // useEffect(() => {
  //   if (variants?.length > 0 && !selectedItem) {
  //     const firstVariant = variants[0];

  //     const colorObj = firstVariant?.variants?.find(x => x.key === 'color');

  //     setSelectedColor(colorObj?.value);

  //     // ✅ set sizes for first color
  //     const sizes = variants
  //       .filter(v =>
  //         v.variants.some(
  //           x => x.key === 'color' && x.value === colorObj?.value,
  //         ),
  //       )
  //       .map(v => v.variants.find(x => x.key === 'size')?.value);

  //     const uniqueSizes = [...new Set(sizes)];

  //     setAvailableSizes(uniqueSizes);

  //     if (uniqueSizes.length > 0) {
  //       setSelectedSize(uniqueSizes[0]);
  //     }
  //   }
  // }, [variants]);

  // const handleColorSelect = colorId => {
  //   setSelectedColor(colorId);

  //   const sizes = variants
  //     ?.filter(v =>
  //       v.variants.some(
  //         x =>
  //           x.key === 'color' &&
  //           x.value?.toLowerCase() === colorId?.toLowerCase(),
  //       ),
  //     )
  //     ?.map(v => v.variants.find(x => x.key === 'size')?.value);

  //   const uniqueSizes = [...new Set(sizes)];

  //   setAvailableSizes(uniqueSizes);

  //   // ✅ FIX HERE
  //   const isCurrentSizeAvailable = uniqueSizes.includes(selectedSize);

  //   if (isCurrentSizeAvailable) {
  //     setSelectedSize(selectedSize);
  //   } else if (uniqueSizes.length > 0) {
  //     setSelectedSize(uniqueSizes[0]);
  //   }

  //   // image
  //   const selectedVariant = variants.find(v =>
  //     v.variants.some(x => x.key === 'color' && x.value === colorId),
  //   );

  //   const mainImage =
  //     selectedVariant?.images.find(i => i.isSelectedForMainScreen) ||
  //     selectedVariant?.images[0];

  //   setSelectedImage(mainImage?.imageUrl);
  // };

  // const quantityOptions = ['1', '2', '3', '4', '5'];
  // // Get current selected color image for main display
  // const getCurrentColorImage = () => {
  //   const selectedColorObj = colorOptions.find(
  //     color => color.id === selectedColor,
  //   );
  //   return selectedColorObj ? selectedColorObj.image : images.trending_one;
  // };

  //  Selected states initially null then dynamic data set )
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState('1');

  //  Color options prepare  on  a variants
  useEffect(() => {
    if (variants && variants.length > 0) {
      // every  variant for  color + image
      const colors = variants.map(variant => {
        // color find
        const colorObj = variant.variants.find(v => v.key === 'color');

        // main image find out and  if is selected otherWise first)
        const mainImage =
          variant.images.find(i => i.isSelectedForMainScreen) ||
          variant.images[0];

        return {
          id: colorObj?.value, // color id (ex: white, black)
          name: colorObj?.value,
          image: {uri: mainImage?.imageUrl}, // image for UI
        };
      });

      // duplicate colors remove
      const uniqueColors = colors
        .filter(c => c.id)
        .filter((c, idx, self) => self.findIndex(v => v.id === c.id) === idx);

      setColorOptions(uniqueColors);
    }
  }, [variants]);

  // Default selection (only when NOT editing item)
  useEffect(() => {
    if (selectedItem && variants?.length > 0) {
      const color = selectedItem?.variants?.variants?.find(
        v => v.key === 'color',
      )?.value;

      // selected color માટે sizes filter
      const sizes = variants
        .filter(v =>
          v.variants.some(x => x.key === 'color' && x.value === color),
        )
        .map(v => v.variants.find(x => x.key === 'size')?.value);

      const uniqueSizes = [...new Set(sizes)];

      setAvailableSizes(uniqueSizes);

      // selected item size set
      const size = selectedItem?.variants?.variants?.find(
        v => v.key === 'size',
      )?.value;

      setSelectedSize(size);
    }
  }, [selectedItem, variants]);
  // ✅ Color select handler
  const handleColorSelect = colorId => {
    // selected color update
    setSelectedColor(colorId);

    // selected color  accoding sizes filter
    const sizes = variants
      ?.filter(v =>
        v.variants.some(
          x =>
            x.key === 'color' &&
            x.value?.toLowerCase() === colorId?.toLowerCase(),
        ),
      )
      ?.map(v => v.variants.find(x => x.key === 'size')?.value);

    const uniqueSizes = [...new Set(sizes)];

    // sizes state update
    setAvailableSizes(uniqueSizes);

    // IMPORTANT LOGIC:
    // current selected size new color in  available Is  or Not  then check
    const isCurrentSizeAvailable = uniqueSizes
      .map(s => s?.toLowerCase())
      .includes(selectedSize?.toLowerCase());

    if (isCurrentSizeAvailable) {
      // If is same size available  → same
      setSelectedSize(selectedSize);
    } else if (uniqueSizes.length > 0) {
      // otherWise → first size select
      setSelectedSize(uniqueSizes[0]);
    }

    // Image is a update  and acooding selected color
    const selectedVariant = variants.find(v =>
      v.variants.some(x => x.key === 'color' && x.value === colorId),
    );

    const mainImage =
      selectedVariant?.images.find(i => i.isSelectedForMainScreen) ||
      selectedVariant?.images[0];

    setSelectedImage(mainImage?.imageUrl);
  };

  // Quantity options (static)
  const quantityOptions = ['1', '2', '3', '4', '5'];

  //  Current selected color image UI
  const getCurrentColorImage = () => {
    const selectedColorObj = colorOptions.find(
      color => color.id === selectedColor,
    );

    return selectedColorObj ? selectedColorObj.image : images.trending_one;
  };
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (updating && !loading && !error) {
      setTimeout(() => {
        sheetRef3.current?.close();
        setUpdating(false);
      }, 3000);
    }
  }, [loading, error]);
  useEffect(() => {
    console.log('loading:', loading);
    console.log('updating:', updating);
  }, [loading, updating]);

  /// Add Address from state
  const [form, setForm] = useState({
    name: '',
    mobileNumber: '',
    pincode: '',
    addressLineOne: '', // ✅ use only this
    locality: '',
    isDefaultAddress: false, // ✅ FIXED NAME
  });
  // when i click to add address Submit Handler fnction

  const handleAddAddress = () => {
    if (!userId) {
      // console.log('User ID is missing. Cannot add address.');
      return;
    }
    console.log('USER ID in handleAddAddress:', userId);
    const payload = {
      userId,
      name: form.name,
      mobileNumber: Number(form.mobileNumber),
      pincode: Number(form.pincode),
      addressLineOne: form.addressLineOne || form.address,
      addressLineTwo: form.locality,
      city: form.locality, // 👈 mapping
      state: 'Gujarat', // 👈 FIXED VALUE
      country: 'India',
      isDefaultAddress: form.isDefaultAddress, // ✅ correct
    };
    console.log(' FINAL PAYLOAD ', payload);
    dispatch({
      type: ADD_ADDRESS_REQUEST,
      payload,
      // token,
    });
    console.log('PAYLOAD OF ADD ADDRESS REQUEST', payload);
    // console.log('TOKEN', token)
  };

  // isDefault Address show

  const defaultAddress = addressList?.find(
    item => item?.isDefaultAddress === true,
  );
  const resetForm = () => {
    setForm({
      name: '',
      mobileNumber: '',
      pincode: '',
      addressLineOne: '',
      locality: '',
      isDefaultAddress: false,
    });
  };
  // console.log('Default Address show', defaultAddress);
  const renderCartItem = ({item}) => {
    const productId = item?.productId?.id;

    console.log('PRODUCT ID FROM CART:', productId);
    // console.log('Rendering Cart Item:', item);
    // console.log('CART DATA', cartData);
    const size = item?.variants?.variants?.find(v => v.key === 'size')?.value;
    console.log('Selected Size:', size);
    const color = item?.variants?.variants?.find(v => v.key === 'color')?.value;
    console.log('Selected Color:', color);
    // const image = item?.variants?.images?.find(
    //   i => i.isSelectedForMainScreen,
    // )?.imageUrl;

    const image =
      item?.variants?.images?.find(i => i.isSelectedForMainScreen)?.imageUrl ||
      item?.variants?.images?.[0]?.imageUrl ||
      null;
    console.log('Selected Image:', image);

    const price = item?.variants?.price;
    console.log('Price:', price);

    console.log('FINAL IMAGE URL 👉', image);
    console.log('FULL IMAGES ARRAY 👉', item?.variants?.images);
    const discountedPrice = item?.variants?.discountedPrice;
    console.log('Discounted Price:', discountedPrice);
    const discount = item?.variants?.discount;
    console.log('Discount:', discount);

    return (
      <View
        style={{
          // width: '100%',
          marginHorizontal: wp(18),
          borderColor: '#E8E8E8',
          borderWidth: 1,
          // height: hp(240),
          borderRadius: 16,
          marginTop: hp(19),
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            marginHorizontal: wp(21),
            marginTop: hp(18),
          }}>
          <Text
            style={{
              color: '#9333EA',
              fontFamily: fontFamily.poppins600,
              fontSize: fontSize(12),
            }}>
            Expected Delivery 10th June
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: hp(21),
            marginHorizontal: wp(13),
            // backgroundColor: '#165ca1',
            // backgroundColor: '#F8FAFC',
          }}>
          <View
            style={{
              width: '30%',
              // backgroundColor: 'pink'
            }}>
            <Image
              // source={getCurrentColorImage()}
              // source={{uri: image}}
              source={{uri: image}}
              style={{
                // width: isIOS ? 75 : wp(75),
                // height: isIOS ? 95 : hp(97),
                width: isIOS ? 93 : wp(93),
                height: isIOS ? 110 : hp(112),
                borderRadius: 16,
              }}
            />
          </View>

          <View
            style={{
              width: '75%',
              // backgroundColor: 'pink'
            }}>
            <View
              style={{
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                // alignItems: 'center',
                marginHorizontal: wp(17),
              }}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  color: colors.pureBlack,
                  fontSize: fontSize(15),
                  fontFamily: fontFamily.poppins600,
                }}>
                {/* Designer Traditional {'\n'}Dress */}
                {item?.productId?.title}
              </Text>
            </View>

            <View
              style={{
                marginTop: hp(15),
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: wp(17),

                // backgroundColor: '#F8FAFC',
              }}>
              <View>
                {/* Size */}
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: 60,
                      color: '#64748B',
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    Size
                  </Text>

                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    :
                  </Text>

                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins600,
                      marginLeft: 5,
                    }}>
                    {/* {selectedSize} */}
                    {size}
                  </Text>
                </View>

                {/* Color */}
                <View style={{flexDirection: 'row', marginTop: hp(1)}}>
                  <Text
                    style={{
                      width: 60,
                      color: '#64748B',
                      fontSize: fontSize(12),
                      lineHeight: hp(13),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    Color
                  </Text>

                  <Text
                    style={{
                      color: colors.pureBlack,
                      lineHeight: hp(13),
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    :
                  </Text>

                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(12),
                      lineHeight: hp(13),
                      fontFamily: fontFamily.poppins600,
                      marginLeft: 5,
                    }}>
                    {/* {colorOptions.find(color => color.id === selectedColor)
                      ?.name || 'Sky Blue'} */}
                    {color}
                  </Text>
                </View>

                {/* Quantity */}
                <View style={{flexDirection: 'row', marginTop: hp(1)}}>
                  <Text
                    style={{
                      width: 60,

                      color: '#64748B',
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins400,
                    }}>
                    Quantity
                  </Text>

                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins600,
                    }}>
                    :
                  </Text>

                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(12),
                      fontFamily: fontFamily.poppins600,
                      marginLeft: 5,
                    }}>
                    {/* {selectedQuantity} */}
                    {item?.quantity}
                  </Text>
                </View>
              </View>
              <Touchable
                style={{
                  width: hp(47),
                  height: hp(22),
                  borderRadius: 50,
                  // borderWidth: 1,
                  backgroundColor: '#FBF7FF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: wp(14),
                  marginTop: hp(25),
                }}
                onPress={() => {
                  const productId = item?.productId?.id;
                  console.log(productId, 'productId======>');
                  console.log(token, 'token====>');
                  dispatch({
                    type: GET_PRODUCT_VARIANT_REQUEST,
                    productId: productId,
                    token: token,
                  });

                  setSelectedItem(item);

                  // ✅ IMPORTANT: set selected values from cart item
                  const color = item?.variants?.variants?.find(
                    v => v.key === 'color',
                  )?.value;

                  const size = item?.variants?.variants?.find(
                    v => v.key === 'size',
                  )?.value;

                  setSelectedColor(color);
                  setSelectedSize(size);
                  setSelectedQuantity(item?.quantity?.toString());

                  // ✅ also set image
                  const img =
                    item?.variants?.images?.find(i => i.isSelectedForMainScreen)
                      ?.imageUrl || item?.variants?.images?.[0]?.imageUrl;

                  setSelectedImage(img);

                  sheetRef3.current?.open();
                }}>
                {/* <Image
                    source={images.edit_icon}
                    style={{width: hp(9), height: hp(9), resizeMode: 'contain'}}
                  /> */}
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontSize: fontSize(12),
                    fontFamily: fontFamily.poppins600,
                  }}>
                  Edit
                </Text>
              </Touchable>
            </View>
          </View>
        </View>

        <View
          style={{
            borderColor: '#E8E8E8',
            // width: '100%',
            borderWidth: 0.6,
            marginTop: hp(21),
            marginHorizontal: wp(15),
          }}
        />

        <View>
          <View
            style={{
              // marginTop: hp(10),
              marginHorizontal: wp(15),
              flexDirection: 'row',
              marginVertical: hp(10),
              justifyContent: 'space-between',
              alignItems: 'center',
              // backgroundColor: '#34373b',
            }}>
            <TouchableOpacity
              onPress={() => {
                const payloadData = {
                  cartId: cartData?.id || cartData?._id,
                  itemId: item?._id,
                };
                console.log('REMOVE PAYLOAD 👉', payloadData);

                // loader start
                setRemovingItemId(item?._id);

                dispatch(removeCartRequest(payloadData, token));

                // ✅ refresh cart
                // setTimeout(() => {

                // }, 500);
              }}>
              {removingItemId === item?._id ? (
                <ActivityIndicator size="small" color="#8225AF" />
              ) : (
                <DeleteIcoon />
              )}
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1, // ✅ IMPORTANT
                marginLeft: wp(123), // optional spacing
              }}>
              <Text
                style={{
                  fontFamily: fontFamily.poppins500,
                  fontSize: fontSize(15),
                  color: '#16A34A',
                }}>
                {/* 34% Off */}
                {discount}% Off
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.poppins500,
                  fontSize: fontSize(13),
                  color: '#64748B',
                  marginRight: 8,
                  textDecorationLine: 'line-through',
                }}>
                {/* Rs. 780 */}
                Rs. {discountedPrice ?? '000'}
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.poppins700,
                  fontSize: fontSize(16),
                  color: '#000000',
                }}>
                {/* Rs. 1280 */}
                Rs. {price}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {/* Header */}
      <View style={{height: hp(57), justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 18,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 0}}
            onPress={() => {
              navigation.goBack();
            }}>
            <BackIcon />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: fontSize(18),
              color: colors.black,
              lineHeight: hp(26),
              fontFamily: fontFamily.poppins500,
            }}>
            My Bag
          </Text>
        </View>
      </View>

      <View style={{width: '100%', borderWidth: 1, borderColor: '#F2F2F2'}} />

      <ScrollView contentContainerStyle={{paddingBottom: hp(120)}}>
        <Touchable
          style={{
            backgroundColor: '#F8FAFC',
            marginHorizontal: wp(17),
            borderRadius: 16,
            marginTop: hp(16),
            height: hp(120),
          }}
          activeOpacity={0.5}
          onPress={() => sheetRef1.current?.open()}>
          <View style={{marginHorizontal: wp(16), marginTop: hp(16)}}>
            <Text
              style={{
                color: '#9333EA',
                fontSize: fontSize(10),
                lineHeight: hp(14),
                fontFamily: fontFamily.poppins700,
              }}>
              Delivery Address
            </Text>
            {defaultAddress ? (
              <>
                <View style={{marginTop: hp(6), flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(16),
                      // lineHeight: hp(18),
                      fontFamily: fontFamily.poppins700,
                    }}>
                    {/* Rahul Gajjar{' '}/ */}
                    {defaultAddress.name}
                  </Text>

                  <View
                    style={{
                      width: 2,
                      height: 24,
                      backgroundColor: '#E6E6E6',
                      marginLeft: wp(10),
                      marginRight: hp(10),
                    }}
                  />
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(14),
                      // lineHeight: hp(18),
                      fontFamily: fontFamily.poppins500,
                    }}>
                    {/* +91 10002 00003 */}
                    +91 {defaultAddress.mobileNumber}
                  </Text>
                </View>

                <Text
                  style={{
                    color: '#64748B',
                    fontSize: fontSize(14),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins400,
                    marginTop: 4,
                    marginBottom: hp(20),
                  }}>
                  {/* 25/3 Housing Estate, Near by sector 17, Singapore 31134 */}
                  {defaultAddress.addressLineOne},{' '}
                  {defaultAddress.addressLineTwo}, {defaultAddress.city}{' '}
                  {defaultAddress.pincode}
                </Text>
              </>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: hp(13),
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: fontFamily.poppins500,
                    fontSize: fontSize(17),
                  }}>
                  No delivery address added
                </Text>
              </View>
            )}
          </View>
          {/* <FlatList
            data={addressList}
            scrollEnabled={true}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{marginHorizontal: wp(16), marginTop: hp(16)}}>
                <Text
                  style={{
                    color: '#9333EA',
                    fontSize: fontSize(10),
                    fontFamily: fontFamily.poppins700,
                  }}>
                  Delivery Address
                </Text>

                <View style={{marginTop: hp(6), flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(16),
                      fontFamily: fontFamily.poppins700,
                    }}>
                    {item.name}
                  </Text>

                  <View
                    style={{
                      width: 2,
                      height: 24,
                      backgroundColor: '#E6E6E6',
                      marginLeft: wp(10),
                      marginRight: hp(10),
                    }}
                  />

                  <Text
                    style={{
                      color: colors.pureBlack,
                      fontSize: fontSize(14),
                      fontFamily: fontFamily.poppins500,
                    }}>
                    +91 {item.mobileNumber}
                  </Text>
                </View>

                <Text
                  style={{
                    color: '#64748B',
                    fontSize: fontSize(14),
                    fontFamily: fontFamily.poppins400,
                    marginTop: 4,
                    marginBottom: hp(20),
                  }}>
                  {item.addressLineOne}, {item.addressLineTwo}, {item.city}{' '}
                  {item.pincode}
                
                </Text>
              </TouchableOpacity>
            )}
          />
         
          // */}
          <View
            style={{
              position: 'absolute',
              right: 25,
              top: 50,
            }}>
            <NavigationArrowIcon stroke="#64748B" />
          </View>
        </Touchable>

        <View style={{marginHorizontal: wp(21), marginTop: hp(24)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: '#94A3B8',
                fontSize: fontSize(14),
                fontFamily: fontFamily.poppins700,
              }}>
              Selected Items
            </Text>
            <Text
              style={{
                color: '#94A3B8',
                fontSize: fontSize(12),
                fontFamily: fontFamily.poppins500,
              }}>
              {/* 2 Items */}
              {cartData?.productDetailList?.length || 0} Items
            </Text>
          </View>
        </View>
        <FlatList
          data={cartData?.productDetailList}
          renderItem={renderCartItem}
          keyExtractor={item => item._id}
          scrollEnabled={false}
        />
        <View
          style={{
            // width: '100%',
            backgroundColor: '#F1F5F9',
            height: 1,
            marginTop: hp(24),
            marginHorizontal: wp(18),
          }}
        />

        <View
          style={
            {
              // backgroundColor: '#FDFAFF'
            }
          }>
          <View
            style={{
              marginHorizontal: wp(34),
              marginTop: hp(24),
              // backgroundColor: '#493c52',
            }}>
            <Text
              style={{
                color: '#0F172A',
                fontSize: fontSize(14),
                fontFamily: fontFamily.poppins700,
              }}>
              Billing Details
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: hp(24),
              }}>
              <Text
                style={{
                  color: '#64748B',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins400,
                }}>
                Item Price
              </Text>
              <Text
                style={{
                  color: '#0F172A',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins700,
                }}>
                {/* Rs. 900.00 */}
                Rs. {cartData?.subTotal ?? '00'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: hp(14),
              }}>
              <Text
                style={{
                  color: '#64748B',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins400,
                }}>
                Discount on MRP
              </Text>
              <Text
                style={{
                  color: '#0F172A',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins700,
                }}>
                {/* Rs. 120.00 */}
                Rs.{cartData?.totalDiscount ?? '00'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: hp(14),
              }}>
              <Text
                style={{
                  color: '#64748B',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins400,
                }}>
                Coupon Discount
              </Text>
              <Text
                style={{
                  color: '#6366F1',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins700,
                }}>
                Apply
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: hp(14),
              }}>
              <Text
                style={{
                  color: '#64748B',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins400,
                }}>
                Shipping Charges
              </Text>
              <Text
                style={{
                  color: '#10B981',
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins700,
                }}>
                FREE
              </Text>
            </View>
          </View>

          <View
            style={{
              // width: '100%',
              height: 1,
              backgroundColor: '#F1F5F9',
              marginTop: hp(24),
              marginHorizontal: wp(34),
            }}
          />

          <View
            style={{
              marginHorizontal: wp(34),
              marginTop: hp(24),
              flexDirection: 'row',
              marginBottom: hp(15),
              justifyContent: 'space-between',
              // backgroundColor: '#F1F5F9',
            }}>
            <Text
              style={{
                color: '#9333EA',
                fontSize: fontSize(18),
                fontFamily: fontFamily.poppins700,
              }}>
              Total Payable
            </Text>
            <Text
              style={{
                color: '#9333EA',
                fontSize: fontSize(18),
                fontFamily: fontFamily.poppins700,
              }}>
              {/* Rs. 780.00 */}
              Rs. {cartData?.grandTotal ?? '00'}
            </Text>
          </View>
        </View>
        {/* <View style={{marginHorizontal: wp(18), marginTop: hp(42)}}>
          <GradientButton title={'Pay Now'} />
        </View> */}

        {/* First Bottom Sheet - Address Selection */}
        <RBSheet
          ref={sheetRef1}
          height={hp(350)}
          openDuration={250}
          closeOnDragDown
          closeOnPressMask
          customStyles={{
            wrapper: {backgroundColor: 'rgba(0,0,0,0.35)'},
            draggableIcon: {backgroundColor: '#C4C4C4'},
            container: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
          }}>
          <View style={{flex: 1, backgroundColor: colors.white}}>
            <Text
              style={{
                color: colors.pureBlack,
                textAlign: 'center',
                marginTop: hp(25),
                marginBottom: hp(25),
                fontSize: fontSize(14),
                lineHeight: hp(18),
                fontFamily: fontFamily.poppins600,
              }}>
              Select or Add Delivery Address
            </Text>
            {/* 
            <View
              style={{width: '100%',
                 height: 1,
                  backgroundColor: '#E3E3E3'
                }}
            /> */}
            <FlatList
              data={addressList}
              scrollEnabled={true}
              // keyExtractor={item => item.id?.toString()}
              keyExtractor={(item, index) =>
                item?.id ? item.id.toString() : index.toString()
              }
              contentContainerStyle={{
                // paddingBottom: hp(25)
                paddingBottom: hp(120),
                flexGrow: 1,
              }}
              renderItem={({item}) => (
                <Touchable
                  style={{
                    backgroundColor: '#F8FAFC',
                    // height: hp(120),
                    marginHorizontal: wp(18),
                    borderRadius: 16,
                    marginTop: hp(20),
                  }}
                  activeOpacity={0.5}
                  onPress={() => {
                    sheetRef1.current?.close();
                  }}>
                  <View style={{marginHorizontal: wp(20), marginTop: hp(16)}}>
                    <Text
                      style={{
                        color: '#8225AF',
                        fontSize: fontSize(12),
                        lineHeight: hp(14),
                        fontFamily: fontFamily.poppins700,
                      }}>
                      {/* Home */}
                      {/* {item?.type || 'Home'} */}
                      {item?.isDefaultAddress && 'Default'}
                    </Text>

                    <View
                      style={{
                        marginTop: hp(4),
                        flexDirection: 'row',
                        alignItems: 'center', // ✅ IMPORTANT
                        // backgroundColor: '#1e5081',
                      }}>
                      <Text
                        style={{
                          color: colors.pureBlack,
                          fontSize: fontSize(16),
                          // lineHeight: hp(18),
                          fontFamily: fontFamily.poppins700,
                        }}>
                        {/* Rahul Gajjar{' '} */}
                        {item?.name ?? 'No Name'}
                      </Text>
                      <View
                        style={{
                          width: 2,
                          height: 17,
                          backgroundColor: '#E6E6E6',
                          marginLeft: wp(10),
                          marginRight: hp(10),
                        }}
                      />
                      <Text
                        style={{
                          color: '#475569',
                          fontSize: fontSize(14),
                          // lineHeight: hp(18),
                          fontFamily: fontFamily.poppins500,
                        }}>
                        {/* +91 10002 00003 */}
                        +91 {item?.mobileNumber ?? ''}
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: '#64748B',
                        fontSize: fontSize(14),
                        lineHeight: hp(19),
                        fontFamily: fontFamily.poppins400,
                        marginTop: 4,
                        marginBottom: hp(16),
                      }}>
                      {item.addressLineOne}, {item.addressLineTwo}, {item.city}{' '}
                      {item.pincode}
                    </Text>
                  </View>

                  <View style={{position: 'absolute', right: 25, top: 50}}>
                    <NavigationArrowIcon stroke="#94A3B8" />
                  </View>
                </Touchable>
              )}
            />
          </View>

          <View style={{marginHorizontal: 18, bottom: 10}}>
            <GradientButton
              title={'Add New Address'}
              onPress={() => {
                sheetRef1.current?.close();
                resetForm(); // ✅ clear after submit
                setTimeout(() => {
                  sheetRef2.current?.open();
                }, 300);
              }}
            />
          </View>
        </RBSheet>

        {/* Second Bottom Sheet - Add New Address */}
        <RBSheet
          ref={sheetRef2}
          height={hp(570)}
          openDuration={250}
          closeOnDragDown
          closeOnPressMask
          customStyles={{
            wrapper: {backgroundColor: 'rgba(0,0,0,0.35)'},
            draggableIcon: {backgroundColor: '#C4C4C4'},
            container: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
          }}>
          <View style={{flex: 1, backgroundColor: colors.white}}>
            <Text
              style={{
                color: colors.pureBlack,
                textAlign: 'center',
                marginTop: hp(25),
                marginBottom: hp(25),
                fontSize: fontSize(16),
                lineHeight: hp(18),
                fontFamily: fontFamily.poppins500,
              }}>
              Add New Address
            </Text>

            <View
              style={{width: '100%', height: 1, backgroundColor: '#E3E3E3'}}
            />

            <View style={{marginHorizontal: 18, marginTop: hp(19)}}>
              <TextInput
                placeholder="Name"
                placeholderTextColor="#999"
                value={form.name}
                onChangeText={text =>
                  setForm(prev => ({
                    ...prev,
                    name: text,
                  }))
                }
                style={{
                  borderWidth: 1,
                  borderColor: '#EAEAEA',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  height: hp(45),
                  fontSize: fontSize(13),
                  fontFamily: fontFamily.poppins400,
                  color: colors.pureBlack,
                }}
              />

              <TextInput
                placeholder="Mobile Number"
                placeholderTextColor="#999"
                keyboardType={'number-pad'}
                maxLength={10}
                value={form.mobileNumber}
                onChangeText={text =>
                  setForm(prev => ({
                    ...prev,
                    mobileNumber: text,
                  }))
                }
                style={{
                  borderWidth: 1,
                  borderColor: '#EAEAEA',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  height: hp(45),
                  fontSize: fontSize(13),
                  fontFamily: fontFamily.poppins400,
                  color: colors.pureBlack,
                  marginTop: hp(13),
                }}
              />

              <View
                style={{
                  marginTop: hp(23),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={images.address_icon}
                  style={{
                    tintColor: '#B0B0B0',
                    width: hp(11),
                    height: hp(14),
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    marginLeft: wp(12),
                    fontSize: fontSize(12),
                    lineHeight: hp(18),
                    fontFamily: fontFamily.poppins400,
                    color: colors.pureBlack,
                  }}>
                  Delivery Address
                </Text>
              </View>

              <TextInput
                placeholder="Pincode"
                placeholderTextColor="#999"
                keyboardType={'number-pad'}
                maxLength={6}
                value={form.pincode}
                onChangeText={text =>
                  setForm(prev => ({
                    ...prev,
                    pincode: text,
                  }))
                }
                style={{
                  borderWidth: 1,
                  borderColor: '#EAEAEA',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  height: hp(45),
                  fontSize: fontSize(13),
                  fontFamily: fontFamily.poppins400,
                  color: colors.pureBlack,
                  marginTop: hp(21),
                }}
              />

              <TextInput
                placeholder="Address (House No, Building, Street, Area)"
                placeholderTextColor="#999"
                value={form.addressLineOne}
                onChangeText={text =>
                  setForm(prev => ({
                    ...prev,
                    addressLineOne: text,
                  }))
                }
                style={{
                  borderWidth: 1,
                  borderColor: '#EAEAEA',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  height: hp(45),
                  fontSize: fontSize(13),
                  fontFamily: fontFamily.poppins400,
                  color: colors.pureBlack,
                  marginTop: hp(15),
                }}
              />

              <TextInput
                placeholder="Locality/Town"
                placeholderTextColor="#999"
                value={form.locality}
                onChangeText={val =>
                  setForm(prev => ({
                    ...prev,
                    locality: val,
                  }))
                }
                style={{
                  borderWidth: 1,
                  borderColor: '#EAEAEA',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  height: hp(45),
                  fontSize: fontSize(13),
                  fontFamily: fontFamily.poppins400,
                  color: colors.pureBlack,
                  marginTop: hp(15),
                }}
              />

              <View style={{marginTop: hp(24)}}>
                <CheckBoxComponent
                  isDefault={form.isDefaultAddress}
                  onPress={() =>
                    setForm(prev => ({
                      ...prev,
                      isDefaultAddress: !prev.isDefaultAddress,
                    }))
                  }
                />
              </View>

              <GradientButton
                // title={'Save Address'}
                title={loading ? 'Saving...' : 'Save Address'}
                disabled={loading}
                opacity={loading ? 0.7 : 1}
                onPress={() => {
                  console.log('Save Address Clicked');
                  handleAddAddress();

                  sheetRef2.current?.close();
                }}
                buttonStyle={{marginTop: 20}}
              />
            </View>
          </View>
        </RBSheet>

        {/* Third Bottom Sheet - Edit Item (Color & Size) */}
        <RBSheet
          ref={sheetRef3}
          height={hp(520)}
          openDuration={250}
          closeOnDragDown
          closeOnPressMask
          customStyles={{
            wrapper: {backgroundColor: 'rgba(0,0,0,0.35)'},
            draggableIcon: {backgroundColor: '#C4C4C4'},
            container: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              height: hp(480),
            },
          }}>
          {/* <ScrollView
            style={{flex: 1, backgroundColor: colors.white}}
            showsVerticalScrollIndicator={false}> */}
          <View style={{flex: 1, backgroundColor: colors.white}}>
            <Text
              style={{
                color: colors.black,
                textAlign: 'center',
                // marginTop: hp(25),
                marginTop: hp(20),
                marginBottom: hp(15),
                fontSize: fontSize(18),
                marginRight: '75%',
                fontFamily: fontFamily.poppins400,
              }}>
              Modify
            </Text>

            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#E3E3E3',
                // marginBottom: hp(25),
                marginBottom: hp(15),
              }}
            />
            {/* {loading ? (
              <ActivityIndicator size="large" color="#9333EA" />
            ) : (
              <> */}
            {/* Change Color Section */}
            <View style={{marginHorizontal: 18}}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins500,
                  // marginBottom: hp(20),
                  marginBottom: hp(15),
                }}>
                Change Color
              </Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  // marginBottom: hp(30)
                  marginBottom: hp(20),
                }}
                contentContainerStyle={{paddingRight: 20}}>
                {colorOptions.map((color, index) => (
                  <Touchable
                    // key={color.id}
                    key={`${color.id}-${index}`} // unique key
                    style={{
                      marginRight: wp(15),
                      // borderWidth: selectedColor === color.id ? 3 : 0,
                      // borderColor:
                      //   selectedColor === color.id ? '#8225AF' : '#E0E0E0',
                      borderWidth:
                        selectedColor?.toLowerCase() === color.id?.toLowerCase()
                          ? 3
                          : 0,

                      borderColor:
                        selectedColor?.toLowerCase() === color.id?.toLowerCase()
                          ? '#8225AF'
                          : '#E0E0E0',
                      borderRadius: 10,
                      // padding: 10,
                    }}
                    // onPress={() => setSelectedColor(color.id)}
                    onPress={() => handleColorSelect(color.id)}>
                    <Image
                      source={color.image}
                      style={{
                        width: wp(55),
                        height: hp(55),
                        borderRadius: 8,
                      }}
                    />
                  </Touchable>
                ))}
              </ScrollView>

              {/* Select Size Section */}
              <Text
                style={{
                  color: colors.black,
                  fontSize: fontSize(14),
                  fontFamily: fontFamily.poppins500,
                  // marginBottom: hp(20),
                  marginBottom: hp(15),
                }}>
                Select Size
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  // marginBottom: hp(35),
                }}>
                {availableSizes.map(
                  (size, index) => (
                    console.log(availableSizes, 'AVAILABLE SIZES==>'),
                    (
                      <Touchable
                        // key={size}
                        key={`${size}-${index}`} // unique key
                        style={{
                          width: wp(48),
                          height: wp(48),
                          borderRadius: wp(32.5),
                          borderWidth: 2,
                          borderColor:
                            selectedSize?.toLowerCase() === size?.toLowerCase()
                              ? '#000000'
                              : '#E0E0E0',

                          backgroundColor:
                            selectedSize?.toLowerCase() === size?.toLowerCase()
                              ? '#F7E7FF'
                              : colors.white,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: wp(12),
                          // marginBottom: hp(15),
                          marginBottom: hp(20),
                        }}
                        onPress={() => setSelectedSize(size)}>
                        <Text
                          style={{
                            fontSize: fontSize(16),
                            fontFamily: fontFamily.poppins600,
                            color:
                              selectedSize === size
                                ? colors.pureBlack
                                : colors.pureBlack,
                          }}>
                          {size.toUpperCase()}
                        </Text>
                      </Touchable>
                    )
                  ),
                )}
                <View
                  style={
                    {
                      // marginTop: hp(29)
                    }
                  }>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: fontSize(14),
                      fontFamily: fontFamily.poppins500,
                      // marginBottom: hp(20),
                      marginBottom: hp(15),
                    }}>
                    Select Quantity
                  </Text>

                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {quantityOptions.map(qty => (
                      <TouchableOpacity
                        key={qty}
                        style={{
                          width: wp(48),
                          height: wp(48),
                          borderRadius: wp(32.5),
                          borderWidth: 2,
                          borderColor:
                            selectedQuantity === qty ? '#000000' : '#E0E0E0',
                          backgroundColor:
                            selectedQuantity === qty ? '#F7E7FF' : colors.white,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: wp(12),
                          // marginBottom: hp(15),
                          marginBottom: hp(25),
                        }}
                        onPress={() => setSelectedQuantity(qty)}>
                        <Text
                          style={{
                            fontSize: fontSize(16),
                            fontFamily: fontFamily.poppins600,
                            color: colors.pureBlack,
                          }}>
                          {qty}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              <GradientButton
                title={loading ? 'Updating...' : 'Update'}
                // loading={updating}
                // disabled={loading}
                onPress={() => {
                  // console.log(
                  //   'FULL VARIANTS',
                  //   JSON.stringify(variants, null, 2),
                  // );

                  console.log('selectedColor', selectedColor);
                  console.log('selectedSize', selectedSize);
                  setUpdating(true);
                  const selectedVariant = variants.find(v => {
                    const color = v.variants.find(
                      i => i.key === 'color',
                    )?.value;
                    const size = v.variants.find(i => i.key === 'size')?.value;

                    return (
                      color?.toLowerCase() === selectedColor?.toLowerCase() &&
                      size?.toLowerCase() === selectedSize?.toLowerCase()
                    );
                  });

                  console.log('SELECTED VARIANT', selectedVariant);

                  if (!selectedVariant) {
                    console.log('Variant not found');
                    return;
                  }

                  const data = {
                    cartItemId: selectedItem?._id,
                    variants: selectedVariant.id,
                    quantity: selectedQuantity,
                  };

                  console.log('FINAL PAYLOAD', data);

                  dispatch(updateCartRequest(data, token));

                  // sheetRef3.current?.close();
                }}
                buttonStyle={{marginBottom: hp(30)}}></GradientButton>
            </View>
            {/* </ScrollView>
             */}
            {/* </>
            )} */}
          </View>
        </RBSheet>
      </ScrollView>
      {/* ✅ FIXED BUTTON */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          padding: 15,
          borderTopWidth: 1,
          borderColor: '#eee',
        }}>
        <GradientButton title={'Pay Now'} />
      </View>
    </SafeAreaView>
  );
};

export default BagScreen;
