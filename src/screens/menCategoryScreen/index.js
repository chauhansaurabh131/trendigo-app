// import React, { useState, useRoute } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
// } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import { wp,hp, fontFamily } from "../../utils/helpers";
// import { useNavigation } from "@react-navigation/native";

// // Images
// import arrow_back from "../../assets/images/arrow_back.png";
// import banner_icon from "../../assets/images/banner_men_icon.png";
// import topwear_icon from "../../assets/images/topwear_men_icon.png";
// import bottomwear_image from "../../assets/images/bottomwear_men_image.png";
// import footwear_image from "../../assets/images/footwear_men_image.png";

// // Topwear
// import tishrt_icon from "../../assets/images/tishrt_men_icon.png";
// import men_causal from "../../assets/images/men_causal_image.png";
// import formal_image from "../../assets/images/formal_men_image.png";
// import jacket_image from "../../assets/images/jacket_men_image.png";
// import blazer_image from "../../assets/images/blazer_men_image.png";
// import coat_image from "../../assets/images/coat_men_image.png";
// import suit_image from "../../assets/images/suit_men_image.png";
// import rain_image from "../../assets/images/rain_men_image.png";
// import caps_image from "../../assets/images/caps_men_image.png";

// const MenCategoryScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { title, image } = route.params; // 👈 params receive
//   const [activeTab, setActiveTab] = useState("Topwear");

//   const tabs = [
//     { key: "Topwear", label: "Topwear", icon: topwear_icon },
//     { key: "Bottomwear", label: "Bottomwear", icon: men_causal },
//     { key: "Footwear", label: "Footwear", icon: formal_image },
//   ];

//   // Data for each category
//   const categoryData = {
//     Topwear: [
//       { image: tishrt_icon, name: "T-Shirts" },
//       { image: men_causal, name: "Casual Shirts" },
//       { image: formal_image, name: "Formal Shirts" },
//       { image: jacket_image, name: "Jackets" },
//       { image: blazer_image, name: "Blazers" },
//       { image: coat_image, name: "Coats" },
//       { image: suit_image, name: "Suits" },
//       { image: rain_image, name: "Rain Jackets" },
//       { image: caps_image, name: "Caps" },
//     ],
//     Bottomwear: [
//       { image: blazer_image, name: "Hip-Hop" },
//       { image: coat_image, name: "Cargo-Pants" },
//       { image: suit_image, name: "Baggy-Pants" },
//       { image: rain_image, name: "Joggers" },
//       { image: caps_image, name: "Board-Shorts" },
//       { image: suit_image, name: "Touser" },
//       { image: rain_image, name: "Jeans" },
//       { image: caps_image, name: "Bell-Bottoms" },
//       { image: jacket_image, name: "Shorts" },
//       { image: jacket_image, name: "Shorts" },
//       { image: jacket_image, name: "Shorts" },
//     ],
//     Footwear: [
//       { image: tishrt_icon, name: "Sandals" },
//       { image: men_causal, name: "Casual Shoes" },
//       { image: formal_image, name: "Formal Shoes" },
//       { image: jacket_image, name: "Boots-Shoes" },
//       { image: jacket_image, name: "Loafers" },
//     ],
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image source={arrow_back} style={styles.backIcon} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{title}</Text>
//         <View style={{ width: wp(18) }} />
//       </View>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Banner */}
//         <Image source={banner_icon} style={styles.banner} resizeMode="contain" />

//         {/* Tabs */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.tabRow}
//           contentContainerStyle={styles.tabContentContainer}
//           marginTop={13}
//         >
//           {tabs.map((tab, index) =>
//             activeTab === tab.key ? (
//               <LinearGradient
//                 key={tab.key}
//                 colors={["#8225AF", "#0F52BA"]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={[
//                   styles.activeTab,
//                   index === 0 && styles.firstTab,
//                   index === tabs.length - 1 && styles.lastTab
//                 ]}
//               >
//                 <TouchableOpacity
//                   style={styles.tabContent}
//                   onPress={() => setActiveTab(tab.key)}
//                 >
//                   <Image source={tab.icon} style={styles.tabIcon} />
//                   <Text style={styles.activeTabText}>{tab.label}</Text>
//                 </TouchableOpacity>
//               </LinearGradient>
//             ) : (
//               <TouchableOpacity
//                 key={tab.key}
//                 style={[
//                   styles.inactiveTab,
//                   index === 0 && styles.firstTab,
//                   index === tabs.length - 1 && styles.lastTab
//                 ]}
//                 onPress={() => setActiveTab(tab.key)}
//               >
//                 <View style={styles.tabContent}>
//                   <Image source={tab.icon} style={styles.tabIcon} />
//                   <Text style={styles.tabText}>{tab.label}</Text>
//                 </View>
//               </TouchableOpacity>
//             )
//           )}
//         </ScrollView>

//         {/* Category Grid */}
//         <Text style={styles.sectionTitle}>
//           Explore {activeTab} Collections
//         </Text>
//         <View style={styles.grid}>
//           {categoryData[activeTab].map((item, index) => (
//             <View key={index} style={styles.card}>
//               <Image source={item.image} style={styles.cardImage} />
//               <Text style={styles.cardText}>{item.name}</Text>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default MenCategoryScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff"
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   backIcon: {
//     width: wp(18),
//     height: wp(18),
//     resizeMode: "contain",
//     marginLeft: 10,
//     marginTop: 10,
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: "center",
//     fontFamily: fontFamily.poppins500,
//     fontSize: wp(18),
//     color: "#000",
//     marginTop: 15,

//   },
//   banner: {
//     width: "100%",
//     height: hp(110),
//     borderRadius: 10,
//     marginBottom: 10
//   },
//   tabRow: {
//     marginBottom: 10,
//     marginHorizontal: 3,
//     right:3,
//     // backgroundColor: "#000"
//   },
//   tabContentContainer: {
//     paddingHorizontal: 20,
//     alignItems: 'center',
//   },
//   activeTab: {
//     borderRadius: 25,
//     marginRight: 15,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//   },
//   inactiveTab: {
//     backgroundColor: "#f2f2f2",
//     borderRadius: 25,
//     marginRight: 15,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//   },
//   firstTab: {
//     marginLeft: 0,
//   },
//   lastTab: {
//     marginRight: 20
//   },
//   tabContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     // justifyContent: "center",
//     // marginRight:5,
//     // marginHorizontal:15
//   },
//   tabIcon: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     resizeMode: "contain",
//     right:10
//   },
//   activeTabText: {
//     color: "#ffffff",
//     fontFamily: fontFamily.poppins400,
//     fontSize: 13,
//     marginLeft: 15,
//     right:10
//   },
//   tabText: {
//     color: "#000000",
//     fontFamily: fontFamily.poppins400,
//     fontSize: 14,
//     marginLeft: 8,
//   },
//   sectionTitle: {
//     fontSize: 15,
//     fontFamily: fontFamily.poppins500,
//     margin: 18,
//     color: "#000000",
//     marginLeft: 21,
//   },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "flex-start",
//     paddingHorizontal: 10,
//     paddingBottom: 20,
//   },
//   card: {
//     width: "30%",
//     borderRadius: 10,
//     alignItems: "center",
//     margin: "1.5%",
//     padding: 5,
//   },
//   cardImage: {
//     width: 100,
//     height: 100,
//     marginBottom: 6,
//     resizeMode: "contain",
//     borderRadius: 10,
//   },
//   cardText: {
//     fontFamily: fontFamily.poppins400,
//     fontSize: 14,
//     color: "#000",
//     textAlign: "center",
//   },
// });

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {wp, hp, fontFamily, fontSize} from '../../utils/helpers';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FlatList} from 'react-native';

import arrow_back from '../../assets/images/arrow_back.png';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {PRODUCT_CATEGORY_REQUEST} from '../../redux/actions/productCategoryActions';
// import men_banner from "../../assets/images/banner_men_icon.png";
// import women_banner from "../../assets/images/banner_women_icon.png";
// import kids_banner from "../../assets/images/banner_kids_icon.png";
// import beauty_banner from "../../assets/images/banner_beauty_icon.png";

// tab icons
import topwear_icon from '../../assets/images/topwear_men_icon.png';
import men_causal from '../../assets/images/men_causal_image.png';
import formal_image from '../../assets/images/formal_men_image.png';
import coat_image from '../../assets/images/coat_men_image.png';
import caps_image from '../../assets/images/caps_men_image.png';
import rain_image from '../../assets/images/rain_men_image.png';
import suit_image from '../../assets/images/suit_men_image.png';
const MenCategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {title, image, type} = route.params; // params receive
  const [activeTab, setActiveTab] = useState('Topwear');

  const dispatch = useDispatch();
  const tabs = [
    {key: 'Topwear', label: 'Topwear', icon: topwear_icon},
    {key: 'Bottomwear', label: 'Bottomwear', icon: men_causal},
    {key: 'Footwear', label: 'Footwear', icon: formal_image},
  ];
  const {loading, products, error, pagination} = useSelector(
    state => state.productCategroy,
  );
  // useEffect(() => {
  console.log('PRODUCTS IN UI (ON SCREEN LOAD):', products);
  // }, []); //

  useEffect(() => {
    dispatch({
      type: PRODUCT_CATEGORY_REQUEST,
      payload: {
        category: activeTab,
        page: 1,
        productType: type,
      },
    });
  }, [activeTab, type]); // 👈 VERY IMPORTANT

  //product filtering
  const filteredProducts = products.filter(
    item =>
      item.productTypeId?.value === type &&
      item.productCategoryId?.value === activeTab,
  );

  // const categoryData = {
  //   Topwear: [
  //     { image: men_causal, name: "Casual Shirts" },
  //     { image: formal_image, name: "Formal Shirts" },
  //     { image: formal_image, name: "Jacket" },
  //     { image: formal_image, name: "Hoody" },
  //      { image: coat_image, name: "Coats" },
  //     { image: suit_image, name: "Suits" },
  //     { image: rain_image, name: "Rain Jackets" },
  //     { image: caps_image, name: "blazer" },
  //     { image: formal_image, name: "Formal Shirts" },
  //   ],
  //   Bottomwear: [
  //     { image: men_causal, name: "Jeans" },
  //     { image: men_causal, name: "Touser" },
  //     { image: men_causal, name: "Bell-Bottom" },
  //     { image: formal_image, name: "Shorts" },
  //     { image: formal_image, name: "Hip-Hop" },
  //      { image: caps_image, name: "Joggers" },
  //     { image: formal_image, name: "Baggy Pants" },
  //   ],
  //   Footwear: [
  //     { image: formal_image, name: "Sneakers" },
  //     { image: formal_image, name: "Sandals Shoes" },
  //     { image: formal_image, name: "Clogs" },
  //     { image: formal_image, name: "Loafers" },
  //     { image: formal_image, name: "Sport Shoes" },
  //   ],
  // };
  const getSafeImageSource = product => {
    const variant =
      product?.variants?.find(v =>
        v.images?.some(img => img.isSelectedForMainScreen),
      ) || product?.variants?.[0];

    const image =
      variant?.images?.find(img => img.isSelectedForMainScreen) ||
      variant?.images?.[0];

    if (image?.imageUrl) {
      return {uri: image.imageUrl};
    }

    return images.trending_one;
  };
  console.log('ROUTE TYPE ===>', type);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrow_back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{width: wp(18)}} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Dynamic Banner */}
        <Image source={image} style={styles.banner} resizeMode="cover" />

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabRow}
          contentContainerStyle={styles.tabContentContainer}
          marginTop={13}>
          {tabs.map((tab, index) =>
            activeTab === tab.key ? (
              <LinearGradient
                key={tab.key}
                colors={['#8225AF', '#0F52BA']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[
                  styles.activeTab,
                  index === 0 && styles.firstTab,
                  index === tabs.length - 1 && styles.lastTab,
                ]}>
                <TouchableOpacity
                  style={styles.tabContent}
                  onPress={() => setActiveTab(tab.key)}>
                  <Image source={tab.icon} style={styles.tabIcon} />
                  <Text style={styles.activeTabText}>{tab.label}</Text>
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.inactiveTab,
                  index === 0 && styles.firstTab,
                  index === tabs.length - 1 && styles.lastTab,
                ]}
                onPress={() => setActiveTab(tab.key)}>
                <View style={styles.tabContent}>
                  <Image source={tab.icon} style={styles.tabIcon} />
                  <Text style={styles.tabText}>{tab.label}</Text>
                </View>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>

        {/* Category Grid */}
        <Text style={styles.sectionTitle}>Explore {activeTab} Collections</Text>
        {/* <View style={styles.grid}> */}
        {/* {[activeTab].map((item, index) => ( */}
        {/* <View key={index} style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.name}</Text>
          </View> */}
        {/* ))} */}
        {/* {products.map(item => (
            <View key={item._id} style={styles.card}>
              <Image
                source={getSafeImageSource(item)}
                style={styles.cardImage}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.cardText}>
                {item.title}
              </Text>
            </View>
          ))} */}

        {/* <FlatList
            data={filteredProducts}
            keyExtractor={item => item._id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({item}) => (
              <View style={styles.card}>
                <Image
                  source={getSafeImageSource(item)}
                  style={styles.cardImage}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.cardText}>
                  {item.title}
                </Text>
              </View>
            )}
          /> */}
        <View style={styles.grid}>
          {loading ? (
            <Text
              style={{
                marginTop: hp(60),
                // alignItems: 'center',
                marginLeft: wp(21),
                color: '#000',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(16),
              }}>
              Loading...
            </Text>
          ) : filteredProducts.length === 0 ? (
            <Text
              style={{
                textAlign: 'center',
                marginTop: hp(60),
                color: '#000',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(16),
                // marginLeft: wp(21),
              }}>
              No products available for {type}
            </Text>
          ) : (
            <FlatList
              data={filteredProducts}
              keyExtractor={item => item._id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              renderItem={({item}) => (
                <View style={styles.card}>
                  <Image
                    source={getSafeImageSource(item)}
                    style={styles.cardImage}
                  />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.cardText}>
                    {item.title}
                  </Text>
                </View>
              )}
            />
          )}
          {/* </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenCategoryScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  backIcon: {
    width: wp(18),
    height: wp(18),
    resizeMode: 'contain',
    marginLeft: 10,
    marginTop: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamily.poppins500,
    fontSize: wp(18),
    color: '#000',
    marginTop: 15,
  },
  banner: {
    width: '100%',
    height: hp(120),
    // borderRadius: 10,
    marginBottom: 10,
  },
  tabRow: {marginBottom: 10, marginHorizontal: 3, right: 3},
  tabContentContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  activeTab: {
    borderRadius: 25,
    marginRight: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  inactiveTab: {
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    marginRight: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  firstTab: {marginLeft: 0},
  lastTab: {marginRight: 20},
  tabContent: {flexDirection: 'row', alignItems: 'center'},
  tabIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: 'contain',
    right: 10,
  },
  activeTabText: {
    color: '#ffffff',
    fontFamily: fontFamily.poppins400,
    fontSize: 13,
    marginLeft: 15,
    right: 10,
  },
  tabText: {
    color: '#000000',
    fontFamily: fontFamily.poppins400,
    fontSize: 14,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: fontSize(15),
    fontFamily: fontFamily.poppins500,
    margin: 18,
    color: '#000000',
    marginLeft: 21,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '30%',
    borderRadius: 10,
    alignItems: 'center',
    margin: '1.5%',
    padding: 5,
  },
  cardImage: {
    width: 100,
    height: 100,
    marginBottom: 6,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  cardText: {
    fontFamily: fontFamily.poppins400,
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
});
